import { describe, expect, test } from "bun:test";
import {
	StructClient,
	StructWebSocket,
	type Event as StructEvent,
	type GlobalPnlTrader,
	type MarketResponse,
	type WsRoomId,
} from "../src/index.js";

const API_KEY = Bun.env.STRUCT_API_KEY ?? "";
const RUN_WS_LIVE_TESTS = Bun.env.STRUCT_RUN_WS_LIVE_TESTS === "1";
const DEFAULT_SOAK_DURATION_MS = 5 * 60_000;
const DEFAULT_FIRST_EVENT_TIMEOUT_MS = 60_000;
const LIVE_SUBSCRIBE_TIMEOUT_MS = 30_000;
const POLL_INTERVAL_MS = 1_000;
const EXPECTED_ROOMS: WsRoomId[] = [
	"polymarket_trades",
	"polymarket_asset_prices",
	"polymarket_asset_window_updates",
	"polymarket_market_metrics",
	"polymarket_event_metrics",
	"polymarket_position_metrics",
	"polymarket_trader_pnl",
	"polymarket_trader_positions",
	"polymarket_accounts",
	"polymarket_order_book",
	"polymarket_clob_rewards",
];
const MARKET_SIGNAL_EVENTS = [
	"trade_stream_update",
	"order_book_update",
	"market_metrics_update",
	"event_metrics_update",
	"position_metrics_update",
] as const;

const soakDurationEnv = Number(Bun.env.STRUCT_WS_SOAK_DURATION_MS ?? "");
const soakDurationMs =
	Number.isFinite(soakDurationEnv) && soakDurationEnv > 0
		? soakDurationEnv
		: DEFAULT_SOAK_DURATION_MS;
const firstEventTimeoutMs = Math.min(DEFAULT_FIRST_EVENT_TIMEOUT_MS, soakDurationMs);

interface DisconnectDiagnostic {
	code: number;
	reason: string;
	at: string;
}

interface BootstrapData {
	conditionId: string;
	positionId: string;
	eventSlug: string;
	traderAddress: string;
	walletAddress: string;
	assetSymbol: string;
	assetWindowTimeframe: "5m";
	recentMarketsFetched: number;
	recentEventsFetched: number;
	recentLeaderboardEntriesFetched: number;
}

interface EventDiagnostic {
	count: number;
	firstSeenAt: string;
	lastSeenAt: string;
	sample: Record<string, unknown> | null;
}

interface LiveDiagnostics {
	soakDurationMs: number;
	firstEventTimeoutMs: number;
	testStartedAt: string;
	bootstrap: BootstrapData | null;
	connectCount: number;
	firstConnectedAt: string | null;
	subscriptionAttempts: WsRoomId[];
	subscriptionAcks: Partial<Record<WsRoomId, unknown>>;
	subscriptionFailures: Partial<Record<WsRoomId, string>>;
	totalEventCount: number;
	firstEventType: string | null;
	firstEventAt: string | null;
	lastEventType: string | null;
	lastEventAt: string | null;
	events: Record<string, EventDiagnostic>;
	reconnectAttempts: number[];
	disconnects: DisconnectDiagnostic[];
	warnings: string[];
	errors: string[];
}

type EventSample = Record<string, unknown>;

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

function toIso(timestamp: number): string {
	return new Date(timestamp).toISOString();
}

function formatDiagnostics(diagnostics: LiveDiagnostics): string {
	return JSON.stringify(diagnostics, null, 2);
}

function createFailure(message: string, diagnostics: LiveDiagnostics): Error {
	return new Error(`${message}\n\n${formatDiagnostics(diagnostics)}`);
}

function createDiagnostics(): LiveDiagnostics {
	return {
		soakDurationMs,
		firstEventTimeoutMs,
		testStartedAt: toIso(Date.now()),
		bootstrap: null,
		connectCount: 0,
		firstConnectedAt: null,
		subscriptionAttempts: [],
		subscriptionAcks: {},
		subscriptionFailures: {},
		totalEventCount: 0,
		firstEventType: null,
		firstEventAt: null,
		lastEventType: null,
		lastEventAt: null,
		events: {},
		reconnectAttempts: [],
		disconnects: [],
		warnings: [],
		errors: [],
	};
}

function isNonEmptyString(value: unknown): value is string {
	return typeof value === "string" && value.length > 0;
}

function isBoolean(value: unknown): value is boolean {
	return typeof value === "boolean";
}

function isNumber(value: unknown): value is number {
	return typeof value === "number" && Number.isFinite(value);
}

function isStringArray(value: unknown): value is string[] {
	return Array.isArray(value) && value.every(isNonEmptyString);
}

function getMarketPositionId(market: MarketResponse | undefined): string | null {
	if (!market?.outcomes) return null;
	for (const outcome of market.outcomes) {
		if (isNonEmptyString(outcome?.position_id)) {
			return outcome.position_id;
		}
	}
	return null;
}

function getEventSlug(event: StructEvent | undefined): string | null {
	return isNonEmptyString(event?.event_slug) ? event.event_slug : null;
}

function getLeaderboardTraderAddress(entry: GlobalPnlTrader | undefined): string | null {
	return isNonEmptyString(entry?.trader?.address) ? entry.trader.address : null;
}

async function bootstrapLiveData(client: StructClient): Promise<BootstrapData> {
	const [recentMarketsRes, recentEventsRes, recentLeaderboardRes] =
		await Promise.all([
			client.markets.getMarkets({ limit: 10 }),
			client.events.getEvents({ limit: 10 }),
			client.trader.getGlobalPnl({ limit: 10 }),
		]);

	const recentMarkets = recentMarketsRes.data;
	const recentEvents = recentEventsRes.data;
	const recentLeaderboard = recentLeaderboardRes.data;

	const bootstrapMarket = recentMarkets.find((market) =>
		isNonEmptyString(market.condition_id)
		&& getMarketPositionId(market)
		&& isNonEmptyString(market.event_slug),
	) ?? recentMarkets[0];

	const bootstrapEvent = recentEvents.find((event) => getEventSlug(event)) ?? recentEvents[0];
	const bootstrapTrader = recentLeaderboard.find((entry) => getLeaderboardTraderAddress(entry)) ?? recentLeaderboard[0];

	const conditionId = isNonEmptyString(bootstrapMarket?.condition_id)
		? bootstrapMarket.condition_id
		: null;
	const positionId = getMarketPositionId(bootstrapMarket);
	const eventSlug = (isNonEmptyString(bootstrapMarket?.event_slug) ? bootstrapMarket.event_slug : null)
		?? getEventSlug(bootstrapEvent);
	const traderAddress = getLeaderboardTraderAddress(bootstrapTrader);

	if (!conditionId || !positionId || !eventSlug || !traderAddress) {
		throw new Error(JSON.stringify({
			conditionId,
			positionId,
			eventSlug,
			traderAddress,
			recentMarketsFetched: recentMarkets.length,
			recentEventsFetched: recentEvents.length,
			recentLeaderboardEntriesFetched: recentLeaderboard.length,
		}, null, 2));
	}

	return {
		conditionId,
		positionId,
		eventSlug,
		traderAddress,
		walletAddress: traderAddress,
		assetSymbol: "BTC",
		assetWindowTimeframe: "5m",
		recentMarketsFetched: recentMarkets.length,
		recentEventsFetched: recentEvents.length,
		recentLeaderboardEntriesFetched: recentLeaderboard.length,
	};
}

function recordEvent(
	diagnostics: LiveDiagnostics,
	eventType: string,
	sample: Record<string, unknown> | null = null,
): void {
	const now = toIso(Date.now());
	const existing = diagnostics.events[eventType];

	diagnostics.totalEventCount += 1;
	diagnostics.firstEventType ??= eventType;
	diagnostics.firstEventAt ??= now;
	diagnostics.lastEventType = eventType;
	diagnostics.lastEventAt = now;

	if (existing) {
		existing.count += 1;
		existing.lastSeenAt = now;
		existing.sample = sample ?? existing.sample;
		return;
	}

	diagnostics.events[eventType] = {
		count: 1,
		firstSeenAt: now,
		lastSeenAt: now,
		sample,
	};
}

function getEventCount(diagnostics: LiveDiagnostics, eventType: string): number {
	return diagnostics.events[eventType]?.count ?? 0;
}

function expectStringArrayField(sample: EventSample, field: string): void {
	expect(isStringArray(sample[field])).toBe(true);
}

function expectOptionalStringField(sample: EventSample, field: string): void {
	const value = sample[field];
	expect(value === null || value === undefined || isNonEmptyString(value)).toBe(true);
}

function expectOptionalBooleanField(sample: EventSample, field: string): void {
	const value = sample[field];
	expect(value === null || value === undefined || isBoolean(value)).toBe(true);
}

function expectStringField(sample: EventSample, field: string): void {
	expect(isNonEmptyString(sample[field])).toBe(true);
}

function expectNumberField(sample: EventSample, field: string): void {
	expect(isNumber(sample[field])).toBe(true);
}

function assertAckShapes(
	diagnostics: LiveDiagnostics,
	bootstrap: BootstrapData,
): void {
	const tradesAck = diagnostics.subscriptionAcks.polymarket_trades as EventSample | undefined;
	expect(tradesAck).toBeDefined();
	expectStringArrayField(tradesAck!, "condition_ids");
	expect((tradesAck!.condition_ids as string[])).toContain(bootstrap.conditionId);
	expectStringArrayField(tradesAck!, "market_slugs");
	expectStringArrayField(tradesAck!, "event_slugs");
	expectStringArrayField(tradesAck!, "position_ids");
	expectStringArrayField(tradesAck!, "traders");
	expectStringArrayField(tradesAck!, "trade_types");
	expectStringArrayField(tradesAck!, "rejected");

	const assetPricesAck = diagnostics.subscriptionAcks.polymarket_asset_prices as EventSample | undefined;
	expect(assetPricesAck).toBeDefined();
	expectStringArrayField(assetPricesAck!, "asset_symbols");
	expect(assetPricesAck!.asset_symbols).toEqual([bootstrap.assetSymbol]);

	const assetWindowAck = diagnostics.subscriptionAcks.polymarket_asset_window_updates as EventSample | undefined;
	expect(assetWindowAck).toBeDefined();
	expectStringArrayField(assetWindowAck!, "asset_symbols");
	expectStringArrayField(assetWindowAck!, "timeframes");
	expect(assetWindowAck!.asset_symbols).toEqual([bootstrap.assetSymbol]);
	expect(assetWindowAck!.timeframes).toEqual([bootstrap.assetWindowTimeframe]);

	const marketMetricsAck = diagnostics.subscriptionAcks.polymarket_market_metrics as EventSample | undefined;
	expect(marketMetricsAck).toBeDefined();
	expectStringArrayField(marketMetricsAck!, "condition_ids");
	expect((marketMetricsAck!.condition_ids as string[])).toContain(bootstrap.conditionId);
	expectStringArrayField(marketMetricsAck!, "rejected");

	const eventMetricsAck = diagnostics.subscriptionAcks.polymarket_event_metrics as EventSample | undefined;
	expect(eventMetricsAck).toBeDefined();
	expectStringArrayField(eventMetricsAck!, "event_slugs");
	expect((eventMetricsAck!.event_slugs as string[])).toContain(bootstrap.eventSlug);
	expectStringArrayField(eventMetricsAck!, "rejected");

	const positionMetricsAck = diagnostics.subscriptionAcks.polymarket_position_metrics as EventSample | undefined;
	expect(positionMetricsAck).toBeDefined();
	expectStringArrayField(positionMetricsAck!, "position_ids");
	expect((positionMetricsAck!.position_ids as string[])).toContain(bootstrap.positionId);
	expectStringArrayField(positionMetricsAck!, "rejected");

	const traderPnlAck = diagnostics.subscriptionAcks.polymarket_trader_pnl as EventSample | undefined;
	expect(traderPnlAck).toBeDefined();
	expectStringArrayField(traderPnlAck!, "traders");
	expect((traderPnlAck!.traders as string[])).toContain(bootstrap.traderAddress);
	expectStringArrayField(traderPnlAck!, "rejected");

	const traderPositionsAck = diagnostics.subscriptionAcks.polymarket_trader_positions as EventSample | undefined;
	expect(traderPositionsAck).toBeDefined();
	expectStringArrayField(traderPositionsAck!, "traders");
	expect((traderPositionsAck!.traders as string[])).toContain(bootstrap.traderAddress);
	expectStringArrayField(traderPositionsAck!, "rejected");

	const accountsAck = diagnostics.subscriptionAcks.polymarket_accounts as EventSample | undefined;
	expect(accountsAck).toBeDefined();
	expectStringArrayField(accountsAck!, "wallets");
	expect((accountsAck!.wallets as string[])).toContain(bootstrap.walletAddress);
	expectStringArrayField(accountsAck!, "rejected");
	expect(accountsAck!.include_usdce).toBe(true);
	expect(accountsAck!.include_matic).toBe(true);

	const orderBookAck = diagnostics.subscriptionAcks.polymarket_order_book as EventSample | undefined;
	expect(orderBookAck).toBeDefined();
	expectStringArrayField(orderBookAck!, "condition_ids");
	expectStringArrayField(orderBookAck!, "position_ids");
	expectStringArrayField(orderBookAck!, "rejected");
	expect((orderBookAck!.condition_ids as string[])).toContain(bootstrap.conditionId);

	const clobRewardsAck = diagnostics.subscriptionAcks.polymarket_clob_rewards as EventSample | undefined;
	expect(clobRewardsAck).toBeDefined();
	expectStringArrayField(clobRewardsAck!, "condition_ids");
	expect((clobRewardsAck!.condition_ids as string[])).toContain(bootstrap.conditionId);
	expectStringArrayField(clobRewardsAck!, "rejected");
}

function assertObservedEventSample(eventType: string, sample: EventSample | null): void {
	expect(sample).not.toBeNull();
	if (!sample) return;

	switch (eventType) {
		case "trade_stream_update":
			expectStringField(sample, "trade_type");
			expectOptionalStringField(sample, "condition_id");
			expectOptionalStringField(sample, "event_slug");
			expectOptionalStringField(sample, "position_id");
			return;
		case "asset_price_tick":
			expectStringField(sample, "symbol");
			expectNumberField(sample, "price");
			return;
		case "asset_price_window_update":
		case "asset_window_update":
			expectStringField(sample, "symbol");
			expectStringField(sample, "variant");
			expectStringField(sample, "update_type");
			return;
		case "market_metrics_update":
			expectStringField(sample, "condition_id");
			expectStringField(sample, "timeframe");
			return;
		case "event_metrics_update":
			expectStringField(sample, "event_slug");
			expectStringField(sample, "timeframe");
			return;
		case "position_metrics_update":
			expectStringField(sample, "condition_id");
			expectStringField(sample, "position_id");
			expectStringField(sample, "timeframe");
			return;
		case "trader_global_pnl_update":
			expectStringField(sample, "trader");
			expectOptionalStringField(sample, "timeframe");
			return;
		case "trader_market_pnl_update":
			expectStringField(sample, "trader");
			expectStringField(sample, "condition_id");
			expectOptionalStringField(sample, "timeframe");
			return;
		case "trader_event_pnl_update":
			expectStringField(sample, "trader");
			expectStringField(sample, "event_slug");
			expectOptionalStringField(sample, "timeframe");
			return;
		case "trader_position_update":
			expectStringField(sample, "trader");
			expectOptionalStringField(sample, "position_id");
			expectOptionalStringField(sample, "condition_id");
			return;
		case "accounts_update":
			expectStringField(sample, "wallet");
			expectStringField(sample, "position_id");
			expectOptionalStringField(sample, "condition_id");
			return;
		case "usdce_update":
		case "matic_update":
			expectStringField(sample, "address");
			expectOptionalStringField(sample, "balance");
			return;
		case "order_book_update":
			expectStringField(sample, "asset_id");
			expectStringField(sample, "market");
			expectStringField(sample, "hash");
			return;
		case "clob_rewards_update":
			expectOptionalStringField(sample, "condition_id");
			expectOptionalStringField(sample, "event_type");
			return;
		default:
			throw new Error(`Unhandled live event sample assertion for ${eventType}`);
	}
}

function assertObservedEventSamples(diagnostics: LiveDiagnostics): void {
	for (const [eventType, diagnostic] of Object.entries(diagnostics.events)) {
		assertObservedEventSample(eventType, diagnostic.sample);
	}
}

async function waitForCondition(
	diagnostics: LiveDiagnostics,
	getTerminalError: () => Error | null,
	predicate: () => boolean,
	timeoutMs: number,
	failureMessage: string,
): Promise<void> {
	const deadline = Date.now() + timeoutMs;
	while (!predicate() && Date.now() < deadline) {
		const currentTerminalError = getTerminalError();
		if (currentTerminalError) {
			throw createFailure(currentTerminalError.message, diagnostics);
		}

		await sleep(Math.max(1, Math.min(POLL_INTERVAL_MS, deadline - Date.now())));
	}

	if (!predicate()) {
		throw createFailure(failureMessage, diagnostics);
	}
}

async function subscribeAllRooms(
	ws: StructWebSocket,
	diagnostics: LiveDiagnostics,
	bootstrap: BootstrapData,
): Promise<void> {
	const subscribe = async (room: WsRoomId, action: () => Promise<unknown>): Promise<void> => {
		diagnostics.subscriptionAttempts.push(room);
		try {
			diagnostics.subscriptionAcks[room] = await action();
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			diagnostics.subscriptionFailures[room] = message;
		}
	};

	await Promise.all([
		subscribe("polymarket_trades", () => ws.subscribe("polymarket_trades", {
			condition_ids: [bootstrap.conditionId],
		})),
		subscribe("polymarket_asset_prices", () => ws.subscribe("polymarket_asset_prices", {
			asset_symbols: [bootstrap.assetSymbol],
		})),
		subscribe("polymarket_asset_window_updates", () => ws.subscribe("polymarket_asset_window_updates", {
			asset_symbols: [bootstrap.assetSymbol],
			timeframes: [bootstrap.assetWindowTimeframe],
		})),
		subscribe("polymarket_market_metrics", () => ws.subscribe("polymarket_market_metrics", {
			condition_ids: [bootstrap.conditionId],
		})),
		subscribe("polymarket_event_metrics", () => ws.subscribe("polymarket_event_metrics", {
			event_slugs: [bootstrap.eventSlug],
		})),
		subscribe("polymarket_position_metrics", () => ws.subscribe("polymarket_position_metrics", {
			position_ids: [bootstrap.positionId],
		})),
		subscribe("polymarket_trader_pnl", () => ws.subscribe("polymarket_trader_pnl", {
			traders: [bootstrap.traderAddress],
		})),
		subscribe("polymarket_trader_positions", () => ws.subscribe("polymarket_trader_positions", {
			traders: [bootstrap.traderAddress],
		})),
		subscribe("polymarket_accounts", () => ws.subscribe("polymarket_accounts", {
			wallets: [bootstrap.walletAddress],
			include_usdce: true,
			include_matic: true,
		})),
		subscribe("polymarket_order_book", () => ws.subscribe("polymarket_order_book", {
			condition_ids: [bootstrap.conditionId],
		})),
		subscribe("polymarket_clob_rewards", () => ws.subscribe("polymarket_clob_rewards", {
			condition_ids: [bootstrap.conditionId],
		})),
	]);
}

describe.skipIf(!API_KEY || !RUN_WS_LIVE_TESTS)("StructWebSocket live websocket", () => {
	test("bootstraps live ids and subscribes across websocket rooms for the soak window", async () => {
		const diagnostics = createDiagnostics();
		const client = new StructClient({ apiKey: API_KEY });
		const ws = new StructWebSocket({ apiKey: API_KEY, subscribeTimeout: LIVE_SUBSCRIBE_TIMEOUT_MS });
		let terminalError: Error | null = null;
		const getTerminalError = (): Error | null => terminalError;

		const captureTerminalError = (error: Error) => {
			diagnostics.errors.push(error.message);
			terminalError ??= error;
		};

		const disposers = [
			ws.on("connected", () => {
				diagnostics.connectCount += 1;
				diagnostics.firstConnectedAt ??= toIso(Date.now());
			}),
			ws.on("disconnected", ({ code, reason }) => {
				diagnostics.disconnects.push({ code, reason, at: toIso(Date.now()) });
			}),
			ws.on("reconnecting", ({ attempt }) => {
				diagnostics.reconnectAttempts.push(attempt);
			}),
			ws.on("reconnect_failed", (error) => {
				captureTerminalError(error);
			}),
			ws.on("auth_failed", (error) => {
				captureTerminalError(error);
			}),
			ws.on("error", (error) => {
				captureTerminalError(error);
			}),
			ws.on("warning", (warning) => {
				diagnostics.warnings.push(warning.message);
			}),
			ws.on("trade_stream_update", (event) => {
				recordEvent(diagnostics, "trade_stream_update", {
					trade_type: event.trade_type,
					condition_id: "condition_id" in event ? event.condition_id ?? null : null,
					event_slug: "event_slug" in event ? event.event_slug ?? null : null,
					position_id: "position_id" in event ? event.position_id ?? null : null,
				});
			}),
			ws.on("asset_price_tick", (event) => {
				recordEvent(diagnostics, "asset_price_tick", {
					symbol: event.symbol,
					price: event.price,
				});
			}),
			ws.on("asset_price_window_update", (event) => {
				recordEvent(diagnostics, "asset_price_window_update", {
					symbol: event.symbol,
					variant: event.variant,
					update_type: event.update_type,
				});
			}),
			ws.on("asset_window_update", (event) => {
				recordEvent(diagnostics, "asset_window_update", {
					symbol: event.symbol,
					variant: event.variant,
					update_type: event.update_type,
				});
			}),
			ws.on("market_metrics_update", (event) => {
				recordEvent(diagnostics, "market_metrics_update", {
					condition_id: event.condition_id,
					timeframe: event.timeframe,
				});
			}),
			ws.on("event_metrics_update", (event) => {
				recordEvent(diagnostics, "event_metrics_update", {
					event_slug: event.event_slug,
					timeframe: event.timeframe,
				});
			}),
			ws.on("position_metrics_update", (event) => {
				recordEvent(diagnostics, "position_metrics_update", {
					condition_id: event.condition_id,
					position_id: event.position_id,
					timeframe: event.timeframe,
				});
			}),
			ws.on("trader_global_pnl_batch", (event) => {
				recordEvent(diagnostics, "trader_global_pnl_batch", {
					block: event.block,
					count: event.data.length,
					timeframe: event.timeframe ?? null,
				});
			}),
			ws.on("trader_market_pnl_batch", (event) => {
				recordEvent(diagnostics, "trader_market_pnl_batch", {
					block: event.block,
					count: event.data.length,
					timeframe: event.timeframe ?? null,
				});
			}),
			ws.on("trader_category_pnl_batch", (event) => {
				recordEvent(diagnostics, "trader_category_pnl_batch", {
					block: event.block,
					count: event.data.length,
					timeframe: event.timeframe ?? null,
				});
			}),
			ws.on("trader_position_batch", (event) => {
				recordEvent(diagnostics, "trader_position_batch", {
					block: event.block,
					count: event.data.length,
				});
			}),
			ws.on("accounts_update", (event) => {
				recordEvent(diagnostics, "accounts_update", {
					wallet: event.wallet,
					position_id: event.position_id,
					condition_id: event.condition_id ?? null,
				});
			}),
			ws.on("usdce_update", (event) => {
				recordEvent(diagnostics, "usdce_update", {
					address: event.address,
					balance: event.balance ?? null,
				});
			}),
			ws.on("matic_update", (event) => {
				recordEvent(diagnostics, "matic_update", {
					address: event.address,
					balance: event.balance ?? null,
				});
			}),
			ws.on("order_book_update", (event) => {
				recordEvent(diagnostics, "order_book_update", {
					asset_id: event.asset_id,
					market: event.market,
					hash: event.hash,
				});
			}),
			ws.on("clob_rewards_update", (event) => {
				recordEvent(diagnostics, "clob_rewards_update", {
					condition_id: event.condition_id ?? null,
					event_type: event.event_type ?? null,
				});
			}),
		];

		try {
			diagnostics.bootstrap = await bootstrapLiveData(client);

			await ws.connect();
			await subscribeAllRooms(ws, diagnostics, diagnostics.bootstrap);

			await waitForCondition(
				diagnostics,
				getTerminalError,
				() => getEventCount(diagnostics, "asset_price_tick") > 0,
				firstEventTimeoutMs,
				`No asset_price_tick event received within ${firstEventTimeoutMs}ms after subscribing`,
			);

			const soakDeadline = Date.now() + soakDurationMs;
			while (Date.now() < soakDeadline) {
				const currentTerminalError = getTerminalError();
				if (currentTerminalError) {
					throw createFailure(currentTerminalError.message, diagnostics);
				}

				await sleep(Math.max(1, Math.min(POLL_INTERVAL_MS, soakDeadline - Date.now())));
			}

			const currentTerminalError = getTerminalError();
			if (currentTerminalError) {
				throw createFailure(currentTerminalError.message, diagnostics);
			}

			const marketSignalCount = MARKET_SIGNAL_EVENTS.reduce(
				(total, eventName) => total + getEventCount(diagnostics, eventName),
				0,
			);

			expect(diagnostics.bootstrap).not.toBeNull();
			expect(diagnostics.connectCount).toBeGreaterThan(0);
			expect(diagnostics.subscriptionAttempts).toEqual(EXPECTED_ROOMS);
			expect(Object.keys(diagnostics.subscriptionFailures)).toEqual([]);
			expect(Object.keys(diagnostics.subscriptionAcks).sort()).toEqual([...EXPECTED_ROOMS].sort());
			assertAckShapes(diagnostics, diagnostics.bootstrap);
			expect(getEventCount(diagnostics, "asset_price_tick")).toBeGreaterThan(0);
			expect(marketSignalCount).toBeGreaterThan(0);
			assertObservedEventSamples(diagnostics);
		} catch (error) {
			throw createFailure(error instanceof Error ? error.message : String(error), diagnostics);
		} finally {
			for (const dispose of disposers) {
				dispose();
			}
			ws.disconnect();
		}
	});
});

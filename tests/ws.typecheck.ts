import { StructWebSocket } from "../src/index.js";
import type {
	AccountsSubscribeResponse,
	AccountsUpdateEvent,
	AssetPriceTickEvent,
	AssetPricesSubscribeResponse,
	Event,
	EventMetricsEvent,
	EventMetricsSubscribeResponse,
	EventsStreamUpdateRows,
	MarketMetricsEvent,
	MarketMetricsSubscribeResponse,
	MarketResponse,
	MarketsStreamUpdateRows,
	OrderBookUpdateEvent,
	OrderBookSubscribeResponse,
	PositionMetricsSubscribeResponse,
	TradesStreamSubscribeResponse,
	TraderPnlSubscribeResponse,
	TraderPositionsSubscribeResponse,
	TradeStreamEvent,
	WsSubscribeResponseMap,
} from "../src/index.js";

type Assert<T extends true> = T;
type Equal<Left, Right> =
	(<T>() => T extends Left ? 1 : 2) extends
	(<T>() => T extends Right ? 1 : 2)
		? true
		: false;

declare const ws: StructWebSocket;

const tradesSubscription = ws.subscribe("polymarket_trades");
const assetPricesSubscription = ws.subscribe("polymarket_asset_prices", {
	asset_symbols: ["BTC"],
});
const marketMetricsSubscription = ws.subscribe("polymarket_market_metrics", {
	condition_ids: ["0xabc123"],
});
const eventMetricsSubscription = ws.subscribe("polymarket_event_metrics", {
	event_slugs: ["event-slug"],
});
const positionMetricsSubscription = ws.subscribe("polymarket_position_metrics", {
	position_ids: ["123"],
});
const traderPnlSubscription = ws.subscribe("polymarket_trader_pnl", {
	traders: ["0xabc123"],
});
const traderPositionsSubscription = ws.subscribe("polymarket_trader_positions", {
	traders: ["0xabc123"],
});
const accountsSubscription = ws.subscribe("polymarket_accounts", {
	wallets: ["0xabc123"],
	include_usdce: true,
	include_matic: true,
});
const orderBookSubscription = ws.subscribe("polymarket_order_book", {
	condition_ids: ["0xabc123"],
});

type TradesSubscriptionPromise = typeof tradesSubscription;
type AssetPricesSubscriptionPromise = typeof assetPricesSubscription;
type MarketMetricsSubscriptionPromise = typeof marketMetricsSubscription;
type EventMetricsSubscriptionPromise = typeof eventMetricsSubscription;
type PositionMetricsSubscriptionPromise = typeof positionMetricsSubscription;
type TraderPnlSubscriptionPromise = typeof traderPnlSubscription;
type TraderPositionsSubscriptionPromise = typeof traderPositionsSubscription;
type AccountsSubscriptionPromise = typeof accountsSubscription;
type OrderBookSubscriptionPromise = typeof orderBookSubscription;

type TradesSubscriptionAssert = Assert<
	Equal<TradesSubscriptionPromise, Promise<TradesStreamSubscribeResponse>>
>;
type TradesMapAssert = Assert<
	Equal<Awaited<TradesSubscriptionPromise>, WsSubscribeResponseMap["polymarket_trades"]>
>;

type AssetPricesSubscriptionAssert = Assert<
	Equal<AssetPricesSubscriptionPromise, Promise<AssetPricesSubscribeResponse>>
>;
type AssetPricesMapAssert = Assert<
	Equal<Awaited<AssetPricesSubscriptionPromise>, WsSubscribeResponseMap["polymarket_asset_prices"]>
>;

type MarketMetricsSubscriptionAssert = Assert<
	Equal<MarketMetricsSubscriptionPromise, Promise<MarketMetricsSubscribeResponse>>
>;
type MarketMetricsMapAssert = Assert<
	Equal<Awaited<MarketMetricsSubscriptionPromise>, WsSubscribeResponseMap["polymarket_market_metrics"]>
>;

type EventMetricsSubscriptionAssert = Assert<
	Equal<EventMetricsSubscriptionPromise, Promise<EventMetricsSubscribeResponse>>
>;
type EventMetricsMapAssert = Assert<
	Equal<Awaited<EventMetricsSubscriptionPromise>, WsSubscribeResponseMap["polymarket_event_metrics"]>
>;

type PositionMetricsSubscriptionAssert = Assert<
	Equal<PositionMetricsSubscriptionPromise, Promise<PositionMetricsSubscribeResponse>>
>;
type PositionMetricsMapAssert = Assert<
	Equal<Awaited<PositionMetricsSubscriptionPromise>, WsSubscribeResponseMap["polymarket_position_metrics"]>
>;

type TraderPnlSubscriptionAssert = Assert<
	Equal<TraderPnlSubscriptionPromise, Promise<TraderPnlSubscribeResponse>>
>;
type TraderPnlMapAssert = Assert<
	Equal<Awaited<TraderPnlSubscriptionPromise>, WsSubscribeResponseMap["polymarket_trader_pnl"]>
>;

type TraderPositionsSubscriptionAssert = Assert<
	Equal<TraderPositionsSubscriptionPromise, Promise<TraderPositionsSubscribeResponse>>
>;
type TraderPositionsMapAssert = Assert<
	Equal<Awaited<TraderPositionsSubscriptionPromise>, WsSubscribeResponseMap["polymarket_trader_positions"]>
>;

type AccountsSubscriptionAssert = Assert<
	Equal<AccountsSubscriptionPromise, Promise<AccountsSubscribeResponse>>
>;
type AccountsMapAssert = Assert<
	Equal<Awaited<AccountsSubscriptionPromise>, WsSubscribeResponseMap["polymarket_accounts"]>
>;

type OrderBookSubscriptionAssert = Assert<
	Equal<OrderBookSubscriptionPromise, Promise<OrderBookSubscribeResponse>>
>;
type OrderBookMapAssert = Assert<
	Equal<Awaited<OrderBookSubscriptionPromise>, WsSubscribeResponseMap["polymarket_order_book"]>
>;

const tradeDisposer = ws.on("trade_stream_update", (event) => {
	const tradeEvent: TradeStreamEvent = event;
	const tradeType: TradeStreamEvent["trade_type"] = event.trade_type;
	const hash: string = event.hash;
	void tradeEvent;
	void tradeType;
	void hash;

	// @ts-expect-error trade_stream_update payloads do not expose order book arrays
	event.bids;
});

const assetPriceDisposer = ws.on("asset_price_tick", (event) => {
	const tickEvent: AssetPriceTickEvent = event;
	const symbol: string = event.symbol;
	const price: number = event.price;
	void tickEvent;
	void symbol;
	void price;

	// @ts-expect-error asset_price_tick payloads do not expose order book hashes
	event.hash;
});

const marketMetricsDisposer = ws.on("market_metrics_update", (event) => {
	const metricsEvent: MarketMetricsEvent = event;
	const conditionId: string = event.condition_id;
	const timeframe: string = event.timeframe;
	void metricsEvent;
	void conditionId;
	void timeframe;

	// @ts-expect-error market metrics events do not expose account wallet fields
	event.wallet;
});

const eventMetricsDisposer = ws.on("event_metrics_update", (event) => {
	const metricsEvent: EventMetricsEvent = event;
	const eventSlug: string = event.event_slug;
	const timeframe: string = event.timeframe;
	void metricsEvent;
	void eventSlug;
	void timeframe;

	// @ts-expect-error event metrics events do not expose order book hashes
	event.hash;
});

const accountsDisposer = ws.on("accounts_update", (event) => {
	const accountEvent: AccountsUpdateEvent = event;
	const wallet: string = event.wallet;
	const positionId: string = event.position_id;
	void accountEvent;
	void wallet;
	void positionId;

	// @ts-expect-error account updates do not expose trade event discriminators
	event.trade_type;
});

const orderBookDisposer = ws.on("order_book_update", (event) => {
	const bookEvent: OrderBookUpdateEvent = event;
	const bids = event.bids;
	const asks = event.asks;
	const assetId: string = event.asset_id;
	void bookEvent;
	void bids;
	void asks;
	void assetId;

	// @ts-expect-error order_book_update payloads do not expose price tick symbols directly
	event.symbol;
});

const eventsStreamDisposer = ws.on("events_stream_update", (event) => {
	const rows: EventsStreamUpdateRows = event;
	const firstId: string | undefined = event[0]?.id;
	const eventRows: Event[] = event;
	const count: number = event.length;
	void rows;
	void firstId;
	void eventRows;
	void count;

	// @ts-expect-error events_stream_update payloads are the rows array, not the wire envelope
	event.data;
});

const marketsStreamDisposer = ws.on("markets_stream_update", (event) => {
	const rows: MarketsStreamUpdateRows = event;
	const firstConditionId: string | undefined = event[0]?.condition_id;
	const marketRows: MarketResponse[] = event;
	const count: number = event.length;
	void rows;
	void firstConditionId;
	void marketRows;
	void count;

	// @ts-expect-error markets_stream_update payloads are the rows array, not the wire envelope
	event.data;
});

void tradeDisposer;
void assetPriceDisposer;
void marketMetricsDisposer;
void eventMetricsDisposer;
void accountsDisposer;
void orderBookDisposer;
void eventsStreamDisposer;
void marketsStreamDisposer;

// @ts-expect-error polymarket_order_book requires at least one filter object
ws.subscribe("polymarket_order_book");

// @ts-expect-error polymarket_asset_prices does not accept order book filters
ws.subscribe("polymarket_asset_prices", { condition_ids: ["0xabc123"] });

// @ts-expect-error trade_stream_update is the runtime event name, not the room ID
ws.on("polymarket_trades", () => {});

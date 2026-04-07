import { WebSocketTransport } from "./ws-transport.js";
import type {
	ConnectionState,
	StructWebSocketConfig,
	WebSocketEventMap,
	WebSocketMessage,
	WebSocketServerMessage,
} from "./types/ws.js";
import type { Address } from "./types/common.js";

const DEFAULT_BASE_URL = "https://api.struct.to/v1";

type Listener<T> = (payload: T) => void;

export class StructWebSocket {
	private readonly transport: WebSocketTransport;
	private readonly listeners = new Map<string, Set<Function>>();
	private readonly activeMarkets = new Set<string>();
	private readonly activeMarketPositions = new Set<string>();
	private readonly activeWallets = new Set<string>();
	private readonly activeConditions = new Set<string>();
	private readonly activeSpecialRooms = new Set<string>();

	constructor(config: StructWebSocketConfig) {
		const httpBase = (config.baseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/, "");
		const wsBase = httpBase.replace(/^https:\/\//, "wss://").replace(/^http:\/\//, "ws://");
		const url = config.jwt
			? `${wsBase}?api-key=${encodeURIComponent(config.apiKey)}&token=${encodeURIComponent(config.jwt)}`
			: `${wsBase}?token=${encodeURIComponent(config.apiKey)}`;

		this.transport = new WebSocketTransport(
			url,
			config.reconnect ?? {},
			{
				onOpen: () => this.handleOpen(),
				onClose: (code, reason) => this.handleClose(code, reason),
				onError: (error) => this.emit("error", error),
				onMessage: (data) => this.handleMessage(data),
				onReconnecting: (attempt) => this.emit("reconnecting", { attempt }),
			},
		);
	}

	get state(): ConnectionState {
		return this.transport.state;
	}

	connect(): void {
		this.transport.connect();
	}

	disconnect(): void {
		this.activeMarkets.clear();
		this.activeMarketPositions.clear();
		this.activeWallets.clear();
		this.activeConditions.clear();
		this.activeSpecialRooms.clear();
		this.transport.disconnect();
	}

	on<K extends keyof WebSocketEventMap>(event: K, listener: Listener<WebSocketEventMap[K]>): this {
		let set = this.listeners.get(event as string);
		if (!set) {
			set = new Set();
			this.listeners.set(event as string, set);
		}
		set.add(listener);
		return this;
	}

	off<K extends keyof WebSocketEventMap>(event: K, listener: Listener<WebSocketEventMap[K]>): this {
		this.listeners.get(event as string)?.delete(listener);
		return this;
	}

	once<K extends keyof WebSocketEventMap>(event: K, listener: Listener<WebSocketEventMap[K]>): this {
		const wrapper = (payload: WebSocketEventMap[K]) => {
			this.off(event, wrapper);
			listener(payload);
		};
		return this.on(event, wrapper);
	}

	subscribeMarket(conditionId: string): void {
		if (this.activeMarkets.has(conditionId)) return;
		this.activeMarkets.add(conditionId);
		const msg = this.marketSubscribeMessage(conditionId);
		this.transport.addReplayMessage(msg);
		this.transport.send(msg);
	}

	unsubscribeMarket(conditionId: string): void {
		if (!this.activeMarkets.has(conditionId)) return;
		this.activeMarkets.delete(conditionId);
		const msg: WebSocketMessage = {
			type: "unsubscribe_market",
			room_id: `market_${conditionId}`,
			message: {},
		};
		this.transport.removeReplayMessages(
			(m) => m.type === "subscribe_market" && m.room_id === `market_${conditionId}`,
		);
		this.transport.send(msg);
	}

	subscribeMarketByPosition(positionId: string): void {
		if (this.activeMarketPositions.has(positionId)) return;
		this.activeMarketPositions.add(positionId);
		const msg = this.marketPositionSubscribeMessage(positionId);
		this.transport.addReplayMessage(msg);
		this.transport.send(msg);
	}

	unsubscribeMarketByPosition(positionId: string): void {
		if (!this.activeMarketPositions.has(positionId)) return;
		this.activeMarketPositions.delete(positionId);
		const msg: WebSocketMessage = {
			type: "unsubscribe_market",
			room_id: `market_position_${positionId}`,
			message: {},
		};
		this.transport.removeReplayMessages(
			(m) => m.type === "subscribe_market" && m.room_id === `market_position_${positionId}`,
		);
		this.transport.send(msg);
	}

	trackWallets(addresses: Address[]): void {
		const uniqueAddresses = [...new Set(addresses)];
		const added = uniqueAddresses.filter((addr) => !this.activeWallets.has(addr));
		if (added.length === 0) return;
		for (const addr of added) this.activeWallets.add(addr);
		const msg = this.walletTrackMessage("subscribe", added);
		this.rebuildWalletReplay();
		this.transport.send(msg);
	}

	untrackWallets(addresses: Address[]): void {
		const uniqueAddresses = [...new Set(addresses)];
		const removed = uniqueAddresses.filter((addr) => this.activeWallets.has(addr));
		if (removed.length === 0) return;
		for (const addr of removed) this.activeWallets.delete(addr);
		const msg = this.walletTrackMessage("unsubscribe", removed);
		this.rebuildWalletReplay();
		this.transport.send(msg);
	}

	subscribeWhaleTrades(): void {
		this.subscribeSpecialRoom("whale_trades");
	}

	unsubscribeWhaleTrades(): void {
		this.unsubscribeSpecialRoom("whale_trades");
	}

	subscribeSmartMoneyTrades(): void {
		this.subscribeSpecialRoom("smart_money_trades");
	}

	unsubscribeSmartMoneyTrades(): void {
		this.unsubscribeSpecialRoom("smart_money_trades");
	}

	subscribeInsiderTrades(): void {
		this.subscribeSpecialRoom("insider_trades");
	}

	unsubscribeInsiderTrades(): void {
		this.unsubscribeSpecialRoom("insider_trades");
	}

	trackConditions(conditionIds: string[]): void {
		const uniqueConditionIds = [...new Set(conditionIds)];
		const added = uniqueConditionIds.filter((id) => !this.activeConditions.has(id));
		if (added.length === 0) return;
		for (const id of added) this.activeConditions.add(id);
		const msg = this.conditionsTrackMessage("subscribe", added);
		this.rebuildConditionsReplay();
		this.transport.send(msg);
	}

	untrackConditions(conditionIds: string[]): void {
		const uniqueConditionIds = [...new Set(conditionIds)];
		const removed = uniqueConditionIds.filter((id) => this.activeConditions.has(id));
		if (removed.length === 0) return;
		for (const id of removed) this.activeConditions.delete(id);
		const msg = this.conditionsTrackMessage("unsubscribe", removed);
		this.rebuildConditionsReplay();
		this.transport.send(msg);
	}

	private handleOpen(): void {
		this.emit("connected", undefined as never);
	}

	private handleClose(code: number, reason: string): void {
		this.emit("disconnected", { code, reason });
	}

	private handleMessage(raw: unknown): void {
		const msg = raw as WebSocketServerMessage;
		if (!msg || typeof msg !== "object") return;

		const roomId = msg.room_id ?? "";
		const type = msg.type;

		if (type === "market_trade" || roomId.startsWith("market_")) {
			this.emit("market_trade", msg.data as never);
		} else if (type === "whale_trade" || roomId === "whale_trades") {
			this.emit("whale_trade", msg.data as never);
		} else if (type === "smart_money_trade" || roomId === "smart_money_trades") {
			this.emit("smart_money_trade", msg.data as never);
		} else if (type === "insider_trade" || roomId === "insider_trades") {
			this.emit("insider_trade", msg.data as never);
		} else if (type === "wallet_tracking_alert") {
			this.emit("wallet_tracking_alert", msg.data as never);
		} else if (type === "conditions_tracking_alert") {
			this.emit("conditions_tracking_alert", msg.data as never);
		}
	}

	private emit<K extends keyof WebSocketEventMap>(event: K, payload: WebSocketEventMap[K]): void {
		const set = this.listeners.get(event as string);
		if (!set) return;
		for (const fn of set) {
			try {
				(fn as Listener<WebSocketEventMap[K]>)(payload);
			} catch {}
		}
	}

	private marketSubscribeMessage(conditionId: string): WebSocketMessage {
		return { type: "subscribe_market", room_id: `market_${conditionId}`, message: {} };
	}

	private marketPositionSubscribeMessage(positionId: string): WebSocketMessage {
		return { type: "subscribe_market", room_id: `market_position_${positionId}`, message: {} };
	}

	private walletTrackMessage(action: string, addresses: Address[]): WebSocketMessage {
		return { type: "wallet_tracking", action, wallet_addresses: addresses };
	}

	private conditionsTrackMessage(action: string, conditionIds: string[]): WebSocketMessage {
		return { type: "conditions_tracking", action, condition_ids: conditionIds };
	}

	private subscribeSpecialRoom(roomId: string): void {
		if (this.activeSpecialRooms.has(roomId)) return;
		this.activeSpecialRooms.add(roomId);
		const msg: WebSocketMessage = { type: "subscribe_market", room_id: roomId, message: {} };
		this.transport.addReplayMessage(msg);
		this.transport.send(msg);
	}

	private unsubscribeSpecialRoom(roomId: string): void {
		if (!this.activeSpecialRooms.has(roomId)) return;
		this.activeSpecialRooms.delete(roomId);
		const msg: WebSocketMessage = { type: "unsubscribe_market", room_id: roomId, message: {} };
		this.transport.removeReplayMessages(
			(m) => m.type === "subscribe_market" && m.room_id === roomId,
		);
		this.transport.send(msg);
	}

	private rebuildWalletReplay(): void {
		this.transport.removeReplayMessages((m) => m.type === "wallet_tracking");
		if (this.activeWallets.size > 0) {
			this.transport.addReplayMessage(
				this.walletTrackMessage("subscribe", [...this.activeWallets]),
			);
		}
	}

	private rebuildConditionsReplay(): void {
		this.transport.removeReplayMessages((m) => m.type === "conditions_tracking");
		if (this.activeConditions.size > 0) {
			this.transport.addReplayMessage(
				this.conditionsTrackMessage("subscribe", [...this.activeConditions]),
			);
		}
	}
}

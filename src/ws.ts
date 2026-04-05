import { WebSocketTransport } from "./ws-transport.js";
import { WebSocketError } from "./errors.js";
import type {
	ConnectionState,
	StructWebSocketConfig,
	WebSocketEventMap,
	WsRoomId,
	WsFiltersOptionalRoom,
	WsFiltersRequiredRoom,
	WsSubscriptionMap,
	WsSubscribeResponseMap,
	WsAlertSubscribedResponse,
} from "./types/ws.js";
import type { WsAlertSubscribeMap, WsAlertEventName } from "./types/ws-helpers.js";

const DEFAULT_WS_URL = "wss://api.struct.to/ws";
const PING_INTERVAL_MS = 30_000;
const DEFAULT_SUBSCRIBE_TIMEOUT_MS = 10_000;

type Listener<T> = (payload: T) => void;

interface PendingSubscribe {
	resolve: (data: unknown) => void;
	reject: (err: Error) => void;
	timer: ReturnType<typeof setTimeout>;
}

export class StructWebSocket {
	private readonly transport: WebSocketTransport;
	private readonly listeners = new Map<string, Set<Function>>();
	private readonly subscriptions = new Map<WsRoomId, Record<string, unknown>>();
	private readonly pendingSubscribes = new Map<WsRoomId, PendingSubscribe>();
	private readonly subscribeTimeout: number;
	private pingTimer: ReturnType<typeof setInterval> | null = null;

	constructor(config: StructWebSocketConfig) {
		this.subscribeTimeout = config.subscribeTimeout ?? DEFAULT_SUBSCRIBE_TIMEOUT_MS;
		const wsUrl = (config.wsUrl ?? DEFAULT_WS_URL).replace(/\/+$/, "");
		const url = `${wsUrl}?api-key=${encodeURIComponent(config.apiKey)}`;

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

	connect(): Promise<void> {
		return this.transport.connect();
	}

	disconnect(): void {
		this.stopPing();
		for (const [, pending] of this.pendingSubscribes) {
			clearTimeout(pending.timer);
			pending.reject(new WebSocketError("Disconnected"));
		}
		this.pendingSubscribes.clear();
		this.subscriptions.clear();
		this.transport.disconnect();
	}

	on<K extends keyof WebSocketEventMap>(event: K, listener: Listener<WebSocketEventMap[K]>): () => void {
		let set = this.listeners.get(event as string);
		if (!set) {
			set = new Set();
			this.listeners.set(event as string, set);
		}
		set.add(listener);
		return () => { set.delete(listener); };
	}

	off<K extends keyof WebSocketEventMap>(event: K, listener: Listener<WebSocketEventMap[K]>): void {
		this.listeners.get(event as string)?.delete(listener);
	}

	once<K extends keyof WebSocketEventMap>(event: K, listener: Listener<WebSocketEventMap[K]>): () => void {
		const wrapper = (payload: WebSocketEventMap[K]) => {
			this.off(event, wrapper);
			listener(payload);
		};
		return this.on(event, wrapper);
	}

	removeAllListeners(event?: keyof WebSocketEventMap): void {
		if (event) {
			this.listeners.delete(event as string);
		} else {
			this.listeners.clear();
		}
	}

	subscribe<R extends WsFiltersOptionalRoom>(room: R, filters?: WsSubscriptionMap[R]): Promise<WsSubscribeResponseMap[R]>;
	subscribe<E extends WsAlertEventName>(room: "ws_alerts", filters: { event: E } & Omit<WsAlertSubscribeMap[E], "op" | "event">): Promise<WsAlertSubscribedResponse>;
	subscribe<R extends Exclude<WsFiltersRequiredRoom, "ws_alerts">>(room: R, filters: WsSubscriptionMap[R]): Promise<WsSubscribeResponseMap[R]>;
	subscribe<R extends WsRoomId>(room: R, filters?: WsSubscriptionMap[R]): Promise<WsSubscribeResponseMap[R]> {
		const resolvedFilters = (filters ?? {}) as Record<string, unknown>;
		const isNewRoom = !this.subscriptions.has(room);
		this.subscriptions.set(room, resolvedFilters);
		this.rebuildReplay();

		if (isNewRoom) {
			this.transport.send({ type: "join_room", payload: { room_id: room } });
		}
		this.transport.send({
			type: "room_message",
			payload: { room_id: room, message: { action: "subscribe", ...resolvedFilters } },
		});

		const existing = this.pendingSubscribes.get(room);
		if (existing) {
			clearTimeout(existing.timer);
			existing.reject(new WebSocketError("Superseded by new subscription"));
		}

		return new Promise<WsSubscribeResponseMap[R]>((resolve, reject) => {
			const timer = setTimeout(() => {
				this.pendingSubscribes.delete(room);
				reject(new WebSocketError(`Subscribe to ${room} timed out`));
			}, this.subscribeTimeout);

			this.pendingSubscribes.set(room, {
				resolve: resolve as (data: unknown) => void,
				reject,
				timer,
			});
		});
	}

	unsubscribe(room: WsRoomId): void {
		if (!this.subscriptions.has(room)) return;

		const pending = this.pendingSubscribes.get(room);
		if (pending) {
			clearTimeout(pending.timer);
			pending.reject(new WebSocketError("Unsubscribed"));
			this.pendingSubscribes.delete(room);
		}

		this.transport.send({
			type: "room_message",
			payload: { room_id: room, message: { action: "unsubscribe_all" } },
		});
		this.transport.send({ type: "leave_room", payload: { room_id: room } });
		this.subscriptions.delete(room);
		this.rebuildReplay();
	}

	private rebuildReplay(): void {
		this.transport.clearReplayMessages();
		for (const [roomId, filters] of this.subscriptions) {
			this.transport.addReplayMessage({ type: "join_room", payload: { room_id: roomId } });
			this.transport.addReplayMessage({
				type: "room_message",
				payload: { room_id: roomId, message: { action: "subscribe", ...filters } },
			});
		}
	}

	private handleOpen(): void {
		this.startPing();
		this.emit("connected", undefined as never);
	}

	private handleClose(code: number, reason: string): void {
		this.stopPing();
		this.emit("disconnected", { code, reason });
	}

	private handleMessage(raw: unknown): void {
		const msg = raw as { type?: string; room_id?: string; data?: unknown };
		if (!msg || typeof msg !== "object" || !msg.type) return;
		if (msg.type === "pong") return;

		if (msg.type === "subscribed" && msg.room_id) {
			const pending = this.pendingSubscribes.get(msg.room_id as WsRoomId);
			if (pending) {
				clearTimeout(pending.timer);
				this.pendingSubscribes.delete(msg.room_id as WsRoomId);
				pending.resolve(msg.data);
			}
			return;
		}

		this.emit(msg.type as keyof WebSocketEventMap, msg.data as never);
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

	private startPing(): void {
		this.stopPing();
		this.pingTimer = setInterval(() => {
			this.transport.send({ type: "ping" });
		}, PING_INTERVAL_MS);
	}

	private stopPing(): void {
		if (this.pingTimer !== null) {
			clearInterval(this.pingTimer);
			this.pingTimer = null;
		}
	}
}

import { WebSocketTransport, buildWebSocketUrl } from "./ws-transport.js";
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
} from "./types/ws.js";

const DEFAULT_BASE_URL = "wss://api.struct.to";
const PING_INTERVAL_MS = 30_000;
const DEFAULT_SUBSCRIBE_TIMEOUT_MS = 10_000;

type Listener<T> = (payload: T) => void;

interface PendingSubscribe {
	resolve: (data: unknown) => void;
	reject: (err: Error) => void;
	timer: ReturnType<typeof setTimeout> | null;
}

export class StructWebSocket {
	private readonly transport: WebSocketTransport;
	private readonly listeners = new Map<string, Set<Listener<any>>>();
	private readonly subscriptions = new Map<WsRoomId, Record<string, unknown>>();
	private readonly pendingSubscribes = new Map<WsRoomId, PendingSubscribe>();
	private readonly subscribeTimeout: number;
	private pingTimer: ReturnType<typeof setInterval> | null = null;
	private pongTimer: ReturnType<typeof setTimeout> | null = null;
	private isEmittingListenerError = false;

	constructor(config: StructWebSocketConfig) {
		this.subscribeTimeout = config.subscribeTimeout ?? DEFAULT_SUBSCRIBE_TIMEOUT_MS;
		const getUrl = () => buildWebSocketUrl("/ws", {
			apiKey: config.apiKey,
			jwt: config.getJwt?.() ?? config.jwt,
			baseUrl: config.baseUrl,
		}, DEFAULT_BASE_URL);

		this.transport = new WebSocketTransport(
			getUrl,
			config.reconnect ?? {},
			{
				onOpen: () => this.handleOpen(),
				onClose: (code, reason) => this.handleClose(code, reason),
				onError: (error) => this.emit("error", error),
				onMessage: (data) => this.handleMessage(data),
				onReconnecting: (attempt) => this.emit("reconnecting", { attempt }),
				onReconnectFailed: (error) => this.emit("reconnect_failed", error),
				onAuthFailed: (error) => this.emit("auth_failed", error),
				onWarning: (warning) => this.emit("warning", warning),
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
			this.clearSubscribeTimer(pending);
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
	subscribe<R extends WsFiltersRequiredRoom>(room: R, filters: WsSubscriptionMap[R]): Promise<WsSubscribeResponseMap[R]>;
	subscribe<R extends WsRoomId>(room: R, filters?: WsSubscriptionMap[R]): Promise<WsSubscribeResponseMap[R]> {
		const resolvedFilters = (filters ?? {}) as Record<string, unknown>;
		const isNewRoom = !this.subscriptions.has(room);

		const existing = this.pendingSubscribes.get(room);
		if (existing) {
			this.clearSubscribeTimer(existing);
			existing.reject(new WebSocketError("Superseded by new subscription"));
		}

		this.subscriptions.set(room, resolvedFilters);
		this.rebuildReplay();

		return new Promise<WsSubscribeResponseMap[R]>((resolve, reject) => {
			const pending: PendingSubscribe = {
				resolve: resolve as (data: unknown) => void,
				reject,
				timer: null,
			};
			this.pendingSubscribes.set(room, pending);
			if (this.sendSubscription(room, resolvedFilters, isNewRoom)) {
				this.armSubscribeTimer(room, pending);
			}
		});
	}

	unsubscribe(room: WsRoomId): void {
		if (!this.subscriptions.has(room)) return;

		const pending = this.pendingSubscribes.get(room);
		if (pending) {
			this.clearSubscribeTimer(pending);
			pending.reject(new WebSocketError("Unsubscribed"));
			this.pendingSubscribes.delete(room);
		}

		this.subscriptions.delete(room);
		this.rebuildReplay();
		if (this.state === "connected") {
			this.transport.sendNow({
				type: "room_message",
				payload: { room_id: room, message: { action: "unsubscribe_all" } },
			});
			this.transport.sendNow({ type: "leave_room", payload: { room_id: room } });
		}
	}

	private rebuildReplay(): void {
		this.transport.clearReplayMessages();
		for (const [roomId, filters] of this.subscriptions) {
			this.transport.addReplayMessages([
				{ type: "join_room", payload: { room_id: roomId } },
				{
					type: "room_message",
					payload: { room_id: roomId, message: { action: "subscribe", ...filters } },
				},
			]);
		}
	}

	private handleOpen(): void {
		this.startPing();
		this.restartPendingSubscribes();
		this.emit("connected", undefined as never);
	}

	private handleClose(code: number, reason: string): void {
		this.stopPing();
		this.pausePendingSubscribes();
		this.emit("disconnected", { code, reason });
	}

	private handleMessage(raw: unknown): void {
		const msg = raw as { type?: string; room_id?: string; data?: unknown };
		if (!msg || typeof msg !== "object" || !msg.type) return;
		if (msg.type === "pong") {
			this.clearPongTimer();
			return;
		}

		if (this.isSubscribeResponseMessage(msg)) {
			const pending = this.pendingSubscribes.get(msg.room_id as WsRoomId);
			if (pending) {
				this.clearSubscribeTimer(pending);
				this.pendingSubscribes.delete(msg.room_id as WsRoomId);
				const subscribeError = this.getSubscribeError(msg.data);
				if (subscribeError) {
					const error = new WebSocketError(subscribeError);
					pending.reject(error);
					this.emit("error", error);
				} else {
					pending.resolve(msg.data);
				}
			}
			return;
		}

		this.emit(msg.type as keyof WebSocketEventMap, msg.data as never);
	}

	private isSubscribeResponseMessage(msg: { type?: string; room_id?: string; data?: unknown }): msg is { type: string; room_id: string; data?: unknown } {
		if (!msg.type || !msg.room_id) return false;
		return msg.type === "subscribed" || msg.type.endsWith("_subscribe_response");
	}

	private emit<K extends keyof WebSocketEventMap>(event: K, payload: WebSocketEventMap[K]): void {
		const set = this.listeners.get(event as string);
		if (!set) return;
		for (const fn of set) {
			try {
				(fn as Listener<WebSocketEventMap[K]>)(payload);
			} catch (error) {
				this.handleListenerError(error);
			}
		}
	}

	private startPing(): void {
		this.stopPing();
		this.pingTimer = setInterval(() => {
			if (this.transport.sendNow({ type: "ping" })) {
				this.armPongTimer();
			}
		}, PING_INTERVAL_MS);
	}

	private stopPing(): void {
		if (this.pingTimer !== null) {
			clearInterval(this.pingTimer);
			this.pingTimer = null;
		}
		this.clearPongTimer();
	}

	private sendSubscription(room: WsRoomId, filters: Record<string, unknown>, joinRoom: boolean): boolean {
		if (this.state !== "connected") return false;
		let sent = true;
		if (joinRoom) {
			sent = this.transport.sendNow({ type: "join_room", payload: { room_id: room } }) && sent;
		}
		sent = this.transport.sendNow({
			type: "room_message",
			payload: { room_id: room, message: { action: "subscribe", ...filters } },
		}) && sent;
		return sent;
	}

	private restartPendingSubscribes(): void {
		for (const [room, pending] of this.pendingSubscribes) {
			if (pending.timer === null) {
				this.armSubscribeTimer(room, pending);
			}
		}
	}

	private pausePendingSubscribes(): void {
		for (const [, pending] of this.pendingSubscribes) {
			this.clearSubscribeTimer(pending);
		}
	}

	private armSubscribeTimer(room: WsRoomId, pending: PendingSubscribe): void {
		this.clearSubscribeTimer(pending);
		pending.timer = setTimeout(() => {
			pending.timer = null;
			this.pendingSubscribes.delete(room);
			pending.reject(new WebSocketError(`Subscribe to ${room} timed out`));
		}, this.subscribeTimeout);
	}

	private clearSubscribeTimer(pending: PendingSubscribe): void {
		if (pending.timer !== null) {
			clearTimeout(pending.timer);
			pending.timer = null;
		}
	}

	private armPongTimer(): void {
		if (this.pongTimer !== null) return;
		this.pongTimer = setTimeout(() => {
			this.pongTimer = null;
			this.transport.close(4000, "pong timeout");
		}, PING_INTERVAL_MS * 2);
	}

	private clearPongTimer(): void {
		if (this.pongTimer !== null) {
			clearTimeout(this.pongTimer);
			this.pongTimer = null;
		}
	}

	private getSubscribeError(data: unknown): string | null {
		if (!data || typeof data !== "object") return null;
		const error = (data as { error?: unknown }).error;
		return typeof error === "string" && error.length > 0 ? error : null;
	}

	private handleListenerError(error: unknown): void {
		const normalizedError = error instanceof Error
			? error
			: new WebSocketError("WebSocket listener threw", { cause: error });
		if (!this.isEmittingListenerError && (this.listeners.get("error")?.size ?? 0) > 0) {
			this.isEmittingListenerError = true;
			try {
				this.emit("error", normalizedError);
				return;
			} finally {
				this.isEmittingListenerError = false;
			}
		}
		console.error(normalizedError);
	}
}

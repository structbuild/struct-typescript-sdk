import { WebSocketTransport, buildWebSocketUrl } from "./ws-transport.js";
import { WebSocketError } from "./errors.js";
import type {
	ConnectionState,
	StructWebSocketConfig,
	AlertsWebSocketEventMap,
	WsAlertSubscribedResponse,
} from "./types/ws.js";
import type { WsAlertSubscribeMap, WsAlertEventName } from "./types/ws-helpers.js";

const DEFAULT_BASE_URL = "wss://api.struct.to";
const PING_INTERVAL_MS = 30_000;
const DEFAULT_SUBSCRIBE_TIMEOUT_MS = 10_000;

type Listener<T> = (payload: T) => void;

interface PendingSubscribe {
	resolve: (data: unknown) => void;
	reject: (err: Error) => void;
	timer: ReturnType<typeof setTimeout> | null;
}

export class StructAlertsWebSocket {
	private readonly transport: WebSocketTransport;
	private readonly listeners = new Map<string, Set<Listener<any>>>();
	private readonly subscriptions = new Map<WsAlertEventName, Record<string, unknown>>();
	private readonly pendingSubscribes = new Map<WsAlertEventName, PendingSubscribe>();
	private readonly subscribeTimeout: number;
	private pingTimer: ReturnType<typeof setInterval> | null = null;
	private pongTimer: ReturnType<typeof setTimeout> | null = null;
	private isEmittingListenerError = false;

	constructor(config: StructWebSocketConfig) {
		this.subscribeTimeout = config.subscribeTimeout ?? DEFAULT_SUBSCRIBE_TIMEOUT_MS;
		const getUrl = () => buildWebSocketUrl("/ws/alerts", {
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

	on<K extends keyof AlertsWebSocketEventMap>(event: K, listener: Listener<AlertsWebSocketEventMap[K]>): () => void {
		let set = this.listeners.get(event as string);
		if (!set) {
			set = new Set();
			this.listeners.set(event as string, set);
		}
		set.add(listener);
		return () => { set.delete(listener); };
	}

	off<K extends keyof AlertsWebSocketEventMap>(event: K, listener: Listener<AlertsWebSocketEventMap[K]>): void {
		this.listeners.get(event as string)?.delete(listener);
	}

	once<K extends keyof AlertsWebSocketEventMap>(event: K, listener: Listener<AlertsWebSocketEventMap[K]>): () => void {
		const wrapper = (payload: AlertsWebSocketEventMap[K]) => {
			this.off(event, wrapper);
			listener(payload);
		};
		return this.on(event, wrapper);
	}

	removeAllListeners(event?: keyof AlertsWebSocketEventMap): void {
		if (event) {
			this.listeners.delete(event as string);
		} else {
			this.listeners.clear();
		}
	}

	subscribe<E extends WsAlertEventName>(
		event: E,
		filters: Omit<WsAlertSubscribeMap[E], "op" | "event">,
	): Promise<WsAlertSubscribedResponse> {
		const message = { op: "subscribe", event, ...filters } as Record<string, unknown>;

		const existing = this.pendingSubscribes.get(event);
		if (existing) {
			this.clearSubscribeTimer(existing);
			existing.reject(new WebSocketError("Superseded by new subscription"));
		}

		this.subscriptions.set(event, message);
		this.rebuildReplay();

		return new Promise<WsAlertSubscribedResponse>((resolve, reject) => {
			const pending: PendingSubscribe = {
				resolve: resolve as (data: unknown) => void,
				reject,
				timer: null,
			};
			this.pendingSubscribes.set(event, pending);
			if (this.sendSubscription(message)) {
				this.armSubscribeTimer(event, pending);
			}
		});
	}

	unsubscribe(event: WsAlertEventName): void {
		const sub = this.subscriptions.get(event);
		if (!sub) return;

		const pending = this.pendingSubscribes.get(event);
		if (pending) {
			this.clearSubscribeTimer(pending);
			pending.reject(new WebSocketError("Unsubscribed"));
			this.pendingSubscribes.delete(event);
		}

		this.subscriptions.delete(event);
		this.rebuildReplay();
		if (this.state === "connected") {
			this.transport.sendNow({ ...sub, op: "unsubscribe" });
		}
	}

	private rebuildReplay(): void {
		this.transport.clearReplayMessages();
		for (const [, message] of this.subscriptions) {
			this.transport.addReplayMessage(message);
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
		const msg = raw as { op?: string; type?: string; event?: string; error?: string; subscription_id?: string; timestamp?: number; data?: unknown };
		if (!msg || typeof msg !== "object") return;
		if (msg.op === "pong" || msg.type === "pong") {
			this.clearPongTimer();
			return;
		}

		if (msg.error) {
			const error = new WebSocketError(msg.error);
			if (msg.event) {
				const pending = this.pendingSubscribes.get(msg.event as WsAlertEventName);
				if (pending) {
					this.clearSubscribeTimer(pending);
					this.pendingSubscribes.delete(msg.event as WsAlertEventName);
					pending.reject(error);
				}
			}
			this.emit("error", error);
			return;
		}

		if (msg.op === "subscribed" && msg.event) {
			const pending = this.pendingSubscribes.get(msg.event as WsAlertEventName);
			if (pending) {
				this.clearSubscribeTimer(pending);
				this.pendingSubscribes.delete(msg.event as WsAlertEventName);
				pending.resolve({ op: "subscribed", event: msg.event, subscription_id: msg.subscription_id });
			}
			return;
		}

		if (msg.op === "unsubscribed") return;

		if (msg.event && msg.data !== undefined) {
			this.emit(msg.event as keyof AlertsWebSocketEventMap, {
				event: msg.event,
				timestamp: msg.timestamp,
				data: msg.data,
			} as never);
		}
	}

	private emit<K extends keyof AlertsWebSocketEventMap>(event: K, payload: AlertsWebSocketEventMap[K]): void {
		const set = this.listeners.get(event as string);
		if (!set) return;
		for (const fn of set) {
			try {
				(fn as Listener<AlertsWebSocketEventMap[K]>)(payload);
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

	private sendSubscription(message: Record<string, unknown>): boolean {
		if (this.state !== "connected") return false;
		return this.transport.sendNow(message);
	}

	private restartPendingSubscribes(): void {
		for (const [event, pending] of this.pendingSubscribes) {
			if (pending.timer === null) {
				this.armSubscribeTimer(event, pending);
			}
		}
	}

	private pausePendingSubscribes(): void {
		for (const [, pending] of this.pendingSubscribes) {
			this.clearSubscribeTimer(pending);
		}
	}

	private armSubscribeTimer(event: WsAlertEventName, pending: PendingSubscribe): void {
		this.clearSubscribeTimer(pending);
		pending.timer = setTimeout(() => {
			pending.timer = null;
			this.pendingSubscribes.delete(event);
			pending.reject(new WebSocketError(`Subscribe to alert ${event} timed out`));
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

import { WebSocketTransport } from "./ws-transport.js";
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
	timer: ReturnType<typeof setTimeout>;
}

export class StructAlertsWebSocket {
	private readonly transport: WebSocketTransport;
	private readonly listeners = new Map<string, Set<Function>>();
	private readonly subscriptions = new Map<WsAlertEventName, Record<string, unknown>>();
	private readonly pendingSubscribes = new Map<WsAlertEventName, PendingSubscribe>();
	private readonly subscribeTimeout: number;
	private pingTimer: ReturnType<typeof setInterval> | null = null;

	constructor(config: StructWebSocketConfig) {
		this.subscribeTimeout = config.subscribeTimeout ?? DEFAULT_SUBSCRIBE_TIMEOUT_MS;
		const base = (config.baseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/, "");
		const url = `${base}/ws/alerts?api-key=${encodeURIComponent(config.apiKey)}`;

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
		this.subscriptions.set(event, message);
		this.rebuildReplay();

		this.transport.send(message);

		const existing = this.pendingSubscribes.get(event);
		if (existing) {
			clearTimeout(existing.timer);
			existing.reject(new WebSocketError("Superseded by new subscription"));
		}

		return new Promise<WsAlertSubscribedResponse>((resolve, reject) => {
			const timer = setTimeout(() => {
				this.pendingSubscribes.delete(event);
				reject(new WebSocketError(`Subscribe to alert ${event} timed out`));
			}, this.subscribeTimeout);

			this.pendingSubscribes.set(event, {
				resolve: resolve as (data: unknown) => void,
				reject,
				timer,
			});
		});
	}

	unsubscribe(event: WsAlertEventName): void {
		const sub = this.subscriptions.get(event);
		if (!sub) return;

		const pending = this.pendingSubscribes.get(event);
		if (pending) {
			clearTimeout(pending.timer);
			pending.reject(new WebSocketError("Unsubscribed"));
			this.pendingSubscribes.delete(event);
		}

		this.transport.send({ ...sub, op: "unsubscribe" });
		this.subscriptions.delete(event);
		this.rebuildReplay();
	}

	private rebuildReplay(): void {
		this.transport.clearReplayMessages();
		for (const [, message] of this.subscriptions) {
			this.transport.addReplayMessage(message);
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
		const msg = raw as { op?: string; event?: string; error?: string; subscription_id?: string; timestamp?: number; data?: unknown };
		if (!msg || typeof msg !== "object") return;
		if (msg.op === "pong") return;

		if (msg.error) {
			this.emit("error", new WebSocketError(msg.error));
			return;
		}

		if (msg.op === "subscribed" && msg.event) {
			const pending = this.pendingSubscribes.get(msg.event as WsAlertEventName);
			if (pending) {
				clearTimeout(pending.timer);
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

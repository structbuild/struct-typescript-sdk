import { WebSocketError, WebSocketClosedError } from "./errors.js";
import type { ConnectionState } from "./types/ws.js";
import type { RetryConfig } from "./types/http.js";

const DEFAULT_INITIAL_DELAY_MS = 1_000;
const DEFAULT_MAX_DELAY_MS = 30_000;

export interface WebSocketTransportCallbacks {
	onOpen: () => void;
	onClose: (code: number, reason: string) => void;
	onError: (error: Error) => void;
	onMessage: (data: unknown) => void;
	onReconnecting: (attempt: number) => void;
}

export class WebSocketTransport {
	private ws: WebSocket | null = null;
	private _state: ConnectionState = "disconnected";
	private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
	private reconnectAttempt = 0;
	private intentionalClose = false;
	private connectResolve: (() => void) | null = null;
	private connectReject: ((err: Error) => void) | null = null;
	private readonly pendingMessages: Record<string, unknown>[] = [];
	private readonly replayMessages: Record<string, unknown>[] = [];
	private readonly url: string;
	private readonly retry: RetryConfig;
	private readonly callbacks: WebSocketTransportCallbacks;

	constructor(url: string, retry: RetryConfig, callbacks: WebSocketTransportCallbacks) {
		this.url = url;
		this.retry = retry;
		this.callbacks = callbacks;
	}

	get state(): ConnectionState {
		return this._state;
	}

	connect(): Promise<void> {
		if (this._state === "connected") return Promise.resolve();
		if (this._state === "connecting" || this._state === "reconnecting") {
			return new Promise<void>((resolve, reject) => {
				const prevResolve = this.connectResolve;
				const prevReject = this.connectReject;
				this.connectResolve = () => { prevResolve?.(); resolve(); };
				this.connectReject = (err) => { prevReject?.(err); reject(err); };
			});
		}

		this.intentionalClose = false;
		this.clearReconnectTimer();
		this.setState("connecting");

		const promise = new Promise<void>((resolve, reject) => {
			this.connectResolve = resolve;
			this.connectReject = reject;
		});

		this.createSocket();
		return promise;
	}

	disconnect(): void {
		this.intentionalClose = true;
		this.clearReconnectTimer();
		this.pendingMessages.length = 0;
		this.replayMessages.length = 0;
		this.resolveConnect(new WebSocketClosedError(1000, "client disconnect"));
		if (this.ws) {
			this.ws.close(1000, "client disconnect");
			this.ws = null;
		}
		this.setState("disconnected");
	}

	send(message: Record<string, unknown>): void {
		if (this._state === "connected" && this.ws?.readyState === WebSocket.OPEN) {
			this.ws.send(JSON.stringify(message));
		} else {
			this.pendingMessages.push(message);
		}
	}

	addReplayMessage(message: Record<string, unknown>): void {
		this.replayMessages.push(message);
	}

	clearReplayMessages(): void {
		this.replayMessages.length = 0;
	}

	private resolveConnect(error?: Error): void {
		if (error) {
			this.connectReject?.(error);
		} else {
			this.connectResolve?.();
		}
		this.connectResolve = null;
		this.connectReject = null;
	}

	private createSocket(): void {
		try {
			this.ws = new WebSocket(this.url);
		} catch (err) {
			const error = new WebSocketError("Failed to create WebSocket", { cause: err });
			this.callbacks.onError(error);
			this.resolveConnect(error);
			this.scheduleReconnect();
			return;
		}

		this.ws.onopen = () => {
			this._state = "connected";
			this.reconnectAttempt = 0;
			this.replaySubscriptions();
			this.flushPendingMessages();
			this.resolveConnect();
			this.callbacks.onOpen();
		};

		this.ws.onclose = (event: CloseEvent) => {
			this.ws = null;
			if (this.intentionalClose) {
				this.setState("disconnected");
				this.callbacks.onClose(event.code, event.reason);
				return;
			}
			this.resolveConnect(new WebSocketClosedError(event.code, event.reason));
			this.callbacks.onClose(event.code, event.reason);
			this.scheduleReconnect();
		};

		this.ws.onerror = () => {
			this.callbacks.onError(new WebSocketError("WebSocket connection error"));
		};

		this.ws.onmessage = (event: MessageEvent) => {
			try {
				const data: unknown = JSON.parse(String(event.data));
				this.callbacks.onMessage(data);
			} catch {
				this.callbacks.onError(new WebSocketError("Failed to parse WebSocket message"));
			}
		};
	}

	private replaySubscriptions(): void {
		for (const msg of this.replayMessages) {
			if (this.ws?.readyState === WebSocket.OPEN) {
				this.ws.send(JSON.stringify(msg));
			}
		}
	}

	private flushPendingMessages(): void {
		while (this.pendingMessages.length > 0) {
			const msg = this.pendingMessages.shift()!;
			if (this.ws?.readyState === WebSocket.OPEN) {
				this.ws.send(JSON.stringify(msg));
			}
		}
	}

	private scheduleReconnect(): void {
		const maxRetries = this.retry.maxRetries ?? Infinity;
		if (this.reconnectAttempt >= maxRetries) {
			this.setState("disconnected");
			this.callbacks.onError(
				new WebSocketClosedError(1006, "Max reconnection attempts reached"),
			);
			return;
		}

		this.setState("reconnecting");
		this.reconnectAttempt++;
		this.callbacks.onReconnecting(this.reconnectAttempt);

		const initialDelay = this.retry.initialDelayMs ?? DEFAULT_INITIAL_DELAY_MS;
		const maxDelay = this.retry.maxDelayMs ?? DEFAULT_MAX_DELAY_MS;
		const exponentialDelay = Math.min(initialDelay * 2 ** (this.reconnectAttempt - 1), maxDelay);
		const jitter = exponentialDelay * 0.2 * Math.random();
		const delay = exponentialDelay + jitter;

		this.reconnectTimer = setTimeout(() => {
			this.reconnectTimer = null;
			this.createSocket();
		}, delay);
	}

	private clearReconnectTimer(): void {
		if (this.reconnectTimer !== null) {
			clearTimeout(this.reconnectTimer);
			this.reconnectTimer = null;
		}
	}

	private setState(state: ConnectionState): void {
		this._state = state;
	}
}

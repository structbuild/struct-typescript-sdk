import { WebSocketError, WebSocketClosedError } from "./errors.js";
import type { ConnectionState, WebSocketMessage } from "./types/ws.js";
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
	private readonly pendingMessages: WebSocketMessage[] = [];
	private readonly replayMessages: WebSocketMessage[] = [];
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

	connect(): void {
		if (this._state === "connected" || this._state === "connecting" || this._state === "reconnecting") {
			return;
		}
		if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) {
			return;
		}
		this.intentionalClose = false;
		this.clearReconnectTimer();
		this.setState("connecting");
		this.createSocket();
	}

	disconnect(): void {
		this.intentionalClose = true;
		this.clearReconnectTimer();
		this.pendingMessages.length = 0;
		this.replayMessages.length = 0;
		if (this.ws) {
			this.ws.close(1000, "client disconnect");
			this.ws = null;
		}
		this.setState("disconnected");
	}

	send(message: WebSocketMessage): void {
		if (this._state === "connected" && this.ws?.readyState === WebSocket.OPEN) {
			this.ws.send(JSON.stringify(message));
		} else {
			this.pendingMessages.push(message);
		}
	}

	addReplayMessage(message: WebSocketMessage): void {
		this.replayMessages.push(message);
	}

	removeReplayMessages(predicate: (msg: WebSocketMessage) => boolean): void {
		for (let i = this.replayMessages.length - 1; i >= 0; i--) {
			if (predicate(this.replayMessages[i]!)) {
				this.replayMessages.splice(i, 1);
			}
		}
	}

	clearReplayMessages(): void {
		this.replayMessages.length = 0;
	}

	private createSocket(): void {
		try {
			this.ws = new WebSocket(this.url);
		} catch (err) {
			this.callbacks.onError(
				new WebSocketError("Failed to create WebSocket", { cause: err }),
			);
			this.scheduleReconnect();
			return;
		}

		this.ws.onopen = () => {
			this._state = "connected";
			this.reconnectAttempt = 0;
			this.replaySubscriptions();
			this.flushPendingMessages();
			this.callbacks.onOpen();
		};

		this.ws.onclose = (event: CloseEvent) => {
			this.ws = null;
			if (this.intentionalClose) {
				this.setState("disconnected");
				this.callbacks.onClose(event.code, event.reason);
				return;
			}
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

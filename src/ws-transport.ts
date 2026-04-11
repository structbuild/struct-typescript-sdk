import { WebSocketError, WebSocketClosedError } from "./errors.js";
import type { ConnectionState } from "./types/ws.js";
import type { RetryConfig } from "./types/http.js";

const DEFAULT_INITIAL_DELAY_MS = 1_000;
const DEFAULT_MAX_DELAY_MS = 30_000;
const DEFAULT_MAX_PENDING_MESSAGES = 256;
const AUTH_FAILURE_CLOSE_CODES = new Set([1008, 4401]);

interface QueuedMessage {
	message: Record<string, unknown>;
}

interface ReplayMessageGroup {
	messages: QueuedMessage[];
}

interface ConnectWaiter {
	resolve: () => void;
	reject: (err: Error) => void;
}

export function buildWebSocketUrl(
	path: string,
	config: { apiKey: string; jwt?: string; baseUrl?: string },
	defaultBaseUrl: string,
): string {
	const base = (config.baseUrl ?? defaultBaseUrl).replace(/\/+$/, "");
	const wsBase = base.replace(/^https:\/\//, "wss://").replace(/^http:\/\//, "ws://");
	const params = new URLSearchParams({ "api-key": config.apiKey });
	if (config.jwt) params.set("token", config.jwt);
	return `${wsBase}${path}?${params.toString()}`;
}

export interface WebSocketTransportCallbacks {
	onOpen: () => void;
	onClose: (code: number, reason: string) => void;
	onError: (error: Error) => void;
	onMessage: (data: unknown) => void;
	onReconnecting: (attempt: number) => void;
	onReconnectFailed: (error: Error) => void;
	onAuthFailed: (error: WebSocketClosedError) => void;
	onWarning: (warning: Error) => void;
}

export class WebSocketTransport {
	private ws: WebSocket | null = null;
	private _state: ConnectionState = "disconnected";
	private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
	private reconnectAttempt = 0;
	private intentionalClose = false;
	private readonly connectWaiters = new Set<ConnectWaiter>();
	private readonly pendingMessages: QueuedMessage[] = [];
	private readonly replayMessages: ReplayMessageGroup[] = [];
	private readonly getUrl: () => string;
	private readonly retry: RetryConfig;
	private readonly callbacks: WebSocketTransportCallbacks;

	constructor(url: string | (() => string), retry: RetryConfig, callbacks: WebSocketTransportCallbacks) {
		this.getUrl = typeof url === "function" ? url : () => url;
		this.retry = retry;
		this.callbacks = callbacks;
	}

	get state(): ConnectionState {
		return this._state;
	}

	connect(): Promise<void> {
		if (this._state === "connected") return Promise.resolve();
		const promise = this.createConnectPromise();
		if (this._state === "connecting" || this._state === "reconnecting") {
			return promise;
		}

		this.intentionalClose = false;
		this.clearReconnectTimer();
		this.setState("connecting");
		this.createSocket();
		return promise;
	}

	disconnect(): void {
		this.intentionalClose = true;
		this.clearReconnectTimer();
		this.pendingMessages.length = 0;
		this.replayMessages.length = 0;
		this.rejectConnect(new WebSocketClosedError(1000, "client disconnect"));
		if (this.ws) {
			this.ws.close(1000, "client disconnect");
			this.ws = null;
		}
		this.setState("disconnected");
	}

	send(message: Record<string, unknown>): boolean {
		const queuedMessage: QueuedMessage = { message };
		if (this.sendMessage(queuedMessage)) return true;
		this.enqueueMessage(this.pendingMessages, queuedMessage, "pending");
		return false;
	}

	sendNow(message: Record<string, unknown>): boolean {
		return this.sendMessage({ message });
	}

	addReplayMessage(message: Record<string, unknown>): void {
		this.addReplayMessages([message]);
	}

	addReplayMessages(messages: Record<string, unknown>[]): void {
		this.enqueueReplayMessages(messages.map((message) => ({ message })));
	}

	clearReplayMessages(): void {
		this.replayMessages.length = 0;
	}

	close(code: number, reason: string): void {
		this.ws?.close(code, reason);
	}

	private createConnectPromise(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.connectWaiters.add({ resolve, reject });
		});
	}

	private resolveConnect(): void {
		for (const waiter of this.connectWaiters) {
			waiter.resolve();
		}
		this.connectWaiters.clear();
	}

	private rejectConnect(error: Error): void {
		for (const waiter of this.connectWaiters) {
			waiter.reject(error);
		}
		this.connectWaiters.clear();
	}

	private createSocket(): void {
		try {
			this.ws = new WebSocket(this.getUrl());
		} catch (err) {
			const error = new WebSocketError("Failed to create WebSocket", { cause: err });
			this.callbacks.onError(error);
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

			const error = new WebSocketClosedError(event.code, event.reason);
			this.callbacks.onClose(event.code, event.reason);
			if (this.isAuthFailure(event.code)) {
				this.setState("disconnected");
				this.rejectConnect(error);
				this.callbacks.onAuthFailed(error);
				return;
			}
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
		for (const replayGroup of this.replayMessages) {
			for (const queuedMessage of replayGroup.messages) {
				this.sendMessage(queuedMessage);
			}
		}
	}

	private flushPendingMessages(): void {
		while (this.pendingMessages.length > 0) {
			this.sendMessage(this.pendingMessages.shift()!);
		}
	}

	private scheduleReconnect(): void {
		const maxRetries = this.retry.maxRetries ?? Infinity;
		if (this.reconnectAttempt >= maxRetries) {
			const error = new WebSocketClosedError(1006, "Max reconnection attempts reached");
			this.setState("disconnected");
			this.rejectConnect(error);
			this.callbacks.onReconnectFailed(error);
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

	private sendMessage(queuedMessage: QueuedMessage): boolean {
		if (this.ws?.readyState !== WebSocket.OPEN) return false;
		this.ws.send(JSON.stringify(queuedMessage.message));
		return true;
	}

	private enqueueMessage(queue: QueuedMessage[], queuedMessage: QueuedMessage, queueName: "pending" | "replay"): void {
		queue.push(queuedMessage);
		const maxPendingMessages = this.retry.maxPendingMessages ?? DEFAULT_MAX_PENDING_MESSAGES;
		if (queue.length > maxPendingMessages) {
			queue.shift();
			this.callbacks.onWarning(
				new WebSocketError(
					`WebSocket ${queueName} queue exceeded ${maxPendingMessages} messages; dropped oldest message`,
				),
			);
		}
	}

	private enqueueReplayMessages(messages: QueuedMessage[]): void {
		this.replayMessages.push({ messages });
		const maxPendingMessages = this.retry.maxPendingMessages ?? DEFAULT_MAX_PENDING_MESSAGES;
		if (this.replayMessages.length > maxPendingMessages) {
			this.replayMessages.shift();
			this.callbacks.onWarning(
				new WebSocketError(
					`WebSocket replay queue exceeded ${maxPendingMessages} entries; dropped oldest replay entry`,
				),
			);
		}
	}

	private isAuthFailure(code: number): boolean {
		return AUTH_FAILURE_CLOSE_CODES.has(code);
	}

	private setState(state: ConnectionState): void {
		this._state = state;
	}
}

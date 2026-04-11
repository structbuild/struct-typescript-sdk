export class FakeWebSocket {
	static readonly CONNECTING = 0;
	static readonly OPEN = 1;
	static readonly CLOSING = 2;
	static readonly CLOSED = 3;

	static originalWebSocket: typeof globalThis.WebSocket | undefined;
	static readonly instances: FakeWebSocket[] = [];

	readonly url: string;
	readyState = FakeWebSocket.CONNECTING;
	readonly sent: string[] = [];
	onopen: ((event: Event) => void) | null = null;
	onclose: ((event: CloseEvent) => void) | null = null;
	onerror: ((event: Event) => void) | null = null;
	onmessage: ((event: MessageEvent) => void) | null = null;

	constructor(url: string) {
		this.url = url;
		FakeWebSocket.instances.push(this);
	}

	send(data: string): void {
		if (this.readyState !== FakeWebSocket.OPEN) {
			throw new Error("FakeWebSocket is not open");
		}
		this.sent.push(data);
	}

	close(code = 1000, reason = ""): void {
		if (this.readyState === FakeWebSocket.CLOSED) return;
		this.readyState = FakeWebSocket.CLOSING;
		this.readyState = FakeWebSocket.CLOSED;
		this.onclose?.({ code, reason } as CloseEvent);
	}

	open(): void {
		if (this.readyState !== FakeWebSocket.CONNECTING) return;
		this.readyState = FakeWebSocket.OPEN;
		this.onopen?.({ type: "open" } as Event);
	}

	serverClose(code = 1006, reason = ""): void {
		this.close(code, reason);
	}

	serverError(): void {
		this.onerror?.({ type: "error" } as Event);
	}

	serverSend(data: unknown): void {
		this.onmessage?.({
			data: typeof data === "string" ? data : JSON.stringify(data),
		} as MessageEvent);
	}

	jsonMessages(): Record<string, unknown>[] {
		return this.sent.map((message) => JSON.parse(message) as Record<string, unknown>);
	}
}

export function installFakeWebSocket(): void {
	FakeWebSocket.originalWebSocket ??= globalThis.WebSocket;
	FakeWebSocket.instances.length = 0;
	globalThis.WebSocket = FakeWebSocket as unknown as typeof WebSocket;
}

export function restoreFakeWebSocket(): void {
	if (FakeWebSocket.originalWebSocket) {
		globalThis.WebSocket = FakeWebSocket.originalWebSocket;
	}
	FakeWebSocket.instances.length = 0;
}

export function latestSocket(): FakeWebSocket {
	const socket = FakeWebSocket.instances.at(-1);
	if (!socket) {
		throw new Error("Expected a FakeWebSocket instance");
	}
	return socket;
}

export async function flushMicrotasks(): Promise<void> {
	await Promise.resolve();
	await Promise.resolve();
}

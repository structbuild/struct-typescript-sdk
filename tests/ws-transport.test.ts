import { afterEach, beforeEach, describe, expect, jest, mock, test } from "bun:test";
import { WebSocketClosedError } from "../src/errors.js";
import { WebSocketTransport, buildWebSocketUrl } from "../src/ws-transport.js";
import {
	flushMicrotasks,
	installFakeWebSocket,
	latestSocket,
	restoreFakeWebSocket,
	FakeWebSocket,
} from "./setup/fake-websocket.js";

let originalRandom: typeof Math.random;

beforeEach(() => {
	installFakeWebSocket();
	jest.useFakeTimers();
	originalRandom = Math.random;
	Math.random = () => 0;
});

afterEach(() => {
	Math.random = originalRandom;
	jest.useRealTimers();
	restoreFakeWebSocket();
});

function createCallbacks() {
	return {
		onOpen: mock(() => {}),
		onClose: mock((_code: number, _reason: string) => {}),
		onError: mock((_error: Error) => {}),
		onMessage: mock((_data: unknown) => {}),
		onReconnecting: mock((_attempt: number) => {}),
		onReconnectFailed: mock((_error: Error) => {}),
		onAuthFailed: mock((_error: WebSocketClosedError) => {}),
		onWarning: mock((_warning: Error) => {}),
	};
}

async function getRejectedError<T>(promise: Promise<T>): Promise<Error> {
	try {
		await promise;
		throw new Error("Expected promise to reject");
	} catch (error) {
		return error as Error;
	}
}

describe("WebSocketTransport", () => {
	test("buildWebSocketUrl normalizes trailing slashes and websocket protocol", () => {
		expect(
			buildWebSocketUrl("/ws", { apiKey: "api-key", baseUrl: "https://api.struct.to///" }, "http://ignored"),
		).toBe("wss://api.struct.to/ws?api-key=api-key");

		expect(
			buildWebSocketUrl("/ws", { apiKey: "api-key", baseUrl: "http://localhost:3000/" }, "https://ignored"),
		).toBe("ws://localhost:3000/ws?api-key=api-key");

		expect(
			buildWebSocketUrl("/ws", { apiKey: "api-key", baseUrl: "wss://stream.struct.to/" }, "https://ignored"),
		).toBe("wss://stream.struct.to/ws?api-key=api-key");
	});

	test("rebuilds the websocket URL on reconnect and resolves connect after a retry", async () => {
		let jwt = "jwt-1";
		const callbacks = createCallbacks();
		const transport = new WebSocketTransport(
			() => buildWebSocketUrl("/ws", { apiKey: "api-key", jwt }, "https://api.struct.to"),
			{ maxRetries: 2, initialDelayMs: 10, maxDelayMs: 10 },
			callbacks,
		);

		const connectPromise = transport.connect();
		const firstSocket = latestSocket();
		expect(firstSocket.url).toContain("token=jwt-1");

		firstSocket.serverClose(1006, "offline");
		await flushMicrotasks();
		expect(callbacks.onReconnecting).toHaveBeenCalledTimes(1);

		jwt = "jwt-2";
		jest.advanceTimersByTime(10);
		const secondSocket = latestSocket();
		expect(secondSocket).not.toBe(firstSocket);
		expect(secondSocket.url).toContain("token=jwt-2");

		secondSocket.open();
		await connectPromise;
		expect(transport.state).toBe("connected");
	});

	test("emits reconnect_failed and rejects connect after retries are exhausted", async () => {
		const callbacks = createCallbacks();
		const transport = new WebSocketTransport(
			"wss://api.struct.to/ws",
			{ maxRetries: 1, initialDelayMs: 10, maxDelayMs: 10 },
			callbacks,
		);

		const connectPromise = transport.connect();
		latestSocket().serverClose(1006, "offline");
		jest.advanceTimersByTime(10);
		latestSocket().serverClose(1006, "still offline");

		const error = await getRejectedError(connectPromise);
		expect(error).toBeInstanceOf(WebSocketClosedError);
		expect(callbacks.onReconnectFailed).toHaveBeenCalledTimes(1);
		expect(callbacks.onAuthFailed).not.toHaveBeenCalled();
		expect(transport.state).toBe("disconnected");
	});

	test("rejects pending connect and cancels retry when disconnected during reconnect", async () => {
		const callbacks = createCallbacks();
		const transport = new WebSocketTransport(
			"wss://api.struct.to/ws",
			{ maxRetries: 2, initialDelayMs: 10, maxDelayMs: 10 },
			callbacks,
		);

		const connectPromise = transport.connect();
		latestSocket().serverClose(1006, "offline");
		transport.disconnect();

		const error = await getRejectedError(connectPromise);
		expect(error).toBeInstanceOf(WebSocketClosedError);

		jest.advanceTimersByTime(20);
		expect(FakeWebSocket.instances).toHaveLength(1);
		expect(transport.state).toBe("disconnected");
	});

	test("caps the pending queue and drops the oldest message", async () => {
		const callbacks = createCallbacks();
		const transport = new WebSocketTransport(
			"wss://api.struct.to/ws",
			{ maxPendingMessages: 2 },
			callbacks,
		);

		transport.send({ id: 1 });
		transport.send({ id: 2 });
		transport.send({ id: 3 });

		expect(callbacks.onWarning).toHaveBeenCalledTimes(1);

		const connectPromise = transport.connect();
		const socket = latestSocket();
		socket.open();
		await connectPromise;

		expect(socket.jsonMessages()).toEqual([{ id: 2 }, { id: 3 }]);
	});

	test("caps the replay queue by replay entry so grouped replays stay intact", async () => {
		const callbacks = createCallbacks();
		const transport = new WebSocketTransport(
			"wss://api.struct.to/ws",
			{ maxPendingMessages: 1 },
			callbacks,
		);

		transport.addReplayMessages([{ id: "join-1" }, { id: "subscribe-1" }]);
		transport.addReplayMessages([{ id: "join-2" }, { id: "subscribe-2" }]);

		expect(callbacks.onWarning).toHaveBeenCalledTimes(1);

		const connectPromise = transport.connect();
		const socket = latestSocket();
		socket.open();
		await connectPromise;

		expect(socket.jsonMessages()).toEqual([{ id: "join-2" }, { id: "subscribe-2" }]);
	});

	test("treats auth close codes as terminal failures", async () => {
		const callbacks = createCallbacks();
		const transport = new WebSocketTransport(
			"wss://api.struct.to/ws",
			{ maxRetries: 3, initialDelayMs: 10, maxDelayMs: 10 },
			callbacks,
		);

		const connectPromise = transport.connect();
		latestSocket().serverClose(1008, "token expired");

		const error = await getRejectedError(connectPromise);
		expect(error).toBeInstanceOf(WebSocketClosedError);
		expect(callbacks.onAuthFailed).toHaveBeenCalledTimes(1);
		expect(callbacks.onReconnecting).not.toHaveBeenCalled();
		expect(transport.state).toBe("disconnected");
	});
});

import { afterEach, beforeEach, describe, expect, jest, mock, test } from "bun:test";
import { StructWebSocket } from "../src/ws.js";
import { WebSocketError } from "../src/errors.js";
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

async function getRejectedError<T>(promise: Promise<T>): Promise<Error> {
	try {
		await promise;
		throw new Error("Expected promise to reject");
	} catch (error) {
		return error as Error;
	}
}

describe("StructWebSocket", () => {
	test("sends a pre-connect subscription only once on first open", async () => {
		const ws = new StructWebSocket({ apiKey: "api-key" });
		const subscribePromise = ws.subscribe("polymarket_trades");
		const connectPromise = ws.connect();
		const socket = latestSocket();

		socket.open();
		await connectPromise;
		expect(socket.jsonMessages()).toEqual([
			{ type: "join_room", payload: { room_id: "polymarket_trades" } },
			{
				type: "room_message",
				payload: {
					room_id: "polymarket_trades",
					message: { action: "subscribe" },
				},
			},
		]);

		socket.serverSend({
			type: "subscribed",
			room_id: "polymarket_trades",
			data: { subscribe_all: true },
		});
		await expect(subscribePromise).resolves.toEqual({ subscribe_all: true });
	});

	test("keeps room replays intact when the replay queue is capped", async () => {
		const ws = new StructWebSocket({
			apiKey: "api-key",
			reconnect: { maxPendingMessages: 1 },
		});
		const warnings: Error[] = [];
		ws.on("warning", (warning) => {
			warnings.push(warning);
		});

		const subscribePromise = ws.subscribe("polymarket_trades");
		const connectPromise = ws.connect();
		const socket = latestSocket();

		socket.open();
		await connectPromise;
		expect(socket.jsonMessages()).toEqual([
			{ type: "join_room", payload: { room_id: "polymarket_trades" } },
			{
				type: "room_message",
				payload: {
					room_id: "polymarket_trades",
					message: { action: "subscribe" },
				},
			},
		]);
		expect(warnings).toEqual([]);

		socket.serverSend({
			type: "subscribed",
			room_id: "polymarket_trades",
			data: { subscribe_all: true },
		});
		await expect(subscribePromise).resolves.toEqual({ subscribe_all: true });
	});

	test("pauses subscribe timeout during reconnect and resolves after replayed ack", async () => {
		const ws = new StructWebSocket({
			apiKey: "api-key",
			subscribeTimeout: 100,
			reconnect: { maxRetries: 1, initialDelayMs: 10, maxDelayMs: 10 },
		});

		const connectPromise = ws.connect();
		const firstSocket = latestSocket();
		firstSocket.open();
		await connectPromise;

		const subscribePromise = ws.subscribe("polymarket_trades");
		firstSocket.serverClose(1006, "offline");

		jest.advanceTimersByTime(10);
		const secondSocket = latestSocket();
		let rejected: Error | undefined;
		subscribePromise.catch((error) => {
			rejected = error as Error;
		});

		jest.advanceTimersByTime(200);
		await flushMicrotasks();
		expect(rejected).toBeUndefined();

		secondSocket.open();
		await flushMicrotasks();
		expect(secondSocket.jsonMessages()).toEqual([
			{ type: "join_room", payload: { room_id: "polymarket_trades" } },
			{
				type: "room_message",
				payload: {
					room_id: "polymarket_trades",
					message: { action: "subscribe" },
				},
			},
		]);

		secondSocket.serverSend({
			type: "subscribed",
			room_id: "polymarket_trades",
			data: { subscribe_all: true },
		});
		await expect(subscribePromise).resolves.toEqual({ subscribe_all: true });
	});

	test("does not queue stale unsubscribe messages while reconnecting", async () => {
		const ws = new StructWebSocket({
			apiKey: "api-key",
			reconnect: { maxRetries: 1, initialDelayMs: 10, maxDelayMs: 10 },
		});

		const connectPromise = ws.connect();
		const firstSocket = latestSocket();
		firstSocket.open();
		await connectPromise;

		const subscribePromise = ws.subscribe("polymarket_trades");
		firstSocket.serverSend({
			type: "subscribed",
			room_id: "polymarket_trades",
			data: { subscribe_all: true },
		});
		await subscribePromise;

		firstSocket.serverClose(1006, "offline");
		ws.unsubscribe("polymarket_trades");

		jest.advanceTimersByTime(10);
		const secondSocket = latestSocket();
		secondSocket.open();
		await flushMicrotasks();

		expect(secondSocket.jsonMessages()).toEqual([]);
	});

	test("rejects subscribe promises immediately when the ack contains an error", async () => {
		const ws = new StructWebSocket({ apiKey: "api-key" });
		const errors: Error[] = [];
		ws.on("error", (error) => {
			errors.push(error);
		});

		const connectPromise = ws.connect();
		const socket = latestSocket();
		socket.open();
		await connectPromise;

		const subscribePromise = ws.subscribe("polymarket_trades");
		socket.serverSend({
			type: "subscribed",
			room_id: "polymarket_trades",
			data: { error: "bad filters" },
		});

		const error = await getRejectedError(subscribePromise);
		expect(error).toBeInstanceOf(WebSocketError);
		expect(error.message).toContain("bad filters");
		expect(errors).toHaveLength(1);
		expect(errors[0]?.message).toContain("bad filters");
	});

	test("surfaces listener exceptions through the error event", async () => {
		const ws = new StructWebSocket({ apiKey: "api-key" });
		const onError = mock((_error: Error) => {});

		ws.on("error", onError);
		ws.on("connected", () => {
			throw new Error("listener exploded");
		});

		const connectPromise = ws.connect();
		latestSocket().open();
		await connectPromise;

		expect(onError).toHaveBeenCalledTimes(1);
		expect((onError.mock.calls[0]![0] as Error).message).toBe("listener exploded");
	});

	test("closes and reconnects when pong is missing", async () => {
		const ws = new StructWebSocket({
			apiKey: "api-key",
			reconnect: { maxRetries: 1, initialDelayMs: 10, maxDelayMs: 10 },
		});
		const onReconnecting = mock((_payload: { attempt: number }) => {});
		ws.on("reconnecting", onReconnecting);

		const connectPromise = ws.connect();
		const firstSocket = latestSocket();
		firstSocket.open();
		await connectPromise;

		jest.advanceTimersByTime(30_000);
		expect(firstSocket.jsonMessages().at(-1)).toEqual({ type: "ping" });

		jest.advanceTimersByTime(60_000);
		await flushMicrotasks();
		expect(onReconnecting).toHaveBeenCalledTimes(1);
		expect(firstSocket.readyState).toBe(FakeWebSocket.CLOSED);

		jest.advanceTimersByTime(10);
		expect(FakeWebSocket.instances).toHaveLength(2);
	});
});

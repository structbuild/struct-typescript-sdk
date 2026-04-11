import { afterEach, beforeEach, describe, expect, jest, mock, test } from "bun:test";
import { StructAlertsWebSocket } from "../src/ws-alerts.js";
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

describe("StructAlertsWebSocket", () => {
	test("sends a pre-connect alert subscription only once on first open", async () => {
		const ws = new StructAlertsWebSocket({ apiKey: "api-key" });
		const subscribePromise = ws.subscribe("asset_price_tick", {});
		const connectPromise = ws.connect();
		const socket = latestSocket();

		socket.open();
		await connectPromise;
		expect(socket.jsonMessages()).toEqual([{ op: "subscribe", event: "asset_price_tick" }]);

		socket.serverSend({
			op: "subscribed",
			event: "asset_price_tick",
			subscription_id: "00000000-0000-0000-0000-000000000000",
		});
		await expect(subscribePromise).resolves.toEqual({
			op: "subscribed",
			event: "asset_price_tick",
			subscription_id: "00000000-0000-0000-0000-000000000000",
		});
	});

	test("pauses alert subscribe timeouts during reconnect", async () => {
		const ws = new StructAlertsWebSocket({
			apiKey: "api-key",
			subscribeTimeout: 100,
			reconnect: { maxRetries: 1, initialDelayMs: 10, maxDelayMs: 10 },
		});

		const connectPromise = ws.connect();
		const firstSocket = latestSocket();
		firstSocket.open();
		await connectPromise;

		const subscribePromise = ws.subscribe("asset_price_tick", {});
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
		expect(secondSocket.jsonMessages()).toEqual([{ op: "subscribe", event: "asset_price_tick" }]);

		secondSocket.serverSend({
			op: "subscribed",
			event: "asset_price_tick",
			subscription_id: "00000000-0000-0000-0000-000000000000",
		});
		await expect(subscribePromise).resolves.toEqual({
			op: "subscribed",
			event: "asset_price_tick",
			subscription_id: "00000000-0000-0000-0000-000000000000",
		});
	});

	test("rejects pending alert subscriptions immediately on error frames", async () => {
		const ws = new StructAlertsWebSocket({ apiKey: "api-key" });
		const errors: Error[] = [];
		ws.on("error", (error) => {
			errors.push(error);
		});

		const connectPromise = ws.connect();
		const socket = latestSocket();
		socket.open();
		await connectPromise;

		const subscribePromise = ws.subscribe("asset_price_tick", {});
		socket.serverSend({
			event: "asset_price_tick",
			error: "invalid alert filter",
		});

		const error = await getRejectedError(subscribePromise);
		expect(error).toBeInstanceOf(WebSocketError);
		expect(error.message).toContain("invalid alert filter");
		expect(errors).toHaveLength(1);
	});

	test("sends type-based pings and reconnects when pong is missing", async () => {
		const ws = new StructAlertsWebSocket({
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

	test("surfaces listener exceptions through the error event", async () => {
		const ws = new StructAlertsWebSocket({ apiKey: "api-key" });
		const onError = mock((_error: Error) => {});

		ws.on("error", onError);
		ws.on("connected", () => {
			throw new Error("alerts listener exploded");
		});

		const connectPromise = ws.connect();
		latestSocket().open();
		await connectPromise;

		expect(onError).toHaveBeenCalledTimes(1);
		expect((onError.mock.calls[0]![0] as Error).message).toBe("alerts listener exploded");
	});
});

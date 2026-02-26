import { describe, expect, test, mock, beforeEach, afterEach } from "bun:test";
import { StructClient } from "../src/client.js";
import { HoldersNamespace } from "../src/namespaces/holders.js";
import { TagsNamespace } from "../src/namespaces/tags.js";
import { EventsNamespace } from "../src/namespaces/events.js";
import { MarketsNamespace } from "../src/namespaces/markets.js";
import { SeriesNamespace } from "../src/namespaces/series.js";
import { TraderNamespace } from "../src/namespaces/trader.js";
import { BondsNamespace } from "../src/namespaces/bonds.js";
import { SearchNamespace } from "../src/namespaces/search.js";
import { WebhooksNamespace } from "../src/namespaces/webhooks.js";

let originalFetch: typeof globalThis.fetch;

beforeEach(() => {
	originalFetch = globalThis.fetch;
});

afterEach(() => {
	globalThis.fetch = originalFetch;
});

function mockFetch(impl: (...args: any[]) => any) {
	const fn = mock(impl);
	globalThis.fetch = fn as any;
	return fn;
}

function apiJson() {
	return new Response(JSON.stringify({ success: true, data: [], message: null }), {
		headers: { "content-type": "application/json" },
	});
}

describe("StructClient", () => {
	test("instantiates all namespaces", () => {
		const client = new StructClient({ apiKey: "test-key" });
		expect(client.holders).toBeInstanceOf(HoldersNamespace);
		expect(client.tags).toBeInstanceOf(TagsNamespace);
		expect(client.events).toBeInstanceOf(EventsNamespace);
		expect(client.markets).toBeInstanceOf(MarketsNamespace);
		expect(client.series).toBeInstanceOf(SeriesNamespace);
		expect(client.trader).toBeInstanceOf(TraderNamespace);
		expect(client.bonds).toBeInstanceOf(BondsNamespace);
		expect(client.search).toBeInstanceOf(SearchNamespace);
		expect(client.webhooks).toBeInstanceOf(WebhooksNamespace);
	});

	test("sends X-API-Key header", async () => {
		const fn = mockFetch(async () => apiJson());
		const client = new StructClient({ apiKey: "my-secret-key" });
		await client.markets.getMarkets();
		const call = fn.mock.calls[0] as any;
		expect(call[1].headers["X-API-Key"]).toBe("my-secret-key");
	});

	test("uses default venue polymarket in paths", async () => {
		const fn = mockFetch(async () => apiJson());
		const client = new StructClient({ apiKey: "key" });
		await client.markets.getMarkets();
		const url = fn.mock.calls[0]![0] as string;
		expect(url).toContain("/polymarket/market");
	});

	test("uses custom baseUrl", async () => {
		const fn = mockFetch(async () => apiJson());
		const client = new StructClient({ apiKey: "key", baseUrl: "https://custom.api.com/v2" });
		await client.markets.getMarkets();
		const url = fn.mock.calls[0]![0] as string;
		expect(url).toStartWith("https://custom.api.com/v2");
	});
});

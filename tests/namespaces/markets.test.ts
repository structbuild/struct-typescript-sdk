import { describe, expect, test, mock } from "bun:test";
import { MarketsNamespace } from "../../src/namespaces/markets.js";
import type { HttpClient } from "../../src/http.js";

function mockHttp() {
	return {
		get: mock(async () => ({ data: null, message: null, success: true })),
		post: mock(async () => ({ data: null, message: null, success: true })),
		put: mock(async () => ({ data: null, message: null, success: true })),
		delete: mock(async () => ({ data: null, message: null, success: true })),
	} as unknown as HttpClient;
}

function getPath(http: HttpClient): string {
	return (http.get as ReturnType<typeof mock>).mock.calls[0]![0] as string;
}

function getOptions(http: HttpClient): any {
	return (http.get as ReturnType<typeof mock>).mock.calls[0]![1];
}

describe("MarketsNamespace", () => {
	test("getMarkets", async () => {
		const http = mockHttp();
		const ns = new MarketsNamespace(http, "polymarket");
		await ns.getMarkets();
		expect(getPath(http)).toBe("/polymarket/market");
	});

	test("getMarketMetrics", async () => {
		const http = mockHttp();
		const ns = new MarketsNamespace(http, "polymarket");
		await ns.getMarketMetrics({ condition_id: "abc" } as any);
		expect(getPath(http)).toBe("/polymarket/market/metrics");
	});

	test("getTrades", async () => {
		const http = mockHttp();
		const ns = new MarketsNamespace(http, "polymarket");
		await ns.getTrades({ condition_id: "abc" } as any);
		expect(getPath(http)).toBe("/polymarket/market/trades");
	});

	test("getCandlestick", async () => {
		const http = mockHttp();
		const ns = new MarketsNamespace(http, "polymarket");
		await ns.getCandlestick({ condition_id: "abc" } as any);
		expect(getPath(http)).toBe("/polymarket/market/candlestick");
	});

	test("getPositionCandlestick", async () => {
		const http = mockHttp();
		const ns = new MarketsNamespace(http, "polymarket");
		await ns.getPositionCandlestick({ condition_id: "abc", position_id: "def" } as any);
		expect(getPath(http)).toBe("/polymarket/market/position/candlestick");
	});

	test("getPositionMetrics", async () => {
		const http = mockHttp();
		const ns = new MarketsNamespace(http, "polymarket");
		await ns.getPositionMetrics({ condition_id: "abc" } as any);
		expect(getPath(http)).toBe("/polymarket/market/position/metrics");
	});

	test("getPositionVolumeChart", async () => {
		const http = mockHttp();
		const ns = new MarketsNamespace(http, "polymarket");
		await ns.getPositionVolumeChart({ condition_id: "abc" } as any);
		expect(getPath(http)).toBe("/polymarket/market/position/volume-chart");
	});

	test("getMarketVolumeChart", async () => {
		const http = mockHttp();
		const ns = new MarketsNamespace(http, "polymarket");
		await ns.getMarketVolumeChart({ condition_id: "abc" } as any);
		expect(getPath(http)).toBe("/polymarket/market/volume-chart");
	});

	test("forwards query params", async () => {
		const http = mockHttp();
		const ns = new MarketsNamespace(http, "polymarket");
		await ns.getMarkets({ limit: 5 } as any);
		const opts = getOptions(http);
		expect(opts.params.limit).toBe(5);
	});
});

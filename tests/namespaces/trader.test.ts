import { describe, expect, test, mock } from "bun:test";
import { TraderNamespace } from "../../src/namespaces/trader.js";
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

const ADDR = "0xabc123";

describe("TraderNamespace", () => {
	test("getTraderTrades separates address from query", async () => {
		const http = mockHttp();
		const ns = new TraderNamespace(http, "polymarket");
		await ns.getTraderTrades({ address: ADDR, limit: 10 } as any);
		expect(getPath(http)).toBe(`/polymarket/trader/trades/${ADDR}`);
		const opts = getOptions(http);
		expect(opts.params.limit).toBe(10);
		expect(opts.params.address).toBeUndefined();
	});

	test("getTraderProfile", async () => {
		const http = mockHttp();
		const ns = new TraderNamespace(http, "polymarket");
		await ns.getTraderProfile({ address: ADDR } as any);
		expect(getPath(http)).toBe(`/polymarket/trader/profile/${ADDR}`);
	});

	test("getTraderProfilesBatch", async () => {
		const http = mockHttp();
		const ns = new TraderNamespace(http, "polymarket");
		await ns.getTraderProfilesBatch({ addresses: "0x1,0x2" } as any);
		expect(getPath(http)).toBe("/polymarket/trader/profiles/batch");
	});

	test("getTraderVolumeChart", async () => {
		const http = mockHttp();
		const ns = new TraderNamespace(http, "polymarket");
		await ns.getTraderVolumeChart({ address: ADDR } as any);
		expect(getPath(http)).toBe(`/polymarket/trader/volume-chart/${ADDR}`);
	});

	test("getTraderPnl", async () => {
		const http = mockHttp();
		const ns = new TraderNamespace(http, "polymarket");
		await ns.getTraderPnl({ address: ADDR } as any);
		expect(getPath(http)).toBe(`/polymarket/trader/pnl/${ADDR}`);
	});

	test("getTraderMarketPnl", async () => {
		const http = mockHttp();
		const ns = new TraderNamespace(http, "polymarket");
		await ns.getTraderMarketPnl({ address: ADDR } as any);
		expect(getPath(http)).toBe(`/polymarket/trader/pnl/${ADDR}/markets`);
	});

	test("getTraderEventPnl", async () => {
		const http = mockHttp();
		const ns = new TraderNamespace(http, "polymarket");
		await ns.getTraderEventPnl({ address: ADDR } as any);
		expect(getPath(http)).toBe(`/polymarket/trader/pnl/${ADDR}/events`);
	});

	test("getTraderPnlCandles", async () => {
		const http = mockHttp();
		const ns = new TraderNamespace(http, "polymarket");
		await ns.getTraderPnlCandles({ address: ADDR } as any);
		expect(getPath(http)).toBe(`/polymarket/trader/pnl/${ADDR}/candles`);
	});

	test("getTraderOutcomePnl", async () => {
		const http = mockHttp();
		const ns = new TraderNamespace(http, "polymarket");
		await ns.getTraderOutcomePnl({ address: ADDR } as any);
		expect(getPath(http)).toBe(`/polymarket/trader/pnl/${ADDR}/positions`);
	});

	test("getGlobalPnl", async () => {
		const http = mockHttp();
		const ns = new TraderNamespace(http, "polymarket");
		await ns.getGlobalPnl();
		expect(getPath(http)).toBe("/polymarket/trader/global_pnl");
	});

	test("address with special chars is URI-encoded", async () => {
		const http = mockHttp();
		const ns = new TraderNamespace(http, "polymarket");
		await ns.getTraderPnl({ address: "addr/special" } as any);
		expect(getPath(http)).toBe("/polymarket/trader/pnl/addr%2Fspecial");
	});
});

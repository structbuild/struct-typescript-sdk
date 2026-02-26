import { describe, expect, test, mock } from "bun:test";
import { HoldersNamespace } from "../../src/namespaces/holders.js";
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

describe("HoldersNamespace", () => {
	test("getMarketHolders builds correct path", async () => {
		const http = mockHttp();
		const ns = new HoldersNamespace(http, "polymarket");
		await ns.getMarketHolders({ condition_id: "abc" } as any);
		expect(getPath(http)).toBe("/polymarket/holders/markets");
	});

	test("getPositionHolders encodes positionId in path", async () => {
		const http = mockHttp();
		const ns = new HoldersNamespace(http, "polymarket");
		await ns.getPositionHolders({ positionId: "id/with/slash" } as any);
		expect(getPath(http)).toBe("/polymarket/holders/positions/id%2Fwith%2Fslash");
	});

	test("getPositionHolders separates positionId from query", async () => {
		const http = mockHttp();
		const ns = new HoldersNamespace(http, "polymarket");
		await ns.getPositionHolders({ positionId: "abc", limit: 10 } as any);
		const opts = getOptions(http);
		expect(opts.params.limit).toBe(10);
		expect(opts.params.positionId).toBeUndefined();
	});

	test("getMarketHoldersHistory builds correct path", async () => {
		const http = mockHttp();
		const ns = new HoldersNamespace(http, "polymarket");
		await ns.getMarketHoldersHistory({ condition_id: "abc" } as any);
		expect(getPath(http)).toBe("/polymarket/holders/markets/history");
	});

	test("getPositionHoldersHistory encodes positionId", async () => {
		const http = mockHttp();
		const ns = new HoldersNamespace(http, "polymarket");
		await ns.getPositionHoldersHistory({ positionId: "xyz" } as any);
		expect(getPath(http)).toBe("/polymarket/holders/positions/xyz/history");
	});
});

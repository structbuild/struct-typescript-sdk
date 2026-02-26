import { describe, expect, test, mock } from "bun:test";
import { Namespace, PlatformNamespace } from "../../src/namespaces/base.js";
import type { HttpClient } from "../../src/http.js";

function mockHttp() {
	return {
		get: mock(async () => ({ data: null, message: null, success: true })),
		post: mock(async () => ({ data: null, message: null, success: true })),
		put: mock(async () => ({ data: null, message: null, success: true })),
		delete: mock(async () => ({ data: null, message: null, success: true })),
	} as unknown as HttpClient;
}

class TestNamespace extends Namespace {
	testGet(path: string, venue?: string) {
		return this.get(venue as any, path);
	}
}

class TestPlatformNamespace extends PlatformNamespace {
	testGet(path: string) {
		return this.get(path);
	}
}

describe("Namespace", () => {
	test("prepends default venue to path", async () => {
		const http = mockHttp();
		const ns = new TestNamespace(http, "polymarket");
		await ns.testGet("/holders");
		expect((http.get as ReturnType<typeof mock>).mock.calls[0]![0]).toBe("/polymarket/holders");
	});

	test("uses override venue when provided", async () => {
		const http = mockHttp();
		const ns = new TestNamespace(http, "polymarket");
		await ns.testGet("/holders", "polymarket");
		expect((http.get as ReturnType<typeof mock>).mock.calls[0]![0]).toBe("/polymarket/holders");
	});
});

describe("PlatformNamespace", () => {
	test("uses raw path without venue prefix", async () => {
		const http = mockHttp();
		const ns = new TestPlatformNamespace(http);
		await ns.testGet("/webhooks");
		expect((http.get as ReturnType<typeof mock>).mock.calls[0]![0]).toBe("/webhooks");
	});
});

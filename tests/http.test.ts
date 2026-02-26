import { describe, expect, test, mock, beforeEach, afterEach } from "bun:test";
import { HttpClient } from "../src/http.js";
import { HttpError, NetworkError, TimeoutError } from "../src/errors.js";

const BASE = "https://api.test.com";

let originalFetch: typeof globalThis.fetch;

beforeEach(() => {
	originalFetch = globalThis.fetch;
});

afterEach(() => {
	globalThis.fetch = originalFetch;
});

function jsonResponse(data: unknown, status = 200, headers?: Record<string, string>) {
	return new Response(JSON.stringify(data), {
		status,
		statusText: status === 200 ? "OK" : "Error",
		headers: { "content-type": "application/json", ...headers },
	});
}

function apiResponse<T>(data: T) {
	return jsonResponse({ success: true, data, message: null });
}

function mockFetch(impl: (...args: any[]) => any) {
	const fn = mock(impl);
	globalThis.fetch = fn as any;
	return fn;
}

function lastFetchCall(fn: ReturnType<typeof mock>): [string, RequestInit] {
	return fn.mock.calls[0] as any;
}

describe("HttpClient URL building", () => {
	test("builds URL from base + path", async () => {
		const fn = mockFetch(async () => apiResponse({ id: 1 }));
		const client = new HttpClient({ baseUrl: BASE });
		await client.get("/users");
		expect(fn).toHaveBeenCalledTimes(1);
		expect(lastFetchCall(fn)[0]).toBe(`${BASE}/users`);
	});

	test("strips trailing slashes from baseUrl", async () => {
		const fn = mockFetch(async () => apiResponse(null));
		const client = new HttpClient({ baseUrl: `${BASE}///` });
		await client.get("/test");
		expect(lastFetchCall(fn)[0]).toBe(`${BASE}/test`);
	});

	test("appends query params, skipping undefined", async () => {
		const fn = mockFetch(async () => apiResponse([]));
		const client = new HttpClient({ baseUrl: BASE });
		await client.get("/items", { params: { limit: 10, offset: 0, filter: undefined } });
		const url = new URL(lastFetchCall(fn)[0]);
		expect(url.searchParams.get("limit")).toBe("10");
		expect(url.searchParams.get("offset")).toBe("0");
		expect(url.searchParams.has("filter")).toBe(false);
	});
});

describe("HttpClient response parsing", () => {
	test("unwraps API envelope (success/data/message)", async () => {
		mockFetch(async () => apiResponse({ name: "test" }));
		const client = new HttpClient({ baseUrl: BASE });
		const res = await client.get("/x");
		expect(res.data).toEqual({ name: "test" });
		expect(res.success).toBe(true);
		expect(res.message).toBeNull();
	});

	test("returns raw body when not envelope-shaped", async () => {
		mockFetch(async () => jsonResponse({ items: [1, 2] }));
		const client = new HttpClient({ baseUrl: BASE });
		const res = await client.get("/x");
		expect(res.data).toEqual({ items: [1, 2] });
	});

	test("returns text body when content-type is not json", async () => {
		mockFetch(async () =>
			new Response("hello", { status: 200, headers: { "content-type": "text/plain" } })
		);
		const client = new HttpClient({ baseUrl: BASE });
		const res = await client.get("/x");
		expect(res.data).toBe("hello");
	});

	test("handles 204 no-content", async () => {
		mockFetch(async () => new Response(null, { status: 204 }));
		const client = new HttpClient({ baseUrl: BASE });
		const res = await client.get("/x");
		expect(res.data).toBeUndefined();
		expect(res.success).toBe(true);
	});

	test("handles empty body", async () => {
		mockFetch(async () =>
			new Response("", { status: 200, headers: { "content-type": "application/json" } })
		);
		const client = new HttpClient({ baseUrl: BASE });
		const res = await client.get("/x");
		expect(res.data).toBeUndefined();
	});
});

describe("HttpClient error handling", () => {
	test("throws HttpError on non-ok response", async () => {
		mockFetch(async () =>
			new Response(JSON.stringify({ error: "not found" }), {
				status: 404,
				statusText: "Not Found",
				headers: { "content-type": "application/json" },
			})
		);
		const client = new HttpClient({ baseUrl: BASE });
		try {
			await client.get("/missing");
			throw new Error("should have thrown");
		} catch (err) {
			expect(err).toBeInstanceOf(HttpError);
			const httpErr = err as HttpError;
			expect(httpErr.status).toBe(404);
			expect(httpErr.body).toEqual({ error: "not found" });
		}
	});

	test("throws NetworkError on fetch failure", async () => {
		mockFetch(async () => {
			throw new Error("ECONNREFUSED");
		});
		const client = new HttpClient({ baseUrl: BASE });
		try {
			await client.get("/x");
			throw new Error("should have thrown");
		} catch (err) {
			expect(err).toBeInstanceOf(NetworkError);
		}
	});

	test("throws TimeoutError when request exceeds timeout", async () => {
		mockFetch(async (_url: string, init: RequestInit) => {
			await new Promise((_, reject) => {
				init.signal!.addEventListener("abort", () => {
					reject(new DOMException("The operation was aborted.", "AbortError"));
				});
			});
			return new Response();
		});
		const client = new HttpClient({ baseUrl: BASE, timeout: 10 });
		try {
			await client.get("/slow");
			throw new Error("should have thrown");
		} catch (err) {
			expect(err).toBeInstanceOf(TimeoutError);
		}
	});
});

describe("HttpClient retry", () => {
	test("retries on 429 and succeeds", async () => {
		let calls = 0;
		mockFetch(async () => {
			calls++;
			if (calls === 1) {
				return new Response(JSON.stringify({ error: "rate limited" }), {
					status: 429,
					statusText: "Too Many Requests",
					headers: { "content-type": "application/json" },
				});
			}
			return apiResponse({ ok: true });
		});
		const client = new HttpClient({
			baseUrl: BASE,
			retry: { maxRetries: 2, initialDelayMs: 0 },
		});
		const res = await client.get("/x");
		expect(res.data).toEqual({ ok: true });
		expect(calls).toBe(2);
	});

	test("retries on 500 and eventually throws if all fail", async () => {
		const fn = mockFetch(async () =>
			new Response(JSON.stringify({ error: "fail" }), {
				status: 500,
				statusText: "Internal Server Error",
				headers: { "content-type": "application/json" },
			})
		);
		const client = new HttpClient({
			baseUrl: BASE,
			retry: { maxRetries: 2, initialDelayMs: 0 },
		});
		try {
			await client.get("/x");
			throw new Error("should have thrown");
		} catch (err) {
			expect(err).toBeInstanceOf(HttpError);
			expect((err as HttpError).status).toBe(500);
		}
		expect(fn).toHaveBeenCalledTimes(3);
	});

	test("does not retry on 400", async () => {
		const fn = mockFetch(async () =>
			new Response("bad", { status: 400, statusText: "Bad Request" })
		);
		const client = new HttpClient({
			baseUrl: BASE,
			retry: { maxRetries: 2, initialDelayMs: 0 },
		});
		try {
			await client.get("/x");
		} catch {}
		expect(fn).toHaveBeenCalledTimes(1);
	});
});

describe("HttpClient headers", () => {
	test("sends default headers", async () => {
		const fn = mockFetch(async () => apiResponse(null));
		const client = new HttpClient({
			baseUrl: BASE,
			defaultHeaders: { "X-API-Key": "key123" },
		});
		await client.get("/x");
		expect((lastFetchCall(fn)[1].headers as Record<string, string>)["X-API-Key"]).toBe("key123");
	});

	test("sets Content-Type for POST with body", async () => {
		const fn = mockFetch(async () => apiResponse(null));
		const client = new HttpClient({ baseUrl: BASE });
		await client.post("/x", { name: "test" });
		expect((lastFetchCall(fn)[1].headers as Record<string, string>)["Content-Type"]).toBe("application/json");
	});
});

describe("HttpClient hooks", () => {
	test("calls onRequest hook", async () => {
		mockFetch(async () => apiResponse(null));
		const onRequest = mock(async (_info: any) => {});
		const client = new HttpClient({ baseUrl: BASE, onRequest });
		await client.get("/hook-test");
		expect(onRequest).toHaveBeenCalledTimes(1);
		const arg = onRequest.mock.calls[0]![0] as any;
		expect(arg.method).toBe("GET");
		expect(arg.url).toContain("/hook-test");
	});

	test("calls onResponse hook", async () => {
		mockFetch(async () => apiResponse(null));
		const onResponse = mock(async (_info: any) => {});
		const client = new HttpClient({ baseUrl: BASE, onResponse });
		await client.get("/hook-test");
		expect(onResponse).toHaveBeenCalledTimes(1);
		const arg = onResponse.mock.calls[0]![0] as any;
		expect(arg.status).toBe(200);
		expect(typeof arg.durationMs).toBe("number");
	});
});

describe("HttpClient methods", () => {
	test("post sends JSON body", async () => {
		const fn = mockFetch(async () => apiResponse({ id: 1 }));
		const client = new HttpClient({ baseUrl: BASE });
		await client.post("/items", { name: "new" });
		expect(lastFetchCall(fn)[1].method).toBe("POST");
		expect(lastFetchCall(fn)[1].body).toBe(JSON.stringify({ name: "new" }));
	});

	test("put sends JSON body", async () => {
		const fn = mockFetch(async () => apiResponse(null));
		const client = new HttpClient({ baseUrl: BASE });
		await client.put("/items/1", { name: "updated" });
		expect(lastFetchCall(fn)[1].method).toBe("PUT");
	});

	test("delete sends DELETE method", async () => {
		const fn = mockFetch(async () => apiResponse(null));
		const client = new HttpClient({ baseUrl: BASE });
		await client.delete("/items/1");
		expect(lastFetchCall(fn)[1].method).toBe("DELETE");
	});
});

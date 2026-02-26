import { describe, expect, test } from "bun:test";
import {
	StructError,
	HttpError,
	NetworkError,
	TimeoutError,
	WebSocketError,
	WebSocketClosedError,
} from "../src/errors.js";

describe("StructError", () => {
	test("sets message and name", () => {
		const err = new StructError("boom");
		expect(err.message).toBe("boom");
		expect(err.name).toBe("StructError");
	});

	test("is instanceof Error", () => {
		expect(new StructError("x")).toBeInstanceOf(Error);
	});

	test("accepts cause option", () => {
		const cause = new Error("root");
		const err = new StructError("wrapped", { cause });
		expect(err.cause).toBe(cause);
	});
});

describe("HttpError", () => {
	test("sets status, statusText, body, and message", () => {
		const err = new HttpError(404, "Not Found", { detail: "gone" });
		expect(err.status).toBe(404);
		expect(err.statusText).toBe("Not Found");
		expect(err.body).toEqual({ detail: "gone" });
		expect(err.message).toBe("HTTP 404: Not Found");
		expect(err.name).toBe("HttpError");
	});

	test("stores response headers", () => {
		const headers = new Headers({ "x-req-id": "abc" });
		const err = new HttpError(500, "Internal", null, headers);
		expect(err.responseHeaders?.get("x-req-id")).toBe("abc");
	});

	test("is instanceof StructError and Error", () => {
		const err = new HttpError(400, "Bad", null);
		expect(err).toBeInstanceOf(StructError);
		expect(err).toBeInstanceOf(Error);
	});
});

describe("NetworkError", () => {
	test("sets message and name", () => {
		const err = new NetworkError("offline");
		expect(err.message).toBe("offline");
		expect(err.name).toBe("NetworkError");
	});

	test("is instanceof StructError", () => {
		expect(new NetworkError("x")).toBeInstanceOf(StructError);
	});
});

describe("TimeoutError", () => {
	test("formats message with timeout value", () => {
		const err = new TimeoutError(5000);
		expect(err.message).toBe("Request timed out after 5000ms");
		expect(err.name).toBe("TimeoutError");
	});

	test("is instanceof StructError", () => {
		expect(new TimeoutError(1000)).toBeInstanceOf(StructError);
	});
});

describe("WebSocketError", () => {
	test("sets message and name", () => {
		const err = new WebSocketError("ws fail");
		expect(err.message).toBe("ws fail");
		expect(err.name).toBe("WebSocketError");
	});

	test("is instanceof StructError", () => {
		expect(new WebSocketError("x")).toBeInstanceOf(StructError);
	});
});

describe("WebSocketClosedError", () => {
	test("sets code, reason, and formatted message", () => {
		const err = new WebSocketClosedError(1006, "abnormal");
		expect(err.code).toBe(1006);
		expect(err.reason).toBe("abnormal");
		expect(err.message).toBe("WebSocket closed: 1006 abnormal");
		expect(err.name).toBe("WebSocketClosedError");
	});

	test("is instanceof WebSocketError and StructError", () => {
		const err = new WebSocketClosedError(1000, "normal");
		expect(err).toBeInstanceOf(WebSocketError);
		expect(err).toBeInstanceOf(StructError);
		expect(err).toBeInstanceOf(Error);
	});
});

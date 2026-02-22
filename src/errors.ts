export class StructError extends Error {
	constructor(message: string, options?: ErrorOptions) {
		super(message, options);
		this.name = "StructError";
	}
}

export class HttpError extends StructError {
	readonly status: number;
	readonly statusText: string;
	readonly body: unknown;
	readonly responseHeaders: Headers | undefined;

	constructor(status: number, statusText: string, body: unknown, responseHeaders?: Headers) {
		super(`HTTP ${status}: ${statusText}`);
		this.name = "HttpError";
		this.status = status;
		this.statusText = statusText;
		this.body = body;
		this.responseHeaders = responseHeaders;
	}
}

export class NetworkError extends StructError {
	constructor(message: string, options?: ErrorOptions) {
		super(message, options);
		this.name = "NetworkError";
	}
}

export class TimeoutError extends StructError {
	constructor(timeout: number) {
		super(`Request timed out after ${timeout}ms`);
		this.name = "TimeoutError";
	}
}

export class WebSocketError extends StructError {
	constructor(message: string, options?: ErrorOptions) {
		super(message, options);
		this.name = "WebSocketError";
	}
}

export class WebSocketClosedError extends WebSocketError {
	readonly code: number;
	readonly reason: string;

	constructor(code: number, reason: string) {
		super(`WebSocket closed: ${code} ${reason}`);
		this.name = "WebSocketClosedError";
		this.code = code;
		this.reason = reason;
	}
}

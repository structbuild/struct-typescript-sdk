import { HttpError, NetworkError, StructError, TimeoutError } from "./errors.js";
import type { HttpClientConfig, HttpResponse, RequestOptions, RequestHookInfo, ResponseHookInfo, RetryConfig, ApiResponseInfo } from "./types/http.js";

const DEFAULT_TIMEOUT = 30_000;
const DEFAULT_MAX_RETRIES = 3;
const DEFAULT_INITIAL_DELAY_MS = 1_000;
const DEFAULT_MAX_DELAY_MS = 30_000;
const RETRYABLE_STATUSES = new Set([429, 500, 502, 503, 504]);

export class HttpClient {
	private readonly baseUrl: string;
	private readonly defaultHeaders: Record<string, string>;
	private readonly timeout: number;
	private readonly retry: RetryConfig | undefined;
	private readonly onRequest: ((info: RequestHookInfo) => void | Promise<void>) | undefined;
	private readonly onResponse: ((info: ResponseHookInfo) => void | Promise<void>) | undefined;

	constructor(config: HttpClientConfig) {
		this.baseUrl = config.baseUrl.replace(/\/+$/, "");
		this.defaultHeaders = config.defaultHeaders ?? {};
		this.timeout = config.timeout ?? DEFAULT_TIMEOUT;
		this.retry = config.retry;
		this.onRequest = config.onRequest;
		this.onResponse = config.onResponse;
	}

	async get<T>(path: string, options?: RequestOptions): Promise<HttpResponse<T>> {
		return this.request<T>("GET", path, options);
	}

	private async request<T>(method: string, path: string, options?: RequestOptions): Promise<HttpResponse<T>> {
		const maxRetries = this.retry
			? (this.retry.maxRetries ?? DEFAULT_MAX_RETRIES)
			: 0;
		const initialDelay = this.retry?.initialDelayMs ?? DEFAULT_INITIAL_DELAY_MS;
		const maxDelay = this.retry?.maxDelayMs ?? DEFAULT_MAX_DELAY_MS;

		let lastError: unknown;

		for (let attempt = 0; attempt <= maxRetries; attempt++) {
			if (attempt > 0 && lastError !== undefined) {
				const retryAfter = lastError instanceof HttpError
					? this.parseRetryAfter(lastError)
					: undefined;
				const exponentialDelay = Math.min(initialDelay * 2 ** (attempt - 1), maxDelay);
				const delay = retryAfter ?? exponentialDelay;
				await this.sleep(delay, options?.signal);
			}

			try {
				return await this.executeRequest<T>(method, path, options);
			} catch (error) {
				if (attempt < maxRetries && this.shouldRetry(error)) {
					lastError = error;
					continue;
				}
				throw error;
			}
		}

		if (lastError instanceof Error) {
			throw lastError;
		}
		throw new NetworkError("Request failed after retries");
	}

	private async executeRequest<T>(method: string, path: string, options?: RequestOptions): Promise<HttpResponse<T>> {
		const url = this.buildUrl(path, options?.params);
		const headers = { ...this.defaultHeaders, ...options?.headers };

		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), this.timeout);

		const signal = options?.signal ? AbortSignal.any([options.signal, controller.signal]) : controller.signal;

		try {
			if (this.onRequest) {
				try { await this.onRequest({ method, url, headers }); } catch {}
			}

			const startTime = performance.now();
			const response = await fetch(url, { method, headers, signal });

			if (this.onResponse) {
				try {
					await this.onResponse({
						method,
						url,
						status: response.status,
						headers: response.headers,
						durationMs: performance.now() - startTime,
					});
				} catch {}
			}

			if (!response.ok) {
				let body: unknown;
				try {
					body = await response.json();
				} catch {
					body = await response.text();
				}
				throw new HttpError(response.status, response.statusText, body, response.headers);
			}

			return await this.parseApiResponse<T>(response, method);
		} catch (error) {
			if (error instanceof HttpError) throw error;
			if (error instanceof SyntaxError || error instanceof TypeError) {
				throw new StructError("Failed to parse HTTP response body", { cause: error });
			}

			if (error instanceof DOMException && error.name === "AbortError") {
				if (options?.signal?.aborted) throw error;
				throw new TimeoutError(this.timeout);
			}

			throw new NetworkError("Network request failed", { cause: error });
		} finally {
			clearTimeout(timeoutId);
		}
	}

	private shouldRetry(error: unknown): boolean {
		if (error instanceof HttpError) {
			return RETRYABLE_STATUSES.has(error.status);
		}
		return error instanceof NetworkError || error instanceof TimeoutError;
	}

	private async parseApiResponse<T>(response: Response, method: string): Promise<HttpResponse<T>> {
		if (method === "HEAD" || response.status === 204 || response.status === 205) {
			return { data: undefined as T, message: null, success: true };
		}

		const text = await response.text();
		if (text.length === 0) {
			return { data: undefined as T, message: null, success: true };
		}

		const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
		if (!contentType.includes("json")) {
			return { data: text as T, message: null, success: true };
		}

		const body = JSON.parse(text);

		if (body && typeof body === "object" && "success" in body && "data" in body) {
			return {
				data: body.data as T,
				message: body.message ?? null,
				success: body.success,
				info: body.info as ApiResponseInfo | undefined,
			};
		}

		return { data: body as T, message: null, success: true };
	}

	private parseRetryAfter(error: HttpError): number | undefined {
		const header = error.responseHeaders?.get("retry-after");
		if (!header) return undefined;

		const seconds = Number(header);
		if (!Number.isNaN(seconds) && seconds > 0) return seconds * 1_000;

		const date = Date.parse(header);
		if (!Number.isNaN(date)) {
			const delay = date - Date.now();
			return delay > 0 ? delay : undefined;
		}

		return undefined;
	}

	private sleep(ms: number, signal?: AbortSignal): Promise<void> {
		return new Promise((resolve, reject) => {
			if (signal?.aborted) {
				reject(signal.reason);
				return;
			}
			const timer = setTimeout(resolve, ms);
			signal?.addEventListener("abort", () => {
				clearTimeout(timer);
				reject(signal.reason);
			}, { once: true });
		});
	}

	private buildUrl(path: string, params?: Record<string, string | number | boolean | undefined>): string {
		const url = new URL(this.baseUrl + path);

		if (params) {
			for (const [key, value] of Object.entries(params)) {
				if (value !== undefined) {
					url.searchParams.set(key, String(value));
				}
			}
		}

		return url.toString();
	}
}

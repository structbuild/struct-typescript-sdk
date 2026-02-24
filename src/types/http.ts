export interface RetryConfig {
	maxRetries?: number;
	initialDelayMs?: number;
	maxDelayMs?: number;
}

export interface RequestHookInfo {
	method: string;
	url: string;
	headers: Record<string, string>;
}

export interface ResponseHookInfo {
	method: string;
	url: string;
	status: number;
	headers: Headers;
	durationMs: number;
}

export interface HttpClientConfig {
	baseUrl: string;
	defaultHeaders?: Record<string, string>;
	timeout?: number;
	retry?: RetryConfig;
	onRequest?: (info: RequestHookInfo) => void | Promise<void>;
	onResponse?: (info: ResponseHookInfo) => void | Promise<void>;
}

export interface RequestOptions {
	headers?: Record<string, string>;
	params?: Record<string, string | number | boolean | undefined>;
	signal?: AbortSignal;
}

export interface ApiResponseInfo {
	version: string;
	time_taken_ms: number;
	credits_consumed: number;
	compute_time_ms: number;
}

export interface PaginationInfo {
	has_more: boolean;
	pagination_key: string | number | null;
}

export interface HttpResponse<T> {
	data: T;
	message: string | null;
	success: boolean;
	info?: ApiResponseInfo;
	pagination?: PaginationInfo;
}

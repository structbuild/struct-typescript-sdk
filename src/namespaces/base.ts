import type { HttpClient } from "../http.js";
import type { HttpResponse, RequestOptions } from "../types/http.js";
import type { Venue } from "../types/common.js";

export function encodePathParam(value: string): string {
	try {
		return encodeURIComponent(decodeURIComponent(value));
	} catch {
		return encodeURIComponent(value);
	}
}

export class Namespace {
	protected readonly http: HttpClient;
	protected readonly defaultVenue: Venue;

	constructor(http: HttpClient, defaultVenue: Venue) {
		this.http = http;
		this.defaultVenue = defaultVenue;
	}

	protected get<T>(venue: Venue | undefined, path: string, options?: RequestOptions): Promise<HttpResponse<T>> {
		return this.http.get<T>(`/${venue ?? this.defaultVenue}${path}`, options);
	}

	protected post<T>(venue: Venue | undefined, path: string, body?: unknown, options?: RequestOptions): Promise<HttpResponse<T>> {
		return this.http.post<T>(`/${venue ?? this.defaultVenue}${path}`, body, options);
	}

	protected put<T>(venue: Venue | undefined, path: string, body?: unknown, options?: RequestOptions): Promise<HttpResponse<T>> {
		return this.http.put<T>(`/${venue ?? this.defaultVenue}${path}`, body, options);
	}

	protected delete<T>(venue: Venue | undefined, path: string, options?: RequestOptions): Promise<HttpResponse<T>> {
		return this.http.delete<T>(`/${venue ?? this.defaultVenue}${path}`, options);
	}
}

export class PlatformNamespace {
	protected readonly http: HttpClient;

	constructor(http: HttpClient) {
		this.http = http;
	}

	protected get<T>(path: string, options?: RequestOptions): Promise<HttpResponse<T>> {
		return this.http.get<T>(path, options);
	}

	protected post<T>(path: string, body?: unknown, options?: RequestOptions): Promise<HttpResponse<T>> {
		return this.http.post<T>(path, body, options);
	}

	protected put<T>(path: string, body?: unknown, options?: RequestOptions): Promise<HttpResponse<T>> {
		return this.http.put<T>(path, body, options);
	}

	protected delete<T>(path: string, options?: RequestOptions): Promise<HttpResponse<T>> {
		return this.http.delete<T>(path, options);
	}
}

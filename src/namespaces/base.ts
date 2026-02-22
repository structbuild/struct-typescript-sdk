import type { HttpClient } from "../http.js";
import type { HttpResponse, RequestOptions } from "../types/http.js";
import type { Venue } from "../types/common.js";

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
}

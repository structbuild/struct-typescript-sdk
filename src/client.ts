import { HttpClient } from "./http.js";
import type { Venue } from "./types/common.js";
import type { RetryConfig, RequestHookInfo, ResponseHookInfo } from "./types/index.js";
import {
	AssetsNamespace,
	HoldersNamespace,
	TagsNamespace,
	EventsNamespace,
	MarketsNamespace,
	SeriesNamespace,
	TraderNamespace,
	BondsNamespace,
	SearchNamespace,
	AnalyticsNamespace,
	OrderBookNamespace,
	WebhooksNamespace,
} from "./namespaces/index.js";

const DEFAULT_BASE_URL = "https://api.struct.to/v1";

export interface StructClientConfig {
	apiKey: string;
	jwt?: string;
	baseUrl?: string;
	venue?: Venue;
	headers?: Record<string, string>;
	timeout?: number;
	retry?: RetryConfig;
	onRequest?: (info: RequestHookInfo) => void | Promise<void>;
	onResponse?: (info: ResponseHookInfo) => void | Promise<void>;
}

export class StructClient {
	readonly assets: AssetsNamespace;
	readonly holders: HoldersNamespace;
	readonly tags: TagsNamespace;
	readonly events: EventsNamespace;
	readonly markets: MarketsNamespace;
	readonly series: SeriesNamespace;
	readonly trader: TraderNamespace;
	readonly bonds: BondsNamespace;
	readonly search: SearchNamespace;
	readonly analytics: AnalyticsNamespace;
	readonly orderBook: OrderBookNamespace;
	readonly webhooks: WebhooksNamespace;

	constructor(config: StructClientConfig) {
		const authHeaders: Record<string, string> = {
			"X-API-Key": config.apiKey,
		};
		if (config.jwt) {
			authHeaders["Authorization"] = `Bearer ${config.jwt}`;
		}

		const http = new HttpClient({
			baseUrl: config.baseUrl ?? DEFAULT_BASE_URL,
			defaultHeaders: {
				...authHeaders,
				...config.headers,
			},
			timeout: config.timeout,
			retry: config.retry,
			onRequest: config.onRequest,
			onResponse: config.onResponse,
		});

		const venue = config.venue ?? "polymarket";
		this.assets = new AssetsNamespace(http, venue);
		this.holders = new HoldersNamespace(http, venue);
		this.tags = new TagsNamespace(http, venue);
		this.events = new EventsNamespace(http, venue);
		this.markets = new MarketsNamespace(http, venue);
		this.series = new SeriesNamespace(http, venue);
		this.trader = new TraderNamespace(http, venue);
		this.bonds = new BondsNamespace(http, venue);
		this.search = new SearchNamespace(http, venue);
		this.analytics = new AnalyticsNamespace(http, venue);
		this.orderBook = new OrderBookNamespace(http, venue);
		this.webhooks = new WebhooksNamespace(http);
	}
}

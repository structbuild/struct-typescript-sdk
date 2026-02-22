import { HttpClient } from "./http.js";
import type { Venue } from "./types/common.js";
import type { RetryConfig, RequestHookInfo, ResponseHookInfo } from "./types/index.js";
import {
	HoldersNamespace,
	ScoringNamespace,
	TagsNamespace,
	EventsNamespace,
	MarketsNamespace,
	SeriesNamespace,
	TraderNamespace,
	BondsNamespace,
	SearchNamespace,
} from "./namespaces/index.js";

const DEFAULT_BASE_URL = "https://api.struct.to/v1";

export interface StructClientConfig {
	apiKey: string;
	baseUrl?: string;
	venue?: Venue;
	headers?: Record<string, string>;
	timeout?: number;
	retry?: RetryConfig;
	onRequest?: (info: RequestHookInfo) => void | Promise<void>;
	onResponse?: (info: ResponseHookInfo) => void | Promise<void>;
}

export class StructClient {
	readonly holders: HoldersNamespace;
	readonly scoring: ScoringNamespace;
	readonly tags: TagsNamespace;
	readonly events: EventsNamespace;
	readonly markets: MarketsNamespace;
	readonly series: SeriesNamespace;
	readonly trader: TraderNamespace;
	readonly bonds: BondsNamespace;
	readonly search: SearchNamespace;

	constructor(config: StructClientConfig) {
		const http = new HttpClient({
			baseUrl: config.baseUrl ?? DEFAULT_BASE_URL,
			defaultHeaders: {
				Authorization: `Bearer ${config.apiKey}`,
				...config.headers,
			},
			timeout: config.timeout,
			retry: config.retry,
			onRequest: config.onRequest,
			onResponse: config.onResponse,
		});

		const venue = config.venue ?? "polymarket";
		this.holders = new HoldersNamespace(http, venue);
		this.scoring = new ScoringNamespace(http, venue);
		this.tags = new TagsNamespace(http, venue);
		this.events = new EventsNamespace(http, venue);
		this.markets = new MarketsNamespace(http, venue);
		this.series = new SeriesNamespace(http, venue);
		this.trader = new TraderNamespace(http, venue);
		this.bonds = new BondsNamespace(http, venue);
		this.search = new SearchNamespace(http, venue);
	}
}

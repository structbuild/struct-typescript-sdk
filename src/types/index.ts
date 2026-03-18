export type { components, operations, paths } from "../generated/polymarket.js";
export type { Schemas, OperationQuery, OperationPath, OperationResponse, OperationQueryOf, OperationPathOf, OperationResponseOf, OperationRequestBodyOf } from "./helpers.js";
export type {
	WebhookSchemas,
	WebhookOperationQuery,
	WebhookOperationPath,
	WebhookOperationResponse,
	WebhookOperationRequestBody,
} from "./webhook-helpers.js";
export type {
	components as WebhookComponents,
	operations as WebhookOperations,
	paths as WebhookPaths,
} from "../generated/webhooks.js";
export type { WsSchemas } from "./ws-helpers.js";
export type {
	components as WsComponents,
} from "../generated/ws.js";

import type { Schemas, OperationQuery } from "./helpers.js";
import type { WebhookSchemas, WebhookOperationQuery, WebhookOperationRequestBody } from "./webhook-helpers.js";

type TimeframeKey = Schemas["MetricsTimeframe"];
type TimeframeRecord<V> = Partial<Record<TimeframeKey, V>>;

export type BondMarket = Schemas["BondMarket"];
export type BondOutcome = Schemas["BondOutcome"];
export type CandlestickResolution = Schemas["CandlestickResolution"];
export type ClobReward = Schemas["ClobReward"];
export type ConditionMetricsResponse = Schemas["ConditionMetricsResponse"];
export type EventMarket = Schemas["EventMarket"];
export type EventMarketOutcome = Schemas["EventMarketOutcome"];
export type EventMetricsResponse = Schemas["EventMetricsResponse"];
export type EventPnlSortBy = Schemas["EventPnlSortBy"];
export type EventSortBy = Schemas["EventSortBy"];
export type GlobalPnlSortBy = Schemas["GlobalPnlSortBy"];
export type GlobalPnlTrader = Schemas["GlobalPnlTrader"];
export type Holder = Schemas["Holder"];
export type HolderHistoryCandle = Schemas["HolderHistoryCandle"];
export type HolderPnl = Schemas["HolderPnl"];
export type MarketHoldersResponse = Schemas["MarketHoldersResponse"];
export type MarketMetadata = Omit<Schemas["MarketMetadata"], "metrics"> & {
	metrics: TimeframeRecord<number>;
};
export type MarketMetadataOutcome = Omit<Schemas["MarketMetadataOutcome"], "metrics"> & {
	metrics?: TimeframeRecord<OutcomeTimeframeMetrics>;
};
export type MarketOutcome = Schemas["MarketOutcome"];
export type MarketPnlSortBy = Schemas["MarketPnlSortBy"];
export type MarketVolumeChartResponse = Schemas["MarketVolumeChartResponse"];
export type MarketVolumeDataPoint = Schemas["MarketVolumeDataPoint"];
export type MetricsTimeframe = Schemas["MetricsTimeframe"];
export type OutcomeHolders = Schemas["OutcomeHolders"];
export type OutcomeTimeframeMetrics = Schemas["OutcomeTimeframeMetrics"];
export type PaginationMeta = Schemas["PaginationMeta"];
export type PnlCandleResolution = Schemas["PnlCandleResolution"];
export type PnlTimeframe = Schemas["PnlTimeframe"];
export type Event = Omit<Schemas["PolymarketEvent"], "metrics"> & {
	metrics: TimeframeRecord<SimpleTimeframeMetrics>;
};
export type PolymarketSeries = Schemas["PolymarketSeries"];
export type Tag = Schemas["PolymarketTag"];
export type UserProfile = Schemas["PolymarketUserProfile"];
export type PositionHoldersResponse = Schemas["PositionHoldersResponse"];
export type PositionMetricsResponse = Schemas["PositionMetricsResponse"];
export type PositionVolumeChartResponse = Schemas["PositionVolumeChartResponse"];
export type PositionVolumeDataPoint = Schemas["PositionVolumeDataPoint"];
export type PredictionCandlestickBar = Schemas["PredictionCandlestickBar"];
export type PredictionTradeResponse = Schemas["PredictionTradeResponse"];
export type SearchResponse = Schemas["SearchResponse"];
export type SearchSortBy = Schemas["SearchSortBy"];
export type SimpleTimeframeMetrics = Schemas["SimpleTimeframeMetrics"];
export type SortDirection = Schemas["SortDirection"];
export type SpikeDirection = Schemas["SpikeDirection"];
export type TokenOutcome = Schemas["TokenOutcome"];
export type Trader = Schemas["Trader"];
export type TraderInfo = Schemas["TraderInfo"];
export type TraderVolumeChartResponse = Schemas["TraderVolumeChartResponse"];
export type TraderOutcomePnlEntry = Schemas["TraderOutcomePnlEntry"];
export type TraderVolumeDataPoint = Schemas["TraderVolumeDataPoint"];
export type PositionPnlSortBy = Schemas["PositionPnlSortBy"];
export type EventMarketChartOutcome = Schemas["EventMarketChartOutcome"];
export type PositionChartOutcome = Schemas["PositionChartOutcome"];
export type AssetPriceHistoryRow = Schemas["AssetPriceHistoryRow"];
export type AssetSymbol = Schemas["AssetSymbol"];
export type AssetVariant = Schemas["AssetVariant"];
export type PriceJump = Schemas["PriceJump"];
export type EventMarketChartDataPoint = Schemas["EventMarketChartDataPoint"];
export type MarketResponse = Omit<Schemas["MarketResponse"], "metrics"> & {
	metrics?: TimeframeRecord<SimpleTimeframeMetrics>;
};
export type MarketReward = Schemas["MarketReward"];
export type MarketSortBy = Schemas["MarketSortBy"];
export type MarketStatus = Schemas["MarketStatus"];
export type OutcomeIndex = Schemas["OutcomeIndex"];
export type PositionChartDataPoint = Schemas["PositionChartDataPoint"];
export type TradeType = Schemas["TradeType"];
export type WebhookAssetSymbol = Schemas["WebhookAssetSymbol"];
export type WebhookTimeframe = Schemas["WebhookTimeframe"];
export type ConditionOrderbookRow = Schemas["ConditionOrderbookRow"];
export type OrderbookHistoryRow = Schemas["OrderbookHistoryRow"];
export type OrderbookLevel = Schemas["OrderbookLevel"];
export type OrderbookSnapshotRow = Schemas["OrderbookSnapshotRow"];
export type SpreadRow = Schemas["SpreadRow"];

export type Series = Schemas["PolymarketSeries"];
export type Trade = Schemas["PredictionTradeResponse"];
export type Candlestick = Schemas["PredictionCandlestickBar"];
export type CandlestickResponse = Schemas["PredictionCandlestickBar"][];
export type Timeframe = Schemas["MetricsTimeframe"];
export type GlobalPnlTimeframe = Schemas["PnlTimeframe"];

export type TradeSide = "Buy" | "Sell";
export type EventStatus = "active" | "resolved" | "ended" | "archived";
export type HolderSortBy = "shares_held" | "total_cost_usd" | "unrealized_pnl_usd";

export interface TraderMarketPnlEntry {
	condition_id: string | null;
	event_slug: string | null;
	outcomes_traded: number | null;
	total_buys: number | null;
	total_sells: number | null;
	total_redemptions: number | null;
	total_merges: number | null;
	buy_usd: number | null;
	sell_usd: number | null;
	redemption_usd: number | null;
	merge_usd: number | null;
	realized_pnl_usd: number | null;
	has_open_position: boolean | null;
	net_yes_shares: number | null;
	net_no_shares: number | null;
	winning_outcomes: number | null;
	losing_outcomes: number | null;
	total_fees: number | null;
	first_trade_at: number | null;
	last_trade_at: number | null;
}

export interface TraderEventPnlEntry {
	event_slug: string | null;
	markets_traded: number | null;
	outcomes_traded: number | null;
	total_buys: number | null;
	total_sells: number | null;
	total_redemptions: number | null;
	total_merges: number | null;
	total_volume_usd: number | null;
	buy_usd: number | null;
	sell_usd: number | null;
	redemption_usd: number | null;
	merge_usd: number | null;
	realized_pnl_usd: number | null;
	winning_markets: number | null;
	losing_markets: number | null;
	total_fees: number | null;
	first_trade_at: number | null;
	last_trade_at: number | null;
}

export type PnlCandleEntry = Schemas["PnlCandleEntry"];

export interface PnlListResponse<T> {
	data: T[];
	total_count: number;
}

export interface TraderSearchResult {
	address: string;
	name?: string;
	pseudonym?: string;
	profile_image?: string;
	x_username?: string;
	verified_badge: boolean;
}

export interface GetOrderBookParams extends OperationQuery<"get_order_book"> {}

export interface GetOrderBookHistoryParams extends OperationQuery<"get_order_book_history"> {}

export interface GetMarketOrderBookParams extends OperationQuery<"get_market_order_book"> {}

export interface GetSpreadHistoryParams extends OperationQuery<"get_spread_history"> {}

export interface GetAssetHistoryParams extends OperationQuery<"get_asset_history"> {}

export interface GetBondsParams extends OperationQuery<"get_bonds"> {}

export interface GetEventsParams extends OperationQuery<"get_events"> {}

export interface GetEventParams extends OperationQuery<"get_event"> {
	identifier: string;
}

export interface GetEventBySlugParams extends OperationQuery<"get_event_by_slug"> {
	slug: string;
}

export interface GetEventMetricsParams extends OperationQuery<"get_event_metrics"> {}

export interface GetMarketMetricsParams extends OperationQuery<"get_market_metrics"> {}

export interface GetPositionMetricsParams extends OperationQuery<"get_position_metrics"> {}

export interface GetMarketHoldersParams extends OperationQuery<"get_market_holders"> {}

export interface GetMarketHoldersHistoryParams extends OperationQuery<"get_market_holders_history"> {}

export interface GetPositionHoldersParams extends OperationQuery<"get_position_holders"> {
	positionId: string;
}

export interface GetPositionHoldersHistoryParams {
	positionId: string;
	hours?: number;
}

export interface GetMarketsParams extends OperationQuery<"list_markets"> {}

export interface GetMarketParams extends OperationQuery<"get_market"> {
	conditionId: string;
}

export interface GetMarketBySlugParams extends OperationQuery<"get_market_by_slug"> {
	slug: string;
}

export interface GetCandlestickParams extends OperationQuery<"get_market_candlestick"> {}

export interface GetPositionCandlestickParams extends OperationQuery<"get_position_candlestick"> {}

export interface GetMarketVolumeChartParams extends OperationQuery<"get_market_volume_chart"> {}

export interface GetPositionVolumeChartParams extends OperationQuery<"get_position_volume_chart"> {}

export interface GetTradesParams extends OperationQuery<"get_market_trades"> {}

export interface GetSearchParams extends OperationQuery<"search"> {}

export interface GetSeriesListParams extends OperationQuery<"get_series_list"> {}

export interface GetSeriesOutcomesParams extends OperationQuery<"get_series_outcomes"> {}

export interface GetTagsParams extends OperationQuery<"get_tags"> {}

export interface GetTagParams {
	identifier: string;
}

export interface GetEventOutcomesParams extends OperationQuery<"get_event_outcomes"> {}

export interface GetEventChartParams extends OperationQuery<"get_event_chart"> {}

export interface GetMarketChartParams extends OperationQuery<"get_chart"> {}

export interface GetPriceJumpsParams extends OperationQuery<"get_price_jumps"> {}

export interface GetGlobalPnlParams extends OperationQuery<"get_global_pnl"> {}

export interface GetTraderPnlParams {
	address: string;
	timeframe?: PnlTimeframe;
}

export interface GetTraderPnlBreakdownParams {
	address: string;
	timeframe?: PnlTimeframe;
	sort_by?: string;
	sort_direction?: SortDirection;
	limit?: number;
	pagination_key?: number;
	condition_id?: string;
	event_slug?: string;
}

export interface GetTraderPositionPnlParams extends OperationQuery<"get_trader_position_pnl"> {
	address: string;
}

export interface GetTraderPnlCandlesParams extends OperationQuery<"get_trader_pnl_candles"> {
	address: string;
}

export interface GetTraderTradesParams extends OperationQuery<"get_trader_trades"> {
	address: string;
}

export interface GetTraderProfileParams {
	address: string;
}

export interface GetTraderProfilesBatchParams {
	addresses: string;
}

export interface GetTraderVolumeChartParams extends OperationQuery<"get_trader_volume_chart"> {
	address: string;
}

export type WebhookResponse = WebhookSchemas["WebhookResponse"];
export type WebhookListResponseBody = WebhookSchemas["WebhookListResponseBody"];
export type WebhookTestResponseBody = WebhookSchemas["WebhookTestResponseBody"];
export type CreateWebhookRequestBody = WebhookSchemas["CreateWebhookRequestBody"];
export type UpdateWebhookRequestBody = WebhookSchemas["UpdateWebhookRequestBody"];
export type WebhookFiltersBody = WebhookSchemas["WebhookFiltersBody"];
export type WebhookStatusBody = WebhookSchemas["WebhookStatusBody"];
export type PolymarketWebhookEvent = WebhookSchemas["PolymarketWebhookEvent"];
export type PolymarketWebhookFilter = WebhookSchemas["PolymarketWebhookFilter"];
export type PnlTimeframeFilter = WebhookSchemas["PnlTimeframeFilter"];

export type FirstTradePayload = WebhookSchemas["FirstTradePayload"];
export type GlobalPnlPayload = WebhookSchemas["GlobalPnlPayload"];
export type MarketPnlPayload = WebhookSchemas["MarketPnlPayload"];
export type EventPnlPayload = WebhookSchemas["EventPnlPayload"];
export type ConditionMetricsPayload = WebhookSchemas["ConditionMetricsPayload"];
export type EventMetricsPayload = WebhookSchemas["EventMetricsPayload"];
export type PositionMetricsPayload = WebhookSchemas["PositionMetricsPayload"];
export type VolumeMilestonePayload = WebhookSchemas["VolumeMilestonePayload"];
export type EventVolumeMilestonePayload = WebhookSchemas["EventVolumeMilestonePayload"];
export type PositionVolumeMilestonePayload = WebhookSchemas["PositionVolumeMilestonePayload"];
export type ProbabilitySpikePayload = WebhookSchemas["ProbabilitySpikePayload"];
export type RotateSecretResponse = WebhookSchemas["RotateSecretResponse"];
export type DeleteWebhookResponse = WebhookSchemas["DeleteWebhookResponse"];
export type ListEventsResponse = WebhookSchemas["ListEventsResponse"];
export type WebhookEventInfo = WebhookSchemas["WebhookEventInfo"];
export type CloseToBondPayload = WebhookSchemas["CloseToBondPayload"];
export type MarketCreatedOutcome = WebhookSchemas["MarketCreatedOutcome"];
export type MarketCreatedPayload = WebhookSchemas["MarketCreatedPayload"];
export type NewMarketPayload = WebhookSchemas["NewMarketPayload"];
export type WhaleTradePayload = WebhookSchemas["WhaleTradePayload"];
export type AssetPriceTickPayload = WebhookSchemas["AssetPriceTickPayload"];
export type AssetPriceWindowUpdatePayload = WebhookSchemas["AssetPriceWindowUpdatePayload"];
export type EventVolumeSpikePayload = WebhookSchemas["EventVolumeSpikePayload"];
export type MarketVolumeSpikePayload = WebhookSchemas["MarketVolumeSpikePayload"];
export type PositionVolumeSpikePayload = WebhookSchemas["PositionVolumeSpikePayload"];
export type TraderFirstTradeFilters = WebhookSchemas["TraderFirstTradeFilters"];
export type TraderNewMarketFilters = WebhookSchemas["TraderNewMarketFilters"];
export type TraderWhaleTradeFilters = WebhookSchemas["TraderWhaleTradeFilters"];
export type TraderGlobalPnlFilters = WebhookSchemas["TraderGlobalPnlFilters"];
export type TraderMarketPnlFilters = WebhookSchemas["TraderMarketPnlFilters"];
export type TraderEventPnlFilters = WebhookSchemas["TraderEventPnlFilters"];
export type MarketMetricsFilters = WebhookSchemas["MarketMetricsFilters"];
export type EventMetricsFilters = WebhookSchemas["EventMetricsFilters"];
export type PositionMetricsFilters = WebhookSchemas["PositionMetricsFilters"];
export type MarketVolumeMilestoneFilters = WebhookSchemas["MarketVolumeMilestoneFilters"];
export type EventVolumeMilestoneFilters = WebhookSchemas["EventVolumeMilestoneFilters"];
export type PositionVolumeMilestoneFilters = WebhookSchemas["PositionVolumeMilestoneFilters"];
export type ProbabilitySpikeFilters = WebhookSchemas["ProbabilitySpikeFilters"];
export type MarketVolumeSpikeFilters = WebhookSchemas["MarketVolumeSpikeFilters"];
export type EventVolumeSpikeFilters = WebhookSchemas["EventVolumeSpikeFilters"];
export type PositionVolumeSpikeFilters = WebhookSchemas["PositionVolumeSpikeFilters"];
export type CloseToBondFilters = WebhookSchemas["CloseToBondFilters"];
export type MarketCreatedFilters = WebhookSchemas["MarketCreatedFilters"];
export type AssetPriceTickFilters = WebhookSchemas["AssetPriceTickFilters"];
export type AssetPriceWindowUpdateFilters = WebhookSchemas["AssetPriceWindowUpdateFilters"];
export type PriceSpikePayload = WebhookSchemas["PriceSpikePayload"];
export type PriceSpikeFilters = WebhookSchemas["PriceSpikeFilters"];

export type WebhookSpikeDirection = WebhookSchemas["SpikeDirection"];
export type WebhookWebhookAssetSymbol = WebhookSchemas["WebhookAssetSymbol"];
export type WebhookWebhookTimeframe = WebhookSchemas["WebhookTimeframe"];

export interface ListWebhooksParams extends WebhookOperationQuery<"list_webhooks"> {}

export interface GetWebhookParams {
	webhookId: string;
}

export interface CreateWebhookParams extends WebhookOperationRequestBody<"create_webhook"> {}

export interface UpdateWebhookParams extends WebhookOperationRequestBody<"update_webhook"> {
	webhookId: string;
}

export interface DeleteWebhookParams {
	webhookId: string;
}

export interface TestWebhookParams {
	webhookId: string;
}

export interface RotateSecretParams {
	webhookId: string;
}

export type { RetryConfig, HttpClientConfig, RequestOptions, HttpResponse, RequestHookInfo, ResponseHookInfo, ApiResponseInfo, PaginationInfo } from "./http.js";
export type { Address, PaginationParams, SortParams, Venue } from "./common.js";
export type {
	ConnectionState,
	StructWebSocketConfig,
	WsRoomId,
	WsFiltersOptionalRoom,
	WsFiltersRequiredRoom,
	WebSocketEventMap,
	WsSubscriptionMap,
	WsSubscribeResponseMap,
	TradesSubscribeFilters,
	AssetPricesSubscribeFilters,
	AssetWindowUpdatesSubscribeFilters,
	MarketMetricsSubscribeFilters,
	EventMetricsSubscribeFilters,
	PositionMetricsSubscribeFilters,
	TraderPnlSubscribeFilters,
	AccountsSubscribeFilters,
	OrderBookSubscribeFilters,
	TradeStreamEvent,
	AssetPriceTickEvent,
	AssetPriceWindowUpdateEvent,
	AssetWindowUpdateEvent,
	WsMetricsTimeframe,
	MarketMetricsEvent,
	EventMetricsEvent,
	PositionMetricsEvent,
	WsPnlTimeframes,
	TraderGlobalPnlEvent,
	TraderMarketPnlEvent,
	TraderEventPnlEvent,
	AccountsUpdateEvent,
	UsdceUpdateEvent,
	MaticUpdateEvent,
	WsOrderBookLevel,
	OrderBookUpdateEvent,
	TradesStreamSubscribeResponse,
	AssetPricesSubscribeResponse,
	AssetWindowUpdatesSubscribeResponse,
	MarketMetricsSubscribeResponse,
	EventMetricsSubscribeResponse,
	PositionMetricsSubscribeResponse,
	TraderPnlSubscribeResponse,
	AccountsSubscribeResponse,
	OrderBookSubscribeResponse,
} from "./ws.js";

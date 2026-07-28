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
export type { WsSchemas, WsAlertSchemas } from "./ws-helpers.js";
export type {
	components as WsComponents,
} from "../generated/ws.js";
export type {
	components as WsAlertComponents,
} from "../generated/ws-alerts.js";

import type { Schemas, OperationQuery, OperationResponse } from "./helpers.js";
import type { WebhookSchemas, WebhookOperationQuery, WebhookOperationRequestBody } from "./webhook-helpers.js";

type TimeframeKey = Schemas["MetricsTimeframe"];
type TimeframeRecord<V> = Partial<Record<TimeframeKey, V>>;

export type AnalyticsResolution = Schemas["AnalyticsResolution"];
export type AnalyticsChangeTimeframe = Schemas["AnalyticsChangeTimeframe"];
export type ChangeTimeframe = Schemas["ChangeTimeframe"];
export type AnalyticsGlobalCountsResponse = Schemas["AnalyticsGlobalCountsResponse"];
export type AnalyticsMetricPctChange = Schemas["AnalyticsMetricPctChange"];
export type AnalyticsTimeBucketRow = Schemas["AnalyticsTimeBucketRow"];
export type BondMarket = Schemas["BondMarket"];
export type BondOutcome = Schemas["BondOutcome"];
export type BondsSortBy = Schemas["BondsSortBy"];
export type BuilderFeeRate = Schemas["BuilderFeeRate"];
export type BuilderFeeRateHistoryEntry = Schemas["BuilderFeeRateHistoryEntry"];
export type BuilderGlobalLatestRow = Schemas["BuilderGlobalLatestRow"];
export type BuilderLatestRow = Schemas["BuilderLatestRow"];
export type BuilderLatestRowWithMetadata = Schemas["BuilderLatestRowWithMetadata"];
export type BuilderMetadata = Schemas["BuilderMetadata"];
export type BuilderMetadataInline = Schemas["BuilderMetadataInline"];
export type BuilderPctChange = Schemas["BuilderPctChange"];
export type BuilderSortBy = Schemas["BuilderSortBy"];
export type BuilderTagRow = Schemas["BuilderTagRow"];
export type BuilderTimeBucketRow = Schemas["BuilderTimeBucketRow"];
export type BuilderTimeframe = Schemas["BuilderTimeframe"];
export type CohortRetentionRow = Schemas["CohortRetentionRow"];
export type CompositionBucketRow = Schemas["CompositionBucketRow"];
export type CompositionResponse = Schemas["CompositionResponse"];
export type CompositionSeries = Schemas["CompositionSeries"];
export type ConcentrationResponse = Schemas["ConcentrationResponse"];
export type GlobalBuilderTagRow = Schemas["GlobalBuilderTagRow"];
export type GlobalChangeTimeframe = Schemas["GlobalChangeTimeframe"];
export type GlobalPctChange = Schemas["GlobalPctChange"];
export type RetainedCounts = Schemas["RetainedCounts"];
export type RetentionFractions = Schemas["RetentionFractions"];
export type TagBuilderRow = Schemas["TagBuilderRow"];
export type TagBuilderRowWithMetadata = Schemas["TagBuilderRowWithMetadata"];
export type TopTraderRow = Schemas["TopTraderRow"];
export type TopTradersSortBy = Schemas["TopTradersSortBy"];
export type TraderBuilderSortBy = Schemas["TraderBuilderSortBy"];
export type CandlestickResolution = Schemas["CandlestickResolution"];
export type ChartResolution = Schemas["ChartResolution"];
export type ClobReward = Schemas["ClobReward"];
export type ConditionMetricsResponse = Schemas["ConditionMetricsResponse"];
export type EventMarket = Schemas["EventMarket"];
export type EventMarketOutcome = Schemas["EventMarketOutcome"];
export type EventMetricsResponse = Schemas["EventMetricsResponse"];
export type EventPnlSortBy = Schemas["EventPnlSortBy"];
export type EventSortBy = Schemas["EventSortBy"];
export type GlobalPnlSortBy = Schemas["GlobalPnlSortBy"];
export type GlobalPnlTrader = Schemas["GlobalPnlTrader"];
export type HolderCountHistoryCandle = Schemas["HolderCountHistoryCandle"];
export type MarketHolder = Schemas["MarketHolder"];
export type MarketHolderPnl = Schemas["MarketHolderPnl"];
export type MarketHoldersResponse = Schemas["MarketHoldersResponse"];
export type PositionHolder = Schemas["PositionHolder"];
export type PositionHolderHistoryCandle = Schemas["PositionHolderHistoryCandle"];
export type PositionHolderPnl = Schemas["PositionHolderPnl"];
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
export type PnlCandleTimeframe = Schemas["PnlCandleTimeframe"];
export type PnlTimeframe = Schemas["PnlTimeframe"];
export type Event = Omit<Schemas["PolymarketEvent"], "metrics"> & {
	metrics: TimeframeRecord<SimpleTimeframeMetrics>;
};
export type PolymarketSeries = Schemas["PolymarketSeries"];
export type Tag = Schemas["PolymarketTag"];
export type TagSortBy = Schemas["TagSortBy"];
export type TagSortTimeframe = Schemas["TagSortTimeframe"];
export type UserProfile = Schemas["PolymarketUserProfile"];
export type PositionHoldersResponse = Schemas["PositionHoldersResponse"];
export type PositionStatus = Schemas["PositionStatus"];
export type PositionMetricsResponse = Schemas["PositionMetricsResponse"];
export type PositionVolumeChartResponse = Schemas["PositionVolumeChartResponse"];
export type PositionVolumeDataPoint = Schemas["PositionVolumeDataPoint"];
export type PredictionCandlestickBar = Schemas["PredictionCandlestickBar"];
export type PriceJumpResolution = Schemas["PriceJumpResolution"];
export type SearchResponse = Schemas["SearchResponse"];
export type SearchSortBy = Schemas["SearchSortBy"];
export type SimpleTimeframeMetrics = Schemas["SimpleTimeframeMetrics"];
export type SortDirection = Schemas["SortDirection"];
export type SpikeDirection = Schemas["SpikeDirection"];
export type TokenOutcome = Schemas["TokenOutcome"];
export type Trader = Schemas["Trader"];
export type TraderInfo = Schemas["TraderInfo"];
export type TraderAnalyticsDeltaTimeBucketRow = Schemas["TraderAnalyticsDeltaTimeBucketRow"];
export type TraderAnalyticsMetricPctChange = Schemas["TraderAnalyticsMetricPctChange"];
export type TraderAnalyticsTimeBucketRow = Schemas["TraderAnalyticsTimeBucketRow"];
export type TraderVolumeChartResponse = Schemas["TraderVolumeChartResponse"];
export type TraderVolumeDataPoint = Schemas["TraderVolumeDataPoint"];
export type TraderWithPnl = Schemas["TraderWithPnl"];
export type PositionPnlSortBy = Schemas["PositionPnlSortBy"];
export type PositionClosedPnlSortBy = Schemas["PositionClosedPnlSortBy"];
export type PositionExitPnlSortBy = Schemas["PositionExitPnlSortBy"];
export type PositionOpenPnlSortBy = Schemas["PositionOpenPnlSortBy"];
export type EventMarketChartOutcome = Schemas["EventMarketChartOutcome"];
export type PositionChartOutcome = Schemas["PositionChartOutcome"];
export type AssetPriceHistoryRow = Schemas["AssetPriceHistoryRow"];
export type AssetSymbol = Schemas["AssetSymbol"];
export type AssetCandlestickBar = Schemas["AssetCandlestickBar"];
export type AssetCandlestickResolution = Schemas["AssetCandlestickResolution"];
export type AssetVariant = Schemas["AssetVariant"];
export type PriceJump = Schemas["PriceJump"];
export type EventMarketChartDataPoint = Schemas["EventMarketChartDataPoint"];
export type MarketResponse = Omit<Schemas["MarketResponse"], "metrics"> & {
	metrics?: TimeframeRecord<SimpleTimeframeMetrics>;
};
export type MarketSortBy = Schemas["MarketSortBy"];
export type MarketStatus = Schemas["MarketStatus"];
export type OutcomeIndex = Schemas["OutcomeIndex"];
export type PositionChartDataPoint = Schemas["PositionChartDataPoint"];
export type TradeType = Schemas["TradeType"];
export type TradeSide = Schemas["TradeSide"];
export type OracleEventTyped = Schemas["OracleEventTyped"];
export type DisputePriceEvent = Schemas["DisputePriceEvent"];
export type ProposePriceEvent = Schemas["ProposePriceEvent"];
export type RequestPriceEvent = Schemas["RequestPriceEvent"];
export type SettleEvent = Schemas["SettleEvent"];
export type WebhookAssetSymbol = Schemas["WebhookAssetSymbol"];
export type WebhookTimeframe = Schemas["WebhookTimeframe"];
export type ConditionOrderbookRow = Schemas["ConditionOrderbookRow"];
export type OrderbookHistoryRow = Schemas["OrderbookHistoryRow"];
export type OrderbookLevel = Schemas["OrderbookLevel"];
export type OrderbookSnapshotRow = Schemas["OrderbookSnapshotRow"];
export type SpreadRow = Schemas["SpreadRow"];
export type AssertionDisputedEvent = Schemas["AssertionDisputedEvent"];
export type AssertionMadeEvent = Schemas["AssertionMadeEvent"];
export type AssertionSettledEvent = Schemas["AssertionSettledEvent"];
export type CancelledTrade = Schemas["CancelledTrade"];
export type ComboLeg = Schemas["ComboLeg"];
export type ComboTrade =
	| Schemas["ComboBasketTrade"]
	| Schemas["ComboCompressedTrade"]
	| Schemas["ComboConditionTransformTrade"]
	| Schemas["ComboCreationTrade"]
	| Schemas["ComboExecutionTrade"]
	| Schemas["ComboHorizontalTrade"]
	| Schemas["ComboMigrationTrade"]
	| Schemas["ComboPositionConvertedTrade"]
	| Schemas["ComboPositionPairTrade"]
	| Schemas["ComboRedemptionTrade"]
	| Schemas["ComboStatusUpdateTrade"]
	| Schemas["ComboWrapTrade"];
export type ConditionResolutionEvent = Schemas["ConditionResolutionEvent"];
export type MergeTrade = Schemas["MergeTrade"];
export type NegRiskOutcomeReportedEvent = Schemas["NegRiskOutcomeReportedEvent"];
export type OrderFilledTrade = Schemas["OrderFilledTrade"];
export type PolymarketExchange = Schemas["PolymarketExchange"];
export type PositionDetail = Schemas["PositionDetail"];
export type PositionsConvertedTrade = Schemas["PositionsConvertedTrade"];
export type QuestionEmergencyResolvedEvent = Schemas["QuestionEmergencyResolvedEvent"];
export type QuestionFlaggedEvent = Schemas["QuestionFlaggedEvent"];
export type QuestionInitializedEvent = Schemas["QuestionInitializedEvent"];
export type QuestionPausedEvent = Schemas["QuestionPausedEvent"];
export type QuestionResetEvent = Schemas["QuestionResetEvent"];
export type QuestionResolvedEvent = Schemas["QuestionResolvedEvent"];
export type QuestionUnflaggedEvent = Schemas["QuestionUnflaggedEvent"];
export type QuestionUnpausedEvent = Schemas["QuestionUnpausedEvent"];
export type RedemptionTrade = Schemas["RedemptionTrade"];
export type RegisterTokenTrade = Schemas["RegisterTokenTrade"];
export type SplitTrade = Schemas["SplitTrade"];
export type TradeEvent = Schemas["TradeEvent"];

export type Series = Schemas["PolymarketSeries"];
export type Trade = Schemas["TradeEvent"];
export type Candlestick = Schemas["PredictionCandlestickBar"];
export type CandlestickResponse = Schemas["PredictionCandlestickBar"][];
export type Timeframe = Schemas["MetricsTimeframe"];
export type GlobalPnlTimeframe = Schemas["PnlTimeframe"];

export type TradeEventType = Trade["trade_type"];

type ExtractTradeEvent<T extends TradeEventType> = Extract<Trade, { trade_type: T }>;

export type OrderFill = ExtractTradeEvent<"OrderFilled">;
export type OrdersMatch = ExtractTradeEvent<"OrdersMatched">;
export type Redemption = ExtractTradeEvent<"Redemption">;
export type Merge = ExtractTradeEvent<"Merge">;
export type Split = ExtractTradeEvent<"Split">;
export type PositionsConverted = ExtractTradeEvent<"PositionsConverted">;
export type Cancelled = ExtractTradeEvent<"Cancelled">;
export type RegisterToken = ExtractTradeEvent<"RegisterToken">;
export type MakerRebate = ExtractTradeEvent<"MakerRebate">;
export type Reward = ExtractTradeEvent<"Reward">;
export type Yield = ExtractTradeEvent<"Yield">;

export type MarketTrade =
	| OrderFill
	| OrdersMatch
	| Redemption
	| Merge
	| Split
	| PositionsConverted
	| Cancelled
	| RegisterToken
	| MakerRebate
	| Reward
	| Yield;

export type OracleEvent =
	| ExtractTradeEvent<"Initialization">
	| ExtractTradeEvent<"Proposal">
	| ExtractTradeEvent<"Dispute">
	| ExtractTradeEvent<"Settled">
	| ExtractTradeEvent<"Resolution">
	| ExtractTradeEvent<"ConditionResolution">
	| ExtractTradeEvent<"Reset">
	| ExtractTradeEvent<"Flag">
	| ExtractTradeEvent<"Unflag">
	| ExtractTradeEvent<"Pause">
	| ExtractTradeEvent<"Unpause">
	| ExtractTradeEvent<"ManualResolution">
	| ExtractTradeEvent<"NegRiskOutcomeReported">;

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

export interface GetAssetCandlestickParams extends OperationQuery<"get_asset_candlestick"> {}

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

export interface GetPositionHoldersHistoryParams extends OperationQuery<"get_position_holders_history"> {
	positionId: string;
}

export interface GetEventHoldersHistoryParams extends OperationQuery<"get_event_holders_history"> {
	event_slug: string;
}

export interface GetMarketsParams extends OperationQuery<"list_markets"> {}

export interface GetMarketParams extends OperationQuery<"get_market"> {
	conditionId: string;
}

export interface GetMarketBySlugParams extends OperationQuery<"get_market_by_slug"> {
	marketSlug: string;
}

export interface GetComboMarketsParams extends OperationQuery<"list_combo_markets"> {}

export interface GetComboLegsParams extends OperationQuery<"get_combo_legs"> {}

export interface GetComboCandlestickParams extends OperationQuery<"get_combo_candlestick"> {}

export interface GetComboCandlesticksParams extends OperationQuery<"get_combo_and_leg_candlesticks"> {}

export interface GetComboLegCandlestickParams extends OperationQuery<"get_combo_leg_candlestick"> {}

export interface GetComboMetricsParams extends OperationQuery<"get_combo_metrics"> {}

export interface GetComboAnalyticsChangesParams extends OperationQuery<"get_combo_analytics_changes"> {}

export interface GetComboAnalyticsDeltasParams extends OperationQuery<"get_combo_analytics_deltas"> {}

export interface GetComboAnalyticsTimeseriesParams extends OperationQuery<"get_combo_analytics_timeseries"> {}

export interface GetCandlestickParams extends OperationQuery<"get_market_candlestick"> {}

export interface GetPositionCandlestickParams extends OperationQuery<"get_position_candlestick"> {}

export interface GetMarketVolumeChartParams extends OperationQuery<"get_market_volume_chart"> {}

export interface GetPositionVolumeChartParams extends OperationQuery<"get_position_volume_chart"> {}

export interface GetTradesParams extends OperationQuery<"get_market_trades"> {}

export interface GetSearchParams extends OperationQuery<"search"> {}

export interface GetSeriesListParams extends OperationQuery<"get_series_list"> {}

export interface GetSeriesOutcomesParams extends OperationQuery<"get_series_outcomes"> {}

export interface GetSeriesEventsParams extends OperationQuery<"get_series_events"> {
	identifier: string;
}

export interface GetTagsParams extends OperationQuery<"get_tags"> {}

export interface GetTagParams {
	identifier: string;
}

export interface GetEventOutcomesParams extends OperationQuery<"get_event_outcomes"> {}

export interface GetEventChartParams extends OperationQuery<"get_event_chart"> {}

export interface GetMarketChartParams extends OperationQuery<"get_chart"> {}

export interface GetPriceJumpsParams extends OperationQuery<"get_price_jumps"> {}

export interface GetGlobalPnlParams extends OperationQuery<"get_global_pnl"> {}

export interface GetTraderPnlParams extends OperationQuery<"get_trader_pnl"> {
	address: string;
}

export interface GetTraderPnlBreakdownParams extends OperationQuery<"get_trader_market_pnl"> {
	address: string;
}

export interface GetTraderPositionPnlParams extends OperationQuery<"get_trader_position_pnl"> {
	address: string;
}

export interface GetTraderPnlCalendarParams extends OperationQuery<"get_trader_pnl_calendar"> {
	address: string;
}

export interface GetTraderPnlCandlesParams extends OperationQuery<"get_trader_pnl_candles"> {
	address: string;
}

export interface GetTraderCategoryPnlCandlesParams extends OperationQuery<"get_trader_category_pnl_candles"> {
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

export interface GetGlobalAnalyticsDeltasParams extends OperationQuery<"get_global_analytics_deltas"> {}

export interface GetGlobalAnalyticsChangesParams extends OperationQuery<"get_global_analytics_changes"> {}

export interface GetGlobalAnalyticsTimeseriesParams extends OperationQuery<"get_global_analytics_timeseries"> {}

export interface GetEventAnalyticsDeltasParams extends OperationQuery<"get_event_analytics_deltas"> {
	event_slug: string;
}

export interface GetEventAnalyticsChangesParams extends OperationQuery<"get_event_analytics_changes"> {
	event_slug: string;
}

export interface GetEventAnalyticsTimeseriesParams extends OperationQuery<"get_event_analytics_timeseries"> {
	event_slug: string;
}

export interface GetMarketAnalyticsDeltasParams extends OperationQuery<"get_market_analytics_deltas"> {
	condition_id: string;
}

export interface GetMarketAnalyticsChangesParams extends OperationQuery<"get_market_analytics_changes"> {
	condition_id: string;
}

export interface GetMarketAnalyticsTimeseriesParams extends OperationQuery<"get_market_analytics_timeseries"> {
	condition_id: string;
}

export interface GetTagAnalyticsDeltasParams extends OperationQuery<"get_tag_analytics_deltas"> {
	tag: string;
}

export interface GetTagAnalyticsChangesParams extends OperationQuery<"get_tag_analytics_changes"> {
	tag: string;
}

export interface GetTagAnalyticsTimeseriesParams extends OperationQuery<"get_tag_analytics_timeseries"> {
	tag: string;
}

export interface GetTraderAnalyticsDeltasParams extends OperationQuery<"get_trader_analytics_deltas"> {
	address: string;
}

export interface GetTraderAnalyticsChangesParams extends OperationQuery<"get_trader_analytics_changes"> {
	address: string;
}

export interface GetTraderAnalyticsTimeseriesParams extends OperationQuery<"get_trader_analytics_timeseries"> {
	address: string;
}

export interface GetBuildersParams extends OperationQuery<"list_builders"> {}

export interface GetBuilderCompositionParams extends OperationQuery<"get_builder_composition"> {}

export interface GetGlobalBuilderTagsParams extends OperationQuery<"list_global_builder_tags"> {}

export interface ListBuilderMetadataParams extends OperationQuery<"list_builder_metadata"> {}

export interface SearchBuildersParams extends OperationQuery<"search_builders"> {}

export interface GetBuilderMetadataParams {
	builder_code: string;
}

export interface GetBuilderParams extends OperationQuery<"get_builder"> {
	builder_code: string;
}

export interface GetBuilderAnalyticsChangesParams extends OperationQuery<"get_builder_analytics_changes"> {
	builder_code: string;
}

export interface GetBuilderAnalyticsDeltasParams extends OperationQuery<"get_builder_analytics_deltas"> {
	builder_code: string;
}

export interface GetBuilderAnalyticsTimeseriesParams extends OperationQuery<"get_builder_analytics_timeseries"> {
	builder_code: string;
}

export interface GetBuilderConcentrationParams extends OperationQuery<"get_builder_concentration"> {
	builder_code: string;
}

export interface GetBuilderFeesParams {
	builder_code: string;
}

export interface GetBuilderFeesHistoryParams extends OperationQuery<"get_builder_fees_history"> {
	builder_code: string;
}

export interface GetBuilderRetentionParams extends OperationQuery<"get_builder_retention"> {
	builder_code: string;
}

export interface GetBuilderTagsParams extends OperationQuery<"list_builder_tags"> {
	builder_code: string;
}

export interface GetBuilderTopTradersParams extends OperationQuery<"get_builder_top_traders"> {
	builder_code: string;
}

export interface GetBuilderGlobalParams extends OperationQuery<"get_builder_global"> {}

export interface GetBuilderGlobalChangesParams extends OperationQuery<"get_builder_global_changes"> {}

export interface GetBuilderGlobalDeltasParams extends OperationQuery<"get_builder_global_deltas"> {}

export interface GetBuilderGlobalTimeseriesParams extends OperationQuery<"get_builder_global_timeseries"> {}

export interface GetTagBuildersParams extends OperationQuery<"list_tag_builders"> {
	tag: string;
}

export interface GetMarketTopTradersParams extends OperationQuery<"get_market_top_traders"> {}

export interface GetPositionTopTradersParams extends OperationQuery<"get_position_top_traders"> {}

export interface GetOracleEventsParams extends OperationQuery<"get_oracle_events"> {}

export type TraderProfile = Schemas["TraderProfile"];
export type TradeMarketRef = Schemas["TradeMarketRef"];
export type PolymarketCategory = Schemas["PolymarketCategory"];

export type CategoryPnlSortBy = Schemas["CategoryPnlSortBy"];
export type TraderPnlSortBy = Schemas["TraderPnlSortBy"];
export type PnlAnalyticsTimeframe = Schemas["PnlAnalyticsTimeframe"];
export type PnlCandlestickBar = Schemas["PnlCandlestickBar"];
export type PnlExitMarker = Schemas["PnlExitMarker"];
export type PnlExitReason = Schemas["PnlExitReason"];
export type PnlChangeWindow = Schemas["PnlChangeWindow"];
export type PnlChangesResponse = Schemas["PnlChangesResponse"];
export type PnlLatestSnapshot = Schemas["PnlLatestSnapshot"];
export type PnlPeriodExtremes = Schemas["PnlPeriodExtremes"];
export type PnlPeriodMetric = Schemas["PnlPeriodMetric"];
export type PnlPeriodsResponse = Schemas["PnlPeriodsResponse"];
export type PnlRiskMarketMetadata = Schemas["PnlRiskMarketMetadata"];
export type PnlRiskMetric = Schemas["PnlRiskMetric"];
export type PnlRiskResponse = Schemas["PnlRiskResponse"];
export type TraderPnl = Schemas["TraderPnl"];
export type MarketPnl = Schemas["MarketPnl"];
export type CategoryPnl = Schemas["CategoryPnl"];
export type PositionPnl = Schemas["PositionPnl"];
export type ComboPnlSortBy = Schemas["ComboPnlSortBy"];
export type ComboStatus = Schemas["ComboStatus"];
export type ComboStatusFilter = Schemas["ComboStatusFilter"];
export type ComboPnlResponse = Schemas["ComboPnlResponse"];
export type ComboFilter = Schemas["ComboFilter"];
export type ComboLegDetail = Schemas["ComboLegDetail"];
export type ComboLegMarketType = Schemas["ComboLegMarketType"];
export type ComboLegsResponse = Schemas["ComboLegsResponse"];
export type ApprovalTrade = Schemas["ApprovalTrade"];
export type ComboBasketTrade = Schemas["ComboBasketTrade"];
export type ComboCompressedTrade = Schemas["ComboCompressedTrade"];
export type ComboConditionTransformTrade = Schemas["ComboConditionTransformTrade"];
export type ComboCreationTrade = Schemas["ComboCreationTrade"];
export type ComboExecutionTrade = Schemas["ComboExecutionTrade"];
export type ComboHorizontalTrade = Schemas["ComboHorizontalTrade"];
export type ComboMigrationTrade = Schemas["ComboMigrationTrade"];
export type ComboPositionConvertedTrade = Schemas["ComboPositionConvertedTrade"];
export type ComboPositionPairTrade = Schemas["ComboPositionPairTrade"];
export type ComboRedemptionTrade = Schemas["ComboRedemptionTrade"];
export type ComboStatusUpdateTrade = Schemas["ComboStatusUpdateTrade"];
export type ComboWrapTrade = Schemas["ComboWrapTrade"];

export type ComboMarket = Schemas["ComboMarket"];
export type ComboMarketLeg = Schemas["ComboMarketLeg"];
export type ComboMarketSortBy = Schemas["ComboMarketSortBy"];
export type ComboMarketStatusFilter = Schemas["ComboMarketStatusFilter"];
export type ComboMarketTimeframe = Schemas["ComboMarketTimeframe"];
export type ComboCandlestickBar = Schemas["ComboCandlestickBar"];
export type ComboCandlesticksResponse = Schemas["ComboCandlesticksResponse"];
export type ComboLegCandlestickBar = Schemas["ComboLegCandlestickBar"];
export type ComboLegCandlestickSeries = Schemas["ComboLegCandlestickSeries"];
export type ComboMetricsResponse = Schemas["ComboMetricsResponse"];
export type ComboTimeframeMetrics = Schemas["ComboTimeframeMetrics"];
export type ComboGlobalAnalyticsChanges = Schemas["ComboGlobalAnalyticsChanges"];
export type ComboGlobalAnalyticsCountsResponse = Schemas["ComboGlobalAnalyticsCountsResponse"];
export type ComboGlobalAnalyticsBucketRow = Schemas["ComboGlobalAnalyticsBucketRow"];
export type ComboGlobalAnalyticsDeltaBucketRow = Schemas["ComboGlobalAnalyticsDeltaBucketRow"];
export type ComboGlobalAnalyticsBuilder = Schemas["ComboGlobalAnalyticsBuilder"];
export type ComboGlobalAnalyticsCombos = Schemas["ComboGlobalAnalyticsCombos"];
export type ComboGlobalAnalyticsCurrent = Schemas["ComboGlobalAnalyticsCurrent"];
export type ComboGlobalAnalyticsDerived = Schemas["ComboGlobalAnalyticsDerived"];
export type ComboGlobalAnalyticsLegs = Schemas["ComboGlobalAnalyticsLegs"];
export type ComboGlobalAnalyticsLifecycle = Schemas["ComboGlobalAnalyticsLifecycle"];
export type ComboGlobalAnalyticsSides = Schemas["ComboGlobalAnalyticsSides"];
export type ComboGlobalAnalyticsUsers = Schemas["ComboGlobalAnalyticsUsers"];

export type ComboHolder = Schemas["ComboHolder"];
export type ComboHoldersResponse = Schemas["ComboHoldersResponse"];
export type ComboHolderStatsResponse = Schemas["ComboHolderStatsResponse"];
export type ComboConditionHoldersResponse = Schemas["ComboConditionHoldersResponse"];
export type ComboConditionPositionHolders = Schemas["ComboConditionPositionHolders"];

export interface GetComboHoldersParams extends OperationQuery<"get_combo_holders"> {
	position_id: string;
}

export interface GetComboHolderStatsParams {
	position_id: string;
}

export interface GetComboConditionHoldersParams extends OperationQuery<"get_combo_condition_holders"> {
	condition_id: string;
}

export type BatchPnlRequest = Schemas["BatchPnlRequest"];
export type BatchPnlResponse = OperationResponse<"get_trader_pnl_batch">;

export type GetTraderPnlBatchParams = BatchPnlRequest;

export interface GetTraderPnlChangesParams {
	address: string;
}

export interface GetTraderPnlPeriodsParams extends OperationQuery<"get_trader_pnl_periods"> {
	address: string;
}

export interface GetTraderPnlRiskParams extends OperationQuery<"get_trader_pnl_risk"> {
	address: string;
}

export interface GetTraderCategoryPnlParams extends OperationQuery<"get_trader_category_pnl"> {
	address: string;
}

export interface GetTraderPnlExitsParams extends OperationQuery<"get_trader_pnl_exits"> {
	address: string;
}

export interface GetTopTradesMarketsParams extends OperationQuery<"get_top_trades_markets"> {}

export interface GetTraderComboPnlParams extends OperationQuery<"get_trader_combo_pnl"> {
	address: string;
}

export interface GetTraderCombosPnlParams extends OperationQuery<"get_trader_combos_pnl"> {
	address: string;
}

export interface GetCategoryTopTradersParams extends OperationQuery<"get_category_top_traders"> {}

export type WebhookResponse = WebhookSchemas["WebhookResponse"];
export type WebhookListResponseBody = WebhookSchemas["WebhookListResponseBody"];
export type WebhookTestResponseBody = WebhookSchemas["WebhookTestResponseBody"];
export type WebhookLogEntry = WebhookSchemas["WebhookLogEntry"];
export type WebhookLogsResponseBody = WebhookSchemas["WebhookLogsResponseBody"];
export type CreateWebhookRequestBody = WebhookSchemas["CreateWebhookRequestBody"];
export type UpdateWebhookRequestBody = WebhookSchemas["UpdateWebhookRequestBody"];
export type WebhookFiltersBody = WebhookSchemas["WebhookFiltersBody"];
export type WebhookTraderInfo = WebhookSchemas["WebhookTraderInfo"];
export type WebhookStatusBody = WebhookSchemas["WebhookStatusBody"];
export type PolymarketWebhookEvent = WebhookSchemas["PolymarketWebhookEvent"];
export type PolymarketWebhookFilter = WebhookSchemas["PolymarketWebhookFilter"];
export type PnlTimeframeFilter = WebhookSchemas["PnlTimeframeFilter"];

export type FirstTradePayload = WebhookSchemas["FirstTradePayload"];
export type GlobalPnlPayload = WebhookSchemas["GlobalPnlPayload"];
export type MarketPnlPayload = WebhookSchemas["MarketPnlPayload"];
export type CategoryPnlPayload = WebhookSchemas["CategoryPnlPayload"];
export type ConditionMetricsPayload = WebhookSchemas["ConditionMetricsPayload"];
export type EventMetricsPayload = WebhookSchemas["EventMetricsPayload"];
export type PositionMetricsPayload = WebhookSchemas["PositionMetricsPayload"];
export type TagMetricsPayload = WebhookSchemas["TagMetricsPayload"];
export type VolumeMilestonePayload = WebhookSchemas["VolumeMilestonePayload"];
export type EventVolumeMilestonePayload = WebhookSchemas["EventVolumeMilestonePayload"];
export type PositionVolumeMilestonePayload = WebhookSchemas["PositionVolumeMilestonePayload"];
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
export type TraderCategoryPnlFilters = WebhookSchemas["TraderCategoryPnlFilters"];
export type MarketMetricsFilters = WebhookSchemas["MarketMetricsFilters"];
export type EventMetricsFilters = WebhookSchemas["EventMetricsFilters"];
export type PositionMetricsFilters = WebhookSchemas["PositionMetricsFilters"];
export type TagMetricsFilters = WebhookSchemas["TagMetricsFilters"];
export type MarketVolumeMilestoneFilters = WebhookSchemas["MarketVolumeMilestoneFilters"];
export type EventVolumeMilestoneFilters = WebhookSchemas["EventVolumeMilestoneFilters"];
export type PositionVolumeMilestoneFilters = WebhookSchemas["PositionVolumeMilestoneFilters"];
export type MarketVolumeSpikeFilters = WebhookSchemas["MarketVolumeSpikeFilters"];
export type EventVolumeSpikeFilters = WebhookSchemas["EventVolumeSpikeFilters"];
export type PositionVolumeSpikeFilters = WebhookSchemas["PositionVolumeSpikeFilters"];
export type CloseToBondFilters = WebhookSchemas["CloseToBondFilters"];
export type MarketCreatedFilters = WebhookSchemas["MarketCreatedFilters"];
export type AssetPriceTickFilters = WebhookSchemas["AssetPriceTickFilters"];
export type AssetPriceWindowUpdateFilters = WebhookSchemas["AssetPriceWindowUpdateFilters"];
export type NewTradePayload = WebhookSchemas["NewTradePayload"];
export type TraderNewTradeFilters = WebhookSchemas["TraderNewTradeFilters"];
export type PriceSpikePayload = WebhookSchemas["PriceSpikePayload"];
export type PriceSpikeFilters = WebhookSchemas["PriceSpikeFilters"];
export type TraderTradeEventFilters = WebhookSchemas["TraderTradeEventFilters"];
export type NewTradeFilterType = NonNullable<TraderNewTradeFilters["trade_types"]>[number];
export type TradeEventFilterType = NonNullable<TraderTradeEventFilters["trade_types"]>[number];

export type WebhookDeliveryEnvelope = WebhookSchemas["WebhookDeliveryEnvelope"];
export type WebhookTraderTradeEventPayload = WebhookSchemas["WebhookTraderTradeEventPayload"];
export type OracleEventsPayload = WebhookSchemas["OracleEventTyped"];
export type OracleEventsFilters = WebhookSchemas["OracleEventsFilters"];
export type WebhookSpikeDirection = WebhookSchemas["SpikeDirection"];
export type WebhookWebhookAssetSymbol = WebhookSchemas["WebhookAssetSymbol"];
export type WebhookWebhookTimeframe = WebhookSchemas["WebhookTimeframe"];

export interface WebhookEventPayloadMap {
	trader_first_trade: FirstTradePayload;
	trader_new_market: NewMarketPayload;
	trader_whale_trade: WhaleTradePayload;
	trader_new_trade: NewTradePayload;
	trader_trade_event: WebhookTraderTradeEventPayload;
	trader_global_pnl: GlobalPnlPayload;
	trader_market_pnl: MarketPnlPayload;
	trader_category_pnl: CategoryPnlPayload;
	condition_metrics: ConditionMetricsPayload;
	event_metrics: EventMetricsPayload;
	position_metrics: PositionMetricsPayload;
	tag_metrics: TagMetricsPayload;
	market_volume_milestone: VolumeMilestonePayload;
	event_volume_milestone: EventVolumeMilestonePayload;
	position_volume_milestone: PositionVolumeMilestonePayload;
	price_spike: PriceSpikePayload;
	market_volume_spike: MarketVolumeSpikePayload;
	event_volume_spike: EventVolumeSpikePayload;
	position_volume_spike: PositionVolumeSpikePayload;
	close_to_bond: CloseToBondPayload;
	market_created: MarketCreatedPayload;
	asset_price_tick: AssetPriceTickPayload;
	asset_price_window_update: AssetPriceWindowUpdatePayload;
	oracle_events: OracleEventsPayload;
}

export type WebhookEventName = PolymarketWebhookEvent & keyof WebhookEventPayloadMap;

export type WebhookEvent = {
	[E in WebhookEventName]: Omit<WebhookDeliveryEnvelope, "data" | "event"> & {
		event: E;
		data: WebhookEventPayloadMap[E];
	};
}[WebhookEventName];

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

export interface GetWebhookLogsParams extends WebhookOperationQuery<"get_webhook_logs"> {
	webhookId: string;
}

export type { RetryConfig, HttpClientConfig, RequestOptions, HttpResponse, RequestHookInfo, ResponseHookInfo, ApiResponseInfo, PaginationInfo } from "./http.js";
export type { Address, PaginationParams, SortParams, Venue } from "./common.js";
export type {
	ConnectionState,
	StructWebSocketConfig,
	AlertsWebSocketEventMap,
	WsRoomId,
	WsFiltersOptionalRoom,
	WsFiltersRequiredRoom,
	WebSocketEventMap,
	WsSubscriptionMap,
	WsSubscribeResponseMap,
	TradesSubscribeFilters,
	WsTradeType,
	WsTradeStatus,
	WsAssetTimeframe,
	AssetPricesSubscribeFilters,
	AssetWindowUpdatesSubscribeFilters,
	MarketMetricsSubscribeFilters,
	EventMetricsSubscribeFilters,
	PositionMetricsSubscribeFilters,
	TagMetricsSubscribeFilters,
	TraderPnlSubscribeFilters,
	AccountsSubscribeFilters,
	OrderBookSubscribeFilters,
	TraderPositionsSubscribeFilters,
	TraderExitMarkersSubscribeFilters,
	HolderMetricsSubscribeFilters,
	TraderPositionsSubscribeResponse,
	TraderExitMarkersSubscribeResponse,
	HolderMetricsSubscribeResponse,
	TraderPositionRow,
	TraderPositionBatchEvent,
	TraderPositionPriceRow,
	TraderPositionPriceBatchEvent,
	TraderPositionResolutionRow,
	TraderPositionResolutionBatchEvent,
	TraderExitMarkerRow,
	TraderExitMarkerBatchEvent,
	OrderBookBatchEvent,
	PositionHolderMetricsRow,
	ConditionHolderMetricsRow,
	EventHolderMetricsRow,
	HolderMetricsPositionBatchEvent,
	HolderMetricsConditionBatchEvent,
	HolderMetricsEventBatchEvent,
	ClobRewardsSubscribeFilters,
	ClobRewardsUpdateEvent,
	ClobRewardsSubscribeResponse,
	EventsStreamSubscribeFilters,
	EventsStreamSubscribeResponse,
	EventsStreamUpdateEvent,
	EventsStreamUpdateRows,
	MarketsStreamSubscribeFilters,
	MarketsStreamSubscribeResponse,
	MarketsStreamUpdateEvent,
	MarketsStreamUpdateRows,
	OracleEventStreamEvent,
	OracleEventsStreamSubscribeFilters,
	OracleEventsStreamSubscribeResponse,
	PositionLiquiditySubscribeFilters,
	MarketLiquiditySubscribeFilters,
	EventLiquiditySubscribeFilters,
	PositionLiquidityEvent,
	MarketLiquidityEvent,
	EventLiquidityEvent,
	PositionLiquiditySubscribeResponse,
	MarketLiquiditySubscribeResponse,
	EventLiquiditySubscribeResponse,
	WsAlertSubscribedResponse,
	WsAlertUnsubscribedResponse,
	WsAlertErrorResponse,
	WsAlertEventType,
	WsAlertSubscribeMessage,
	WsAlertUnsubscribeMessage,
	WsAlertEventPayload,
	WsAlertSubscribeMap,
	WsAlertEventDataMap,
	WsAlertEventName,
	TradeStreamEvent,
	AssetPriceTickEvent,
	AssetPriceWindowUpdateEvent,
	AssetWindowUpdateEvent,
	MarketMetricsEvent,
	EventMetricsEvent,
	PositionMetricsEvent,
	TagMetricsEvent,
	TraderGlobalPnlBatchEvent,
	TraderMarketPnlBatchEvent,
	TraderCategoryPnlBatchEvent,
	TraderGlobalTickBatchEvent,
	TraderMarketTickBatchEvent,
	TraderCategoryTickBatchEvent,
	TraderGlobalResolutionBatchEvent,
	TraderMarketResolutionBatchEvent,
	TraderCategoryResolutionBatchEvent,
	AccountsUpdateEvent,
	UsdceUpdateEvent,
	MaticUpdateEvent,
	PusdUpdateEvent,
	WsOrderBookLevel,
	OrderBookUpdateEvent,
	TradesStreamSubscribeResponse,
	AssetPricesSubscribeResponse,
	AssetWindowUpdatesSubscribeResponse,
	MarketMetricsSubscribeResponse,
	EventMetricsSubscribeResponse,
	PositionMetricsSubscribeResponse,
	TagMetricsSubscribeResponse,
	TraderPnlSubscribeResponse,
	AccountsSubscribeResponse,
	OrderBookSubscribeResponse,
	TradeOrderFilledEvent,
	TradeRedemptionEvent,
	TradeMergeEvent,
	TradeSplitEvent,
	TradePositionsConvertedEvent,
	TradeCancelledEvent,
	TradeOracleLifecycleEvent,
	TradeRegisterTokenEvent,
} from "./ws.js";

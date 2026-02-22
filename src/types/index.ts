export type { components, operations, paths } from "../generated/polymarket.js";
export type { Schemas, OperationQuery, OperationPath, OperationResponse } from "./helpers.js";

import type { Schemas, OperationQuery } from "./helpers.js";

export type BondMarket = Schemas["BondMarket"];
export type BondOutcome = Schemas["BondOutcome"];
export type CandlestickResolution = Schemas["CandlestickResolution"];
export type ClobReward = Schemas["ClobReward"];
export type ConditionMetricsResponse = Schemas["ConditionMetricsResponse"];
export type EventHolder = Schemas["EventHolder"];
export type EventHolderPnl = Schemas["EventHolderPnl"];
export type EventHoldersResponse = Schemas["EventHoldersResponse"];
export type EventMarket = Schemas["EventMarket"];
export type EventMarketOutcome = Schemas["EventMarketOutcome"];
export type EventMetricsResponse = Schemas["EventMetricsResponse"];
export type EventPnlSortBy = Schemas["EventPnlSortBy"];
export type EventSortBy = Schemas["EventSortBy"];
export type GlobalPnlSortBy = Schemas["GlobalPnlSortBy"];
export type GlobalPnlTrader = Schemas["GlobalPnlTrader"];
export type Holder = Schemas["Holder"];
export type HolderHistoryCandle = Schemas["HolderHistoryCandle"];
export type MarketHolderPnl = Schemas["MarketHolderPnl"];
export type MarketHoldersResponse = Schemas["MarketHoldersResponse"];
export type MarketMetadata = Schemas["MarketMetadata"];
export type MarketMetadataOutcome = Schemas["MarketMetadataOutcome"];
export type MarketOutcome = Schemas["MarketOutcome"];
export type MarketPnlSortBy = Schemas["MarketPnlSortBy"];
export type MarketVolumeChartResponse = Schemas["MarketVolumeChartResponse"];
export type MarketVolumeDataPoint = Schemas["MarketVolumeDataPoint"];
export type MetricsTimeframe = Schemas["MetricsTimeframe"];
export type OutcomeHolders = Schemas["OutcomeHolders"];
export type OutcomeTimeframeMetrics = Schemas["OutcomeTimeframeMetrics"];
export type PnlCandleResolution = Schemas["PnlCandleResolution"];
export type PnlTimeframe = Schemas["PnlTimeframe"];
export type Event = Schemas["PolymarketEvent"];
export type PolymarketSeries = Schemas["PolymarketSeries"];
export type Tag = Schemas["PolymarketTag"];
export type UserProfile = Schemas["PolymarketUserProfile"];
export type PositionHolderPnl = Schemas["PositionHolderPnl"];
export type PositionHoldersResponse = Schemas["PositionHoldersResponse"];
export type PositionMetricsResponse = Schemas["PositionMetricsResponse"];
export type PositionPnlSortBy = Schemas["PositionPnlSortBy"];
export type PositionStatus = Schemas["PositionStatus"];
export type PositionVolumeChartResponse = Schemas["PositionVolumeChartResponse"];
export type PositionVolumeDataPoint = Schemas["PositionVolumeDataPoint"];
export type PredictionCandlestickBar = Schemas["PredictionCandlestickBar"];
export type PredictionCandlestickResponseData = Schemas["PredictionCandlestickResponseData"];
export type PredictionTradeResponse = Schemas["PredictionTradeResponse"];
export type SearchResponse = Schemas["SearchResponse"];
export type SeriesFullResponse = Schemas["SeriesFullResponse"];
export type SimpleTimeframeMetrics = Schemas["SimpleTimeframeMetrics"];
export type SortDirection = Schemas["SortDirection"];
export type TokenOutcome = Schemas["TokenOutcome"];
export type Trader = Schemas["Trader"];
export type TraderInfo = Schemas["TraderInfo"];
export type TraderVolumeChartResponse = Schemas["TraderVolumeChartResponse"];
export type TraderVolumeDataPoint = Schemas["TraderVolumeDataPoint"];

export type Series = Schemas["PolymarketSeries"];
export type SeriesDetail = Schemas["SeriesFullResponse"];
export type Trade = Schemas["PredictionTradeResponse"];
export type Candlestick = Schemas["PredictionCandlestickBar"];
export type CandlestickResponse = Schemas["PredictionCandlestickResponseData"];
export type Timeframe = Schemas["MetricsTimeframe"];
export type GlobalPnlTimeframe = Schemas["PnlTimeframe"];

export type TradeSide = "Buy" | "Sell";
export type EventStatus = "active" | "resolved" | "ended" | "archived";
export type HolderSortBy = "shares_held" | "total_cost_usd" | "unrealized_pnl_usd";

export interface TraderScore {
	trader: TraderInfo;
	is_bot: boolean;
	bot_confidence: number;
	bot_reasons: string[];
	smart_money_score: number;
	insider_score: number;
	insider_score_permanent: boolean;
	market_count: number;
	avg_trade_size_usd: string;
	total_trades: number;
	total_volume_usd: string;
	first_trade_at: number | null;
	last_trade_at: number;
}

export interface SmartMoneyEntry {
	trader: TraderInfo;
	smart_money_score: number;
	total_trades: number;
	total_volume_usd: string;
	market_count: number;
	last_trade_at: number;
}

export interface InsiderEntry {
	trader: TraderInfo;
	insider_score: number;
	insider_score_permanent: boolean;
	market_count: number;
	avg_trade_size_usd: string;
	total_trades: number;
	first_trade_at: number | null;
	last_trade_at: number;
}

export interface BotEntry {
	trader: TraderInfo;
	is_bot: boolean;
	bot_confidence: number;
	bot_reasons: string[];
	total_trades: number;
	total_volume_usd: string;
	last_trade_at: number;
}

export type PortfolioTimeframe = "7d" | "30d" | "lifetime";

export interface PortfolioOutcome {
	index: number;
	name: string;
}

export interface PortfolioMarketMetadata {
	question: string | null;
	title: string | null;
	id: string | null;
	market_id: string | null;
	slug: string | null;
	image_url: string | null;
	status: string | null;
	outcomes: PortfolioOutcome[] | null;
}

export interface ResolvedMarketMetadata {
	question: string | null;
	title: string | null;
	id: string | null;
	market_id: string | null;
	slug: string | null;
	image_url: string | null;
	winning_outcome: number | null;
	outcomes: PortfolioOutcome[] | null;
}

export interface PositionMarketMetadata {
	question: string | null;
	title: string | null;
	id: string | null;
	market_id: string | null;
	slug: string | null;
	image_url: string | null;
	status: string | null;
	winning_outcome: number | null;
	outcomes: PortfolioOutcome[] | null;
}

export interface OverallStats {
	realized_pnl_usd: number | null;
	unrealized_pnl_usd: number | null;
	resolved_markets_count: number | null;
	winning_markets_count: number | null;
	win_rate: number | null;
	total_trades: number | null;
	total_volume_usd: number | null;
	smart_money_score: number | null;
	insider_score: number | null;
	first_trade_at: number | null;
	last_trade_at: number | null;
}

export interface TimeframeStats {
	timeframe: string;
	buy_count: number | null;
	sell_count: number | null;
	buy_volume_usd: number | null;
	sell_volume_usd: number | null;
	unique_markets: number | null;
}

export interface ActivePosition {
	condition_id: string;
	outcome_index: number | null;
	outcome_name: string | null;
	shares_held: number | null;
	avg_entry_price: number | null;
	total_cost_usd: number | null;
	realized_pnl_usd: number | null;
	entry_probability: number | null;
	entry_timestamp: number | null;
	created_at: number | null;
	updated_at: number | null;
	market: PortfolioMarketMetadata | null;
}

export interface ResolvedPosition {
	condition_id: string;
	outcome_index: number | null;
	outcome_name: string | null;
	shares_held: number | null;
	avg_entry_price: number | null;
	total_cost_usd: number | null;
	realized_pnl_usd: number | null;
	entry_probability: number | null;
	entry_timestamp: number | null;
	created_at: number | null;
	updated_at: number | null;
	is_winner: boolean | null;
	market: ResolvedMarketMetadata | null;
}

export interface PnlChartPoint {
	timestamp: number;
	cumulative_pnl_usd: number | null;
}

export interface Portfolio {
	overall_stats: OverallStats | null;
	timeframe_stats: TimeframeStats | null;
	active_positions: ActivePosition[];
	resolved_positions: ResolvedPosition[];
	pnl_chart_data: PnlChartPoint[];
}

export interface Position {
	condition_id: string;
	outcome_index: number | null;
	outcome_name: string | null;
	shares_held: number | null;
	avg_entry_price: number | null;
	total_cost_usd: number | null;
	realized_pnl_usd: number | null;
	is_resolved: boolean | null;
	entry_probability: number | null;
	current_price: number | null;
	current_value_usd: number | null;
	unrealized_pnl_usd: number | null;
	entry_timestamp: number | null;
	created_at: number | null;
	updated_at: number | null;
	market: PositionMarketMetadata | null;
}

export interface PositionsResponse {
	positions: Position[];
	total_count: number | null;
	limit: number;
	offset: number;
}

export interface TradeEntry {
	id: string;
	hash: string | null;
	condition_id: string | null;
	side: number | null;
	outcome: string | null;
	outcome_index: number | null;
	usd_amount: number | null;
	shares_amount: number | null;
	price: number | null;
	probability: number | null;
	confirmed_at: number | null;
	market: PositionMarketMetadata | null;
}

export interface TradesResponse {
	trades: TradeEntry[];
	total_count: number | null;
	limit: number;
	offset: number;
}

export interface TraderPnlSummary {
	realized_pnl_usd: number | null;
	events_traded: number | null;
	markets_traded: number | null;
	positions_traded: number | null;
	total_buys: number | null;
	total_sells: number | null;
	total_redemptions: number | null;
	total_merges: number | null;
	total_volume_usd: number | null;
	buy_volume_usd: number | null;
	sell_volume_usd: number | null;
	redemption_volume_usd: number | null;
	merge_volume_usd: number | null;
	winning_positions: number | null;
	losing_positions: number | null;
	win_rate_pct: number | null;
	markets_won: number | null;
	markets_lost: number | null;
	market_win_rate_pct: number | null;
	open_positions: number | null;
	avg_pnl_per_position: number | null;
	avg_pnl_per_trade: number | null;
	avg_hold_time_seconds: number | null;
	total_fees: number | null;
	first_trade_at: number | null;
	last_trade_at: number | null;
}

export interface TraderPositionPnlEntry {
	condition_id: string | null;
	position_id: string | null;
	outcome: string | null;
	outcome_index: number | null;
	event_slug: string | null;
	buy_count: number | null;
	sell_count: number | null;
	redemption_count: number | null;
	merge_count: number | null;
	total_shares_bought: number | null;
	total_shares_sold: number | null;
	total_shares_redeemed: number | null;
	total_shares_merged: number | null;
	net_shares: number | null;
	buy_usd: number | null;
	sell_usd: number | null;
	redemption_usd: number | null;
	merge_usd: number | null;
	realized_pnl_usd: number | null;
	cost_basis: number | null;
	total_fees: number | null;
	first_trade_at: number | null;
	last_trade_at: number | null;
}

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

export interface PnlCandleEntry {
	ts: number;
	pnl_usd: number;
}

export interface PnlListResponse<T> {
	data: T[];
	total_count: number;
}

export interface PnlCandlesResponse {
	data: PnlCandleEntry[];
}

export interface GlobalPnlResponse {
	traders: GlobalPnlTrader[];
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

export interface GetBondsParams extends OperationQuery<"get_bonds"> {}

export interface GetEventsParams extends OperationQuery<"get_events"> {}

export interface GetEventMetricsParams extends OperationQuery<"get_event_metrics"> {}

export interface GetMarketMetricsParams extends OperationQuery<"get_market_metrics"> {}

export interface GetPositionMetricsParams extends OperationQuery<"get_position_metrics"> {}

export interface GetEventHoldersParams extends OperationQuery<"get_event_holders"> {
	eventSlug: string;
}

export interface GetEventHoldersHistoryParams {
	eventSlug: string;
	hours?: number;
}

export interface GetMarketHoldersParams extends OperationQuery<"get_market_holders"> {
	conditionId: string;
}

export interface GetMarketHoldersHistoryParams {
	conditionId: string;
	hours?: number;
}

export interface GetPositionHoldersParams extends OperationQuery<"get_position_holders"> {
	positionId: string;
}

export interface GetPositionHoldersHistoryParams {
	positionId: string;
	hours?: number;
}

export interface GetMarketsParams extends OperationQuery<"list_markets"> {}

export interface GetMarketParams {
	conditionId: string;
}

export interface GetMarketBySlugParams {
	slug: string;
}

export interface GetCandlestickParams extends OperationQuery<"get_market_candlestick"> {}

export interface GetPositionCandlestickParams extends OperationQuery<"get_position_candlestick"> {}

export interface GetMarketVolumeChartParams extends OperationQuery<"get_market_volume_chart"> {}

export interface GetPositionVolumeChartParams extends OperationQuery<"get_position_volume_chart"> {}

export interface GetTradesParams extends OperationQuery<"get_market_trades"> {}

export interface GetSearchParams extends OperationQuery<"search"> {}

export interface GetSeriesListParams extends OperationQuery<"get_series_list"> {}

export interface GetSeriesDetailParams extends OperationQuery<"get_series_by_id"> {
	identifier: string;
}

export interface GetSeriesEventsParams extends OperationQuery<"get_series_events"> {
	identifier: string;
}

export interface GetTagsParams extends OperationQuery<"get_tags"> {}

export interface GetTagParams {
	identifier: string;
}

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

export interface GetTraderPnlCandlesParams {
	address: string;
	resolution?: PnlCandleResolution;
	start_ts?: number;
	end_ts?: number;
	limit?: number;
}

export interface GetPortfolioParams {
	address: string;
	timeframe?: PortfolioTimeframe;
}

export interface GetPortfolioPositionsParams extends OperationQuery<"get_portfolio_positions"> {
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

export interface GetTraderScoreParams {
	address: string;
}

export interface LeaderboardParams {
	limit?: number;
}

export interface GetEventParams {
	id: string;
	include_tags?: boolean;
	include_markets?: boolean;
}

export interface GetEventBySlugParams {
	slug: string;
	include_tags?: boolean;
	include_markets?: boolean;
}

export type { RetryConfig, HttpClientConfig, RequestOptions, HttpResponse, RequestHookInfo, ResponseHookInfo, ApiResponseInfo } from "./http.js";
export type { Address, PaginationParams, SortParams, Venue } from "./common.js";
export type {
	ConnectionState,
	StructWebSocketConfig,
	PredictionTrade,
	EnrichedPredictionTrade,
	PredictionMarketMetadata,
	PredictionWalletTrackingAlert,
	WebSocketEventMap,
	WebSocketMessage,
	WebSocketServerMessage,
} from "./ws.js";

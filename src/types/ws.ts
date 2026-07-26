import type { RetryConfig } from "./http.js";
import type { Event, MarketResponse } from "./index.js";
import type {
	WsSchemas,
	WsAlertSchemas,
	WsAlertSubscribeMap,
	WsAlertEventDataMap,
	WsAlertEventName,
} from "./ws-helpers.js";

export type ConnectionState = "disconnected" | "connecting" | "connected" | "reconnecting";

export interface StructWebSocketConfig {
	apiKey: string;
	jwt?: string;
	getJwt?: () => string | undefined;
	baseUrl?: string;
	reconnect?: RetryConfig;
	subscribeTimeout?: number;
}

export type WsRoomId =
	| "polymarket_trades"
	| "polymarket_asset_prices"
	| "polymarket_asset_window_updates"
	| "polymarket_market_metrics"
	| "polymarket_event_metrics"
	| "polymarket_position_metrics"
	| "polymarket_tag_metrics"
	| "polymarket_trader_pnl"
	| "polymarket_trader_positions"
	| "polymarket_trader_pnl_exits"
	| "polymarket_holder_metrics"
	| "polymarket_accounts"
	| "polymarket_order_book"
	| "polymarket_clob_rewards"
	| "polymarket_events_stream"
	| "polymarket_markets_stream"
	| "polymarket_oracle_events"
	| "polymarket_position_liquidity"
	| "polymarket_market_liquidity"
	| "polymarket_event_liquidity";

export type WsFiltersOptionalRoom =
	| "polymarket_trades"
	| "polymarket_asset_prices"
	| "polymarket_clob_rewards"
	| "polymarket_events_stream"
	| "polymarket_markets_stream"
	| "polymarket_oracle_events"
	| "polymarket_holder_metrics"
	| "polymarket_position_liquidity"
	| "polymarket_market_liquidity"
	| "polymarket_event_liquidity";
export type WsFiltersRequiredRoom = Exclude<WsRoomId, WsFiltersOptionalRoom>;

export type TradesSubscribeFilters = Omit<WsSchemas["TradesStreamSubscribeMessage"], "action">;
export type AssetPricesSubscribeFilters = Omit<WsSchemas["AssetPricesSubscribeMessage"], "action">;
export type AssetWindowUpdatesSubscribeFilters = Omit<WsSchemas["AssetWindowUpdatesSubscribeMessage"], "action">;
export type MarketMetricsSubscribeFilters = Omit<WsSchemas["MarketMetricsSubscribeMessage"], "action">;
export type EventMetricsSubscribeFilters = Omit<WsSchemas["EventMetricsSubscribeMessage"], "action">;
export type PositionMetricsSubscribeFilters = Omit<WsSchemas["PositionMetricsSubscribeMessage"], "action">;
export type TagMetricsSubscribeFilters = Omit<WsSchemas["TagMetricsSubscribeMessage"], "action">;
export type TraderPnlSubscribeFilters = Omit<WsSchemas["TraderPnlSubscribeMessage"], "action">;
export type AccountsSubscribeFilters = Omit<WsSchemas["AccountsSubscribeMessage"], "action">;
export type OrderBookSubscribeFilters = Omit<WsSchemas["OrderBookSubscribeMessage"], "action">;
export type TraderPositionsSubscribeFilters = Omit<WsSchemas["TraderPositionsSubscribeMessage"], "action">;
export type TraderExitMarkersSubscribeFilters = Omit<WsSchemas["TraderExitMarkersSubscribeMessage"], "action">;
export type HolderMetricsSubscribeFilters = Omit<WsSchemas["HolderMetricsSubscribeMessage"], "action">;
export type ClobRewardsSubscribeFilters = Omit<WsSchemas["ClobRewardsSubscribeMessage"], "action">;
export type EventsStreamSubscribeFilters = Omit<WsSchemas["EventsStreamSubscribeMessage"], "action">;
export type MarketsStreamSubscribeFilters = Omit<WsSchemas["MarketsStreamSubscribeMessage"], "action">;
export type OracleEventsStreamSubscribeFilters = Omit<WsSchemas["OracleEventsStreamSubscribeMessage"], "action">;
export type PositionLiquiditySubscribeFilters = Omit<WsSchemas["PositionLiquiditySubscribeMessage"], "action">;
export type MarketLiquiditySubscribeFilters = Omit<WsSchemas["MarketLiquiditySubscribeMessage"], "action">;
export type EventLiquiditySubscribeFilters = Omit<WsSchemas["EventLiquiditySubscribeMessage"], "action">;

export type WsTradeType = NonNullable<TradesSubscribeFilters["trade_types"]>[number];
export type WsTradeStatus = NonNullable<TradesSubscribeFilters["status"]>;
export type WsAssetTimeframe = NonNullable<AssetWindowUpdatesSubscribeFilters["timeframes"]>[number];

export type TradeStreamEvent = WsSchemas["TradeStreamEvent"];
export type AssetPriceTickEvent = WsSchemas["AssetPriceTickEvent"];
export type AssetPriceWindowUpdateEvent = WsSchemas["AssetPriceWindowUpdateEvent"];
export type AssetWindowUpdateEvent = WsSchemas["AssetWindowUpdateEvent"];
export type MarketMetricsEvent = WsSchemas["MarketMetricsEvent"];
export type EventMetricsEvent = WsSchemas["EventMetricsEvent"];
export type PositionMetricsEvent = WsSchemas["PositionMetricsEvent"];
export type TagMetricsEvent = WsSchemas["TagMetricsEvent"];
export type TraderGlobalPnlBatchEvent = WsSchemas["TraderGlobalPnlBatchEvent"];
export type TraderMarketPnlBatchEvent = WsSchemas["TraderMarketPnlBatchEvent"];
export type TraderCategoryPnlBatchEvent = WsSchemas["TraderCategoryPnlBatchEvent"];
export type TraderGlobalTickBatchEvent = WsSchemas["TraderGlobalTickBatchEvent"];
export type TraderMarketTickBatchEvent = WsSchemas["TraderMarketTickBatchEvent"];
export type TraderCategoryTickBatchEvent = WsSchemas["TraderCategoryTickBatchEvent"];
export type TraderGlobalResolutionBatchEvent = WsSchemas["TraderGlobalResolutionBatchEvent"];
export type TraderMarketResolutionBatchEvent = WsSchemas["TraderMarketResolutionBatchEvent"];
export type TraderCategoryResolutionBatchEvent = WsSchemas["TraderCategoryResolutionBatchEvent"];
export type TraderPositionRow = WsSchemas["TraderPositionRow"];
export type TraderPositionBatchEvent = WsSchemas["TraderPositionBatchEvent"];
export type TraderPositionPriceRow = WsSchemas["TraderPositionPriceRow"];
export type TraderPositionPriceBatchEvent = WsSchemas["TraderPositionPriceBatchEvent"];
export type TraderPositionResolutionRow = WsSchemas["TraderPositionResolutionRow"];
export type TraderPositionResolutionBatchEvent = WsSchemas["TraderPositionResolutionBatchEvent"];
export type TraderExitMarkerRow = WsSchemas["TraderExitMarkerRow"];
export type TraderExitMarkerBatchEvent = WsSchemas["TraderExitMarkerBatchEvent"];
export type PositionHolderMetricsRow = WsSchemas["PositionHolderMetricsRow"];
export type ConditionHolderMetricsRow = WsSchemas["ConditionHolderMetricsRow"];
export type EventHolderMetricsRow = WsSchemas["EventHolderMetricsRow"];
export type HolderMetricsPositionBatchEvent = WsSchemas["HolderMetricsPositionBatchEvent"];
export type HolderMetricsConditionBatchEvent = WsSchemas["HolderMetricsConditionBatchEvent"];
export type HolderMetricsEventBatchEvent = WsSchemas["HolderMetricsEventBatchEvent"];
export type AccountsUpdateEvent = WsSchemas["AccountsUpdateEvent"];
export type UsdceUpdateEvent = WsSchemas["UsdceUpdateEvent"];
export type MaticUpdateEvent = WsSchemas["MaticUpdateEvent"];
export type PusdUpdateEvent = WsSchemas["PusdUpdateEvent"];
export type WsOrderBookLevel = WsSchemas["OrderBookLevel"];
export type OrderBookUpdateEvent = WsSchemas["OrderBookUpdateEvent"];
export type OrderBookBatchEvent = WsSchemas["OrderBookBatchEvent"];
export type TraderPositionsSubscribeResponse = WsSchemas["TraderPositionsSubscribeResponse"];
export type ClobRewardsUpdateEvent = WsSchemas["ClobRewardsUpdateEvent"];
export type ClobRewardsSubscribeResponse = WsSchemas["ClobRewardsSubscribeResponse"];
export type EventsStreamUpdateEvent = WsSchemas["EventsStreamUpdateEvent"];
export type EventsStreamUpdateRows = Event[];
export type EventsStreamSubscribeResponse = WsSchemas["EventsStreamSubscribeResponse"];
export type MarketsStreamUpdateEvent = WsSchemas["MarketsStreamUpdateEvent"];
export type MarketsStreamUpdateRows = MarketResponse[];
export type MarketsStreamSubscribeResponse = WsSchemas["MarketsStreamSubscribeResponse"];
export type OracleEventStreamEvent = WsSchemas["OracleEventTyped"];
export type OracleEventsStreamSubscribeResponse = WsSchemas["OracleEventsStreamSubscribeResponse"];
export type PositionLiquidityEvent = WsSchemas["PositionLiquidityEvent"];
export type MarketLiquidityEvent = WsSchemas["MarketLiquidityEvent"];
export type EventLiquidityEvent = WsSchemas["EventLiquidityEvent"];
export type TradeOrderFilledEvent = WsSchemas["TradeOrderFilledEvent"];
export type TradeRedemptionEvent = WsSchemas["TradeRedemptionEvent"];
export type TradeMergeEvent = WsSchemas["TradeMergeEvent"];
export type TradeSplitEvent = WsSchemas["TradeSplitEvent"];
export type TradePositionsConvertedEvent = WsSchemas["TradePositionsConvertedEvent"];
export type TradeCancelledEvent = WsSchemas["TradeCancelledEvent"];
export type TradeOracleLifecycleEvent = WsSchemas["TradeOracleLifecycleEvent"];
export type TradeRegisterTokenEvent = WsSchemas["TradeRegisterTokenEvent"];
export type WsAlertSubscribeMessage = WsAlertSchemas["WsAlertSubscribeMessage"];
export type WsAlertUnsubscribeMessage = WsAlertSchemas["WsAlertUnsubscribeMessage"];
export type WsAlertEventPayload = WsAlertSchemas["WsAlertEventPayload"];
export type WsAlertSubscribedResponse = WsAlertSchemas["WsAlertSubscribedResponse"];
export type WsAlertUnsubscribedResponse = WsAlertSchemas["WsAlertUnsubscribedResponse"];
export type WsAlertErrorResponse = WsAlertSchemas["WsAlertErrorResponse"];
export type WsAlertEventType = WsAlertSchemas["WsAlertEventType"];
export type { WsAlertSubscribeMap, WsAlertEventDataMap, WsAlertEventName };

export type TradesStreamSubscribeResponse = WsSchemas["TradesStreamSubscribeResponse"];
export type AssetPricesSubscribeResponse = WsSchemas["AssetPricesSubscribeResponse"];
export type AssetWindowUpdatesSubscribeResponse = WsSchemas["AssetWindowUpdatesSubscribeResponse"];
export type MarketMetricsSubscribeResponse = WsSchemas["MarketMetricsSubscribeResponse"];
export type EventMetricsSubscribeResponse = WsSchemas["EventMetricsSubscribeResponse"];
export type PositionMetricsSubscribeResponse = WsSchemas["PositionMetricsSubscribeResponse"];
export type TagMetricsSubscribeResponse = WsSchemas["TagMetricsSubscribeResponse"];
export type TraderPnlSubscribeResponse = WsSchemas["TraderPnlSubscribeResponse"];
export type TraderExitMarkersSubscribeResponse = WsSchemas["TraderExitMarkersSubscribeResponse"];
export interface HolderMetricsSubscribeResponse {
	position_ids?: string[];
	condition_ids?: string[];
	event_slugs?: string[];
	rejected?: string[];
	error?: string | null;
}
export type AccountsSubscribeResponse = WsSchemas["AccountsSubscribeResponse"];
export type OrderBookSubscribeResponse = WsSchemas["OrderBookSubscribeResponse"];
interface LiquiditySubscribeResponseBase {
	rejected?: string[];
	error?: string | null;
}
export interface PositionLiquiditySubscribeResponse extends LiquiditySubscribeResponseBase {
	position_ids?: string[];
}
export interface MarketLiquiditySubscribeResponse extends LiquiditySubscribeResponseBase {
	condition_ids?: string[];
}
export interface EventLiquiditySubscribeResponse extends LiquiditySubscribeResponseBase {
	event_slugs?: string[];
}

export interface WebSocketEventMap {
	trade_stream_update: TradeStreamEvent;
	asset_price_tick: AssetPriceTickEvent;
	asset_price_window_update: AssetPriceWindowUpdateEvent;
	asset_window_update: AssetWindowUpdateEvent;
	market_metrics_update: MarketMetricsEvent;
	event_metrics_update: EventMetricsEvent;
	position_metrics_update: PositionMetricsEvent;
	tag_metrics_update: TagMetricsEvent;
	trader_global_pnl_batch: TraderGlobalPnlBatchEvent;
	trader_market_pnl_batch: TraderMarketPnlBatchEvent;
	trader_category_pnl_batch: TraderCategoryPnlBatchEvent;
	trader_global_tick_batch: TraderGlobalTickBatchEvent;
	trader_market_tick_batch: TraderMarketTickBatchEvent;
	trader_category_tick_batch: TraderCategoryTickBatchEvent;
	trader_global_resolution_batch: TraderGlobalResolutionBatchEvent;
	trader_market_resolution_batch: TraderMarketResolutionBatchEvent;
	trader_category_resolution_batch: TraderCategoryResolutionBatchEvent;
	trader_position_batch: TraderPositionBatchEvent;
	trader_position_price_batch: TraderPositionPriceBatchEvent;
	trader_position_resolution_batch: TraderPositionResolutionBatchEvent;
	trader_exit_marker_batch: TraderExitMarkerBatchEvent;
	holder_metrics_position_batch: HolderMetricsPositionBatchEvent;
	holder_metrics_condition_batch: HolderMetricsConditionBatchEvent;
	holder_metrics_event_batch: HolderMetricsEventBatchEvent;
	accounts_update: AccountsUpdateEvent;
	usdce_update: UsdceUpdateEvent;
	matic_update: MaticUpdateEvent;
	pusd_update: PusdUpdateEvent;
	order_book_update: OrderBookUpdateEvent;
	order_book_batch: OrderBookBatchEvent;
	clob_rewards_update: ClobRewardsUpdateEvent;
	events_stream_update: EventsStreamUpdateRows;
	markets_stream_update: MarketsStreamUpdateRows;
	oracle_event_update: OracleEventStreamEvent;
	position_liquidity_update: PositionLiquidityEvent;
	market_liquidity_update: MarketLiquidityEvent;
	event_liquidity_update: EventLiquidityEvent;
	connected: void;
	disconnected: { code: number; reason: string };
	reconnecting: { attempt: number };
	reconnect_failed: Error;
	auth_failed: Error;
	error: Error;
	warning: Error;
}

export interface WsSubscriptionMap {
	polymarket_trades: TradesSubscribeFilters;
	polymarket_asset_prices: AssetPricesSubscribeFilters;
	polymarket_asset_window_updates: AssetWindowUpdatesSubscribeFilters;
	polymarket_market_metrics: MarketMetricsSubscribeFilters;
	polymarket_event_metrics: EventMetricsSubscribeFilters;
	polymarket_position_metrics: PositionMetricsSubscribeFilters;
	polymarket_tag_metrics: TagMetricsSubscribeFilters;
	polymarket_trader_pnl: TraderPnlSubscribeFilters;
	polymarket_trader_positions: TraderPositionsSubscribeFilters;
	polymarket_trader_pnl_exits: TraderExitMarkersSubscribeFilters;
	polymarket_holder_metrics: HolderMetricsSubscribeFilters;
	polymarket_accounts: AccountsSubscribeFilters;
	polymarket_order_book: OrderBookSubscribeFilters;
	polymarket_clob_rewards: ClobRewardsSubscribeFilters;
	polymarket_events_stream: EventsStreamSubscribeFilters;
	polymarket_markets_stream: MarketsStreamSubscribeFilters;
	polymarket_oracle_events: OracleEventsStreamSubscribeFilters;
	polymarket_position_liquidity: PositionLiquiditySubscribeFilters;
	polymarket_market_liquidity: MarketLiquiditySubscribeFilters;
	polymarket_event_liquidity: EventLiquiditySubscribeFilters;
}

export interface WsSubscribeResponseMap {
	polymarket_trades: TradesStreamSubscribeResponse;
	polymarket_asset_prices: AssetPricesSubscribeResponse;
	polymarket_asset_window_updates: AssetWindowUpdatesSubscribeResponse;
	polymarket_market_metrics: MarketMetricsSubscribeResponse;
	polymarket_event_metrics: EventMetricsSubscribeResponse;
	polymarket_position_metrics: PositionMetricsSubscribeResponse;
	polymarket_tag_metrics: TagMetricsSubscribeResponse;
	polymarket_trader_pnl: TraderPnlSubscribeResponse;
	polymarket_trader_positions: TraderPositionsSubscribeResponse;
	polymarket_trader_pnl_exits: TraderExitMarkersSubscribeResponse;
	polymarket_holder_metrics: HolderMetricsSubscribeResponse;
	polymarket_accounts: AccountsSubscribeResponse;
	polymarket_order_book: OrderBookSubscribeResponse;
	polymarket_clob_rewards: ClobRewardsSubscribeResponse;
	polymarket_events_stream: EventsStreamSubscribeResponse;
	polymarket_markets_stream: MarketsStreamSubscribeResponse;
	polymarket_oracle_events: OracleEventsStreamSubscribeResponse;
	polymarket_position_liquidity: PositionLiquiditySubscribeResponse;
	polymarket_market_liquidity: MarketLiquiditySubscribeResponse;
	polymarket_event_liquidity: EventLiquiditySubscribeResponse;
}

export type AlertsWebSocketEventMap = {
	[E in WsAlertEventName]: { event: E; timestamp: number; data: WsAlertEventDataMap[E] };
} & {
	connected: void;
	disconnected: { code: number; reason: string };
	reconnecting: { attempt: number };
	reconnect_failed: Error;
	auth_failed: Error;
	error: Error;
	warning: Error;
};

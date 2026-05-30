import type { RetryConfig } from "./http.js";
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
	| "polymarket_trader_pnl_v3"
	| "polymarket_trader_positions"
	| "polymarket_trader_positions_v3"
	| "polymarket_trader_pnl_v3_exits"
	| "polymarket_holder_metrics_v3"
	| "polymarket_accounts"
	| "polymarket_order_book"
	| "polymarket_clob_rewards"
	| "polymarket_events_stream"
	| "polymarket_markets_stream"
	| "polymarket_oracle_events";

export type WsFiltersOptionalRoom =
	| "polymarket_trades"
	| "polymarket_asset_prices"
	| "polymarket_clob_rewards"
	| "polymarket_events_stream"
	| "polymarket_markets_stream"
	| "polymarket_oracle_events"
	| "polymarket_holder_metrics_v3";
export type WsFiltersRequiredRoom = Exclude<WsRoomId, WsFiltersOptionalRoom>;

export type TradesSubscribeFilters = Omit<WsSchemas["TradesStreamSubscribeMessage"], "action">;
export type AssetPricesSubscribeFilters = Omit<WsSchemas["AssetPricesSubscribeMessage"], "action">;
export type AssetWindowUpdatesSubscribeFilters = Omit<WsSchemas["AssetWindowUpdatesSubscribeMessage"], "action">;
export type MarketMetricsSubscribeFilters = Omit<WsSchemas["MarketMetricsSubscribeMessage"], "action">;
export type EventMetricsSubscribeFilters = Omit<WsSchemas["EventMetricsSubscribeMessage"], "action">;
export type PositionMetricsSubscribeFilters = Omit<WsSchemas["PositionMetricsSubscribeMessage"], "action">;
export type TagMetricsSubscribeFilters = Omit<WsSchemas["TagMetricsSubscribeMessage"], "action">;
export type TraderPnlSubscribeFilters = Omit<WsSchemas["TraderPnlSubscribeMessage"], "action">;
export type TraderPnlV3SubscribeFilters = Omit<WsSchemas["TraderPnlV3SubscribeMessage"], "action">;
export type AccountsSubscribeFilters = Omit<WsSchemas["AccountsSubscribeMessage"], "action">;
export type OrderBookSubscribeFilters = Omit<WsSchemas["OrderBookSubscribeMessage"], "action">;
export type TraderPositionsSubscribeFilters = Omit<WsSchemas["TraderPositionsSubscribeMessage"], "action">;
export type TraderPositionsV3SubscribeFilters = Omit<WsSchemas["TraderPositionsV3SubscribeMessage"], "action">;
export type TraderExitMarkersSubscribeFilters = Omit<WsSchemas["TraderExitMarkersSubscribeMessage"], "action">;
export type HolderMetricsV3SubscribeFilters = Omit<WsSchemas["HolderMetricsV3SubscribeMessage"], "action">;
export type ClobRewardsSubscribeFilters = Omit<WsSchemas["ClobRewardsSubscribeMessage"], "action">;
export type EventsStreamSubscribeFilters = Omit<WsSchemas["EventsStreamSubscribeMessage"], "action">;
export type MarketsStreamSubscribeFilters = Omit<WsSchemas["MarketsStreamSubscribeMessage"], "action">;
export type OracleEventsStreamSubscribeFilters = Omit<WsSchemas["OracleEventsStreamSubscribeMessage"], "action">;

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
export type TraderGlobalPnlEvent = WsSchemas["TraderGlobalPnlEvent"];
export type TraderMarketPnlEvent = WsSchemas["TraderMarketPnlEvent"];
export type TraderEventPnlEvent = WsSchemas["TraderEventPnlEvent"];
export type TraderGlobalPnlV3BatchEvent = WsSchemas["TraderGlobalPnlV3BatchEvent"];
export type TraderMarketPnlV3BatchEvent = WsSchemas["TraderMarketPnlV3BatchEvent"];
export type TraderEventPnlV3BatchEvent = WsSchemas["TraderEventPnlV3BatchEvent"];
export type TraderCategoryPnlV3BatchEvent = WsSchemas["TraderCategoryPnlV3BatchEvent"];
export type TraderGlobalTickV3BatchEvent = WsSchemas["TraderGlobalTickV3BatchEvent"];
export type TraderMarketTickV3BatchEvent = WsSchemas["TraderMarketTickV3BatchEvent"];
export type TraderEventTickV3BatchEvent = WsSchemas["TraderEventTickV3BatchEvent"];
export type TraderCategoryTickV3BatchEvent = WsSchemas["TraderCategoryTickV3BatchEvent"];
export type TraderGlobalResolutionV3BatchEvent = WsSchemas["TraderGlobalResolutionV3BatchEvent"];
export type TraderMarketResolutionV3BatchEvent = WsSchemas["TraderMarketResolutionV3BatchEvent"];
export type TraderEventResolutionV3BatchEvent = WsSchemas["TraderEventResolutionV3BatchEvent"];
export type TraderCategoryResolutionV3BatchEvent = WsSchemas["TraderCategoryResolutionV3BatchEvent"];
export type TraderPositionV3Row = WsSchemas["TraderPositionV3Row"];
export type TraderPositionV3BatchEvent = WsSchemas["TraderPositionV3BatchEvent"];
export type TraderPositionPriceV3Row = WsSchemas["TraderPositionPriceV3Row"];
export type TraderPositionPriceV3BatchEvent = WsSchemas["TraderPositionPriceV3BatchEvent"];
export type TraderPositionResolutionV3Row = WsSchemas["TraderPositionResolutionV3Row"];
export type TraderPositionResolutionV3BatchEvent = WsSchemas["TraderPositionResolutionV3BatchEvent"];
export type TraderExitMarkerRow = WsSchemas["TraderExitMarkerRow"];
export type TraderExitMarkerBatchEvent = WsSchemas["TraderExitMarkerBatchEvent"];
export type PositionHolderMetricsV3Row = WsSchemas["PositionHolderMetricsV3Row"];
export type ConditionHolderMetricsV3Row = WsSchemas["ConditionHolderMetricsV3Row"];
export type EventHolderMetricsV3Row = WsSchemas["EventHolderMetricsV3Row"];
export type HolderMetricsPositionV3BatchEvent = WsSchemas["HolderMetricsPositionV3BatchEvent"];
export type HolderMetricsConditionV3BatchEvent = WsSchemas["HolderMetricsConditionV3BatchEvent"];
export type HolderMetricsEventV3BatchEvent = WsSchemas["HolderMetricsEventV3BatchEvent"];
export type AccountsUpdateEvent = WsSchemas["AccountsUpdateEvent"];
export type UsdceUpdateEvent = WsSchemas["UsdceUpdateEvent"];
export type MaticUpdateEvent = WsSchemas["MaticUpdateEvent"];
export type PusdUpdateEvent = WsSchemas["PusdUpdateEvent"];
export type WsOrderBookLevel = WsSchemas["OrderBookLevel"];
export type OrderBookUpdateEvent = WsSchemas["OrderBookUpdateEvent"];
export type TraderPositionUpdateEvent = WsSchemas["TraderPositionUpdateEvent"];
export type TraderPositionsSubscribeResponse = WsSchemas["TraderPositionsSubscribeResponse"];
export type ClobRewardsUpdateEvent = WsSchemas["ClobRewardsUpdateEvent"];
export type ClobRewardsSubscribeResponse = WsSchemas["ClobRewardsSubscribeResponse"];
export type EventsStreamUpdateEvent = WsSchemas["EventsStreamUpdateEvent"];
export type EventsStreamSubscribeResponse = WsSchemas["EventsStreamSubscribeResponse"];
export type MarketsStreamUpdateEvent = WsSchemas["MarketsStreamUpdateEvent"];
export type MarketsStreamSubscribeResponse = WsSchemas["MarketsStreamSubscribeResponse"];
export type OracleEventStreamEvent = WsSchemas["OracleEventTyped"];
export type OracleEventsStreamSubscribeResponse = WsSchemas["OracleEventsStreamSubscribeResponse"];
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
export type TraderPnlV3SubscribeResponse = WsSchemas["TraderPnlV3SubscribeResponse"];
export type TraderPositionsV3SubscribeResponse = WsSchemas["TraderPositionsV3SubscribeResponse"];
export type TraderExitMarkersSubscribeResponse = WsSchemas["TraderExitMarkersSubscribeResponse"];
export interface HolderMetricsV3SubscribeResponse {
	position_ids?: string[];
	condition_ids?: string[];
	event_slugs?: string[];
	rejected?: string[];
	error?: string | null;
}
export type AccountsSubscribeResponse = WsSchemas["AccountsSubscribeResponse"];
export type OrderBookSubscribeResponse = WsSchemas["OrderBookSubscribeResponse"];

export interface WebSocketEventMap {
	trade_stream_update: TradeStreamEvent;
	asset_price_tick: AssetPriceTickEvent;
	asset_price_window_update: AssetPriceWindowUpdateEvent;
	asset_window_update: AssetWindowUpdateEvent;
	market_metrics_update: MarketMetricsEvent;
	event_metrics_update: EventMetricsEvent;
	position_metrics_update: PositionMetricsEvent;
	tag_metrics_update: TagMetricsEvent;
	trader_global_pnl_update: TraderGlobalPnlEvent;
	trader_market_pnl_update: TraderMarketPnlEvent;
	trader_event_pnl_update: TraderEventPnlEvent;
	trader_global_pnl_v3_batch: TraderGlobalPnlV3BatchEvent;
	trader_market_pnl_v3_batch: TraderMarketPnlV3BatchEvent;
	trader_event_pnl_v3_batch: TraderEventPnlV3BatchEvent;
	trader_category_pnl_v3_batch: TraderCategoryPnlV3BatchEvent;
	trader_global_tick_v3_batch: TraderGlobalTickV3BatchEvent;
	trader_market_tick_v3_batch: TraderMarketTickV3BatchEvent;
	trader_event_tick_v3_batch: TraderEventTickV3BatchEvent;
	trader_category_tick_v3_batch: TraderCategoryTickV3BatchEvent;
	trader_global_resolution_v3_batch: TraderGlobalResolutionV3BatchEvent;
	trader_market_resolution_v3_batch: TraderMarketResolutionV3BatchEvent;
	trader_event_resolution_v3_batch: TraderEventResolutionV3BatchEvent;
	trader_category_resolution_v3_batch: TraderCategoryResolutionV3BatchEvent;
	trader_position_v3_batch: TraderPositionV3BatchEvent;
	trader_position_price_v3_batch: TraderPositionPriceV3BatchEvent;
	trader_position_resolution_v3_batch: TraderPositionResolutionV3BatchEvent;
	trader_exit_marker_batch: TraderExitMarkerBatchEvent;
	holder_metrics_position_v3_batch: HolderMetricsPositionV3BatchEvent;
	holder_metrics_condition_v3_batch: HolderMetricsConditionV3BatchEvent;
	holder_metrics_event_v3_batch: HolderMetricsEventV3BatchEvent;
	accounts_update: AccountsUpdateEvent;
	usdce_update: UsdceUpdateEvent;
	matic_update: MaticUpdateEvent;
	pusd_update: PusdUpdateEvent;
	order_book_update: OrderBookUpdateEvent;
	trader_position_update: TraderPositionUpdateEvent;
	clob_rewards_update: ClobRewardsUpdateEvent;
	events_stream_update: EventsStreamUpdateEvent;
	markets_stream_update: MarketsStreamUpdateEvent;
	oracle_event_update: OracleEventStreamEvent;
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
	polymarket_trader_pnl_v3: TraderPnlV3SubscribeFilters;
	polymarket_trader_positions: TraderPositionsSubscribeFilters;
	polymarket_trader_positions_v3: TraderPositionsV3SubscribeFilters;
	polymarket_trader_pnl_v3_exits: TraderExitMarkersSubscribeFilters;
	polymarket_holder_metrics_v3: HolderMetricsV3SubscribeFilters;
	polymarket_accounts: AccountsSubscribeFilters;
	polymarket_order_book: OrderBookSubscribeFilters;
	polymarket_clob_rewards: ClobRewardsSubscribeFilters;
	polymarket_events_stream: EventsStreamSubscribeFilters;
	polymarket_markets_stream: MarketsStreamSubscribeFilters;
	polymarket_oracle_events: OracleEventsStreamSubscribeFilters;
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
	polymarket_trader_pnl_v3: TraderPnlV3SubscribeResponse;
	polymarket_trader_positions: TraderPositionsSubscribeResponse;
	polymarket_trader_positions_v3: TraderPositionsV3SubscribeResponse;
	polymarket_trader_pnl_v3_exits: TraderExitMarkersSubscribeResponse;
	polymarket_holder_metrics_v3: HolderMetricsV3SubscribeResponse;
	polymarket_accounts: AccountsSubscribeResponse;
	polymarket_order_book: OrderBookSubscribeResponse;
	polymarket_clob_rewards: ClobRewardsSubscribeResponse;
	polymarket_events_stream: EventsStreamSubscribeResponse;
	polymarket_markets_stream: MarketsStreamSubscribeResponse;
	polymarket_oracle_events: OracleEventsStreamSubscribeResponse;
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

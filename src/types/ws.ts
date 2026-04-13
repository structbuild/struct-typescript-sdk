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
	| "polymarket_trader_pnl"
	| "polymarket_trader_positions"
	| "polymarket_accounts"
	| "polymarket_order_book"
	| "polymarket_clob_rewards";

export type WsFiltersOptionalRoom = "polymarket_trades" | "polymarket_asset_prices" | "polymarket_clob_rewards";
export type WsFiltersRequiredRoom = Exclude<WsRoomId, WsFiltersOptionalRoom>;

export type TradesSubscribeFilters = Omit<WsSchemas["TradesStreamSubscribeMessage"], "action">;
export type AssetPricesSubscribeFilters = Omit<WsSchemas["AssetPricesSubscribeMessage"], "action">;
export type AssetWindowUpdatesSubscribeFilters = Omit<WsSchemas["AssetWindowUpdatesSubscribeMessage"], "action">;
export type MarketMetricsSubscribeFilters = Omit<WsSchemas["MarketMetricsSubscribeMessage"], "action">;
export type EventMetricsSubscribeFilters = Omit<WsSchemas["EventMetricsSubscribeMessage"], "action">;
export type PositionMetricsSubscribeFilters = Omit<WsSchemas["PositionMetricsSubscribeMessage"], "action">;
export type TraderPnlSubscribeFilters = Omit<WsSchemas["TraderPnlSubscribeMessage"], "action">;
export type AccountsSubscribeFilters = Omit<WsSchemas["AccountsSubscribeMessage"], "action">;
export type OrderBookSubscribeFilters = Omit<WsSchemas["OrderBookSubscribeMessage"], "action">;
export type TraderPositionsSubscribeFilters = Omit<WsSchemas["TraderPositionsSubscribeMessage"], "action">;
export type ClobRewardsSubscribeFilters = Omit<WsSchemas["ClobRewardsSubscribeMessage"], "action">;

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
export type TraderGlobalPnlEvent = WsSchemas["TraderGlobalPnlEvent"];
export type TraderMarketPnlEvent = WsSchemas["TraderMarketPnlEvent"];
export type TraderEventPnlEvent = WsSchemas["TraderEventPnlEvent"];
export type AccountsUpdateEvent = WsSchemas["AccountsUpdateEvent"];
export type UsdceUpdateEvent = WsSchemas["UsdceUpdateEvent"];
export type MaticUpdateEvent = WsSchemas["MaticUpdateEvent"];
export type WsOrderBookLevel = WsSchemas["OrderBookLevel"];
export type OrderBookUpdateEvent = WsSchemas["OrderBookUpdateEvent"];
export type TraderPositionUpdateEvent = WsSchemas["TraderPositionUpdateEvent"];
export type TraderPositionsSubscribeResponse = WsSchemas["TraderPositionsSubscribeResponse"];
export type ClobRewardsUpdateEvent = WsSchemas["ClobRewardsUpdateEvent"];
export type ClobRewardsSubscribeResponse = WsSchemas["ClobRewardsSubscribeResponse"];
export type TradeOrderFilledEvent = WsSchemas["TradeOrderFilledEvent"];
export type TradeRedemptionEvent = WsSchemas["TradeRedemptionEvent"];
export type TradeMergeEvent = WsSchemas["TradeMergeEvent"];
export type TradeSplitEvent = WsSchemas["TradeSplitEvent"];
export type TradePositionsConvertedEvent = WsSchemas["TradePositionsConvertedEvent"];
export type TradeCancelledEvent = WsSchemas["TradeCancelledEvent"];
export type TradeOracleLifecycleEvent = WsSchemas["TradeOracleLifecycleEvent"];
export type TradeRegisterTokenEvent = WsSchemas["TradeRegisterTokenEvent"];
export type TradeApprovalEvent = WsSchemas["TradeApprovalEvent"];
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
export type TraderPnlSubscribeResponse = WsSchemas["TraderPnlSubscribeResponse"];
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
	trader_global_pnl_update: TraderGlobalPnlEvent;
	trader_market_pnl_update: TraderMarketPnlEvent;
	trader_event_pnl_update: TraderEventPnlEvent;
	accounts_update: AccountsUpdateEvent;
	usdce_update: UsdceUpdateEvent;
	matic_update: MaticUpdateEvent;
	order_book_update: OrderBookUpdateEvent;
	trader_position_update: TraderPositionUpdateEvent;
	clob_rewards_update: ClobRewardsUpdateEvent;
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
	polymarket_trader_pnl: TraderPnlSubscribeFilters;
	polymarket_trader_positions: TraderPositionsSubscribeFilters;
	polymarket_accounts: AccountsSubscribeFilters;
	polymarket_order_book: OrderBookSubscribeFilters;
	polymarket_clob_rewards: ClobRewardsSubscribeFilters;
}

export interface WsSubscribeResponseMap {
	polymarket_trades: TradesStreamSubscribeResponse;
	polymarket_asset_prices: AssetPricesSubscribeResponse;
	polymarket_asset_window_updates: AssetWindowUpdatesSubscribeResponse;
	polymarket_market_metrics: MarketMetricsSubscribeResponse;
	polymarket_event_metrics: EventMetricsSubscribeResponse;
	polymarket_position_metrics: PositionMetricsSubscribeResponse;
	polymarket_trader_pnl: TraderPnlSubscribeResponse;
	polymarket_trader_positions: TraderPositionsSubscribeResponse;
	polymarket_accounts: AccountsSubscribeResponse;
	polymarket_order_book: OrderBookSubscribeResponse;
	polymarket_clob_rewards: ClobRewardsSubscribeResponse;
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

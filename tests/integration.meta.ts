export interface MethodConfig {
	skip?: boolean;
	params?: Record<string, unknown>;
	noArgs?: boolean;
	operationId?: string;
	paginate?: boolean;
	paginateParams?: Record<string, unknown>;
	shape?: "array" | "object" | "defined";
}

export const methodMeta: Record<string, MethodConfig> = {
	"assets.getAssetHistory": {
		params: { asset_symbol: "BTC", variant: "1h" },
		operationId: "get_asset_history",
	},

	"markets.getMarkets": {
		params: { limit: 2 },
		operationId: "list_markets",
		paginate: true,
	},
	"markets.getMarket": {
		params: { conditionId: "$conditionId" },
		operationId: "get_market",
		shape: "object",
	},
	"markets.getMarketBySlug": {
		params: { marketSlug: "$marketSlug" },
		operationId: "get_market_by_slug",
		shape: "object",
	},
	"markets.getMarketChart": {
		params: { condition_id: "$conditionId", resolution: "1D", count_back: 10 },
		operationId: "get_chart",
	},
	"markets.getMarketMetrics": {
		params: { condition_id: "$conditionId", timeframe: "24h" },
		operationId: "get_market_metrics",
		shape: "object",
	},
	"markets.getTrades": {
		params: { condition_ids: "$conditionId", limit: 2 },
		operationId: "get_market_trades",
		paginate: true,
	},
	"markets.getCandlestick": {
		params: { condition_id: "$conditionId", resolution: "1D" },
		operationId: "get_market_candlestick",
	},
	"markets.getPositionCandlestick": {
		params: { position_id: "$positionId", resolution: "1D" },
		operationId: "get_position_candlestick",
	},
	"markets.getPositionMetrics": {
		params: { position_id: "$positionId", timeframe: "24h" },
		operationId: "get_position_metrics",
		shape: "object",
	},
	"markets.getPositionVolumeChart": {
		params: { position_id: "$positionId" },
		operationId: "get_position_volume_chart",
	},
	"markets.getMarketVolumeChart": {
		params: { condition_id: "$conditionId" },
		operationId: "get_market_volume_chart",
	},
	"markets.getPriceJumps": {
		params: { condition_id: "$conditionId" },
		operationId: "get_price_jumps",
	},
	"markets.getMarketTopTraders": {
		params: { condition_id: "$conditionId", limit: 2 },
		operationId: "get_market_top_traders",
	},
	"markets.getPositionTopTraders": {
		params: { position_id: "$positionId", limit: 2 },
		operationId: "get_position_top_traders",
	},

	"events.getEvents": {
		params: { limit: 2 },
		operationId: "get_events",
		paginate: true,
	},
	"events.getEventChart": {
		params: { event_slug: "$eventSlug", resolution: "1D" },
		operationId: "get_event_chart",
	},
	"events.getEventMetrics": {
		params: { event_slug: "$eventSlug", timeframe: "24h" },
		operationId: "get_event_metrics",
		shape: "object",
	},
	"events.getEventOutcomes": {
		params: { event_slug: "$eventSlug", limit: 2 },
		operationId: "get_event_outcomes",
	},
	"events.getEventTopTraders": {
		params: { event_slug: "$eventSlug", limit: 2 },
		operationId: "get_event_top_traders",
	},

	"holders.getMarketHolders": {
		params: { condition_id: "$conditionId", limit: 2 },
		operationId: "get_market_holders",
	},
	"holders.getPositionHolders": {
		params: { positionId: "$positionId", limit: 2 },
		operationId: "get_position_holders",
	},
	"holders.getMarketHoldersHistory": {
		params: { condition_id: "$conditionId" },
		operationId: "get_market_holders_history",
		paginate: true,
	},
	"holders.getPositionHoldersHistory": {
		params: { positionId: "$positionId" },
		operationId: "get_position_holders_history",
		paginate: true,
	},

	"tags.getTags": {
		params: { limit: 2 },
		operationId: "get_tags",
		paginate: true,
	},
	"tags.getTag": {
		params: { identifier: "$tagId" },
		operationId: "get_tag_by_id",
	},

	"series.getSeriesList": {
		params: { limit: 2 },
		operationId: "get_series_list",
		paginate: true,
	},
"series.getSeriesOutcomes": {
		params: { series_slug: "$seriesId", limit: 2 },
		operationId: "get_series_outcomes",
	},
	"series.getSeriesEvents": {
		skip: true,
		params: { identifier: "$seriesId", limit: 2 },
		operationId: "get_series_events",
		paginate: true,
	},

	"trader.getTraderTrades": {
		params: { address: "$address", limit: 2 },
		operationId: "get_trader_trades",
		paginate: true,
		paginateParams: { address: "0xaf3909f0123a907b22d7add2cd1a59a072013101" },
	},
	"trader.getTraderProfile": {
		params: { address: "$address" },
		operationId: "get_trader_profile",
	},
	"trader.getTraderProfilesBatch": {
		params: { addresses: "$address" },
		operationId: "get_trader_profiles_batch",
		paginate: true,
		paginateParams: { addresses: "0xaf3909f0123a907b22d7add2cd1a59a072013101" },
	},
	"trader.getTraderVolumeChart": {
		params: { address: "$address" },
		operationId: "get_trader_volume_chart",
	},
	"trader.getTraderPnl": {
		params: { address: "$address" },
		operationId: "get_trader_pnl",
	},
	"trader.getTraderMarketPnl": {
		params: { address: "$address", limit: 2 },
		operationId: "get_trader_market_pnl",
	},
	"trader.getTraderEventPnl": {
		params: { address: "$address", limit: 2 },
		operationId: "get_trader_event_pnl",
	},
	"trader.getTraderPnlCalendar": {
		params: { address: "$address" },
		operationId: "get_trader_pnl_calendar",
	},
	"trader.getTraderPnlCandles": {
		params: { address: "$address" },
		operationId: "get_trader_pnl_candles",
	},
	"trader.getTraderOutcomePnl": {
		params: { address: "$address", sort_by: "total_buy_usd", status: "open", limit: 2 },
		operationId: "get_trader_position_pnl",
		paginate: true,
		paginateParams: { address: "0xaf3909f0123a907b22d7add2cd1a59a072013101", sort_by: "total_buy_usd", status: "open" },
	},
	"trader.getGlobalPnl": {
		params: { limit: 2 },
		operationId: "get_global_pnl",
		paginate: true,
	},
	"trader.getLeaderboard": {
		params: { limit: 2 },
		operationId: "get_polymarket_leaderboard",
	},

	"search.search": {
		params: { q: "president" },
		operationId: "search",
	},

	"bonds.getBonds": {
		params: { limit: 2 },
		operationId: "get_bonds",
		paginate: true,
	},

	"orderBook.getOrderBook": {
		params: { position_id: "$positionId" },
		operationId: "get_order_book",
	},
	"orderBook.getOrderBookHistory": {
		params: { position_id: "$positionId" },
		operationId: "get_order_book_history",
	},
	"orderBook.getMarketOrderBook": {
		params: { condition_id: "$conditionId" },
		operationId: "get_market_order_book",
	},
	"orderBook.getSpreadHistory": {
		params: { position_id: "$positionId" },
		operationId: "get_spread_history",
	},

	"analytics.getCounts": {
		operationId: "get_analytics_counts",
		shape: "object",
		noArgs: true,
	},
	"analytics.getDeltas": {
		operationId: "get_global_analytics_deltas",
	},
	"analytics.getChanges": {
		params: { timeframe: "24h" },
		operationId: "get_global_analytics_changes",
		shape: "object",
	},
	"analytics.getTimeseries": {
		operationId: "get_global_analytics_timeseries",
	},
	"analytics.getEventDeltas": {
		params: { event_slug: "$eventSlug" },
		operationId: "get_event_analytics_deltas",
	},
	"analytics.getEventChanges": {
		params: { event_slug: "$eventSlug", timeframe: "24h" },
		operationId: "get_event_analytics_changes",
		shape: "object",
	},
	"analytics.getEventTimeseries": {
		params: { event_slug: "$eventSlug" },
		operationId: "get_event_analytics_timeseries",
	},
	"analytics.getMarketDeltas": {
		params: { condition_id: "$conditionId" },
		operationId: "get_market_analytics_deltas",
	},
	"analytics.getMarketChanges": {
		params: { condition_id: "$conditionId", timeframe: "24h" },
		operationId: "get_market_analytics_changes",
		shape: "object",
	},
	"analytics.getMarketTimeseries": {
		params: { condition_id: "$conditionId" },
		operationId: "get_market_analytics_timeseries",
	},
	"analytics.getTagDeltas": {
		params: { tag: "$tagId" },
		operationId: "get_tag_analytics_deltas",
	},
	"analytics.getTagChanges": {
		params: { tag: "$tagId", timeframe: "24h" },
		operationId: "get_tag_analytics_changes",
		shape: "object",
	},
	"analytics.getTagTimeseries": {
		params: { tag: "$tagId" },
		operationId: "get_tag_analytics_timeseries",
	},
	"analytics.getTraderDeltas": {
		params: { address: "$address" },
		operationId: "get_trader_analytics_deltas",
	},
	"analytics.getTraderChanges": {
		params: { address: "$address", timeframe: "24h" },
		operationId: "get_trader_analytics_changes",
		shape: "object",
	},
	"analytics.getTraderTimeseries": {
		params: { address: "$address" },
		operationId: "get_trader_analytics_timeseries",
	},

	"builders.getBuilders": {
		params: { limit: 2 },
		operationId: "list_builders",
		paginate: true,
	},
	"builders.getBuilder": {
		params: { builder_code: "$builderCode" },
		operationId: "get_builder",
		shape: "object",
	},
	"builders.getBuilderChanges": {
		params: { builder_code: "$builderCode", timeframe: "24h" },
		operationId: "get_builder_analytics_changes",
		shape: "object",
	},
	"builders.getBuilderDeltas": {
		params: { builder_code: "$builderCode" },
		operationId: "get_builder_analytics_deltas",
	},
	"builders.getBuilderTimeseries": {
		params: { builder_code: "$builderCode" },
		operationId: "get_builder_analytics_timeseries",
	},
	"builders.getBuilderConcentration": {
		params: { builder_code: "$builderCode", timeframe: "lifetime" },
		operationId: "get_builder_concentration",
		shape: "object",
	},
	"builders.getBuilderFees": {
		params: { builder_code: "$builderCode" },
		operationId: "get_builder_fees",
		shape: "object",
	},
	"builders.getBuilderFeesHistory": {
		params: { builder_code: "$builderCode", limit: 2 },
		operationId: "get_builder_fees_history",
	},
	"builders.getBuilderRetention": {
		params: { builder_code: "$builderCode" },
		operationId: "get_builder_retention",
	},
	"builders.getBuilderTags": {
		params: { builder_code: "$builderCode", limit: 2 },
		operationId: "list_builder_tags",
	},
	"builders.getBuilderTopTraders": {
		params: { builder_code: "$builderCode", limit: 2 },
		operationId: "get_builder_top_traders",
	},
	"builders.getGlobal": {
		params: { timeframe: "lifetime" },
		operationId: "get_builder_global",
		shape: "object",
	},
	"builders.getGlobalChanges": {
		params: { timeframe: "24h" },
		operationId: "get_builder_global_changes",
		shape: "object",
	},
	"builders.getGlobalDeltas": {
		operationId: "get_builder_global_deltas",
	},
	"builders.getGlobalTimeseries": {
		operationId: "get_builder_global_timeseries",
	},
	"builders.getTagBuilders": {
		params: { tag: "$builderTagId", limit: 2 },
		operationId: "list_tag_builders",
		paginate: true,
		paginateParams: { tag: "$builderTagId" },
	},

	"webhooks.list": {
		operationId: "list_webhooks",
	},
	"webhooks.rotateSecret": { skip: true },
	"webhooks.create": { skip: true },
	"webhooks.update": { skip: true },
	"webhooks.deleteWebhook": { skip: true },
	"webhooks.test": { skip: true },
	"webhooks.getWebhook": { skip: true },
};

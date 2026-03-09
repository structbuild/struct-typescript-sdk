export interface MethodConfig {
	skip?: boolean;
	params?: Record<string, unknown>;
	operationId?: string;
	paginate?: boolean;
	paginateParams?: Record<string, unknown>;
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
	"markets.getMarketChart": {
		params: { condition_id: "$conditionId", resolution: "1D", count_back: 10 },
		operationId: "get_chart",
	},
	"markets.getMarketMetrics": {
		params: { condition_id: "$conditionId", timeframe: "24h" },
		operationId: "get_market_metrics",
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
	},
	"events.getEventOutcomes": {
		params: { event_slug: "$eventSlug", limit: 2 },
		operationId: "get_event_outcomes",
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
	"trader.getTraderPnlCandles": {
		params: { address: "$address" },
		operationId: "get_trader_pnl_candles",
	},
	"trader.getTraderOutcomePnl": {
		params: { address: "$address", sort_by: "buy_usd", limit: 2 },
		operationId: "get_trader_position_pnl",
		paginate: true,
		paginateParams: { address: "0xaf3909f0123a907b22d7add2cd1a59a072013101", sort_by: "buy_usd" },
	},
	"trader.getGlobalPnl": {
		params: { limit: 2 },
		operationId: "get_global_pnl",
		paginate: true,
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

	"webhooks.list": {
		operationId: "list_webhooks",
	},
	"webhooks.create": { skip: true },
	"webhooks.update": { skip: true },
	"webhooks.deleteWebhook": { skip: true },
	"webhooks.test": { skip: true },
	"webhooks.getWebhook": { skip: true },
};

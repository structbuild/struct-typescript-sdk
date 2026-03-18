export type paths = Record<string, never>;
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** @description Server-pushed event: full CLOB orderbook snapshot for an outcome token. Envelope type: "order_book_update". Delivered whenever the book changes for a subscribed condition or position. */
        OrderBookUpdateEvent: {
            /** @description Hex token ID (position / outcome token) */
            asset_id: string;
            /** @description Condition ID (hex) */
            market: string;
            /** @description Bid levels sorted best-first (highest price first) */
            bids: components["schemas"]["OrderBookLevel"][];
            /** @description Ask levels sorted best-first (lowest price first) */
            asks: components["schemas"]["OrderBookLevel"][];
            /**
             * Format: int64
             * @description Unix milliseconds from CLOB message
             */
            timestamp: number;
            /** @description Orderbook content hash — identical hash means no change */
            hash: string;
            /** @description Best bid price (0–1) */
            best_bid?: number | null;
            /** @description Best ask price (0–1) */
            best_ask?: number | null;
            /** @description (best_bid + best_ask) / 2 */
            mid_price?: number | null;
            /** @description best_ask − best_bid */
            spread?: number | null;
            /** @description Total USD value of all bid levels */
            bid_liquidity_usd?: number | null;
            /** @description Total USD value of all ask levels */
            ask_liquidity_usd?: number | null;
            /** @description Number of bid price levels */
            bid_levels?: number | null;
            /** @description Number of ask price levels */
            ask_levels?: number | null;
        };
        /** @description A single price level: [price_string, size_string] */
        OrderBookLevel: string[];
        /** @description Server acknowledgement for an order book subscription */
        OrderBookSubscribeResponse: {
            /** @description Accepted condition IDs */
            condition_ids?: string[];
            /** @description Accepted position IDs */
            position_ids?: string[];
            /** @description Filter values that were rejected (invalid format or limit exceeded) */
            rejected?: string[];
        };
        /** @description Subscribe to the order book stream. At least one filter is required. Maximum 500 combined condition_ids + position_ids per client. */
        OrderBookSubscribeMessage: {
            /** @enum {string} */
            action: "subscribe" | "unsubscribe_all";
            /** @description Condition IDs (markets). All positions within each market are delivered. */
            condition_ids?: string[];
            /** @description Token / asset IDs (individual outcome positions, hex strings). */
            position_ids?: string[];
        };
        /** @description Server-pushed event: MATIC native balance change for a wallet. Envelope type: "matic_update". Only delivered when `include_matic: true`. */
        MaticUpdateEvent: {
            /** @description Wallet address */
            address: string;
            /** @description Current MATIC balance — omitted when not available */
            balance?: number;
            /** Format: uint64 */
            block_number: number;
            /**
             * Format: int64
             * @description Unix seconds
             */
            updated_at: number;
        };
        /** @description Subscribe to the trades stream. At least one filter field must be non-empty. */
        TradesStreamSubscribeMessage: {
            /** @enum {string} */
            action: "subscribe" | "unsubscribe_all";
            /** @description 64-char hex condition IDs (with or without 0x prefix) */
            condition_ids?: string[];
            /** @description Market slugs */
            market_slugs?: string[];
            /** @description Event slugs — subscribes to all markets under each event */
            event_slugs?: string[];
            /** @description ERC-1155 outcome token IDs (decimal or hex strings) */
            position_ids?: string[];
        };
        /** @description Server acknowledgement for a trades stream subscription */
        TradesStreamSubscribeResponse: {
            condition_ids?: string[];
            market_slugs?: string[];
            event_slugs?: string[];
            position_ids?: string[];
            /** @description Filter values that were rejected (invalid format) */
            rejected?: string[];
        };
        /** @description Subscribe to the asset prices stream. Empty asset_symbols = all assets. */
        AssetPricesSubscribeMessage: {
            /** @enum {string} */
            action: "subscribe" | "unsubscribe_all";
            /** @description Uppercase asset symbols (e.g. "BTC", "ETH"). Empty = subscribe to all. */
            asset_symbols?: string[];
        };
        /** @description Server acknowledgement for an asset prices subscription */
        AssetPricesSubscribeResponse: {
            /** @description Accepted symbols. Empty array means subscribed to all symbols. */
            asset_symbols?: string[];
        };
        /** @description Subscribe to the asset window updates stream. At least one of asset_symbols or timeframes must be non-empty. */
        AssetWindowUpdatesSubscribeMessage: {
            /** @enum {string} */
            action: "subscribe" | "unsubscribe_all";
            /** @description Uppercase asset symbols (e.g. "BTC", "ETH") */
            asset_symbols?: string[];
            /** @description Candle sizes to filter by. "1d" and "24h" are treated as equivalent. */
            timeframes?: ("5m" | "15m" | "1h" | "4h" | "1d" | "24h")[];
        };
        /** @description Server acknowledgement for an asset window updates subscription */
        AssetWindowUpdatesSubscribeResponse: {
            asset_symbols?: string[];
            timeframes?: string[];
            /** @description Set if the subscription was rejected (e.g. no filters provided) */
            error?: string | null;
        };
        /** @description Subscribe to the market metrics stream. condition_ids is required and must be non-empty. */
        MarketMetricsSubscribeMessage: {
            /** @enum {string} */
            action: "subscribe" | "unsubscribe_all";
            /** @description 64-char hex condition IDs (with or without 0x prefix) */
            condition_ids: string[];
        };
        /** @description Server acknowledgement for a market metrics subscription */
        MarketMetricsSubscribeResponse: {
            condition_ids?: string[];
            /** @description Condition IDs that were rejected (invalid format) */
            rejected?: string[];
            /** @description Set if the entire subscription was rejected */
            error?: string | null;
        };
        /** @description Subscribe to the event metrics stream. event_slugs is required and must be non-empty. */
        EventMetricsSubscribeMessage: {
            /** @enum {string} */
            action: "subscribe" | "unsubscribe_all";
            /** @description Event slugs (lowercase) */
            event_slugs: string[];
        };
        /** @description Server acknowledgement for an event metrics subscription */
        EventMetricsSubscribeResponse: {
            event_slugs?: string[];
            rejected?: string[];
            error?: string | null;
        };
        /** @description Subscribe to the position metrics stream. position_ids is required and must be non-empty. */
        PositionMetricsSubscribeMessage: {
            /** @enum {string} */
            action: "subscribe" | "unsubscribe_all";
            /** @description ERC-1155 outcome token IDs (decimal or hex strings) */
            position_ids: string[];
        };
        /** @description Server acknowledgement for a position metrics subscription */
        PositionMetricsSubscribeResponse: {
            position_ids?: string[];
            rejected?: string[];
            error?: string | null;
        };
        /** @description Subscribe to the trader PnL stream. traders is required and must be non-empty. */
        TraderPnlSubscribeMessage: {
            /** @enum {string} */
            action: "subscribe" | "unsubscribe_all";
            /** @description EVM wallet addresses */
            traders: string[];
        };
        /** @description Server acknowledgement for a trader PnL subscription */
        TraderPnlSubscribeResponse: {
            traders?: string[];
            rejected?: string[];
            error?: string | null;
        };
        /** @description Server-pushed event: a matched trade on a subscribed market/position/event/slug. Envelope type: "trade_stream_update". */
        TradeStreamEvent: {
            /** @description Limit-order maker wallet */
            trader: string;
            /** @description Order taker wallet */
            taker: string;
            /** @description ERC-1155 outcome token ID */
            position_id: string;
            condition_id?: string | null;
            /** @description Outcome name (e.g. "Yes") */
            outcome?: string | null;
            /** @description 0 = Yes, 1 = No */
            outcome_index?: number | null;
            question?: string | null;
            market_slug?: string | null;
            event_slug?: string | null;
            trade_id: string;
            /** @description Transaction hash */
            hash: string;
            /** Format: int64 */
            block: number;
            /**
             * Format: int64
             * @description Unix seconds
             */
            confirmed_at: number;
            amount_usd: number;
            shares_amount: number;
            fee: number;
            /** @enum {string} */
            side: "Buy" | "Sell";
            price: number;
        };
        /** @description Server-pushed event: a crypto-asset price tick. Envelope type: "asset_price_tick". */
        AssetPriceTickEvent: {
            /** @description Uppercase asset symbol (e.g. "BTC") */
            symbol: string;
            /** @description Current price in USD */
            price: number;
            /**
             * Format: int64
             * @description Unix milliseconds
             */
            timestamp: number;
            /** @description 24-hour price change % */
            change_24h?: number | null;
            /** @description 24-hour trading volume USD */
            volume_24h?: number | null;
            market_cap?: number | null;
        };
        /** @description Server-pushed event: candle open or close for a crypto asset. Envelope type: "asset_price_window_update". */
        AssetPriceWindowUpdateEvent: {
            /** @description Uppercase asset symbol */
            symbol: string;
            /** @enum {string} */
            timeframe: "5m" | "15m" | "1h" | "4h" | "1d" | "24h";
            /**
             * @description "open" = candle starting, "close" = candle finalised
             * @enum {string}
             */
            update_type: "open" | "close";
            open: number;
            close: number;
            high: number;
            low: number;
            volume?: number | null;
            /**
             * Format: int64
             * @description Candle start time in Unix milliseconds
             */
            timestamp: number;
        };
        /** @description Server-pushed event from the polymarket_asset_window_updates room. Envelope type: "asset_window_update". */
        AssetWindowUpdateEvent: components["schemas"]["AssetPriceWindowUpdateEvent"];
        /** @description Volume and trade-count metrics for one timeframe window */
        MetricsTimeframe: {
            /** @enum {string} */
            timeframe: "1m" | "5m" | "30m" | "1h" | "6h" | "24h" | "7d" | "30d";
            /** @description USD volume in this window */
            volume_usd: number;
            /** @description Number of trades in this window */
            trade_count: number;
        };
        /** @description Server-pushed event: updated metrics for a condition. Envelope type: "market_metrics_update". */
        MarketMetricsEvent: {
            /** @description 0x-prefixed 64-char hex condition ID */
            condition_id: string;
            market_slug?: string | null;
            timeframes: components["schemas"]["MetricsTimeframe"][];
        };
        /** @description Server-pushed event: updated aggregated metrics for an event. Envelope type: "event_metrics_update". */
        EventMetricsEvent: {
            event_slug: string;
            timeframes: components["schemas"]["MetricsTimeframe"][];
        };
        /** @description Server-pushed event: updated metrics for an outcome token. Envelope type: "position_metrics_update". */
        PositionMetricsEvent: {
            /** @description ERC-1155 token ID (decimal string) */
            position_id: string;
            condition_id?: string | null;
            outcome?: string | null;
            timeframes: components["schemas"]["MetricsTimeframe"][];
        };
        /** @description PnL figures broken down by timeframe */
        PnlTimeframes: {
            /** @description 1-day PnL in USD */
            "1d"?: number | null;
            "7d"?: number | null;
            "30d"?: number | null;
            /** @description All-time PnL in USD */
            all?: number | null;
        };
        /** @description Server-pushed event: global (portfolio-level) PnL update for a trader. Envelope type: "trader_global_pnl_update". */
        TraderGlobalPnlEvent: {
            /** @description Trader EVM address */
            trader: string;
            /** @description Realized PnL in USD */
            realized_pnl: number;
            /** @description Unrealized PnL in USD */
            unrealized_pnl: number;
            total_pnl?: number | null;
            /** @description Window that triggered the update */
            timeframe: string;
            /**
             * Format: int64
             * @description Unix seconds
             */
            updated_at?: number;
        };
        /** @description Server-pushed event: per-market PnL update for a trader. Envelope type: "trader_market_pnl_update". */
        TraderMarketPnlEvent: {
            trader: string;
            condition_id: string;
            market_slug?: string | null;
            realized_pnl: number;
            unrealized_pnl: number;
            total_pnl?: number | null;
            timeframe: string;
            /** Format: int64 */
            updated_at?: number;
        };
        /** @description Server-pushed event: per-event PnL update for a trader. Envelope type: "trader_event_pnl_update". */
        TraderEventPnlEvent: {
            trader: string;
            event_slug: string;
            realized_pnl: number;
            unrealized_pnl: number;
            total_pnl?: number | null;
            timeframe: string;
            /** Format: int64 */
            updated_at?: number;
        };
        /** @description Subscribe to the accounts stream. `wallets` is required. Share balance updates (`accounts_update`) are always delivered. Set `include_usdce` or `include_matic` to also receive those balance streams. */
        AccountsSubscribeMessage: {
            /** @enum {string} */
            action: "subscribe" | "unsubscribe_all";
            /** @description EVM wallet addresses */
            wallets: string[];
            /**
             * @description Also stream USDCe collateral balance updates for subscribed wallets
             * @default false
             */
            include_usdce: boolean;
            /**
             * @description Also stream MATIC gas balance updates for subscribed wallets
             * @default false
             */
            include_matic: boolean;
        };
        /** @description Server acknowledgement for an accounts subscription */
        AccountsSubscribeResponse: {
            wallets?: string[];
            /** @description Addresses rejected (invalid format) */
            rejected?: string[];
            include_usdce?: boolean;
            include_matic?: boolean;
            error?: string | null;
        };
        /** @description Server-pushed event: ERC-1155 outcome token balance change for a wallet. Envelope type: "accounts_update". */
        AccountsUpdateEvent: {
            /** @description Wallet address */
            wallet: string;
            /** @description ERC-1155 outcome token ID (decimal string) */
            position_id: string;
            /** @description Current token balance (U256 as decimal string) */
            balance: string;
            /** Format: int64 */
            block_number: number;
            /**
             * Format: int64
             * @description Unix seconds
             */
            updated_at: number;
            /** @description Condition ID — omitted when not available */
            condition_id?: string;
            /** @description Event slug — omitted when not available */
            event_slug?: string;
        };
        /** @description Server-pushed event: USDCe collateral balance change for a wallet. Envelope type: "usdce_update". Only delivered when `include_usdce: true`. */
        UsdceUpdateEvent: {
            /** @description Wallet address */
            address: string;
            /** @description USDCe contract address — omitted when not available */
            token_address?: string;
            /** @description Current USDCe balance — omitted when not available */
            balance?: number;
            /** Format: uint64 */
            block_number: number;
            /**
             * Format: int64
             * @description Unix seconds
             */
            updated_at: number;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;

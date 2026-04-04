export type paths = Record<string, never>;
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** @description Server-pushed event: a trade executed by a tracked wallet. Envelope type: "wallet_tracking_alert". */
        WalletTrackingAlertEvent: {
            /** @description True = buy, false = sell */
            is_buy: boolean;
            /** @description Trader EVM wallet address (lowercase) */
            trader: string;
            /** @description 64-char hex condition ID */
            condition_id?: string | null;
            /** @description ERC-1155 outcome token ID (decimal string) */
            position_id: string;
            /** @description USD value of the trade (decimal string, 6dp) */
            usd_amount: string;
            /** @description Number of shares traded (decimal string, 6dp) */
            shares_amount: string;
            /** @description Trade price (0–1) */
            price: number;
            /** @description Implied probability (0–1) */
            probability?: number | null;
            /** @description Market metadata — null when enrichment is unavailable */
            metadata?: components["schemas"]["PredictionMarketMetadata"] | null;
            /**
             * Format: int64
             * @description Unix seconds
             */
            confirmed_at: number;
        };
        /** @description Market metadata enrichment attached to wallet tracking alerts */
        PredictionMarketMetadata: {
            /** @description Market slug */
            slug?: string | null;
            /** @description Market question text */
            question?: string | null;
            /** @description Outcome name (e.g. "Yes") */
            outcome?: string | null;
            outcome_index?: number | null;
            image_url?: string | null;
        };
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
        /** @description Server-pushed event: MATIC native balance change for a wallet. Envelope type: "matic_update". Only delivered when `include_matic: true`. */
        MaticUpdateEvent: {
            /** @description Wallet address (0x-prefixed hex) */
            address: string;
            /** @description Native token address — omitted when not available */
            token_address?: string;
            /** @description Current MATIC balance (decimal string) — omitted when not available */
            balance?: string;
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
        /** @description Subscribe to the trader positions stream. traders is required and must be non-empty. */
        TraderPositionsSubscribeMessage: {
            /** @enum {string} */
            action: "subscribe" | "unsubscribe_all";
            /** @description EVM wallet addresses */
            traders: string[];
        };
        /** @description Server acknowledgement for a trader positions subscription */
        TraderPositionsSubscribeResponse: {
            traders?: string[];
            rejected?: string[];
            error?: string | null;
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
        /** @description Subscribe to the order book stream. At least one filter is required. Maximum 500 combined condition_ids + position_ids per client. No `type` field is needed — the server routes by room_id. */
        OrderBookSubscribeMessage: {
            /** @enum {string} */
            action: "subscribe" | "unsubscribe_all";
            /** @description Condition IDs (markets). All positions within each market are delivered. */
            condition_ids?: string[];
            /** @description Token / asset IDs (individual outcome positions, hex strings). */
            position_ids?: string[];
        };
        /** @description Server acknowledgement for an order book subscription. Envelope type: "order_book_stream_subscribe_response". */
        OrderBookSubscribeResponse: {
            /** @description Accepted condition IDs */
            condition_ids?: string[];
            /** @description Accepted position IDs */
            position_ids?: string[];
            /** @description Filter values that were rejected (invalid format or limit exceeded) */
            rejected?: string[];
        };
        /** @description Subscribe to wallet trade alerts. wallet_addresses is required. */
        WalletTrackingSubscribeMessage: {
            /** @enum {string} */
            action: "subscribe";
            /** @description EVM wallet addresses to track */
            wallet_addresses: string[];
        };
        /** @description Server-pushed event: a matched trade on a subscribed market/position/event/slug. Envelope type: "trade_stream_update". */
        TradeStreamEvent: {
            /** @description Trade ID */
            id: string;
            /** @description Transaction hash (hex) */
            hash: string;
            /** Format: uint64 */
            chain_id?: number;
            /** Format: uint64 */
            block: number;
            /**
             * Format: uint64
             * @description Unix seconds
             */
            confirmed_at: number;
            /** Format: uint64 */
            log_index?: number;
            /** Format: uint64 */
            block_index?: number;
            /** @description Order hash (hex) */
            order_hash?: string;
            /** @description Limit-order maker wallet address */
            trader: string;
            /** @description Order taker wallet address */
            taker: string;
            /** @description "Buy" or "Sell" */
            side?: string | null;
            /** @description 64-char hex condition ID */
            condition_id?: string | null;
            /** @description ERC-1155 outcome token ID (decimal string) */
            position_id: string;
            /** @description Outcome name (e.g. "Yes") */
            outcome?: string | null;
            /** @description 0 = Yes, 1 = No */
            outcome_index?: number | null;
            question?: string | null;
            /** @description Market slug */
            slug?: string | null;
            event_slug?: string | null;
            /** @description USD value of the trade (decimal string) */
            usd_amount: string;
            /** @description Number of shares traded (decimal string) */
            shares_amount: string;
            /** @description Trade price (0–1) */
            price: number;
            /** @description Implied probability (0–1) */
            probability?: number | null;
            /** @description Protocol fee paid (decimal string) */
            fee: string;
            /** @description Exchange identifier */
            exchange?: string;
            /** @description "OrderFilled", "Redemption", "Merge", "Split", "Cancelled", "PositionsConverted", "OrdersMatched" */
            trade_type?: string;
            /** @description Resolved winning outcome index */
            winning_outcome_index?: number | null;
            is_known_surebet?: boolean;
            is_coordinated?: boolean;
            is_surebet_trade?: boolean;
            surebet_price_sum?: number | null;
            is_bot?: boolean;
            bot_reason?: string | null;
        };
        /** @description Server-pushed event: a crypto-asset price tick. Envelope type: "asset_price_tick". */
        AssetPriceTickEvent: {
            /** @description Always "asset_price_tick" */
            event_type: string;
            /** @description Uppercase asset symbol (e.g. "BTC") */
            symbol: string;
            /** @description Current price in USD */
            price: number;
            /**
             * Format: int64
             * @description Event timestamp in Unix milliseconds
             */
            timestamp_ms: number;
            /**
             * Format: int64
             * @description Publish timestamp in Unix milliseconds
             */
            published_at: number;
        };
        /** @description Server-pushed event: candle open or close for a crypto asset. Envelope type: "asset_price_window_update". Delivered from both `polymarket_asset_prices` and `polymarket_asset_window_updates` rooms. */
        AssetPriceWindowUpdateEvent: {
            /** @description Always "asset_price_window_update" */
            event_type: string;
            /** @description Uppercase asset symbol (e.g. "BTC") */
            symbol: string;
            /** @description Candle size / timeframe (e.g. "5m", "1h", "1d") */
            variant: string;
            /**
             * Format: int64
             * @description Candle start in Unix milliseconds
             */
            start_time: number;
            /**
             * Format: int64
             * @description Candle end in Unix milliseconds
             */
            end_time: number;
            /** @description Candle open price in USD */
            open_price: number;
            /** @description Candle close price in USD */
            close_price: number;
            /** @description "open" = candle starting, "close" = candle finalised */
            update_type: string;
            /**
             * Format: int64
             * @description Publish timestamp in Unix milliseconds
             */
            published_at: number;
        };
        /** @description Server-pushed event from the polymarket_asset_window_updates room. Same payload as AssetPriceWindowUpdateEvent. Envelope type: "asset_price_window_update". */
        AssetWindowUpdateEvent: components["schemas"]["AssetPriceWindowUpdateEvent"];
        /** @description Server-pushed event: metrics update for one timeframe of a condition. Envelope type: "market_metrics_update". One event is emitted per timeframe window on each update. */
        MarketMetricsEvent: {
            /** @description 64-char hex condition ID */
            condition_id: string;
            /** @enum {string} */
            timeframe: "1m" | "5m" | "30m" | "1h" | "6h" | "24h" | "7d" | "30d";
            /**
             * Format: int64
             * @description Optional event timestamp (Unix seconds)
             */
            timestamp?: number | null;
            /** @description USD volume in this timeframe window (decimal string) */
            usd_volume: string;
            /** @description Total fees in this window */
            fees: number;
            /**
             * Format: int64
             * @description Number of transactions
             */
            txns: number;
            /** Format: int64 */
            unique_traders: number;
            /**
             * Format: int64
             * @description Earliest trade timestamp in window (Unix seconds)
             */
            historical_confirmed_at: number;
            /**
             * Format: int64
             * @description Latest trade timestamp in window (Unix seconds)
             */
            latest_confirmed_at: number;
            /** Format: int64 */
            latest_block: number;
        };
        /** @description Server-pushed event: aggregated metrics update for one timeframe of an event. Envelope type: "event_metrics_update". One event is emitted per timeframe window on each update. */
        EventMetricsEvent: {
            event_slug: string;
            /** @enum {string} */
            timeframe: "1m" | "5m" | "30m" | "1h" | "6h" | "24h" | "7d" | "30d";
            /**
             * Format: int64
             * @description Optional event timestamp (Unix seconds)
             */
            timestamp?: number | null;
            /** @description USD volume in this timeframe window (decimal string) */
            usd_volume: string;
            fees: number;
            /** Format: int64 */
            txns: number;
            /** Format: int64 */
            unique_traders: number;
            /** Format: int64 */
            historical_confirmed_at: number;
            /** Format: int64 */
            latest_confirmed_at: number;
            /** Format: int64 */
            latest_block: number;
        };
        /** @description Server-pushed event: metrics update for one timeframe of an outcome token. Envelope type: "position_metrics_update". One event is emitted per timeframe window on each update. */
        PositionMetricsEvent: {
            /** @description 64-char hex condition ID */
            condition_id: string;
            /** @description ERC-1155 token ID (decimal string) */
            position_id: string;
            /** @description Outcome name (e.g. "Yes") */
            outcome?: string | null;
            outcome_index?: number | null;
            /** @enum {string} */
            timeframe: "1m" | "5m" | "30m" | "1h" | "6h" | "24h" | "7d" | "30d";
            /**
             * Format: int64
             * @description Optional event timestamp (Unix seconds)
             */
            timestamp?: number | null;
            /** @description Total USD volume (decimal string) */
            usd_volume: string;
            /** @description USD buy volume (decimal string) */
            usd_buy_volume: string;
            /** @description USD sell volume (decimal string) */
            usd_sell_volume: string;
            fees: number;
            /** Format: int64 */
            txns: number;
            /** Format: int64 */
            buys: number;
            /** Format: int64 */
            sells: number;
            /** Format: int64 */
            unique_traders: number;
            /** @description OHLC open price (0–1) */
            price_open: number;
            /** @description OHLC close price (0–1) */
            price_close: number;
            /** @description OHLC high price (0–1) */
            price_high: number;
            /** @description OHLC low price (0–1) */
            price_low: number;
            /** @description Implied probability at open (0–1) */
            probability_open: number;
            /** @description Implied probability at close (0–1) */
            probability_close: number;
            /** @description Highest implied probability in window (0–1) */
            probability_high: number;
            /** @description Lowest implied probability in window (0–1) */
            probability_low: number;
            /** Format: int64 */
            historical_confirmed_at: number;
            /** Format: int64 */
            latest_confirmed_at: number;
            /** Format: int64 */
            latest_block: number;
        };
        /** @description Server-pushed event: global (portfolio-level) PnL update for a trader. Envelope type: "trader_global_pnl_update". */
        TraderGlobalPnlEvent: {
            /** @description Trader EVM wallet address */
            trader: string;
            /** @description Total realized PnL in USD (decimal string) */
            realized_pnl_usd: string;
            /** Format: int64 */
            events_traded?: number | null;
            /** Format: int64 */
            markets_traded?: number | null;
            /** Format: int64 */
            total_buys?: number | null;
            /** Format: int64 */
            total_sells?: number | null;
            /** Format: int64 */
            total_redemptions?: number | null;
            /** Format: int64 */
            total_merges?: number | null;
            /** @description Total USD volume (decimal string) */
            total_volume_usd: string;
            buy_volume_usd: string;
            sell_volume_usd: string;
            redemption_volume_usd: string;
            merge_volume_usd: string;
            /** Format: int64 */
            markets_won?: number | null;
            /** Format: int64 */
            markets_lost?: number | null;
            /** @description Win rate percentage (decimal string) */
            market_win_rate_pct: string;
            avg_pnl_per_market: string;
            avg_pnl_per_trade: string;
            avg_hold_time_seconds: string;
            total_fees: string;
            best_trade_pnl_usd: string;
            best_trade_condition_id?: string | null;
            worst_trade_pnl_usd: string;
            worst_trade_condition_id?: string | null;
            /**
             * Format: int64
             * @description Unix seconds
             */
            first_trade_at?: number | null;
            /**
             * Format: int64
             * @description Unix seconds
             */
            last_trade_at?: number | null;
            /** Format: int64 */
            timestamp?: number | null;
            /** @description "1d", "7d", "30d", or "lifetime" */
            timeframe?: string | null;
        };
        /** @description Server-pushed event: per-market PnL update for a trader. Envelope type: "trader_market_pnl_update". */
        TraderMarketPnlEvent: {
            trader: string;
            /** @description 64-char hex condition ID */
            condition_id: string;
            event_slug?: string | null;
            /** Format: int64 */
            outcomes_traded?: number | null;
            /** Format: int64 */
            total_buys?: number | null;
            /** Format: int64 */
            total_sells?: number | null;
            /** Format: int64 */
            total_redemptions?: number | null;
            /** Format: int64 */
            total_merges?: number | null;
            /** @description Total buy volume in USD (decimal string) */
            buy_usd: string;
            sell_usd: string;
            redemption_usd: string;
            merge_usd: string;
            /** @description Realized PnL in USD (decimal string) */
            realized_pnl_usd: string;
            /** Format: int64 */
            winning_outcomes?: number | null;
            total_fees: string;
            /**
             * Format: int64
             * @description Unix seconds
             */
            first_trade_at?: number | null;
            /**
             * Format: int64
             * @description Unix seconds
             */
            last_trade_at?: number | null;
            /** Format: int64 */
            timestamp?: number | null;
            /** @description "1d", "7d", "30d", or "lifetime" */
            timeframe?: string | null;
        };
        /** @description Server-pushed event: per-event PnL update for a trader. Envelope type: "trader_event_pnl_update". */
        TraderEventPnlEvent: {
            trader: string;
            event_slug: string;
            /** Format: int64 */
            markets_traded?: number | null;
            /** Format: int64 */
            outcomes_traded?: number | null;
            /** Format: int64 */
            total_buys?: number | null;
            /** Format: int64 */
            total_sells?: number | null;
            /** Format: int64 */
            total_redemptions?: number | null;
            /** Format: int64 */
            total_merges?: number | null;
            /** @description Total USD volume (decimal string) */
            total_volume_usd: string;
            buy_usd: string;
            sell_usd: string;
            redemption_usd: string;
            merge_usd: string;
            /** @description Realized PnL in USD (decimal string) */
            realized_pnl_usd: string;
            /** Format: int64 */
            winning_markets?: number | null;
            /** Format: int64 */
            losing_markets?: number | null;
            total_fees: string;
            /**
             * Format: int64
             * @description Unix seconds
             */
            first_trade_at?: number | null;
            /**
             * Format: int64
             * @description Unix seconds
             */
            last_trade_at?: number | null;
            /** Format: int64 */
            timestamp?: number | null;
            /** @description "1d", "7d", "30d", or "lifetime" */
            timeframe?: string | null;
        };
        /** @description Server-pushed event: full position snapshot for a tracked trader. Envelope type: "trader_position_update". Pushed whenever a position's PnL changes in the database. */
        TraderPositionUpdateEvent: {
            /** @description Trader EVM wallet address */
            trader: string;
            /** @description ERC-1155 token ID (decimal string) */
            position_id?: string | null;
            condition_id?: string | null;
            market_slug?: string | null;
            event_slug?: string | null;
            /** @description Market title / question */
            title?: string | null;
            image_url?: string | null;
            /** @description Outcome name (e.g. "Yes") */
            outcome?: string | null;
            outcome_index?: number | null;
            /** @description True if this outcome resolved as winner */
            won?: boolean | null;
            /** Format: int64 */
            total_buys?: number | null;
            /** Format: int64 */
            total_sells?: number | null;
            total_shares_bought?: number | null;
            total_shares_sold?: number | null;
            total_buy_usd?: number | null;
            total_sell_usd?: number | null;
            redemption_usd?: number | null;
            /** @description Average entry price (0–1) */
            avg_entry_price?: number | null;
            /** @description Average exit price (0–1) */
            avg_exit_price?: number | null;
            realized_pnl_usd?: number | null;
            total_fees?: number | null;
            /**
             * Format: int64
             * @description Unix seconds
             */
            first_trade_at?: number | null;
            /**
             * Format: int64
             * @description Unix seconds
             */
            last_trade_at?: number | null;
            /** @description Current ERC-1155 token balance */
            current_shares_balance?: number | null;
            /** @description Realized PnL as a percentage of cost basis */
            realized_pnl_pct?: number | null;
        };
        /** @description Server-pushed event: ERC-1155 outcome token balance change for a wallet. Envelope type: "accounts_update". */
        AccountsUpdateEvent: {
            /** @description Wallet address */
            wallet: string;
            /** @description ERC-1155 outcome token ID (decimal string) */
            position_id: string;
            /** @description Current token balance (decimal string) */
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
            /** @description Wallet address (0x-prefixed hex) */
            address: string;
            /** @description USDCe contract address — omitted when not available */
            token_address?: string;
            /** @description Current USDCe balance (decimal string) — omitted when not available */
            balance?: string;
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

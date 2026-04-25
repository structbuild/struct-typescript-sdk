export type paths = Record<string, never>;
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /**
         * @description Server-pushed event. Discriminated by `event_type` — each variant only includes relevant fields.
         *
         *     Envelope: `{"type": "oracle_event_update", "room_id": "polymarket_oracle_events", "status": "confirmed"|"pending", "data": {...}}`
         *
         *     **Pending events:** `block`, `confirmed_at`, `log_index`, `block_index` are absent. `received_at` (milliseconds) is included instead. Some confirmation-time fields (`assertion_id`, `settled_price`, `bond_recipient`, `disputed`, `settlement_resolution`, `payout`) may be empty until the event is confirmed on-chain.
         */
        OracleEventStreamEvent: {
            /** @enum {string} */
            event_type: "AssertionMade" | "AssertionDisputed" | "AssertionSettled" | "RequestPrice" | "ProposePrice" | "DisputePrice" | "Settle" | "QuestionResolved" | "QuestionEmergencyResolved" | "QuestionReset" | "QuestionInitialized" | "QuestionPaused" | "QuestionUnpaused" | "QuestionFlagged" | "QuestionUnflagged" | "ConditionResolution" | "NegRiskOutcomeReported";
            id: string;
            hash: string;
            /** @description Absent for pending events */
            block?: number | null;
            /** @description Unix seconds. Absent for pending events */
            confirmed_at?: number | null;
            /** @description Unix milliseconds. Present for pending events only */
            received_at?: number | null;
            /** @description Absent for pending events */
            log_index?: number | null;
            /** @description Absent for pending events */
            block_index?: number | null;
            oracle_contract: string;
            condition_id?: string | null;
            question?: string | null;
            image_url?: string | null;
            slug?: string | null;
            event_slug?: string | null;
            assertion_id?: string | null;
            proposer?: string | null;
            disputer?: string | null;
            asserter?: string | null;
            requester?: string | null;
            settled_price?: number | null;
            proposed_price?: number | null;
            proposed_outcome?: string | null;
            disputed?: boolean | null;
            settlement_resolution?: boolean | null;
        };
        /** @description Server acknowledgement for an oracle events stream subscription */
        OracleEventsStreamSubscribeResponse: {
            condition_ids?: string[];
            market_slugs?: string[];
            event_slugs?: string[];
            oracle_event_types?: string[];
            /** @enum {string} */
            status?: "confirmed" | "pending" | "all";
            subscribe_all?: boolean;
            /** @description Filter values that were rejected (invalid format or unknown type) */
            rejected?: string[];
        };
        /** @description Subscribe to the oracle events stream. No filters = subscribe to all events. */
        OracleEventsStreamSubscribeMessage: {
            /** @enum {string} */
            action: "subscribe" | "unsubscribe_all";
            /** @description 64-char hex condition IDs (with or without 0x prefix) */
            condition_ids?: string[];
            /** @description Market slugs */
            market_slugs?: string[];
            /** @description Event slugs — subscribes to all markets under each event */
            event_slugs?: string[];
            /** @description Only receive events of these types. Empty array = all types. */
            oracle_event_types?: ("AssertionMade" | "AssertionDisputed" | "AssertionSettled" | "RequestPrice" | "ProposePrice" | "DisputePrice" | "Settle" | "QuestionResolved" | "QuestionEmergencyResolved" | "QuestionReset" | "QuestionInitialized" | "QuestionPaused" | "QuestionUnpaused" | "QuestionFlagged" | "QuestionUnflagged" | "ConditionResolution" | "NegRiskOutcomeReported")[];
            /**
             * @description Event status filter: "confirmed" (default) = on-chain only, "pending" = mempool only, "all" = both
             * @enum {string}
             */
            status?: "confirmed" | "pending" | "all";
            /** @description Explicitly subscribe to all oracle events. Also implicitly true when no filters are provided. */
            subscribe_all?: boolean;
        };
        /** @description Server-pushed event: one or more open markets matching this subscription had a field change since the last tick. Envelope type: "markets_stream_update". Only rows that changed AND matched are in `data`. Client merges by `condition_id`. Each outcome in `data[i].outcomes` carries `latest_block` + `latest_confirmed_at` price-update watermarks. */
        MarketsStreamUpdateEvent: {
            /** @enum {string} */
            type: "markets_stream_update";
            /** @enum {string} */
            room_id: "polymarket_markets_stream";
            /** @enum {string} */
            mode: "filter" | "ids";
            /** @enum {integer} */
            interval_ms: 500 | 1000 | 3000 | 10000;
            /** @description Full market rows (same shape as `GET /polymarket/market`). Not a delta — each element is a complete row replacement. */
            data: Record<string, never>[];
        };
        /** @description Server acknowledgement for a markets_stream subscribe/unsubscribe. Envelope type: "markets_stream_subscribe_response". */
        MarketsStreamSubscribeResponse: {
            /** @enum {string} */
            mode?: "filter" | "ids" | "";
            interval_ms?: number;
            /** @description Accepted condition_ids (ids mode). */
            condition_ids?: string[];
            market_slugs?: string[];
            event_slugs?: string[];
            /** @description Ids that failed normalization or exceeded the per-sub cap. */
            rejected?: string[];
            /** @description Non-null when the subscribe was rejected. */
            error?: string | null;
        };
        /** @description Subscribe to the trades stream. No filters = subscribe to all trades. */
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
            /** @description Trader wallet addresses (lowercase 0x-prefixed) */
            traders?: string[];
            /** @description Only receive events of these types. Empty array = all types. */
            trade_types?: ("OrderFilled" | "OrdersMatched" | "Redemption" | "Merge" | "Split" | "Cancelled" | "PositionsConverted" | "Initialization" | "Proposal" | "Dispute" | "Settled" | "Resolution" | "ConditionResolution" | "Reset" | "Flag" | "Unflag" | "Pause" | "Unpause" | "ManualResolution" | "NegRiskOutcomeReported" | "RegisterToken" | "Approval")[];
            /**
             * @description Trade status filter: "confirmed" (default) = on-chain only, "pending" = mempool only, "all" = both
             * @enum {string}
             */
            status?: "confirmed" | "pending" | "all";
            /** @description Explicitly subscribe to all trades. Also implicitly true when no filters are provided. */
            subscribe_all?: boolean;
        };
        /** @description Server acknowledgement for a trades stream subscription */
        TradesStreamSubscribeResponse: {
            condition_ids?: string[];
            market_slugs?: string[];
            event_slugs?: string[];
            position_ids?: string[];
            traders?: string[];
            trade_types?: string[];
            /** @enum {string} */
            status?: "confirmed" | "pending" | "all";
            subscribe_all?: boolean;
            /** @description Filter values that were rejected (invalid format or unknown type) */
            rejected?: string[];
        };
        /**
         * @description Server-pushed event. Discriminated by `trade_type` — each variant only includes relevant fields.
         *
         *     Envelope: `{"type": "trade_stream_update", "room_id": "polymarket_trades", "status": "confirmed"|"pending", "data": {...}}`
         *
         *     **Pending trades:** `block`, `confirmed_at`, `log_index`, `block_index` are absent. `received_at` (milliseconds) is included instead. For OrderFilled/OrdersMatched, `order_hash`, `taker`, `fee`, `fee_shares`, `fee_pct` are also absent.
         */
        TradeStreamEvent: {
            /** @enum {string} */
            trade_type: "OrderFilled" | "OrdersMatched";
            id: string;
            hash: string;
            /** @description Absent for pending trades */
            block?: number;
            /** @description Unix seconds. Absent for pending trades */
            confirmed_at?: number;
            /** @description Unix milliseconds. Present for pending trades only */
            received_at?: number;
            /** @description Absent for pending trades */
            log_index?: number;
            /** @description Absent for pending trades */
            block_index?: number;
            /** @description Absent for pending trades */
            order_hash?: string;
            trader: {
                address?: string;
                name?: string | null;
                pseudonym?: string | null;
                profile_image?: string | null;
                x_username?: string | null;
                verified_badge?: boolean;
            };
            /** @description Absent for pending trades */
            taker?: string;
            /** @enum {string} */
            side?: "Buy" | "Sell";
            condition_id?: string | null;
            position_id?: string;
            outcome?: string | null;
            outcome_index?: number | null;
            question?: string | null;
            image_url?: string | null;
            slug?: string | null;
            event_slug?: string | null;
            usd_amount?: number;
            shares_amount?: number;
            price?: number;
            probability?: number | null;
            /** @description Absent for pending trades */
            fee?: number;
            /** @description Absent for pending trades */
            fee_shares?: number;
            /** @description Absent for pending trades */
            fee_pct?: number;
            exchange: number;
        } | {
            /** @enum {string} */
            trade_type: "Redemption";
            id: string;
            hash: string;
            block?: number;
            confirmed_at?: number;
            received_at?: number;
            log_index?: number;
            block_index?: number;
            trader: {
                address?: string;
                name?: string | null;
                pseudonym?: string | null;
                profile_image?: string | null;
                x_username?: string | null;
                verified_badge?: boolean;
            };
            condition_id?: string | null;
            outcome?: string | null;
            outcome_index?: number | null;
            question?: string | null;
            image_url?: string | null;
            slug?: string | null;
            event_slug?: string | null;
            usd_amount?: number;
            winning_outcome_index?: number | null;
            position_details?: {
                position_id?: string;
                outcome_index?: number;
                amount?: string;
            }[];
            exchange: number;
        } | {
            /** @enum {string} */
            trade_type: "Merge";
            id: string;
            hash: string;
            block?: number;
            confirmed_at?: number;
            received_at?: number;
            log_index?: number;
            block_index?: number;
            trader: {
                address?: string;
                name?: string | null;
                pseudonym?: string | null;
                profile_image?: string | null;
                x_username?: string | null;
                verified_badge?: boolean;
            };
            condition_id?: string | null;
            question?: string | null;
            image_url?: string | null;
            slug?: string | null;
            event_slug?: string | null;
            usd_amount?: number;
            position_details?: {
                position_id?: string;
                outcome_index?: number;
                amount?: string;
            }[];
            exchange: number;
        } | {
            /** @enum {string} */
            trade_type: "Split";
            id: string;
            hash: string;
            block?: number;
            confirmed_at?: number;
            received_at?: number;
            log_index?: number;
            block_index?: number;
            trader: {
                address?: string;
                name?: string | null;
                pseudonym?: string | null;
                profile_image?: string | null;
                x_username?: string | null;
                verified_badge?: boolean;
            };
            condition_id?: string | null;
            question?: string | null;
            image_url?: string | null;
            slug?: string | null;
            event_slug?: string | null;
            usd_amount?: number;
            position_details?: {
                position_id?: string;
                outcome_index?: number;
                amount?: string;
            }[];
            exchange: number;
        } | {
            /** @enum {string} */
            trade_type: "PositionsConverted";
            id: string;
            hash: string;
            block?: number;
            confirmed_at?: number;
            received_at?: number;
            log_index?: number;
            block_index?: number;
            trader: {
                address?: string;
                name?: string | null;
                pseudonym?: string | null;
                profile_image?: string | null;
                x_username?: string | null;
                verified_badge?: boolean;
            };
            market_id?: string;
            index_set?: string;
            shares_amount?: number;
            exchange: number;
        } | {
            /** @enum {string} */
            trade_type: "Cancelled";
            id: string;
            hash: string;
            block?: number;
            confirmed_at?: number;
            received_at?: number;
            log_index?: number;
            block_index?: number;
            order_hash?: string;
            question?: string | null;
            image_url?: string | null;
            slug?: string | null;
            event_slug?: string | null;
            exchange: number;
        } | {
            /** @enum {string} */
            trade_type: "Initialization" | "Proposal" | "Dispute" | "Settled" | "Resolution" | "ConditionResolution" | "Reset" | "Flag" | "Unflag" | "Pause" | "Unpause" | "ManualResolution" | "NegRiskOutcomeReported";
            id: string;
            hash: string;
            block?: number;
            confirmed_at?: number;
            received_at?: number;
            log_index?: number;
            block_index?: number;
            oracle_contract: string;
            condition_id: string;
            question?: string | null;
            image_url?: string | null;
            slug?: string | null;
            event_slug?: string | null;
            assertion_id?: string | null;
            proposer?: string | null;
            disputer?: string | null;
            proposed_outcome?: string | null;
            settled_price?: number | null;
            disputed?: boolean | null;
            settlement_resolution?: boolean | null;
            bond?: string | null;
            expiration_time?: number | null;
            creator?: string | null;
            reward_token?: string | null;
            reward?: string | null;
            proposal_bond?: string | null;
        } | {
            /** @enum {string} */
            trade_type: "RegisterToken";
            id: string;
            hash: string;
            block?: number;
            confirmed_at?: number;
            received_at?: number;
            log_index?: number;
            block_index?: number;
            condition_id: string;
            token0?: string;
            token1?: string;
            question?: string | null;
            image_url?: string | null;
            slug?: string | null;
            event_slug?: string | null;
            exchange: number;
        } | {
            /** @enum {string} */
            trade_type: "Approval";
            id: string;
            hash: string;
            block?: number;
            confirmed_at?: number;
            received_at?: number;
            log_index?: number;
            block_index?: number;
            trader: {
                address?: string;
                name?: string | null;
                pseudonym?: string | null;
                profile_image?: string | null;
                x_username?: string | null;
                verified_badge?: boolean;
            };
            operator?: string;
            approved?: boolean;
            question?: string | null;
            image_url?: string | null;
            slug?: string | null;
            event_slug?: string | null;
            exchange: number;
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
        /** @description Server-pushed event from the polymarket_asset_window_updates room. Same payload as AssetPriceWindowUpdateEvent. Envelope type: "asset_price_window_update". */
        AssetWindowUpdateEvent: components["schemas"]["AssetPriceWindowUpdateEvent"];
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
        };
        /** @description Subscribe to the trader PnL stream. `traders` is required and must be non-empty. `update_types` and `timeframes` are optional narrowing filters — omit or leave empty to receive all update types / timeframes. */
        TraderPnlSubscribeMessage: {
            /** @enum {string} */
            action: "subscribe" | "unsubscribe_all";
            /** @description EVM wallet addresses */
            traders: string[];
            /** @description Restrict pushed updates to this subset of PnL granularities. Empty/omitted = all three. Unknown values reject the subscription. */
            update_types?: ("global" | "market" | "event")[];
            /** @description Restrict pushed updates to these aggregation timeframes. Empty/omitted = all four. Unknown values reject the subscription. */
            timeframes?: ("1d" | "7d" | "30d" | "lifetime")[];
        };
        /** @description Server acknowledgement for a trader PnL subscription. Echoes the accepted (normalized) filter sets so clients can confirm the active subscription. */
        TraderPnlSubscribeResponse: {
            traders?: string[];
            /** @description Accepted update types. Empty = all. */
            update_types?: ("global" | "market" | "event")[];
            /** @description Accepted timeframes. Empty = all. */
            timeframes?: ("1d" | "7d" | "30d" | "lifetime")[];
            /** @description Trader addresses that were rejected (invalid EVM format). */
            rejected?: string[];
            /** @description Set if the entire subscription was rejected (e.g. empty traders, or an invalid update_type / timeframe value). */
            error?: string | null;
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
        /** @description Server-pushed event: full position snapshot for a tracked trader. Envelope type: "trader_position_update". Pushed whenever a position's PnL changes. */
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
        /** @description Subscribe to the accounts stream. `wallets` is required. Share balance updates (`accounts_update`) are always delivered. Set `include_usdce` or `include_matic` to also receive those balance streams. */
        AccountsSubscribeMessage: {
            /** @enum {string} */
            action: "subscribe" | "unsubscribe_all";
            /** @description EVM wallet addresses */
            wallets: string[];
            /** @description Also stream USDCe collateral balance updates for subscribed wallets */
            include_usdce?: boolean;
            /** @description Also stream MATIC gas balance updates for subscribed wallets */
            include_matic?: boolean;
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
        /** @description A single price level: [price_string, size_string] */
        OrderBookLevel: string[];
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
        /** @description Subscribe to CLOB reward changes. Either provide specific condition_ids or set subscribe_all to true. */
        ClobRewardsSubscribeMessage: {
            /** @enum {string} */
            action: "subscribe" | "unsubscribe_all";
            /** @description Condition IDs to watch for reward changes. */
            condition_ids?: string[];
            /** @description If true, receive ALL reward changes across all markets. Overrides condition_ids. */
            subscribe_all?: boolean;
        };
        /** @description Server acknowledgement for a CLOB rewards subscription. Envelope type: "clob_rewards_stream_subscribe_response". */
        ClobRewardsSubscribeResponse: {
            /** @description Accepted condition IDs */
            condition_ids?: string[];
            /** @description Whether subscribed to all changes */
            subscribe_all?: boolean;
            /** @description Filter values that were rejected */
            rejected?: string[];
        };
        /** @description Server-pushed CLOB reward change event. Envelope type: "clob_rewards_update". */
        ClobRewardsUpdateEvent: {
            /**
             * @description Type of change
             * @enum {string}
             */
            event_type?: "added" | "removed" | "updated";
            /** @description Affected market condition ID */
            condition_id?: string;
            /** @description Full reward state (null for 'removed' events) */
            reward?: {
                condition_id?: string;
                rewards_config?: {
                    id?: number;
                    /** @description Reward token address (e.g. USDC) */
                    asset_address?: string;
                    /** Format: date */
                    start_date?: string;
                    /** Format: date */
                    end_date?: string;
                    /** @description Daily reward rate in USDC */
                    rate_per_day?: number;
                    /** @description Cumulative rewards distributed */
                    total_rewards?: number;
                }[];
                /** @description Max spread to qualify for rewards */
                rewards_max_spread?: number | null;
                /** @description Min order size to qualify for rewards */
                rewards_min_size?: number | null;
                /** @description Native (non-sponsored) daily rate */
                native_daily_rate?: number | null;
                /** @description Sponsored daily rate */
                sponsored_daily_rate?: number | null;
                /** @description Combined daily rate (native + sponsored) */
                total_daily_rate?: number | null;
                /** @description Number of sponsors */
                sponsors_count?: number | null;
            } | null;
            /** @description Unix timestamp in milliseconds */
            timestamp_ms?: number;
        };
        /** @description Subscribe / unsubscribe message for polymarket_events_stream. */
        EventsStreamSubscribeMessage: {
            /**
             * @description `subscribe` creates/replaces a slot. `unsubscribe` removes one slot (needs `mode` + `interval_ms`). `unsubscribe_all` removes every slot this client holds in the room.
             * @enum {string}
             */
            action: "subscribe" | "unsubscribe" | "unsubscribe_all";
            /**
             * @description Flush cadence. Required for subscribe / unsubscribe. Default 1000 if omitted.
             * @enum {integer}
             */
            interval_ms?: 500 | 1000 | 3000 | 10000;
            /**
             * @description Subscription mode. Default `filter`.
             * @enum {string}
             */
            mode?: "filter" | "ids";
            /** @description Filter body (only used when `mode=filter`). All fields optional; omitted fields are unconstrained. */
            filter?: components["schemas"]["EventsStreamFilter"];
            /** @description Ids mode: event slugs to watch. Combined with `event_ids` up to 500 total. */
            event_slugs?: string[];
            /** @description Ids mode: event ids to watch. Combined with `event_slugs` up to 500 total. */
            event_ids?: string[];
        };
        /** @description List-API-shaped filter evaluated in-memory against changed rows. `status` is NOT an accepted field — the cache only holds open events. */
        EventsStreamFilter: {
            /** @description Case-insensitive substring match on `title`. 3–100 chars. */
            search?: string;
            categories?: string[];
            exclude_categories?: string[];
            /** @description Match by tag slug OR label (case-insensitive). */
            tags?: string[];
            exclude_tags?: string[];
            min_volume?: number;
            max_volume?: number;
            min_txns?: number;
            max_txns?: number;
            min_unique_traders?: number;
            max_unique_traders?: number;
            /**
             * @description Timeframe that `volume`/`txns`/`unique_traders` thresholds are evaluated against. Default `24h`.
             * @enum {string}
             */
            timeframe?: "1m" | "5m" | "30m" | "1h" | "6h" | "24h" | "7d" | "30d";
        };
        /** @description Server acknowledgement for an events_stream subscribe/unsubscribe. Envelope type: "events_stream_subscribe_response". */
        EventsStreamSubscribeResponse: {
            /** @enum {string} */
            mode?: "filter" | "ids" | "";
            interval_ms?: number;
            /** @description Accepted ids (ids mode only). Empty in filter mode. */
            event_slugs?: string[];
            /** @description Ids that failed normalization (ids mode). */
            rejected?: string[];
            /** @description Non-null when the subscribe was rejected (invalid cadence, bad filter, too many subs, …). */
            error?: string | null;
        };
        /** @description Server-pushed event: one or more open events matching this subscription had a field change since the last tick. Envelope type: "events_stream_update". Only rows that changed AND matched are in `data`. Client merges into its local state by `id`. */
        EventsStreamUpdateEvent: {
            /** @enum {string} */
            type: "events_stream_update";
            /** @enum {string} */
            room_id: "polymarket_events_stream";
            /** @enum {string} */
            mode: "filter" | "ids";
            /** @enum {integer} */
            interval_ms: 500 | 1000 | 3000 | 10000;
            /** @description Full `PolymarketEvent` rows (same shape as `GET /polymarket/events`). Not a delta — each array element is a complete row replacement. */
            data: Record<string, never>[];
        };
        /** @description Subscribe / unsubscribe message for polymarket_markets_stream. */
        MarketsStreamSubscribeMessage: {
            /**
             * @description `subscribe` creates/replaces a slot. `unsubscribe` removes one slot (needs `mode` + `interval_ms`). `unsubscribe_all` removes every slot this client holds in the room.
             * @enum {string}
             */
            action: "subscribe" | "unsubscribe" | "unsubscribe_all";
            /**
             * @description Flush cadence. Required for subscribe / unsubscribe. Default 1000 if omitted.
             * @enum {integer}
             */
            interval_ms?: 500 | 1000 | 3000 | 10000;
            /**
             * @description Subscription mode. Default `filter`.
             * @enum {string}
             */
            mode?: "filter" | "ids";
            /** @description Filter body (only used when `mode=filter`). All fields optional. */
            filter?: components["schemas"]["MarketsStreamFilter"];
            /** @description Ids mode: 0x-prefixed lowercase 32-byte hex. Counts toward the 500-id cap. */
            condition_ids?: string[];
            /** @description Ids mode: market slug strings. */
            market_slugs?: string[];
            /** @description Ids mode: event slug strings — matches every child market of each event. */
            event_slugs?: string[];
        };
        /** @description List-API-shaped filter evaluated in-memory against changed rows. `status` is NOT accepted — the cache only holds open markets. */
        MarketsStreamFilter: {
            /** @description Case-insensitive substring match on `title`. 3–100 chars. */
            search?: string;
            categories?: string[];
            exclude_categories?: string[];
            tags?: string[];
            exclude_tags?: string[];
            min_volume?: number;
            max_volume?: number;
            min_txns?: number;
            max_txns?: number;
            min_unique_traders?: number;
            max_unique_traders?: number;
            min_liquidity?: number;
            max_liquidity?: number;
            /** Format: int64 */
            min_holders?: number;
            /** Format: int64 */
            max_holders?: number;
            /**
             * Format: int64
             * @description Filter markets with `end_time >= start_time` (Unix seconds).
             */
            start_time?: number;
            /**
             * Format: int64
             * @description Filter markets with `end_time <= end_time` (Unix seconds).
             */
            end_time?: number;
            /** @description When true, only markets with at least one CLOB reward. */
            has_rewards?: boolean;
            /**
             * @description Timeframe that `volume`/`txns`/`unique_traders` thresholds are evaluated against. Default `24h`.
             * @enum {string}
             */
            timeframe?: "1m" | "5m" | "30m" | "1h" | "6h" | "24h" | "7d" | "30d";
        };
        /**
         * OrderFilled / OrdersMatched
         * @description A buy/sell trade was matched on the exchange.
         */
        TradeOrderFilledEvent: {
            /** @enum {string} */
            trade_type: "OrderFilled" | "OrdersMatched";
            id: string;
            hash: string;
            /** @description Absent for pending trades */
            block?: number;
            /** @description Unix seconds. Absent for pending trades */
            confirmed_at?: number;
            /** @description Unix milliseconds. Present for pending trades only */
            received_at?: number;
            /** @description Absent for pending trades */
            log_index?: number;
            /** @description Absent for pending trades */
            block_index?: number;
            /** @description Absent for pending trades */
            order_hash?: string;
            trader: {
                address?: string;
                name?: string | null;
                pseudonym?: string | null;
                profile_image?: string | null;
                x_username?: string | null;
                verified_badge?: boolean;
            };
            /** @description Absent for pending trades */
            taker?: string;
            /** @enum {string} */
            side?: "Buy" | "Sell";
            condition_id?: string | null;
            position_id?: string;
            outcome?: string | null;
            outcome_index?: number | null;
            question?: string | null;
            image_url?: string | null;
            slug?: string | null;
            event_slug?: string | null;
            usd_amount?: number;
            shares_amount?: number;
            price?: number;
            probability?: number | null;
            /** @description Absent for pending trades */
            fee?: number;
            /** @description Absent for pending trades */
            fee_shares?: number;
            /** @description Absent for pending trades */
            fee_pct?: number;
            exchange: number;
        };
        /**
         * Redemption
         * @description Positions redeemed after market resolution.
         */
        TradeRedemptionEvent: {
            /** @enum {string} */
            trade_type: "Redemption";
            id: string;
            hash: string;
            block?: number;
            confirmed_at?: number;
            received_at?: number;
            log_index?: number;
            block_index?: number;
            trader: {
                address?: string;
                name?: string | null;
                pseudonym?: string | null;
                profile_image?: string | null;
                x_username?: string | null;
                verified_badge?: boolean;
            };
            condition_id?: string | null;
            outcome?: string | null;
            outcome_index?: number | null;
            question?: string | null;
            image_url?: string | null;
            slug?: string | null;
            event_slug?: string | null;
            usd_amount?: number;
            winning_outcome_index?: number | null;
            position_details?: {
                position_id?: string;
                outcome_index?: number;
                amount?: string;
            }[];
            exchange: number;
        };
        /**
         * Merge
         * @description Outcome tokens burned to receive collateral.
         */
        TradeMergeEvent: {
            /** @enum {string} */
            trade_type: "Merge";
            id: string;
            hash: string;
            block?: number;
            confirmed_at?: number;
            received_at?: number;
            log_index?: number;
            block_index?: number;
            trader: {
                address?: string;
                name?: string | null;
                pseudonym?: string | null;
                profile_image?: string | null;
                x_username?: string | null;
                verified_badge?: boolean;
            };
            condition_id?: string | null;
            question?: string | null;
            image_url?: string | null;
            slug?: string | null;
            event_slug?: string | null;
            usd_amount?: number;
            position_details?: {
                position_id?: string;
                outcome_index?: number;
                amount?: string;
            }[];
            exchange: number;
        };
        /**
         * Split
         * @description Collateral deposited to receive outcome tokens.
         */
        TradeSplitEvent: {
            /** @enum {string} */
            trade_type: "Split";
            id: string;
            hash: string;
            block?: number;
            confirmed_at?: number;
            received_at?: number;
            log_index?: number;
            block_index?: number;
            trader: {
                address?: string;
                name?: string | null;
                pseudonym?: string | null;
                profile_image?: string | null;
                x_username?: string | null;
                verified_badge?: boolean;
            };
            condition_id?: string | null;
            question?: string | null;
            image_url?: string | null;
            slug?: string | null;
            event_slug?: string | null;
            usd_amount?: number;
            position_details?: {
                position_id?: string;
                outcome_index?: number;
                amount?: string;
            }[];
            exchange: number;
        };
        /**
         * PositionsConverted
         * @description NegRisk NO tokens converted to YES tokens + collateral.
         */
        TradePositionsConvertedEvent: {
            /** @enum {string} */
            trade_type: "PositionsConverted";
            id: string;
            hash: string;
            block?: number;
            confirmed_at?: number;
            received_at?: number;
            log_index?: number;
            block_index?: number;
            trader: {
                address?: string;
                name?: string | null;
                pseudonym?: string | null;
                profile_image?: string | null;
                x_username?: string | null;
                verified_badge?: boolean;
            };
            market_id?: string;
            index_set?: string;
            shares_amount?: number;
            exchange: number;
        };
        /**
         * Cancelled
         * @description Order cancelled on-chain.
         */
        TradeCancelledEvent: {
            /** @enum {string} */
            trade_type: "Cancelled";
            id: string;
            hash: string;
            block?: number;
            confirmed_at?: number;
            received_at?: number;
            log_index?: number;
            block_index?: number;
            order_hash?: string;
            question?: string | null;
            image_url?: string | null;
            slug?: string | null;
            event_slug?: string | null;
            exchange: number;
        };
        /**
         * Oracle Lifecycle Event
         * @description Market lifecycle events: Initialization, Proposal, Dispute, Settled, Resolution, ConditionResolution, Reset, Flag, Unflag, Pause, Unpause, ManualResolution, NegRiskOutcomeReported.
         */
        TradeOracleLifecycleEvent: {
            /** @enum {string} */
            trade_type: "Initialization" | "Proposal" | "Dispute" | "Settled" | "Resolution" | "ConditionResolution" | "Reset" | "Flag" | "Unflag" | "Pause" | "Unpause" | "ManualResolution" | "NegRiskOutcomeReported";
            id: string;
            hash: string;
            block?: number;
            confirmed_at?: number;
            received_at?: number;
            log_index?: number;
            block_index?: number;
            oracle_contract: string;
            condition_id: string;
            question?: string | null;
            image_url?: string | null;
            slug?: string | null;
            event_slug?: string | null;
            assertion_id?: string | null;
            proposer?: string | null;
            disputer?: string | null;
            proposed_outcome?: string | null;
            settled_price?: number | null;
            disputed?: boolean | null;
            settlement_resolution?: boolean | null;
            bond?: string | null;
            expiration_time?: number | null;
            creator?: string | null;
            reward_token?: string | null;
            reward?: string | null;
            proposal_bond?: string | null;
        };
        /**
         * RegisterToken
         * @description YES/NO token pair registered for a condition.
         */
        TradeRegisterTokenEvent: {
            /** @enum {string} */
            trade_type: "RegisterToken";
            id: string;
            hash: string;
            block?: number;
            confirmed_at?: number;
            received_at?: number;
            log_index?: number;
            block_index?: number;
            condition_id: string;
            token0?: string;
            token1?: string;
            question?: string | null;
            image_url?: string | null;
            slug?: string | null;
            event_slug?: string | null;
            exchange: number;
        };
        /**
         * Approval
         * @description ERC-1155 setApprovalForAll — operator approved/revoked.
         */
        TradeApprovalEvent: {
            /** @enum {string} */
            trade_type: "Approval";
            id: string;
            hash: string;
            block?: number;
            confirmed_at?: number;
            received_at?: number;
            log_index?: number;
            block_index?: number;
            trader: {
                address?: string;
                name?: string | null;
                pseudonym?: string | null;
                profile_image?: string | null;
                x_username?: string | null;
                verified_badge?: boolean;
            };
            operator?: string;
            approved?: boolean;
            question?: string | null;
            image_url?: string | null;
            slug?: string | null;
            event_slug?: string | null;
            exchange: number;
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

export type paths = Record<string, never>;
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** @description V3 UMA OOv3: an assertion was disputed. */
        AssertionDisputedEvent: {
            id: string;
            hash: string;
            /** Format: int64 */
            block?: number | null;
            /** Format: int64 */
            confirmed_at?: number | null;
            /** Format: int64 */
            received_at?: number | null;
            /** Format: int64 */
            log_index?: number | null;
            /** Format: int64 */
            block_index?: number | null;
            oracle_contract: string;
            assertion_id: string;
            caller: string;
            disputer: string;
            condition_id?: string | null;
            question?: string | null;
            image_url?: string | null;
            slug?: string | null;
            event_slug?: string | null;
        };
        /** @description V3 UMA OOv3: a new assertion (resolution proposal) was made. */
        AssertionMadeEvent: {
            id: string;
            hash: string;
            /** Format: int64 */
            block?: number | null;
            /** Format: int64 */
            confirmed_at?: number | null;
            /** Format: int64 */
            received_at?: number | null;
            /** Format: int64 */
            log_index?: number | null;
            /** Format: int64 */
            block_index?: number | null;
            oracle_contract: string;
            assertion_id: string;
            domain_id: string;
            claim: string;
            asserter: string;
            callback_recipient: string;
            escalation_manager: string;
            caller: string;
            /** Format: int64 */
            expiration_time: number;
            currency: string;
            bond: string;
            identifier: string;
            condition_id?: string | null;
            proposed_outcome?: string | null;
            question?: string | null;
            image_url?: string | null;
            slug?: string | null;
            event_slug?: string | null;
        };
        /** @description V3 UMA OOv3: an assertion liveness period expired and was settled. */
        AssertionSettledEvent: {
            id: string;
            hash: string;
            /** Format: int64 */
            block?: number | null;
            /** Format: int64 */
            confirmed_at?: number | null;
            /** Format: int64 */
            received_at?: number | null;
            /** Format: int64 */
            log_index?: number | null;
            /** Format: int64 */
            block_index?: number | null;
            oracle_contract: string;
            assertion_id: string;
            bond_recipient: string;
            disputed: boolean;
            settlement_resolution: boolean;
            settle_caller: string;
            condition_id?: string | null;
            question?: string | null;
            image_url?: string | null;
            slug?: string | null;
            event_slug?: string | null;
        };
        /** @description Subscription filters for the `asset_price_tick` event. All fields are optional. */
        AssetPriceTickFilters: {
            /** @description Restrict to these crypto assets. Empty = all assets. */
            asset_symbols?: components["schemas"]["WebhookAssetSymbol"][] | null;
        };
        /** @description Webhook payload for an asset price tick. */
        AssetPriceTickPayload: {
            /** @description Asset symbol */
            symbol: components["schemas"]["WebhookAssetSymbol"];
            /**
             * Format: double
             * @description Current price from the Chainlink feed
             */
            price: number;
            /**
             * Format: int64
             * @description Tick timestamp as reported by the WebSocket feed (milliseconds since epoch)
             */
            timestamp_ms: number;
        };
        /** @description Subscription filters for the `asset_price_window_update` event. All fields are optional. */
        AssetPriceWindowUpdateFilters: {
            /** @description Restrict to these crypto assets. Empty = all assets. */
            asset_symbols?: components["schemas"]["WebhookAssetSymbol"][] | null;
            /** @description Restrict to these candle sizes. Empty = all sizes. */
            timeframes?: components["schemas"]["AssetWindowFilterTimeframe"][] | null;
        };
        /** @description Webhook payload for an asset price window open or close. */
        AssetPriceWindowUpdatePayload: {
            /** @description Asset symbol */
            symbol: components["schemas"]["WebhookAssetSymbol"];
            /** @description Time-window variant */
            variant: components["schemas"]["AssetPriceWindowVariant"];
            /**
             * Format: int64
             * @description Window start timestamp (milliseconds since epoch)
             */
            start_time: number;
            /**
             * Format: int64
             * @description Window end timestamp (milliseconds since epoch)
             */
            end_time: number;
            /**
             * Format: double
             * @description Opening price at start_time
             */
            open_price: number;
            /**
             * Format: double
             * @description Closing price at end_time (0.0 on an "open" update — not yet available)
             */
            close_price: number;
            /** @description "open" when the window starts, "close" when the window is complete */
            update_type: components["schemas"]["AssetPriceWindowUpdateType"];
        };
        /**
         * @description Whether this update is the open or the close of a candle.
         * @enum {string}
         */
        AssetPriceWindowUpdateType: "open" | "close";
        /**
         * @description Time-window variant emitted by the asset price window stream.
         * @enum {string}
         */
        AssetPriceWindowVariant: "5m" | "15m" | "1h" | "4h" | "1d" | "24h";
        /**
         * @description Candle sizes accepted by `asset_price_window_update.timeframes`.
         * @enum {string}
         */
        AssetWindowFilterTimeframe: "5m" | "15m" | "1h" | "4h" | "1d" | "24h";
        /** @description Category PnL webhook payload. */
        CategoryPnlPayload: {
            trader?: string | null;
            category?: string | null;
            /** @description Aggregation timeframe: "1d", "7d", "30d", or "lifetime" */
            timeframe: string;
            /** Format: double */
            realized_pnl_usd?: number | null;
            /** Format: int64 */
            markets_in_category?: number | null;
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
            /** Format: int64 */
            total_splits?: number | null;
            /** Format: double */
            total_volume_usd?: number | null;
            /** Format: double */
            buy_usd?: number | null;
            /** Format: double */
            sell_usd?: number | null;
            /** Format: double */
            redemption_usd?: number | null;
            /** Format: double */
            merge_usd?: number | null;
            /** Format: double */
            convert_collateral_usd?: number | null;
            /** Format: double */
            split_volume_usd?: number | null;
            /** Format: double */
            total_fees?: number | null;
            /** Format: double */
            total_shares_bought?: number | null;
            /** Format: int64 */
            markets_won?: number | null;
            /** Format: int64 */
            markets_lost?: number | null;
            /** Format: double */
            market_win_rate_pct?: number | null;
            /** Format: double */
            avg_hold_time_seconds?: number | null;
            /** Format: double */
            best_trade_pnl_usd?: number | null;
            best_trade_condition_id?: string | null;
            /** Format: double */
            worst_trade_pnl_usd?: number | null;
            worst_trade_condition_id?: string | null;
            /** Format: double */
            total_wins_usd?: number | null;
            /** Format: double */
            total_losses_usd?: number | null;
            /** Format: double */
            avg_win_usd?: number | null;
            /** Format: double */
            avg_loss_usd?: number | null;
            /** Format: double */
            profit_factor?: number | null;
            /** Format: int64 */
            first_trade_at?: number | null;
            /** Format: int64 */
            last_trade_at?: number | null;
        };
        /**
         * @description Subscription filters for the `close_to_bond` event. At least one of
         *     `min_probability` or `max_probability` is required (enforced at runtime).
         */
        CloseToBondFilters: {
            /**
             * Format: double
             * @description Trigger when the YES outcome price is ≥ this value (e.g. 0.95 for 95% certainty). At least one of `min_probability` or `max_probability` must be set.
             */
            min_probability?: number | null;
            /**
             * Format: double
             * @description Trigger when the YES outcome price is ≤ this value (e.g. 0.05 for near-certain NO).
             */
            max_probability?: number | null;
            /** @description Restrict to these markets. */
            condition_ids?: string[] | null;
            /** @description Restrict to these outcome token IDs. */
            position_ids?: string[] | null;
            /** @description Restrict to markets in these events. */
            event_slugs?: string[] | null;
            /** @description Restrict to these outcome names (e.g. \["Yes", "No"\]). */
            outcomes?: string[] | null;
            /** @description Restrict by outcome index. 0 = Yes/Up, 1 = No. Position 0 usually represents the Up/Yes side in binary markets. */
            position_outcome_indices?: number[] | null;
            /** @description When `true`, suppress webhooks for short-term "updown" markets. Default: `false`. */
            exclude_shortterm_markets?: boolean | null;
        };
        /** @description Close-to-bond webhook payload */
        CloseToBondPayload: {
            /** @description Trader address (the limit-order maker) */
            trader: string;
            /** @description Taker address (the order filler — often the exchange contract) */
            taker: string;
            /** @description Position ID (ERC1155 token ID) */
            position_id: string;
            /** @description Condition ID (parent market) */
            condition_id?: string | null;
            /** @description Outcome name (e.g. "Yes", "No") */
            outcome?: string | null;
            /**
             * Format: int32
             * @description Outcome index (0 = Yes/Up, 1 = No). Position 0 usually represents Yes/Up.
             */
            outcome_index?: number | null;
            /** @description Market question */
            question?: string | null;
            /** @description Market slug */
            market_slug?: string | null;
            /** @description Event slug */
            event_slug?: string | null;
            /** @description Trade ID */
            trade_id: string;
            /** @description Transaction hash */
            hash: string;
            /**
             * Format: int64
             * @description Block number
             */
            block: number;
            /**
             * Format: int64
             * @description Confirmed timestamp (Unix seconds)
             */
            confirmed_at: number;
            /**
             * Format: double
             * @description USD size of the trade
             */
            amount_usd: number;
            /**
             * Format: double
             * @description Outcome shares traded
             */
            shares_amount: number;
            /**
             * Format: double
             * @description Fee paid (USD)
             */
            fee: number;
            /** @description Trade side ("Buy" or "Sell") */
            side: string;
            /**
             * Format: double
             * @description Price per share (0.0–1.0) — the value that triggered the notification
             */
            price: number;
            /**
             * Format: double
             * @description Implied probability of the outcome (0.0–1.0)
             */
            probability?: number | null;
            /** @description Which bond zone was entered: `"high"` (YES near-certain) or `"low"` (NO near-certain) */
            bond_side: string;
            /**
             * Format: double
             * @description The probability threshold from the subscriber's filter that was breached
             */
            threshold: number;
        };
        ConditionHolderMetricsFilters: {
            condition_ids?: string[];
        };
        ConditionHolderMetricsPayload: {
            /** Format: int32 */
            ts: number;
            /** Format: int64 */
            block: number;
            condition_id: string;
            /** Format: int32 */
            holder_count: number;
        };
        /** @description Payload delivered when a market's volume or transaction metrics cross a configured threshold */
        ConditionMetricsPayload: {
            /** @description Market condition ID */
            condition_id?: string | null;
            /** @description Aggregation window */
            timeframe?: null | ("1m" | "5m" | "15m" | "30m" | "1h" | "4h" | "6h" | "1d" | "24h" | "7d" | "30d" | "lifetime");
            /**
             * Format: double
             * @description Total trading volume in USD for this timeframe
             */
            volume_usd?: number | null;
            /**
             * Format: double
             * @description Total shares/contracts volume for this timeframe
             */
            shares_volume?: number | null;
            /**
             * Format: double
             * @description Builder-attributed trading volume in USD
             */
            builder_usd_volume?: number | null;
            /**
             * Format: double
             * @description Builder-attributed shares/contracts volume
             */
            builder_shares_volume?: number | null;
            /**
             * Format: double
             * @description Total fees collected in USD
             */
            fees?: number | null;
            /**
             * Format: double
             * @description Builder-attributed fees in USD
             */
            builder_fees?: number | null;
            /**
             * Format: int64
             * @description Total number of transactions
             */
            txns?: number | null;
            /**
             * Format: int64
             * @description Builder-attributed transaction count
             */
            builder_txns?: number | null;
            /**
             * Format: int64
             * @description Number of unique traders
             */
            unique_traders?: number | null;
            /**
             * Format: int64
             * @description Number of unique makers
             */
            unique_makers?: number | null;
            /**
             * Format: int64
             * @description Number of unique takers
             */
            unique_takers?: number | null;
            /**
             * Format: int64
             * @description Number of unique builder-attributed traders
             */
            unique_builder_traders?: number | null;
        };
        /** @description CTF ConditionResolution: positions become redeemable on the Conditional Tokens contract. */
        ConditionResolutionEvent: {
            id: string;
            hash: string;
            /** Format: int64 */
            block?: number | null;
            /** Format: int64 */
            confirmed_at?: number | null;
            /** Format: int64 */
            received_at?: number | null;
            /** Format: int64 */
            log_index?: number | null;
            /** Format: int64 */
            block_index?: number | null;
            oracle_contract: string;
            condition_id: string;
            oracle: string;
            proposed_outcome?: string | null;
            question?: string | null;
            image_url?: string | null;
            slug?: string | null;
            event_slug?: string | null;
        };
        /** @description Request body for creating a webhook */
        CreateWebhookRequestBody: {
            /** @description Destination URL for webhook deliveries (must be HTTPS) */
            url: string;
            /** @description Event to subscribe to */
            event: components["schemas"]["PolymarketWebhookEvent"];
            /** @description Optional secret for HMAC signature verification */
            secret?: string | null;
            filters?: null | components["schemas"]["WebhookFiltersBody"];
            /** @description Optional description/name */
            description?: string | null;
        };
        /** @description Delete webhook response */
        DeleteWebhookResponse: {
            deleted: boolean;
        };
        /**
         * @description What triggered a position update. Each value is serialised as a
         *     lowercase string in the `dirty_kinds` array on every payload, and
         *     the same values are accepted as a subscribe-time filter on rooms
         *     that expose one.
         *
         *     * `trade` — a buy, sell, merge, split, redemption, or NegRisk
         *       convert landed for the position
         *     * `price` — the outcome price moved (mark-to-market refresh)
         *     * `window` — a 1d / 7d / 30d rolling window boundary was crossed
         *     * `position_resolved` — the market that owns this position resolved
         *       on this update
         *     * `market_resolved` — the market itself resolved (stamped on
         *       `MarketRollup` rows for lifetime holders who never redeemed).
         *       Carried on the resolution tick stream and on any full-row update
         *       that bundles a resolution with a trade.
         * @enum {string}
         */
        DirtyKind: "trade" | "price" | "window" | "position_resolved" | "market_resolved";
        /** @description V2 UMA OOv2: a proposed price was disputed. */
        DisputePriceEvent: {
            id: string;
            hash: string;
            /** Format: int64 */
            block?: number | null;
            /** Format: int64 */
            confirmed_at?: number | null;
            /** Format: int64 */
            received_at?: number | null;
            /** Format: int64 */
            log_index?: number | null;
            /** Format: int64 */
            block_index?: number | null;
            oracle_contract: string;
            requester: string;
            proposer: string;
            disputer: string;
            identifier: string;
            timestamp: string;
            ancillary_data: string;
            /** Format: int64 */
            proposed_price: number;
            condition_id?: string | null;
            proposed_outcome?: string | null;
            question?: string | null;
            image_url?: string | null;
            slug?: string | null;
            event_slug?: string | null;
        };
        EventHolderMetricsFilters: {
            event_slugs?: string[];
        };
        EventHolderMetricsPayload: {
            /** Format: int32 */
            ts: number;
            /** Format: int64 */
            block: number;
            event_slug: string;
            /** Format: int32 */
            holder_count: number;
        };
        /** @description Subscription filters for the `event_metrics` event. All fields are optional. */
        EventMetricsFilters: {
            /** @description Restrict to these events. Empty = all events. */
            event_slugs?: string[] | null;
            /** @description Restrict to these aggregation windows. */
            timeframes?: components["schemas"]["MetricFilterTimeframe"][] | null;
            /**
             * Format: double
             * @description Only fire when aggregated event volume ≥ this value (USD).
             */
            min_volume_usd?: number | null;
            /** Format: double */
            max_volume_usd?: number | null;
            /** Format: int64 */
            min_txns?: number | null;
            /** Format: int64 */
            min_unique_traders?: number | null;
            /** Format: double */
            min_fees?: number | null;
            /** @description When `true`, suppress webhooks for short-term "updown" markets. Default: `false`. */
            exclude_shortterm_markets?: boolean | null;
        };
        /** @description Payload delivered when an event's aggregated volume or transaction metrics cross a configured threshold */
        EventMetricsPayload: {
            /** @description Event slug */
            event_slug?: string | null;
            /** @description Aggregation window */
            timeframe?: null | ("1m" | "5m" | "15m" | "30m" | "1h" | "4h" | "6h" | "1d" | "24h" | "7d" | "30d" | "lifetime");
            /**
             * Format: double
             * @description Total aggregated volume across all markets in the event (USD)
             */
            volume_usd?: number | null;
            /**
             * Format: double
             * @description Total aggregated shares/contracts volume across all markets in the event
             */
            shares_volume?: number | null;
            /**
             * Format: double
             * @description Builder-attributed aggregated volume in USD
             */
            builder_usd_volume?: number | null;
            /**
             * Format: double
             * @description Builder-attributed aggregated shares/contracts volume
             */
            builder_shares_volume?: number | null;
            /**
             * Format: double
             * @description Total fees collected in USD
             */
            fees?: number | null;
            /**
             * Format: double
             * @description Builder-attributed fees in USD
             */
            builder_fees?: number | null;
            /**
             * Format: int64
             * @description Total number of transactions
             */
            txns?: number | null;
            /**
             * Format: int64
             * @description Builder-attributed transaction count
             */
            builder_txns?: number | null;
            /**
             * Format: int64
             * @description Number of unique traders
             */
            unique_traders?: number | null;
            /**
             * Format: int64
             * @description Number of unique makers
             */
            unique_makers?: number | null;
            /**
             * Format: int64
             * @description Number of unique takers
             */
            unique_takers?: number | null;
            /**
             * Format: int64
             * @description Number of unique builder-attributed traders
             */
            unique_builder_traders?: number | null;
        };
        /** @description Subscription filters for the `event_volume_milestone` event. */
        EventVolumeMilestoneFilters: {
            /** @description **Required.** Aggregation windows to monitor. */
            timeframes: components["schemas"]["MetricFilterTimeframe"][];
            /** @description Restrict to these events. */
            event_slugs?: string[] | null;
            /** @description Specific USD milestones to trigger on. */
            milestone_amounts?: number[] | null;
            /** @description When `true`, suppress webhooks for short-term "updown" markets. Default: `false`. */
            exclude_shortterm_markets?: boolean | null;
        };
        /** @description Event volume milestone webhook payload */
        EventVolumeMilestonePayload: {
            event_slug: string;
            timeframe: string;
            /**
             * Format: double
             * @description Milestone amount reached (USD)
             */
            milestone_usd: number;
            /**
             * Format: double
             * @description Current volume (USD) that triggered the milestone
             */
            current_volume_usd: number;
            /**
             * Format: double
             * @description Total fees collected in this timeframe
             */
            fees: number;
            /**
             * Format: int64
             * @description Total transactions in this timeframe
             */
            txns: number;
        };
        /** @description Subscription filters for the `event_volume_spike` event. `spike_ratio` is required. */
        EventVolumeSpikeFilters: {
            /**
             * Format: double
             * @description **Required.** Multiplier threshold (must be > 1.0). Fires when current volume >= snapshot × ratio.
             */
            spike_ratio: number;
            /**
             * Format: int64
             * @description Force snapshot reset after this many seconds (max 600 / 10 minutes).
             */
            window_secs?: number | null;
            /** @description Restrict to these events. */
            event_slugs?: string[] | null;
            /** @description Restrict to these aggregation windows. */
            timeframes?: components["schemas"]["VolumeSpikeFilterTimeframe"][] | null;
            /** @description When `true`, suppress webhooks for short-term "updown" markets. Default: `false`. */
            exclude_shortterm_markets?: boolean | null;
        };
        /** @description Event volume spike webhook payload */
        EventVolumeSpikePayload: {
            event_slug: string;
            event_title?: string | null;
            image_url?: string | null;
            timeframe: string;
            /**
             * Format: double
             * @description Current aggregated event volume at the time of the spike (USD)
             */
            current_volume_usd: number;
            /**
             * Format: double
             * @description Volume at the snapshot baseline (USD)
             */
            snapshot_volume_usd: number;
            /**
             * Format: double
             * @description New volume since the snapshot that triggered this notification (USD)
             */
            delta_volume_usd: number;
            /**
             * Format: double
             * @description Volume growth as a percentage of the snapshot (e.g. 200.0 means volume tripled)
             */
            spike_pct: number;
            /**
             * Format: int64
             * @description Total transactions in this timeframe
             */
            txns: number;
            /**
             * Format: double
             * @description Total fees in this timeframe
             */
            fees: number;
        };
        /** @description Exit Markers webhook payload — one position open->closed transition. */
        ExitMarkersPayload: {
            trader: string;
            position_id: string;
            condition_id: string;
            event_slug: string;
            market_slug: string;
            title: string;
            question: string;
            image_url: string;
            outcome: string;
            /** Format: int32 */
            outcome_index?: number | null;
            /** Format: double */
            pnl_usd: number;
            /** Format: double */
            pnl_pct: number;
            /** Format: double */
            cost_basis_usd: number;
            /** @description resolved_win | resolved_loss | sold_win | sold_loss */
            reason: string;
            /** Format: int64 */
            block: number;
            /**
             * Format: int32
             * @description Exit time, unix seconds.
             */
            ts: number;
        };
        /** @description Payload delivered when a tracked trader executes their first-ever trade on Polymarket */
        FirstTradePayload: {
            /** @description Limit-order maker wallet address (lowercase) */
            trader: string;
            /** @description Order filler wallet address (lowercase) */
            taker: string;
            /** @description ERC-1155 outcome token ID */
            position_id: string;
            /** @description Parent market condition ID (0x-prefixed hex) */
            condition_id?: string | null;
            /** @description Outcome name (e.g. "Yes", "No") */
            outcome?: string | null;
            /**
             * Format: int32
             * @description Outcome index: 0 = Yes/Up, 1 = No
             */
            outcome_index?: number | null;
            /** @description Market question text */
            question?: string | null;
            /** @description Market slug */
            market_slug?: string | null;
            /** @description Parent event slug */
            event_slug?: string | null;
            /** @description Market image URL */
            image_url?: string | null;
            /** @description Unique trade identifier */
            trade_id: string;
            /** @description Transaction hash */
            hash: string;
            /**
             * Format: int64
             * @description Block number
             */
            block: number;
            /**
             * Format: int64
             * @description Block confirmation timestamp (Unix seconds)
             */
            confirmed_at: number;
            /**
             * Format: double
             * @description USD size of the trade (6 decimal places)
             */
            amount_usd: number;
            /**
             * Format: double
             * @description Outcome shares traded (6 decimal places)
             */
            shares_amount: number;
            /**
             * Format: double
             * @description Fee paid in USD (6 decimal places)
             */
            fee: number;
            /** @description Trade direction */
            side: "Buy" | "Sell";
            /**
             * Format: double
             * @description Outcome token price (0.0–1.0)
             */
            price: number;
            /** @description Exchange contract that processed the trade */
            exchange: "CTFExchange" | "NegRiskExchange" | "ConditionalTokens" | "NegRiskAdapter" | "CTFExchangeV2" | "NegRiskExchangeV2" | "Unknown";
            /** @description Trade type (webhook events only fire on order fills) */
            trade_type: "OrderFilled" | "OrdersMatched";
        };
        /** @description Global PnL webhook payload. */
        GlobalPnlPayload: {
            trader?: string | null;
            /** @description Aggregation timeframe: "1d", "7d", "30d", or "lifetime" */
            timeframe: string;
            /**
             * Format: double
             * @description Realized PnL for the timeframe (matches REST `/pnl/global`).
             */
            realized_pnl_usd?: number | null;
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
            /** Format: int64 */
            total_splits?: number | null;
            /** Format: double */
            total_volume_usd?: number | null;
            /** Format: double */
            buy_volume_usd?: number | null;
            /** Format: double */
            sell_volume_usd?: number | null;
            /** Format: double */
            redemption_volume_usd?: number | null;
            /** Format: double */
            merge_volume_usd?: number | null;
            /** Format: double */
            convert_collateral_usd?: number | null;
            /** Format: double */
            split_volume_usd?: number | null;
            /** Format: int64 */
            maker_rebate_count?: number | null;
            /** Format: double */
            maker_rebate_usd?: number | null;
            /** Format: int64 */
            reward_count?: number | null;
            /** Format: double */
            reward_usd?: number | null;
            /** Format: int64 */
            yield_count?: number | null;
            /** Format: double */
            yield_usd?: number | null;
            /** Format: int64 */
            total_credit_count?: number | null;
            /** Format: double */
            total_credit_usd?: number | null;
            /** Format: int64 */
            markets_won?: number | null;
            /** Format: int64 */
            markets_lost?: number | null;
            /** Format: double */
            market_win_rate_pct?: number | null;
            /** Format: double */
            total_wins_usd?: number | null;
            /** Format: double */
            total_losses_usd?: number | null;
            /** Format: double */
            avg_win_usd?: number | null;
            /** Format: double */
            avg_loss_usd?: number | null;
            /** Format: double */
            profit_factor?: number | null;
            /** Format: double */
            avg_hold_time_seconds?: number | null;
            /** Format: double */
            total_fees?: number | null;
            /** Format: double */
            best_trade_pnl_usd?: number | null;
            best_trade_condition_id?: string | null;
            /** Format: double */
            worst_trade_pnl_usd?: number | null;
            worst_trade_condition_id?: string | null;
            /** Format: int64 */
            first_trade_at?: number | null;
            /** Format: int64 */
            last_trade_at?: number | null;
        };
        /** @description Response for GET /v1/webhook/events */
        ListEventsResponse: {
            events: components["schemas"]["WebhookEventInfo"][];
        };
        /** @description Subscription filters for the `market_created` event. All fields are optional. */
        MarketCreatedFilters: {
            /** @description Restrict to markets with these tags or category names (case-insensitive match). */
            tags?: string[] | null;
            /** @description Restrict to markets belonging to these events. */
            event_slugs?: string[] | null;
            /** @description When `true`, suppress webhooks for short-term "updown" markets (event slugs containing `updown`). Default: `false`. */
            exclude_shortterm_markets?: boolean | null;
        };
        /** @description Outcome entry in the market created payload — mirrors `NewMarketOutcome` */
        MarketCreatedOutcome: {
            /**
             * Format: int32
             * @description Outcome index (0 = Yes, 1 = No)
             */
            index: number;
            /** @description Outcome name (e.g. "Yes", "No") */
            name: string;
            /** @description ERC1155 position token ID */
            position_id: string;
        };
        /** @description Market created webhook payload — mirrors `NewMarketPayload` field-for-field */
        MarketCreatedPayload: {
            /** @description Condition ID (0x-prefixed hex, lowercase) */
            condition_id: string;
            /** @description Market slug */
            market_slug: string;
            /** @description Event slug (parent event) */
            event_slug?: string | null;
            /** @description Event ID */
            event_id?: string | null;
            /** @description Event title */
            event_title?: string | null;
            /** @description Series slug */
            series_slug?: string | null;
            /** @description Outcomes with their position IDs, index, and name */
            outcomes: components["schemas"]["MarketCreatedOutcome"][];
            /** @description Market question */
            question: string;
            /** @description Market title (short display name) */
            title?: string | null;
            /** @description Market description */
            description: string;
            /** @description Market category (e.g. "Sports", "Politics") */
            category?: string | null;
            /** @description Market tags */
            tags: string[];
            /** @description Cover image URL */
            image_url?: string | null;
            /** @description Whether this is a neg-risk market */
            neg_risk: boolean;
        };
        /** @description Subscription filters for the `condition_metrics` event. All fields are optional. */
        MarketMetricsFilters: {
            /** @description Restrict to these markets. Empty = all markets. */
            condition_ids?: string[] | null;
            /** @description Restrict to these aggregation windows. Empty = all windows. */
            timeframes?: components["schemas"]["MetricFilterTimeframe"][] | null;
            /**
             * Format: double
             * @description Only fire when volume ≥ this value (USD).
             */
            min_volume_usd?: number | null;
            /**
             * Format: double
             * @description Only fire when volume ≤ this value (USD).
             */
            max_volume_usd?: number | null;
            /**
             * Format: int64
             * @description Only fire when transaction count ≥ this value.
             */
            min_txns?: number | null;
            /**
             * Format: int64
             * @description Only fire when unique trader count ≥ this value.
             */
            min_unique_traders?: number | null;
            /**
             * Format: double
             * @description Only fire when total fees ≥ this value (USD).
             */
            min_fees?: number | null;
        };
        /** @description Market PnL webhook payload. */
        MarketPnlPayload: {
            trader?: string | null;
            condition_id?: string | null;
            event_slug?: string | null;
            category?: string | null;
            /** @description Aggregation timeframe: "1d", "7d", "30d", or "lifetime" */
            timeframe: string;
            /** Format: double */
            realized_pnl_usd?: number | null;
            /** Format: double */
            current_shares_balance?: number | null;
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
            /** Format: int64 */
            total_splits?: number | null;
            /** Format: double */
            buy_usd?: number | null;
            /** Format: double */
            sell_usd?: number | null;
            /** Format: double */
            redemption_usd?: number | null;
            /** Format: double */
            merge_usd?: number | null;
            /** Format: double */
            convert_collateral_usd?: number | null;
            /** Format: double */
            split_volume_usd?: number | null;
            /** Format: double */
            total_fees?: number | null;
            /** Format: double */
            total_shares_bought?: number | null;
            /** Format: int64 */
            first_trade_at?: number | null;
            /** Format: int64 */
            last_trade_at?: number | null;
        };
        /** @description Subscription filters for the `market_volume_milestone` event. */
        MarketVolumeMilestoneFilters: {
            /** @description **Required.** Aggregation windows to monitor (e.g. \["1h", "24h"\]). */
            timeframes: components["schemas"]["MetricFilterTimeframe"][];
            /** @description Restrict to these markets. Empty = all markets. */
            condition_ids?: string[] | null;
            /** @description Specific USD milestones to trigger on (e.g. \[10000, 100000, 1000000\]). Empty = all milestones. */
            milestone_amounts?: number[] | null;
        };
        /** @description Subscription filters for the `market_volume_spike` event. `spike_ratio` is required. */
        MarketVolumeSpikeFilters: {
            /**
             * Format: double
             * @description **Required.** Multiplier threshold (must be > 1.0). Fires when current volume >= snapshot × ratio. The snapshot is set automatically on first data and resets after each fire.
             */
            spike_ratio: number;
            /**
             * Format: int64
             * @description Force snapshot reset after this many seconds (max 600 / 10 minutes).
             */
            window_secs?: number | null;
            /** @description Restrict to these markets. Empty = all markets. */
            condition_ids?: string[] | null;
            /** @description Restrict to these aggregation windows. Empty = all windows. */
            timeframes?: components["schemas"]["VolumeSpikeFilterTimeframe"][] | null;
        };
        /** @description Market volume spike webhook payload */
        MarketVolumeSpikePayload: {
            condition_id: string;
            question?: string | null;
            market_slug?: string | null;
            event_slug?: string | null;
            image_url?: string | null;
            timeframe: string;
            /**
             * Format: double
             * @description Current window volume at the time of the spike (USD)
             */
            current_volume_usd: number;
            /**
             * Format: double
             * @description Volume at the snapshot baseline (USD)
             */
            snapshot_volume_usd: number;
            /**
             * Format: double
             * @description New volume since the snapshot that triggered this notification (USD)
             */
            delta_volume_usd: number;
            /**
             * Format: double
             * @description Volume growth as a percentage of the snapshot (e.g. 200.0 means volume tripled)
             */
            spike_pct: number;
            /**
             * Format: int64
             * @description Total transactions in this timeframe
             */
            txns: number;
            /**
             * Format: double
             * @description Total fees in this timeframe
             */
            fees: number;
        };
        /**
         * @description Aggregation windows emitted by the metrics / milestone streams.
         * @enum {string}
         */
        MetricFilterTimeframe: "1m" | "5m" | "30m" | "1h" | "6h" | "24h" | "7d" | "30d";
        /** @description NegRisk Adapter: outcome reported for a neg-risk market question. */
        NegRiskOutcomeReportedEvent: {
            id: string;
            hash: string;
            /** Format: int64 */
            block?: number | null;
            /** Format: int64 */
            confirmed_at?: number | null;
            /** Format: int64 */
            received_at?: number | null;
            /** Format: int64 */
            log_index?: number | null;
            /** Format: int64 */
            block_index?: number | null;
            oracle_contract: string;
            condition_id: string;
            proposed_outcome?: string | null;
            question?: string | null;
            image_url?: string | null;
            slug?: string | null;
            event_slug?: string | null;
        };
        /** @description Payload delivered when a trader places their first trade in a specific market (fires once per trader+market pair) */
        NewMarketPayload: {
            /** @description Limit-order maker wallet address (lowercase) */
            trader: string;
            /** @description Order filler wallet address (lowercase) */
            taker: string;
            /** @description ERC-1155 outcome token ID */
            position_id: string;
            /** @description Parent market condition ID */
            condition_id?: string | null;
            /** @description Outcome name (e.g. "Yes", "No") */
            outcome?: string | null;
            /**
             * Format: int32
             * @description Outcome index: 0 = Yes/Up, 1 = No
             */
            outcome_index?: number | null;
            /** @description Market question text */
            question?: string | null;
            /** @description Market slug */
            market_slug?: string | null;
            /** @description Parent event slug */
            event_slug?: string | null;
            /** @description Market image URL */
            image_url?: string | null;
            /** @description Unique trade identifier */
            trade_id: string;
            /** @description Transaction hash */
            hash: string;
            /**
             * Format: int64
             * @description Block number
             */
            block: number;
            /**
             * Format: int64
             * @description Block confirmation timestamp (Unix seconds)
             */
            confirmed_at: number;
            /**
             * Format: double
             * @description USD size of the trade (6 decimal places)
             */
            amount_usd: number;
            /**
             * Format: double
             * @description Outcome shares traded (6 decimal places)
             */
            shares_amount: number;
            /**
             * Format: double
             * @description Fee paid in USD (6 decimal places)
             */
            fee: number;
            /** @description Trade direction */
            side: "Buy" | "Sell";
            /**
             * Format: double
             * @description Outcome token price (0.0–1.0)
             */
            price: number;
            /**
             * Format: double
             * @description Implied probability (0.0–1.0); null when outcome is unknown
             */
            probability?: number | null;
            /** @description Exchange contract that processed the trade */
            exchange: "CTFExchange" | "NegRiskExchange" | "ConditionalTokens" | "NegRiskAdapter" | "CTFExchangeV2" | "NegRiskExchangeV2" | "Unknown";
            /** @description Trade type (webhook events only fire on order fills) */
            trade_type: "OrderFilled" | "OrdersMatched";
        };
        /**
         * @description Trade types accepted by `trader_new_trade.trade_types`. Webhook fires on
         *     fill-style trades only.
         * @enum {string}
         */
        NewTradeFilterType: "OrderFilled" | "OrdersMatched";
        /** @description Payload delivered on every order-filled trade */
        NewTradePayload: {
            /** @description Limit-order maker wallet address (lowercase) */
            trader: string;
            /** @description Order filler wallet address (lowercase) */
            taker: string;
            /** @description ERC-1155 outcome token ID */
            position_id: string;
            /** @description Parent market condition ID */
            condition_id?: string | null;
            /** @description Outcome name (e.g. "Yes", "No") */
            outcome?: string | null;
            /**
             * Format: int32
             * @description Outcome index: 0 = Yes/Up, 1 = No
             */
            outcome_index?: number | null;
            /** @description Market question text */
            question?: string | null;
            /** @description Market slug */
            market_slug?: string | null;
            /** @description Parent event slug */
            event_slug?: string | null;
            /** @description Market image URL */
            image_url?: string | null;
            /** @description Unique trade identifier */
            trade_id: string;
            /** @description Transaction hash */
            hash: string;
            /**
             * Format: int64
             * @description Block number
             */
            block: number;
            /**
             * Format: int64
             * @description Block confirmation timestamp (Unix seconds)
             */
            confirmed_at: number;
            /**
             * Format: double
             * @description USD size of the trade (6 decimal places)
             */
            amount_usd: number;
            /**
             * Format: double
             * @description Outcome shares traded (6 decimal places)
             */
            shares_amount: number;
            /**
             * Format: double
             * @description Fee paid in USD (6 decimal places)
             */
            fee: number;
            /** @description Trade direction */
            side: "Buy" | "Sell";
            /**
             * Format: double
             * @description Outcome token price (0.0–1.0)
             */
            price: number;
            /**
             * Format: double
             * @description Implied probability (0.0–1.0); null when outcome is unknown
             */
            probability?: number | null;
            /** @description Exchange contract that processed the trade */
            exchange: "CTFExchange" | "NegRiskExchange" | "ConditionalTokens" | "NegRiskAdapter" | "CTFExchangeV2" | "NegRiskExchangeV2" | "Unknown";
            /** @description Trade type (webhook events only fire on order fills) */
            trade_type: "OrderFilled" | "OrdersMatched";
            /**
             * @description CLOB V2 builder code (lower-cased `0x...` bytes32 hex). Absent on V1
             *     trades; may be `0x0000…` for V2 trades placed without a builder code.
             */
            builder_code?: string | null;
            /**
             * Format: double
             * @description Builder fee in USDC. Absent when no builder code is attached.
             */
            builder_fee?: number | null;
        };
        /**
         * @description Oracle event variants accepted by `oracle_events.oracle_event_types`.
         * @enum {string}
         */
        OracleEventFilterType: "AssertionMade" | "AssertionDisputed" | "AssertionSettled" | "RequestPrice" | "ProposePrice" | "DisputePrice" | "Settle" | "QuestionResolved" | "QuestionEmergencyResolved" | "QuestionReset" | "QuestionInitialized" | "QuestionPaused" | "QuestionUnpaused" | "QuestionFlagged" | "QuestionUnflagged" | "ConditionResolution" | "NegRiskOutcomeReported";
        /**
         * @description Tagged enum for all oracle event types — serializes with `"event_type": "..."` discriminator
         *     and only includes fields relevant to each type.
         */
        OracleEventTyped: (components["schemas"]["AssertionMadeEvent"] & {
            /** @enum {string} */
            event_type: "AssertionMade";
        }) | (components["schemas"]["AssertionDisputedEvent"] & {
            /** @enum {string} */
            event_type: "AssertionDisputed";
        }) | (components["schemas"]["AssertionSettledEvent"] & {
            /** @enum {string} */
            event_type: "AssertionSettled";
        }) | (components["schemas"]["RequestPriceEvent"] & {
            /** @enum {string} */
            event_type: "RequestPrice";
        }) | (components["schemas"]["ProposePriceEvent"] & {
            /** @enum {string} */
            event_type: "ProposePrice";
        }) | (components["schemas"]["DisputePriceEvent"] & {
            /** @enum {string} */
            event_type: "DisputePrice";
        }) | (components["schemas"]["SettleEvent"] & {
            /** @enum {string} */
            event_type: "Settle";
        }) | (components["schemas"]["QuestionResolvedEvent"] & {
            /** @enum {string} */
            event_type: "QuestionResolved";
        }) | (components["schemas"]["QuestionEmergencyResolvedEvent"] & {
            /** @enum {string} */
            event_type: "QuestionEmergencyResolved";
        }) | (components["schemas"]["QuestionResetEvent"] & {
            /** @enum {string} */
            event_type: "QuestionReset";
        }) | (components["schemas"]["QuestionInitializedEvent"] & {
            /** @enum {string} */
            event_type: "QuestionInitialized";
        }) | (components["schemas"]["QuestionPausedEvent"] & {
            /** @enum {string} */
            event_type: "QuestionPaused";
        }) | (components["schemas"]["QuestionUnpausedEvent"] & {
            /** @enum {string} */
            event_type: "QuestionUnpaused";
        }) | (components["schemas"]["QuestionFlaggedEvent"] & {
            /** @enum {string} */
            event_type: "QuestionFlagged";
        }) | (components["schemas"]["QuestionUnflaggedEvent"] & {
            /** @enum {string} */
            event_type: "QuestionUnflagged";
        }) | (components["schemas"]["ConditionResolutionEvent"] & {
            /** @enum {string} */
            event_type: "ConditionResolution";
        }) | (components["schemas"]["NegRiskOutcomeReportedEvent"] & {
            /** @enum {string} */
            event_type: "NegRiskOutcomeReported";
        });
        /** @description Subscription filters for the `oracle_events` event. All fields are optional. */
        OracleEventsFilters: {
            /** @description Restrict to these event types (case-insensitive). Empty = all. */
            oracle_event_types?: components["schemas"]["OracleEventFilterType"][] | null;
            /** @description Restrict to events for these condition IDs. */
            condition_ids?: string[] | null;
        };
        /** @description Pagination metadata to include in API responses */
        PaginationMeta: {
            /** @description Whether there are more results available */
            has_more: boolean;
            /** @description Pagination key for the next page (if has_more is true) */
            pagination_key?: string | null;
        };
        /**
         * @description PnL aggregation windows accepted by `*_pnl.timeframes`.
         * @enum {string}
         */
        PnlFilterTimeframe: "1d" | "7d" | "30d" | "lifetime";
        /**
         * @description PnL timeframe enum for webhook filtering.
         * @enum {string}
         */
        PnlTimeframeFilter: "1d" | "7d" | "30d" | "lifetime";
        /**
         * @description Polymarket webhook event types
         * @enum {string}
         */
        PolymarketWebhookEvent: "trader_first_trade" | "trader_new_market" | "trader_whale_trade" | "trader_new_trade" | "trader_trade_event" | "trader_global_pnl" | "trader_market_pnl" | "trader_category_pnl" | "trader_position_resolved" | "trader_exit_markers" | "position_holder_metrics" | "condition_holder_metrics" | "event_holder_metrics" | "condition_metrics" | "event_metrics" | "tag_metrics" | "position_metrics" | "market_volume_milestone" | "event_volume_milestone" | "position_volume_milestone" | "probability_spike" | "market_volume_spike" | "event_volume_spike" | "position_volume_spike" | "close_to_bond" | "market_created" | "asset_price_tick" | "asset_price_window_update" | "price_spike" | "oracle_events";
        /**
         * @description Polymarket-specific webhook filters
         *
         *     Different webhook handlers use different subsets of these fields:
         *     - first_trade: wallet_addresses, min_usd_value, min_probability, max_probability, condition_ids, event_slugs, tags
         *     - new_market: wallet_addresses, condition_ids, event_slugs, min_usd_value, min_probability, max_probability
         *     - whale_trade: min_usd_value (required), min_probability, max_probability, condition_ids, event_slugs
         *     - global_pnl: traders, min_realized_pnl_usd, max_realized_pnl_usd, min_volume_usd, min_win_rate, min_markets_traded
         *     - market_pnl: traders, min_realized_pnl_usd, max_realized_pnl_usd, min_buy_usd, condition_ids, event_slugs
         *     - event_pnl: traders, min_realized_pnl_usd, max_realized_pnl_usd, min_volume_usd, event_slugs, min_markets_traded
         *     - condition_metrics: condition_ids, min_volume_usd, max_volume_usd, min_fees, min_txns, timeframes
         *     - event_metrics: event_slugs, min_volume_usd, max_volume_usd, min_fees, min_txns, timeframes
         *     - tag_metrics: tags, min_volume_usd, max_volume_usd, min_fees, min_txns, timeframes
         *     - position_metrics: position_ids, condition_ids, outcomes, min_volume_usd, max_volume_usd, min_buy_usd, min_sell_volume_usd, min_fees, min_txns, min_price_change_pct, min_probability_change_pct, timeframes
         *     - volume_milestone: condition_ids, timeframes, milestone_amounts
         *     - close_to_bond: min_probability (high zone threshold), max_probability (low zone threshold), condition_ids, position_ids, outcomes, position_outcome_indices, event_slugs, exclude_shortterm_markets
         *     - market_created: event_slugs, tags, exclude_shortterm_markets
         *     - probability_spike: condition_ids, event_slugs, outcomes, min_probability, max_probability, min_probability_change_pct, spike_direction, window_secs, exclude_shortterm_markets
         *     - price_spike: condition_ids, event_slugs, outcomes, min_price_change_pct, spike_direction, window_secs, exclude_shortterm_markets
         *     - trader_new_trade: wallet_addresses, min_usd_value, min_probability, max_probability, condition_ids, event_slugs, trade_types, exclude_shortterm_markets
         *     - trader_trade_event: wallet_addresses, min_usd_value, min_probability, max_probability, condition_ids, event_slugs, trade_types, exclude_shortterm_markets
         *     - trader_first_trade: wallet_addresses, min_usd_value, min_probability, max_probability, exclude_shortterm_markets
         *     - trader_new_market: wallet_addresses, condition_ids, event_slugs, min_usd_value, min_probability, max_probability, exclude_shortterm_markets
         *     - trader_whale_trade: min_usd_value (required), min_probability, max_probability, condition_ids, event_slugs, exclude_shortterm_markets
         *     - trader_event_pnl: traders, min_realized_pnl_usd, max_realized_pnl_usd, min_volume_usd, event_slugs, min_markets_traded, exclude_shortterm_markets
         *     - trader_market_pnl: traders, min_realized_pnl_usd, max_realized_pnl_usd, min_buy_usd, condition_ids, event_slugs, exclude_shortterm_markets
         *
         *     Implements Hash + Eq manually (f64 fields use bit representation)
         */
        PolymarketWebhookFilter: {
            /** @description Filter by wallet addresses (for first_trade, normalized to lowercase). Max 500 entries. */
            wallet_addresses?: string[];
            /** @description Filter by trader addresses (for PnL webhooks, normalized to lowercase). Max 500 entries. */
            traders?: string[];
            /** @description Filter by market/condition IDs. Max 500 entries. */
            condition_ids?: string[];
            /**
             * Format: double
             * @description Filter by minimum USD value (for trades)
             */
            min_usd_value?: number | null;
            /** @description Filter by event slugs. Max 500 entries. */
            event_slugs?: string[];
            /** @description Filter by tags. Max 500 entries. */
            tags?: string[];
            /**
             * Format: double
             * @description Minimum probability threshold (0.0 - 1.0)
             */
            min_probability?: number | null;
            /**
             * Format: double
             * @description Maximum probability threshold (0.0 - 1.0)
             */
            max_probability?: number | null;
            /**
             * Format: double
             * @description Minimum realized PnL (USD) - for PnL webhooks
             */
            min_realized_pnl_usd?: number | null;
            /**
             * Format: double
             * @description Maximum realized PnL (USD) - for PnL webhooks
             */
            max_realized_pnl_usd?: number | null;
            /**
             * Format: double
             * @description Minimum volume (USD) - for PnL and metrics webhooks
             */
            min_volume_usd?: number | null;
            /**
             * Format: double
             * @description Maximum volume (USD) - for metrics webhooks
             */
            max_volume_usd?: number | null;
            /**
             * Format: double
             * @description Minimum buy volume (USD) - for PnL and metrics webhooks
             */
            min_buy_usd?: number | null;
            /**
             * Format: double
             * @description Minimum win rate (0.0 - 100.0) - for global PnL webhooks
             */
            min_win_rate?: number | null;
            /**
             * Format: int64
             * @description Minimum markets traded - for PnL webhooks
             */
            min_markets_traded?: number | null;
            /**
             * Format: double
             * @description Minimum net shares - for position PnL webhooks
             */
            min_net_shares?: number | null;
            /**
             * Format: double
             * @description Maximum net shares - for position PnL webhooks
             */
            max_net_shares?: number | null;
            /** @description Filter by position IDs - for position PnL webhooks. Max 500 entries. */
            position_ids?: string[];
            /** @description Filter by outcomes (e.g., "Yes", "No") - for position PnL webhooks. Max 500 entries. */
            outcomes?: string[];
            /**
             * @description Filter by position outcome index — for close_to_bond. Position 0 usually represents Yes/Up, 1 = No.
             *     When non-empty, only trades whose outcome_index is in this list will match. Max 500 entries.
             */
            position_outcome_indices?: number[];
            /** @description Filter by trade type (e.g. "OrderFilled", "Redemption", "Merge", "Split"). Empty = default behavior per handler. */
            trade_types?: string[];
            /**
             * Format: double
             * @description Minimum fees - for metrics webhooks
             */
            min_fees?: number | null;
            /**
             * Format: int64
             * @description Minimum transaction count - for metrics webhooks
             */
            min_txns?: number | null;
            /**
             * Format: int64
             * @description Minimum unique traders - for metrics webhooks
             */
            min_unique_traders?: number | null;
            /**
             * Format: double
             * @description Minimum sell volume (USD) - for position metrics webhooks
             */
            min_sell_volume_usd?: number | null;
            /**
             * Format: double
             * @description Minimum price change percentage - for position metrics webhooks
             */
            min_price_change_pct?: number | null;
            /**
             * Format: double
             * @description Minimum probability change percentage - for position metrics webhooks
             */
            min_probability_change_pct?: number | null;
            /** @description Timeframes to track - for metrics webhooks (1m, 5m, 30m, 1h, 6h, 24h, 7d, 30d). */
            timeframes?: components["schemas"]["WebhookTimeframe"][];
            /** @description Milestone amounts to track - for volume milestone webhooks (e.g., 10000, 100000, 1000000). Max 500 entries. */
            milestone_amounts?: number[];
            /**
             * Format: double
             * @description Spike ratio multiplier (must be > 1.0) - for volume spike webhooks
             *     Example: 2.0 for 2x, 5.0 for 5x, 10.0 for 10x
             */
            spike_ratio?: number | null;
            /**
             * @description When `true`, exclude all short-term "updown" markets (event slugs containing "updown").
             *     These are short-duration crypto price markets (e.g., "btc-updown-5m-…", "eth-updown-1h-…").
             *     Supported by: close_to_bond, market_created, price_spike, probability_spike,
             *     trader_first_trade, trader_new_market, trader_whale_trade, trader_event_pnl, trader_market_pnl,
             *     event_metrics, event_volume_milestone, event_volume_spike.
             */
            exclude_shortterm_markets?: boolean;
            /**
             * @description Filter by crypto asset symbol — for `asset_price_tick` and `asset_price_window_update` webhooks.
             *     Valid values: "BTC", "ETH", "SOL", "XRP", "DOGE", "BNB", "HYPE". Empty = all assets.
             */
            asset_symbols?: components["schemas"]["WebhookAssetSymbol"][];
            spike_direction?: null | components["schemas"]["SpikeDirection"];
            /**
             * Format: int64
             * @description Observation window in seconds for `probability_spike` and `price_spike`.
             *
             *     When set, the first trade seen for a position opens a window of this duration.
             *     The opening price becomes the baseline, and every subsequent trade within the
             *     window is compared to it. When the window expires the next trade starts a new
             *     window. If omitted, the baseline accumulates indefinitely until a spike fires.
             *
             *     Example: `60` to detect spikes that happen within 60 seconds.
             */
            window_secs?: number | null;
            /**
             * @description Filter for `oracle_events` by event name (case-insensitive).
             *     Valid values: `AssertionMade`, `AssertionDisputed`, `AssertionSettled`,
             *     `RequestPrice`, `ProposePrice`, `DisputePrice`, `Settle`,
             *     `QuestionResolved`, `QuestionEmergencyResolved`, `QuestionReset`,
             *     `QuestionInitialized`, `QuestionPaused`, `QuestionUnpaused`,
             *     `QuestionFlagged`, `QuestionUnflagged`, `ConditionResolution`,
             *     `NegRiskOutcomeReported`. Empty = all types.
             */
            oracle_event_types?: string[];
        };
        PositionHolderMetricsFilters: {
            position_ids?: string[];
        };
        PositionHolderMetricsPayload: {
            /** Format: int32 */
            ts: number;
            /** Format: int64 */
            block: number;
            position_id: string;
            /** Format: int32 */
            holder_count: number;
            /** Format: double */
            total_balance: number;
            /** Format: double */
            total_cost_basis: number;
            /** Format: int32 */
            condition_holder_count?: number | null;
            /** Format: int32 */
            event_holder_count?: number | null;
        };
        /** @description Subscription filters for the `position_metrics` event. All fields are optional. */
        PositionMetricsFilters: {
            /** @description Restrict to these outcome token IDs. */
            position_ids?: string[] | null;
            /** @description Restrict to positions within these markets. */
            condition_ids?: string[] | null;
            /** @description Restrict to positions with these outcome names (e.g. \["Yes", "No"\]). */
            outcomes?: string[] | null;
            /** @description Restrict to these aggregation windows. */
            timeframes?: components["schemas"]["MetricFilterTimeframe"][] | null;
            /**
             * Format: double
             * @description Only fire when position volume ≥ this value (USD).
             */
            min_volume_usd?: number | null;
            /** Format: double */
            max_volume_usd?: number | null;
            /** Format: double */
            min_buy_usd?: number | null;
            /** Format: double */
            min_sell_volume_usd?: number | null;
            /** Format: int64 */
            min_txns?: number | null;
            /** Format: int64 */
            min_unique_traders?: number | null;
            /**
             * Format: double
             * @description Only fire when price change % ≥ this value.
             */
            min_price_change_pct?: number | null;
            /**
             * Format: double
             * @description Only fire when probability change % ≥ this value.
             */
            min_probability_change_pct?: number | null;
            /** Format: double */
            min_fees?: number | null;
        };
        /** @description Payload delivered when a position's volume or transaction metrics cross a configured threshold */
        PositionMetricsPayload: {
            /** @description ERC-1155 outcome token ID */
            position_id?: string | null;
            /** @description Outcome name (e.g. "Yes", "No") */
            outcome?: string | null;
            /**
             * Format: int32
             * @description Outcome index
             */
            outcome_index?: number | null;
            /** @description Aggregation window */
            timeframe?: null | ("1m" | "5m" | "15m" | "30m" | "1h" | "4h" | "6h" | "1d" | "24h" | "7d" | "30d" | "lifetime");
            /**
             * Format: double
             * @description Total trading volume in USD
             */
            volume_usd?: number | null;
            /**
             * Format: double
             * @description Buy volume in USD
             */
            buy_volume_usd?: number | null;
            /**
             * Format: double
             * @description Sell volume in USD
             */
            sell_volume_usd?: number | null;
            /**
             * Format: double
             * @description Total shares/contracts volume
             */
            shares_volume?: number | null;
            /**
             * Format: double
             * @description Buy shares/contracts volume
             */
            shares_buy_volume?: number | null;
            /**
             * Format: double
             * @description Sell shares/contracts volume
             */
            shares_sell_volume?: number | null;
            /**
             * Format: double
             * @description Builder-attributed volume in USD
             */
            builder_usd_volume?: number | null;
            /**
             * Format: double
             * @description Builder-attributed buy volume in USD
             */
            builder_usd_buy_volume?: number | null;
            /**
             * Format: double
             * @description Builder-attributed sell volume in USD
             */
            builder_usd_sell_volume?: number | null;
            /**
             * Format: double
             * @description Builder-attributed shares/contracts volume
             */
            builder_shares_volume?: number | null;
            /**
             * Format: double
             * @description Builder-attributed buy shares/contracts volume
             */
            builder_shares_buy_volume?: number | null;
            /**
             * Format: double
             * @description Builder-attributed sell shares/contracts volume
             */
            builder_shares_sell_volume?: number | null;
            /**
             * Format: double
             * @description Total fees in USD
             */
            fees?: number | null;
            /**
             * Format: double
             * @description Builder-attributed fees in USD
             */
            builder_fees?: number | null;
            /** Format: int64 */
            txns?: number | null;
            /** Format: int64 */
            buys?: number | null;
            /** Format: int64 */
            sells?: number | null;
            /** Format: int64 */
            builder_txns?: number | null;
            /** Format: int64 */
            builder_buys?: number | null;
            /** Format: int64 */
            builder_sells?: number | null;
            /** Format: int64 */
            unique_traders?: number | null;
            /** Format: int64 */
            unique_makers?: number | null;
            /** Format: int64 */
            unique_takers?: number | null;
            /** Format: int64 */
            unique_builder_traders?: number | null;
            /** Format: double */
            price_open?: number | null;
            /** Format: double */
            price_close?: number | null;
            /** Format: double */
            price_high?: number | null;
            /** Format: double */
            price_low?: number | null;
            /** Format: double */
            probability_open?: number | null;
            /** Format: double */
            probability_close?: number | null;
            /** Format: double */
            probability_high?: number | null;
            /** Format: double */
            probability_low?: number | null;
            /** Format: double */
            avg_trade_shares?: number | null;
            /** Format: double */
            avg_buy_shares?: number | null;
            /** Format: double */
            avg_sell_shares?: number | null;
        };
        PositionResolvedPayload: {
            trader?: string;
            position_id?: string;
            condition_id?: string | null;
            event_slug?: string | null;
            /**
             * @description Market category slug (e.g. "politics", "sports") — mirror of
             *     `PositionRollup.category_id` resolved against the rollup
             *     interner. Surfaces on the `/trader/{addr}/positions` API and
             *     enables direct category-filtered + sorted position lookups
             *     without a cross-grain join.
             */
            category?: string | null;
            outcome?: string | null;
            /** Format: int32 */
            outcome_index?: number | null;
            /** Format: int64 */
            total_buys?: number;
            /** Format: int64 */
            total_sells?: number;
            /** Format: int64 */
            total_merges?: number;
            /** Format: int64 */
            total_splits?: number;
            /** Format: int32 */
            winning_outcome_index?: number | null;
            /** Format: double */
            total_shares_bought?: number;
            /** Format: double */
            total_shares_sold?: number;
            /** Format: double */
            buy_usd?: number;
            /** Format: double */
            sell_usd?: number;
            /** Format: double */
            avg_entry_price?: number;
            /** Format: double */
            total_fees?: number;
            /** Format: double */
            realized_pnl_usd?: number;
            /** Format: double */
            total_pnl_usd?: number;
            /** Format: double */
            unrealized_pnl_usd?: number;
            /** Format: double */
            redemption_usd?: number;
            open?: boolean;
            won?: boolean | null;
            /** Format: int64 */
            first_trade_at?: number | null;
            /** Format: int64 */
            last_trade_at?: number | null;
            /**
             * @description What kind of activity triggered this update. One or more of
             *     `"trade"`, `"price"`, `"window"`, `"position_resolved"`.
             *     Subscribers that only care about one kind filter on
             *     `data.dirty_kinds` containing the value.
             */
            dirty_kinds?: components["schemas"]["DirtyKind"][];
            /**
             * Format: double
             * @description `realized_pnl_usd / (buy_usd + total_fees) * 100` for the
             *     window. `0.0` when the trader has no cost basis on this row yet.
             */
            realized_pnl_pct?: number;
            /** Format: double */
            total_pnl_pct?: number;
            /** @description Market slug for the parent market of this outcome. */
            market_slug?: string | null;
            /** @description Market title. */
            title?: string | null;
            /** @description Market question. */
            question?: string | null;
            /** @description Market image URL. */
            image_url?: string | null;
            /**
             * Format: int32
             * @description NegRisk conversion count + share deltas for this position.
             */
            converted_count?: number;
            /** Format: double */
            converted_shares_gained?: number;
            /** Format: double */
            converted_shares_lost?: number;
            /**
             * Format: double
             * @description Aggregate buy/sell USD totals for this position across its
             *     lifetime.
             */
            total_buy_usd?: number;
            /** Format: double */
            total_sell_usd?: number;
            /**
             * Format: double
             * @description Merge proceeds (Y+N → collateral).
             */
            merge_usd?: number;
            /**
             * Format: double
             * @description Sell-side average price.
             */
            avg_exit_price?: number | null;
            /**
             * Format: double
             * @description Volume-weighted average trade price across buys + sells.
             */
            avg_price?: number | null;
            /**
             * Format: double
             * @description Mark-to-market values from the latest price tick.
             */
            current_price?: number | null;
            /** Format: double */
            current_shares_balance?: number | null;
            /** Format: double */
            current_value?: number | null;
            /**
             * Format: double
             * @description Last on-chain trade price for the outcome token.
             */
            last_traded_price?: number | null;
            /**
             * Format: int64
             * @description Market resolution deadline as Unix seconds.
             */
            end_date?: number | null;
            /** @description NegRisk multi-outcome flag. */
            is_neg_risk?: boolean | null;
            /**
             * @description `true` when the market is resolved AND the trader still holds
             *     shares (redeem available).
             */
            redeemable?: boolean | null;
            /**
             * @description `true` when the market is NegRisk, unresolved, and the trader
             *     holds shares (NegRisk-adapter merge available).
             */
            mergeable?: boolean | null;
        };
        /** @description Subscription filters for the `position_volume_milestone` event. */
        PositionVolumeMilestoneFilters: {
            /** @description **Required.** Aggregation windows to monitor. */
            timeframes: components["schemas"]["MetricFilterTimeframe"][];
            /** @description Restrict to these outcome token IDs. */
            position_ids?: string[] | null;
            /** @description Restrict to positions within these markets. */
            condition_ids?: string[] | null;
            /** @description Restrict to these outcome names (e.g. \["Yes", "No"\]). */
            outcomes?: string[] | null;
            /** @description Specific USD milestones to trigger on. */
            milestone_amounts?: number[] | null;
        };
        /** @description Position volume milestone webhook payload */
        PositionVolumeMilestonePayload: {
            condition_id?: string | null;
            position_id: string;
            outcome?: string | null;
            /** Format: int32 */
            outcome_index?: number | null;
            timeframe: string;
            /**
             * Format: double
             * @description Milestone amount reached (USD)
             */
            milestone_usd: number;
            /**
             * Format: double
             * @description Current volume (USD) that triggered the milestone
             */
            current_volume_usd: number;
            /**
             * Format: double
             * @description Buy volume (USD)
             */
            buy_volume_usd: number;
            /**
             * Format: double
             * @description Sell volume (USD)
             */
            sell_volume_usd: number;
            /**
             * Format: double
             * @description Total fees collected in this timeframe
             */
            fees: number;
            /**
             * Format: int64
             * @description Total transactions in this timeframe
             */
            txns: number;
            /**
             * Format: int64
             * @description Buy transactions
             */
            buys: number;
            /**
             * Format: int64
             * @description Sell transactions
             */
            sells: number;
        };
        /** @description Subscription filters for the `position_volume_spike` event. `spike_ratio` is required. */
        PositionVolumeSpikeFilters: {
            /**
             * Format: double
             * @description **Required.** Multiplier threshold (must be > 1.0). Fires when current volume >= snapshot × ratio.
             */
            spike_ratio: number;
            /**
             * Format: int64
             * @description Force snapshot reset after this many seconds (max 600 / 10 minutes).
             */
            window_secs?: number | null;
            /** @description Restrict to these outcome token IDs. */
            position_ids?: string[] | null;
            /** @description Restrict to positions within these markets. */
            condition_ids?: string[] | null;
            /** @description Restrict to these outcome names. */
            outcomes?: string[] | null;
            /** @description Restrict to these aggregation windows. */
            timeframes?: components["schemas"]["VolumeSpikeFilterTimeframe"][] | null;
        };
        /** @description Position volume spike webhook payload */
        PositionVolumeSpikePayload: {
            position_id: string;
            condition_id: string;
            question?: string | null;
            market_slug?: string | null;
            event_slug?: string | null;
            image_url?: string | null;
            outcome?: string | null;
            /** Format: int32 */
            outcome_index?: number | null;
            timeframe: string;
            /**
             * Format: double
             * @description Current position volume at the time of the spike (USD)
             */
            current_volume_usd: number;
            /**
             * Format: double
             * @description Volume at the snapshot baseline (USD)
             */
            snapshot_volume_usd: number;
            /**
             * Format: double
             * @description New volume since the snapshot that triggered this notification (USD)
             */
            delta_volume_usd: number;
            /**
             * Format: double
             * @description Volume growth as a percentage of the snapshot (e.g. 200.0 means volume tripled)
             */
            spike_pct: number;
            /**
             * Format: int64
             * @description Total transactions in this timeframe
             */
            txns: number;
            /**
             * Format: double
             * @description Total fees in this timeframe
             */
            fees: number;
        };
        /** @description Subscription filters for the `price_spike` event. */
        PriceSpikeFilters: {
            /** @description Restrict to specific outcome token IDs. Empty = all positions. */
            position_ids?: string[] | null;
            /** @description Restrict to specific market condition IDs. Empty = all markets. */
            condition_ids?: string[] | null;
            /** @description Restrict to specific events. Empty = all events. */
            event_slugs?: string[] | null;
            /** @description Restrict to these outcome names (e.g. \["Yes", "No"\]). */
            outcomes?: string[] | null;
            /**
             * Format: double
             * @description Minimum price percentage move to trigger (e.g. `10` for a 10% move).
             */
            min_price_change_pct?: number | null;
            /**
             * Format: double
             * @description Minimum YES probability (0-1).
             */
            min_probability?: number | null;
            /**
             * Format: double
             * @description Maximum YES probability (0-1).
             */
            max_probability?: number | null;
            /**
             * Format: int64
             * @description Minimum trades accumulated in the observation window before firing.
             */
            min_txns?: number | null;
            /**
             * Format: double
             * @description Minimum USD volume accumulated in the observation window before firing.
             */
            min_volume_usd?: number | null;
            spike_direction?: null | components["schemas"]["SpikeDirection"];
            /**
             * Format: int64
             * @description Observation window in seconds. The first trade in each window sets the reference price; subsequent trades are compared to it. E.g. `60` detects moves that occur within 60 seconds.
             */
            window_secs?: number | null;
            /** @description When `true`, suppress webhooks for short-term "updown" markets. Default: `false`. */
            exclude_shortterm_markets?: boolean | null;
        };
        /** @description Position price spike webhook payload */
        PriceSpikePayload: {
            position_id: string;
            condition_id?: string | null;
            question?: string | null;
            market_slug?: string | null;
            event_slug?: string | null;
            image_url?: string | null;
            outcome?: string | null;
            /** Format: int32 */
            outcome_index?: number | null;
            /**
             * Format: double
             * @description Price at the start of the observation window (the baseline snapshot)
             */
            previous_price: number;
            /**
             * Format: double
             * @description Current price that triggered the spike
             */
            current_price: number;
            /** @description Direction of the spike: `"up"` (price rising) or `"down"` (price falling) */
            spike_direction: string;
            /**
             * Format: double
             * @description Detected spike percentage from the snapshot baseline. Positive = rising, negative = falling.
             */
            spike_pct: number;
        };
        /** @description Subscription filters for the `probability_spike` event. */
        ProbabilitySpikeFilters: {
            /** @description Restrict to specific outcome token IDs. Empty = all positions. */
            position_ids?: string[] | null;
            /** @description Restrict to specific market condition IDs. Empty = all markets. */
            condition_ids?: string[] | null;
            /** @description Restrict to specific events. Empty = all events. */
            event_slugs?: string[] | null;
            /** @description Restrict to these outcome names (e.g. \["Yes", "No"\]). */
            outcomes?: string[] | null;
            /**
             * Format: double
             * @description Minimum YES probability (0-1). At least one of `min_probability`/`max_probability` is enforced at runtime if you want a probability gate.
             */
            min_probability?: number | null;
            /**
             * Format: double
             * @description Maximum YES probability (0-1).
             */
            max_probability?: number | null;
            /**
             * Format: double
             * @description Minimum probability percentage move to trigger (e.g. `10` for a 10% move).
             */
            min_probability_change_pct?: number | null;
            /**
             * Format: int64
             * @description Minimum trades accumulated in the observation window before firing.
             */
            min_txns?: number | null;
            /**
             * Format: double
             * @description Minimum USD volume accumulated in the observation window before firing.
             */
            min_volume_usd?: number | null;
            spike_direction?: null | components["schemas"]["SpikeDirection"];
            /**
             * Format: int64
             * @description Observation window in seconds. The first trade in each window sets the reference price; subsequent trades are compared to it. E.g. `60` detects moves that occur within 60 seconds.
             */
            window_secs?: number | null;
            /** @description When `true`, suppress webhooks for short-term "updown" markets. Default: `false`. */
            exclude_shortterm_markets?: boolean | null;
        };
        /** @description Position probability spike webhook payload */
        ProbabilitySpikePayload: {
            position_id: string;
            condition_id?: string | null;
            question?: string | null;
            market_slug?: string | null;
            event_slug?: string | null;
            image_url?: string | null;
            outcome?: string | null;
            /** Format: int32 */
            outcome_index?: number | null;
            /**
             * Format: double
             * @description YES probability at the start of the observation window (the baseline snapshot)
             */
            previous_probability: number;
            /**
             * Format: double
             * @description Current YES probability that triggered the spike
             */
            current_probability: number;
            /** @description Direction of the spike: `"up"` (YES probability rising) or `"down"` (YES probability falling) */
            spike_direction: string;
            /**
             * Format: double
             * @description Detected spike percentage from the snapshot baseline. Positive = rising, negative = falling.
             */
            spike_pct: number;
        };
        /** @description V2 UMA OOv2: a price was proposed (resolution proposal). */
        ProposePriceEvent: {
            id: string;
            hash: string;
            /** Format: int64 */
            block?: number | null;
            /** Format: int64 */
            confirmed_at?: number | null;
            /** Format: int64 */
            received_at?: number | null;
            /** Format: int64 */
            log_index?: number | null;
            /** Format: int64 */
            block_index?: number | null;
            oracle_contract: string;
            requester: string;
            proposer: string;
            identifier: string;
            timestamp: string;
            ancillary_data: string;
            /** Format: int64 */
            proposed_price: number;
            expiration_timestamp: string;
            currency: string;
            condition_id?: string | null;
            proposed_outcome?: string | null;
            question?: string | null;
            image_url?: string | null;
            slug?: string | null;
            event_slug?: string | null;
        };
        /** @description UMA CTF Adapter: admin emergency resolution. */
        QuestionEmergencyResolvedEvent: {
            id: string;
            hash: string;
            /** Format: int64 */
            block?: number | null;
            /** Format: int64 */
            confirmed_at?: number | null;
            /** Format: int64 */
            received_at?: number | null;
            /** Format: int64 */
            log_index?: number | null;
            /** Format: int64 */
            block_index?: number | null;
            oracle_contract: string;
            condition_id: string;
            proposed_outcome?: string | null;
            question?: string | null;
            image_url?: string | null;
            slug?: string | null;
            event_slug?: string | null;
        };
        /** @description UMA CTF Adapter: market flagged for emergency resolution. */
        QuestionFlaggedEvent: {
            id: string;
            hash: string;
            /** Format: int64 */
            block?: number | null;
            /** Format: int64 */
            confirmed_at?: number | null;
            /** Format: int64 */
            received_at?: number | null;
            /** Format: int64 */
            log_index?: number | null;
            /** Format: int64 */
            block_index?: number | null;
            oracle_contract: string;
            condition_id: string;
            question?: string | null;
            image_url?: string | null;
            slug?: string | null;
            event_slug?: string | null;
        };
        /** @description UMA CTF Adapter: questionID first initialized on-chain. */
        QuestionInitializedEvent: {
            id: string;
            hash: string;
            /** Format: int64 */
            block?: number | null;
            /** Format: int64 */
            confirmed_at?: number | null;
            /** Format: int64 */
            received_at?: number | null;
            /** Format: int64 */
            log_index?: number | null;
            /** Format: int64 */
            block_index?: number | null;
            oracle_contract: string;
            condition_id: string;
            creator: string;
            reward_token: string;
            reward: string;
            proposal_bond: string;
            question?: string | null;
            image_url?: string | null;
            slug?: string | null;
            event_slug?: string | null;
        };
        /** @description UMA CTF Adapter: market paused by admin. */
        QuestionPausedEvent: {
            id: string;
            hash: string;
            /** Format: int64 */
            block?: number | null;
            /** Format: int64 */
            confirmed_at?: number | null;
            /** Format: int64 */
            received_at?: number | null;
            /** Format: int64 */
            log_index?: number | null;
            /** Format: int64 */
            block_index?: number | null;
            oracle_contract: string;
            condition_id: string;
            question?: string | null;
            image_url?: string | null;
            slug?: string | null;
            event_slug?: string | null;
        };
        /** @description UMA CTF Adapter: dispute succeeded, market returns to active. */
        QuestionResetEvent: {
            id: string;
            hash: string;
            /** Format: int64 */
            block?: number | null;
            /** Format: int64 */
            confirmed_at?: number | null;
            /** Format: int64 */
            received_at?: number | null;
            /** Format: int64 */
            log_index?: number | null;
            /** Format: int64 */
            block_index?: number | null;
            oracle_contract: string;
            condition_id: string;
            question?: string | null;
            image_url?: string | null;
            slug?: string | null;
            event_slug?: string | null;
        };
        /** @description UMA CTF Adapter: market resolved with definitive outcome. */
        QuestionResolvedEvent: {
            id: string;
            hash: string;
            /** Format: int64 */
            block?: number | null;
            /** Format: int64 */
            confirmed_at?: number | null;
            /** Format: int64 */
            received_at?: number | null;
            /** Format: int64 */
            log_index?: number | null;
            /** Format: int64 */
            block_index?: number | null;
            oracle_contract: string;
            condition_id: string;
            /** Format: int64 */
            settled_price: number;
            proposed_outcome?: string | null;
            question?: string | null;
            image_url?: string | null;
            slug?: string | null;
            event_slug?: string | null;
        };
        /** @description UMA CTF Adapter: flag removed. */
        QuestionUnflaggedEvent: {
            id: string;
            hash: string;
            /** Format: int64 */
            block?: number | null;
            /** Format: int64 */
            confirmed_at?: number | null;
            /** Format: int64 */
            received_at?: number | null;
            /** Format: int64 */
            log_index?: number | null;
            /** Format: int64 */
            block_index?: number | null;
            oracle_contract: string;
            condition_id: string;
            question?: string | null;
            image_url?: string | null;
            slug?: string | null;
            event_slug?: string | null;
        };
        /** @description UMA CTF Adapter: market unpaused. */
        QuestionUnpausedEvent: {
            id: string;
            hash: string;
            /** Format: int64 */
            block?: number | null;
            /** Format: int64 */
            confirmed_at?: number | null;
            /** Format: int64 */
            received_at?: number | null;
            /** Format: int64 */
            log_index?: number | null;
            /** Format: int64 */
            block_index?: number | null;
            oracle_contract: string;
            condition_id: string;
            question?: string | null;
            image_url?: string | null;
            slug?: string | null;
            event_slug?: string | null;
        };
        /** @description V2 UMA OOv2: a price request was made (market initialization). */
        RequestPriceEvent: {
            id: string;
            hash: string;
            /** Format: int64 */
            block?: number | null;
            /** Format: int64 */
            confirmed_at?: number | null;
            /** Format: int64 */
            received_at?: number | null;
            /** Format: int64 */
            log_index?: number | null;
            /** Format: int64 */
            block_index?: number | null;
            oracle_contract: string;
            requester: string;
            identifier: string;
            /**
             * @description UMA request timestamp (seconds, decimal string).
             *     The point in time the requester is asking the oracle to resolve the
             *     price for — part of the request identity tuple
             *     `(requester, identifier, timestamp, ancillaryData)`. Not the block
             *     timestamp of this event; see `confirmed_at` for that.
             */
            timestamp: string;
            ancillary_data: string;
            currency: string;
            reward: string;
            final_fee: string;
            condition_id?: string | null;
            question?: string | null;
            image_url?: string | null;
            slug?: string | null;
            event_slug?: string | null;
        };
        /** @description Response for POST /v1/webhook/{id}/rotate-secret */
        RotateSecretResponse: {
            /** @description The new HMAC secret (only returned once — store it securely) */
            secret: string;
            /**
             * Format: int64
             * @description Timestamp of rotation (ms since epoch)
             */
            rotated_at: number;
        };
        /** @description V2 UMA OOv2: a price request was settled (final resolution). */
        SettleEvent: {
            id: string;
            hash: string;
            /** Format: int64 */
            block?: number | null;
            /** Format: int64 */
            confirmed_at?: number | null;
            /** Format: int64 */
            received_at?: number | null;
            /** Format: int64 */
            log_index?: number | null;
            /** Format: int64 */
            block_index?: number | null;
            oracle_contract: string;
            requester: string;
            proposer: string;
            disputer: string;
            identifier: string;
            timestamp: string;
            ancillary_data: string;
            /** Format: int64 */
            proposed_price: number;
            payout: string;
            disputed: boolean;
            condition_id?: string | null;
            proposed_outcome?: string | null;
            question?: string | null;
            image_url?: string | null;
            slug?: string | null;
            event_slug?: string | null;
        };
        /**
         * @description Direction filter for spike webhooks.
         * @enum {string}
         */
        SpikeDirection: "up" | "down" | "both";
        /** @description Subscription filters for the `tag_metrics` event. All fields are optional. */
        TagMetricsFilters: {
            /** @description Restrict to these tags. Empty = all tags. */
            tags?: string[] | null;
            /** @description Restrict to these aggregation windows. */
            timeframes?: components["schemas"]["MetricFilterTimeframe"][] | null;
            /**
             * Format: double
             * @description Only fire when aggregated tag volume >= this value (USD).
             */
            min_volume_usd?: number | null;
            /** Format: double */
            max_volume_usd?: number | null;
            /** Format: int64 */
            min_txns?: number | null;
            /** Format: int64 */
            min_unique_traders?: number | null;
            /** Format: double */
            min_fees?: number | null;
        };
        /** @description Payload delivered when a tag's aggregated volume or transaction metrics cross a configured threshold */
        TagMetricsPayload: {
            /** @description Tag label or slug */
            tag?: string | null;
            /** @description Aggregation window */
            timeframe?: null | ("1m" | "5m" | "15m" | "30m" | "1h" | "4h" | "6h" | "1d" | "24h" | "7d" | "30d" | "lifetime");
            /**
             * Format: double
             * @description Total aggregated volume for the tag (USD)
             */
            volume_usd?: number | null;
            /**
             * Format: double
             * @description Total aggregated shares/contracts volume for the tag
             */
            shares_volume?: number | null;
            /**
             * Format: double
             * @description Builder-attributed aggregated volume in USD
             */
            builder_usd_volume?: number | null;
            /**
             * Format: double
             * @description Builder-attributed aggregated shares/contracts volume
             */
            builder_shares_volume?: number | null;
            /**
             * Format: double
             * @description Total fees collected in USD
             */
            fees?: number | null;
            /**
             * Format: double
             * @description Builder-attributed fees in USD
             */
            builder_fees?: number | null;
            /**
             * Format: int64
             * @description Total number of transactions
             */
            txns?: number | null;
            /**
             * Format: int64
             * @description Builder-attributed transaction count
             */
            builder_txns?: number | null;
            /**
             * Format: int64
             * @description Number of unique traders
             */
            unique_traders?: number | null;
            /**
             * Format: int64
             * @description Number of unique makers
             */
            unique_makers?: number | null;
            /**
             * Format: int64
             * @description Number of unique takers
             */
            unique_takers?: number | null;
            /**
             * Format: int64
             * @description Number of unique builder-attributed traders
             */
            unique_builder_traders?: number | null;
        };
        /**
         * @description Trade-event types accepted by `trader_trade_event.trade_types`. Covers the
         *     full set of typed prediction-trade variants.
         * @enum {string}
         */
        TradeEventFilterType: "OrderFilled" | "OrdersMatched" | "MakerRebate" | "Reward" | "Yield" | "Redemption" | "Merge" | "Split" | "Cancelled" | "PositionsConverted" | "Initialization" | "Proposal" | "Dispute" | "Settled" | "Resolution" | "ConditionResolution" | "Reset" | "Flag" | "Unflag" | "Pause" | "Unpause" | "ManualResolution" | "NegRiskOutcomeReported" | "RegisterToken";
        /** @description Subscription filters for the `trader_category_pnl` event. All fields are optional. */
        TraderCategoryPnlFilters: {
            /** @description Track only these trader wallet addresses. Empty = all traders. */
            traders?: string[] | null;
            /** @description Restrict to these market categories (e.g. `politics`, `sports`). */
            categories?: string[] | null;
            /**
             * Format: double
             * @description Only fire when per-category realized PnL ≥ this value (USD). Use negative values for loss thresholds.
             */
            min_realized_pnl_usd?: number | null;
            /**
             * Format: double
             * @description Only fire when per-category realized PnL ≤ this value (USD).
             */
            max_realized_pnl_usd?: number | null;
            /**
             * Format: double
             * @description Only fire when total category volume ≥ this value (USD).
             */
            min_volume_usd?: number | null;
            /**
             * Format: double
             * @description Only fire when total category volume ≤ this value (USD).
             */
            max_volume_usd?: number | null;
            /**
             * Format: double
             * @description Only fire when buy volume within the category ≥ this value (USD).
             */
            min_buy_usd?: number | null;
            /**
             * Format: double
             * @description Only fire when sell volume within the category ≥ this value (USD).
             */
            min_sell_volume_usd?: number | null;
            /**
             * Format: double
             * @description Only fire when market win rate ≥ this percentage (0.0–100.0).
             */
            min_win_rate?: number | null;
            /**
             * Format: int64
             * @description Only fire when the trader has traded in ≥ this many markets within the category.
             */
            min_markets_traded?: number | null;
            /** @description Restrict to these PnL windows. Empty = all windows. */
            timeframes?: components["schemas"]["PnlFilterTimeframe"][] | null;
        };
        /** @description Subscription filters for the `trader_pnl_exits` event. All fields are optional. */
        TraderExitMarkersFilters: {
            /** @description Track only these trader wallet addresses. Empty = all traders. */
            traders?: string[] | null;
            /** @description Restrict to these markets. */
            condition_ids?: string[] | null;
            /** @description Restrict to positions in these events. */
            event_slugs?: string[] | null;
        };
        /** @description Subscription filters for the `trader_first_trade` event. All fields are optional. */
        TraderFirstTradeFilters: {
            /** @description Only fire for trades by these wallet addresses (lowercase). Empty = all traders. */
            wallet_addresses?: string[] | null;
            /** @description Restrict to trades in these markets. Empty = all markets. */
            condition_ids?: string[] | null;
            /** @description Restrict to trades in markets belonging to these events. */
            event_slugs?: string[] | null;
            /**
             * Format: double
             * @description Minimum trade size in USD. Omit to match all sizes.
             */
            min_usd_value?: number | null;
            /**
             * Format: double
             * @description Only fire when the outcome probability is ≥ this value.
             */
            min_probability?: number | null;
            /**
             * Format: double
             * @description Only fire when the outcome probability is ≤ this value.
             */
            max_probability?: number | null;
            /** @description When `true`, suppress webhooks for short-term "updown" markets (event slugs containing `updown`). Default: `false`. */
            exclude_shortterm_markets?: boolean | null;
        };
        /** @description Subscription filters for the `trader_global_pnl` event. All fields are optional. */
        TraderGlobalPnlFilters: {
            /** @description Track only these trader wallet addresses. Empty = all traders. */
            traders?: string[] | null;
            /**
             * Format: double
             * @description Only fire when realized PnL ≥ this value (USD). Use negative values for loss thresholds.
             */
            min_realized_pnl_usd?: number | null;
            /**
             * Format: double
             * @description Only fire when realized PnL ≤ this value (USD).
             */
            max_realized_pnl_usd?: number | null;
            /**
             * Format: double
             * @description Only fire when total trading volume ≥ this value (USD).
             */
            min_volume_usd?: number | null;
            /**
             * Format: double
             * @description Only fire when total trading volume ≤ this value (USD).
             */
            max_volume_usd?: number | null;
            /**
             * Format: double
             * @description Only fire when buy volume ≥ this value (USD).
             */
            min_buy_usd?: number | null;
            /**
             * Format: double
             * @description Only fire when sell volume ≥ this value (USD).
             */
            min_sell_volume_usd?: number | null;
            /**
             * Format: double
             * @description Only fire when market win rate ≥ this percentage (0.0–100.0).
             */
            min_win_rate?: number | null;
            /**
             * Format: int64
             * @description Only fire when the trader has traded in ≥ this many markets.
             */
            min_markets_traded?: number | null;
            /** @description Restrict to these PnL windows. Empty = all windows. */
            timeframes?: components["schemas"]["PnlFilterTimeframe"][] | null;
        };
        /** @description Subscription filters for the `trader_market_pnl` event. All fields are optional. */
        TraderMarketPnlFilters: {
            /** @description Track only these trader wallet addresses. */
            traders?: string[] | null;
            /** @description Restrict to these markets. */
            condition_ids?: string[] | null;
            /** @description Restrict to markets in these events. */
            event_slugs?: string[] | null;
            /**
             * Format: double
             * @description Only fire when per-market realized PnL ≥ this value (USD).
             */
            min_realized_pnl_usd?: number | null;
            /**
             * Format: double
             * @description Only fire when per-market realized PnL ≤ this value (USD).
             */
            max_realized_pnl_usd?: number | null;
            /**
             * Format: double
             * @description Only fire when total volume (buy + sell + redemption + merge) ≥ this value (USD).
             */
            min_volume_usd?: number | null;
            /**
             * Format: double
             * @description Only fire when total volume ≤ this value (USD).
             */
            max_volume_usd?: number | null;
            /**
             * Format: double
             * @description Only fire when buy volume in the market ≥ this value (USD).
             */
            min_buy_usd?: number | null;
            /**
             * Format: double
             * @description Only fire when sell volume in the market ≥ this value (USD).
             */
            min_sell_volume_usd?: number | null;
            /** @description Restrict to these PnL windows. */
            timeframes?: components["schemas"]["PnlFilterTimeframe"][] | null;
            /** @description When `true`, suppress webhooks for short-term "updown" markets. Default: `false`. */
            exclude_shortterm_markets?: boolean | null;
        };
        /** @description Subscription filters for the `trader_new_market` event. All fields are optional. */
        TraderNewMarketFilters: {
            /** @description Only fire for these wallet addresses (lowercase). Empty = all traders. */
            wallet_addresses?: string[] | null;
            /** @description Restrict to these markets. */
            condition_ids?: string[] | null;
            /** @description Restrict to markets belonging to these events. */
            event_slugs?: string[] | null;
            /**
             * Format: double
             * @description Minimum trade size in USD. Omit to match all sizes.
             */
            min_usd_value?: number | null;
            /**
             * Format: double
             * @description Only fire when the outcome probability is ≥ this value.
             */
            min_probability?: number | null;
            /**
             * Format: double
             * @description Only fire when the outcome probability is ≤ this value.
             */
            max_probability?: number | null;
            /** @description When `true`, suppress webhooks for short-term "updown" markets. Default: `false`. */
            exclude_shortterm_markets?: boolean | null;
        };
        /** @description Subscription filters for the `trader_new_trade` event. All fields are optional. */
        TraderNewTradeFilters: {
            /** @description Only fire for trades by these wallet addresses. Empty = all traders. */
            wallet_addresses?: string[] | null;
            /** @description Restrict to these markets. */
            condition_ids?: string[] | null;
            /** @description Restrict to markets belonging to these events. */
            event_slugs?: string[] | null;
            /**
             * Format: double
             * @description Minimum trade size in USD. Defaults to 0 (matches all trades).
             */
            min_usd_value?: number | null;
            /**
             * Format: double
             * @description Only fire when outcome probability is ≥ this value.
             */
            min_probability?: number | null;
            /**
             * Format: double
             * @description Only fire when outcome probability is ≤ this value.
             */
            max_probability?: number | null;
            /** @description Only fire for these fill-style trade types. Empty = OrderFilled and OrdersMatched only (default). */
            trade_types?: ("OrderFilled" | "OrdersMatched")[] | null;
            /** @description When `true`, suppress webhooks for short-term "updown" markets. Default: `false`. */
            exclude_shortterm_markets?: boolean | null;
        };
        /** @description Subscription filters for the `trader_position_resolved` event. All fields are optional. */
        TraderPositionResolvedFilters: {
            /** @description Track only these trader wallet addresses. Empty = all traders. */
            traders?: string[] | null;
            /** @description Restrict to these markets. */
            condition_ids?: string[] | null;
            /** @description Restrict to positions in these events. */
            event_slugs?: string[] | null;
            /** @description Restrict to these outcome indexes within the resolved market. */
            outcome_indexes?: number[] | null;
            /** @description Only fire for won (`true`) or lost (`false`) positions. Omit to receive both. */
            won_only?: boolean | null;
        };
        /**
         * @description Subscription filters for the `trader_trade_event` event. All fields are optional.
         *     `event_slugs` and `exclude_shortterm_markets` require explicit `trade_types` that
         *     exclude `PositionsConverted`, because conversion events do not currently carry
         *     `event_slug` in the typed webhook payload.
         */
        TraderTradeEventFilters: {
            /** @description Only fire for events associated with these wallet addresses. Empty = all traders. */
            wallet_addresses?: string[] | null;
            /** @description Restrict to these markets. For `PositionsConverted`, this also matches the NegRisk `market_id`. */
            condition_ids?: string[] | null;
            /** @description Restrict to markets belonging to these events. Requires explicit `trade_types` that exclude `PositionsConverted`. */
            event_slugs?: string[] | null;
            /**
             * Format: double
             * @description Minimum USD amount for the underlying event. Defaults to 0 (matches all events).
             */
            min_usd_value?: number | null;
            /**
             * Format: double
             * @description Only fire when event probability is ≥ this value. Events without probability data do not match.
             */
            min_probability?: number | null;
            /**
             * Format: double
             * @description Only fire when event probability is ≤ this value. Events without probability data do not match.
             */
            max_probability?: number | null;
            /** @description Only fire for these trade types. Empty = all supported trade-event variants. */
            trade_types?: ("OrderFilled" | "OrdersMatched" | "MakerRebate" | "Reward" | "Yield" | "Redemption" | "Merge" | "Split" | "Cancelled" | "PositionsConverted" | "Initialization" | "Proposal" | "Dispute" | "Settled" | "Resolution" | "ConditionResolution" | "Reset" | "Flag" | "Unflag" | "Pause" | "Unpause" | "ManualResolution" | "NegRiskOutcomeReported" | "RegisterToken")[] | null;
            /** @description When `true`, suppress webhooks for short-term "updown" markets. Requires explicit `trade_types` that exclude `PositionsConverted`. Default: `false`. */
            exclude_shortterm_markets?: boolean | null;
        };
        /** @description Subscription filters for the `trader_whale_trade` event. All fields are optional. */
        TraderWhaleTradeFilters: {
            /** @description Only fire for trades by these wallet addresses. Empty = all traders. */
            wallet_addresses?: string[] | null;
            /** @description Restrict to these markets. */
            condition_ids?: string[] | null;
            /** @description Restrict to markets belonging to these events. */
            event_slugs?: string[] | null;
            /**
             * Format: double
             * @description Minimum trade size in USD. Defaults to 0 (matches all trades).
             */
            min_usd_value?: number | null;
            /**
             * Format: double
             * @description Only fire when outcome probability is ≥ this value.
             */
            min_probability?: number | null;
            /**
             * Format: double
             * @description Only fire when outcome probability is ≤ this value.
             */
            max_probability?: number | null;
            /** @description When `true`, suppress webhooks for short-term "updown" markets. Default: `false`. */
            exclude_shortterm_markets?: boolean | null;
        };
        /** @description Request body for updating a webhook */
        UpdateWebhookRequestBody: {
            /** @description Destination URL for webhook deliveries (must be HTTPS) */
            url?: string | null;
            event?: null | components["schemas"]["PolymarketWebhookEvent"];
            /** @description New secret for HMAC signature verification */
            secret?: string | null;
            filters?: null | components["schemas"]["WebhookFiltersBody"];
            status?: null | components["schemas"]["WebhookStatusBody"];
            /** @description Description/name */
            description?: string | null;
        };
        /** @description Volume milestone webhook payload */
        VolumeMilestonePayload: {
            condition_id: string;
            timeframe: string;
            /**
             * Format: double
             * @description Milestone amount reached (USD)
             */
            milestone_usd: number;
            /**
             * Format: double
             * @description Current volume (USD) that triggered the milestone
             */
            current_volume_usd: number;
            /**
             * Format: double
             * @description Total fees collected in this timeframe
             */
            fees: number;
            /**
             * Format: int64
             * @description Total transactions in this timeframe
             */
            txns: number;
        };
        /**
         * @description Aggregation windows accepted by `*_volume_spike.timeframes`. Includes `1d`
         *     in addition to the metric set.
         * @enum {string}
         */
        VolumeSpikeFilterTimeframe: "1m" | "5m" | "30m" | "1h" | "6h" | "1d" | "24h" | "7d" | "30d";
        /**
         * @description Crypto asset symbols accepted by `asset_price_tick` and `asset_price_window_update` filters.
         * @enum {string}
         */
        WebhookAssetSymbol: "BTC" | "ETH" | "SOL" | "XRP" | "DOGE" | "BNB" | "HYPE";
        /** @description Single event type entry for the events list */
        WebhookEventInfo: {
            /** @description Event type identifier (e.g. "first_trade") */
            event: string;
            /** @description Human-readable description */
            description: string;
            /**
             * @description Category grouping for the event type
             * @enum {string}
             */
            category: "trader" | "trade" | "market" | "event" | "tag" | "position" | "assets";
            /**
             * Format: int64
             * @description Millicredits consumed per webhook delivery (1 credit = 1000 mc)
             */
            millicredits_cost: number;
            /** @description Filter field names that apply to this event type */
            applicable_filters: string[];
        };
        /** @description Webhook filters request body */
        WebhookFiltersBody: {
            /** @description Filter by wallet addresses (for first_trade / new_market / whale_trade). Max 500 entries. */
            wallet_addresses?: string[];
            /** @description Filter by trader addresses (for PnL webhooks). Max 500 entries. */
            traders?: string[];
            /** @description Filter by market/condition IDs. Max 500 entries. */
            condition_ids?: string[];
            /** @description Filter by position IDs (for position metrics / close_to_bond). Max 500 entries. */
            position_ids?: string[];
            /** @description Filter by event slugs. Max 500 entries. */
            event_slugs?: string[];
            /** @description Filter by tags or category names (case-insensitive) — for market_created. Max 500 entries. */
            tags?: string[];
            /** @description Filter by outcomes (e.g. "Yes", "No") — for position metrics / close_to_bond. Max 500 entries. */
            outcomes?: string[];
            /** @description Filter by position outcome index — for close_to_bond. Position 0 = Yes/Up, 1 = No. Max 500 entries. */
            position_outcome_indices?: number[];
            /** @description Filter by trade type — for `trader_new_trade` and `trader_trade_event`. Max 500 entries. */
            trade_types?: string[];
            /**
             * Format: double
             * @description Minimum USD trade size (for whale_trade / first_trade)
             */
            min_usd_value?: number | null;
            /**
             * Format: double
             * @description Minimum probability threshold (0.0 - 1.0)
             */
            min_probability?: number | null;
            /**
             * Format: double
             * @description Maximum probability threshold (0.0 - 1.0)
             */
            max_probability?: number | null;
            /**
             * Format: double
             * @description Minimum realized PnL (USD) — for global_pnl / market_pnl / event_pnl
             */
            min_realized_pnl_usd?: number | null;
            /**
             * Format: double
             * @description Maximum realized PnL (USD) — for global_pnl / market_pnl / event_pnl
             */
            max_realized_pnl_usd?: number | null;
            /**
             * Format: double
             * @description Minimum total volume (USD) — for global_pnl / event_pnl / metrics
             */
            min_volume_usd?: number | null;
            /**
             * Format: double
             * @description Maximum total volume (USD) — for metrics webhooks
             */
            max_volume_usd?: number | null;
            /**
             * Format: double
             * @description Minimum buy volume (USD) — for market_pnl / position metrics
             */
            min_buy_usd?: number | null;
            /**
             * Format: double
             * @description Minimum sell volume (USD) — for position metrics
             */
            min_sell_volume_usd?: number | null;
            /**
             * Format: double
             * @description Minimum win rate (0.0 - 100.0) — for global_pnl
             */
            min_win_rate?: number | null;
            /**
             * Format: int64
             * @description Minimum markets traded — for global_pnl / event_pnl
             */
            min_markets_traded?: number | null;
            /**
             * Format: double
             * @description Minimum net shares held — for position-level filters
             */
            min_net_shares?: number | null;
            /**
             * Format: double
             * @description Maximum net shares held — for position-level filters
             */
            max_net_shares?: number | null;
            /**
             * Format: double
             * @description Minimum fees (USD) — for metrics webhooks
             */
            min_fees?: number | null;
            /**
             * Format: int64
             * @description Minimum transaction count — for metrics webhooks
             */
            min_txns?: number | null;
            /**
             * Format: int64
             * @description Minimum unique traders — for metrics webhooks
             */
            min_unique_traders?: number | null;
            /**
             * Format: double
             * @description Minimum price change percentage — for position metrics
             */
            min_price_change_pct?: number | null;
            /**
             * Format: double
             * @description Minimum probability change percentage — for probability_spike
             */
            min_probability_change_pct?: number | null;
            /**
             * @description Timeframes to filter by (e.g. ["1h", "24h", "7d"]) — **required** for volume_milestone
             *     webhooks (market/event/position), optional for metrics webhooks.
             *     Valid values: "1m", "5m", "30m", "1h", "6h", "24h", "7d", "30d".
             */
            timeframes?: components["schemas"]["WebhookTimeframe"][];
            /** @description Milestone amounts to trigger on (USD) — for volume_milestone webhooks. Max 500 entries. */
            milestone_amounts?: number[];
            /**
             * Format: double
             * @description Spike ratio multiplier (must be > 1.0) — for volume_spike. E.g. 2.0 for 2x baseline
             */
            spike_ratio?: number | null;
            spike_direction?: null | components["schemas"]["SpikeDirection"];
            /**
             * Format: int64
             * @description Observation window in seconds (max 600) — for probability_spike, price_spike, volume_spike
             */
            window_secs?: number | null;
            /** @description When true, suppress webhooks for short-term "updown" markets */
            exclude_shortterm_markets?: boolean;
            /**
             * @description Filter by crypto asset symbol — for `asset_price_tick` and `asset_price_window_update`.
             *     Valid values: "BTC", "ETH", "SOL", "XRP", "DOGE", "BNB", "HYPE". Empty = all assets (send everything).
             */
            asset_symbols?: components["schemas"]["WebhookAssetSymbol"][];
        };
        /** @description List webhooks response */
        WebhookListResponseBody: {
            /** @description List of webhooks */
            webhooks: components["schemas"]["WebhookResponse"][];
            /** @description Total count */
            total: number;
        };
        /** @description A single webhook delivery log entry (GET /v1/webhooks/{id}/logs) */
        WebhookLogEntry: {
            /** @description When the payload was sent (RFC3339, millisecond precision) */
            sent_at: string;
            /** @description The full payload we delivered, parsed back to JSON */
            payload: unknown;
            /** @description Event type (e.g. "trader_first_trade") */
            event: string;
            /** @description Unique delivery id */
            delivery_id: string;
            /**
             * Format: int32
             * @description Final attempt number for this dispatch
             */
            attempt: number;
            /** @description Whether delivery ultimately succeeded */
            success: boolean;
            /**
             * Format: int32
             * @description HTTP status code from the endpoint (0 = no response / transport error)
             */
            status_code: number;
            /**
             * Format: int32
             * @description Total dispatch time in milliseconds (including retries)
             */
            latency_ms: number;
            /** @description Destination URL the payload was POSTed to */
            url: string;
            /** @description Error message when delivery failed (omitted when empty) */
            error?: string;
        };
        /** @description Response for GET /v1/webhooks/{id}/logs */
        WebhookLogsResponseBody: {
            /** @description The webhook these logs belong to */
            webhook_id: string;
            /** @description Number of log entries returned */
            total: number;
            /** @description Delivery log entries, newest first */
            logs: components["schemas"]["WebhookLogEntry"][];
            /** @description Cursor pagination metadata */
            pagination: components["schemas"]["PaginationMeta"];
        };
        /** @description Webhook response (returned from API) */
        WebhookResponse: {
            /** @description Unique webhook ID */
            id: string;
            /** @description Destination URL */
            url: string;
            /** @description Subscribed event */
            event: components["schemas"]["PolymarketWebhookEvent"];
            /** @description Active filters (omitted when no filters are set) */
            filters?: components["schemas"]["PolymarketWebhookFilter"];
            /**
             * @description Current webhook status
             * @enum {string}
             */
            status: "active" | "paused" | "disabled" | "suspended";
            /**
             * Format: int64
             * @description Created timestamp (ms)
             */
            created_at: number;
            /**
             * Format: int64
             * @description Updated timestamp (ms)
             */
            updated_at: number;
            /** @description Description/name */
            description?: string | null;
            /** @description Whether an HMAC secret is configured */
            has_secret: boolean;
            /**
             * Format: int64
             * @description Credits consumed by this webhook in the last 24 hours
             */
            credits_used_24h?: number;
        };
        /**
         * @description Webhook status
         * @enum {string}
         */
        WebhookStatusBody: "active" | "paused";
        /** @description Test webhook response */
        WebhookTestResponseBody: {
            /** @description Whether the test delivery succeeded */
            success: boolean;
            /**
             * Format: int32
             * @description HTTP status code from the endpoint
             */
            status_code?: number | null;
            /** @description Error message if failed */
            error?: string | null;
            /**
             * Format: int64
             * @description Delivery duration in milliseconds
             */
            duration_ms: number;
        };
        /**
         * @description Timeframe values accepted by webhook metric, milestone, spike, and asset-price filters.
         * @enum {string}
         */
        WebhookTimeframe: "1m" | "5m" | "15m" | "30m" | "1h" | "4h" | "6h" | "1d" | "24h" | "7d" | "30d" | "lifetime";
        /** @description Payload delivered when a trade exceeds the configured size and probability thresholds */
        WhaleTradePayload: {
            /** @description Limit-order maker wallet address (lowercase) */
            trader: string;
            /** @description Order filler wallet address (lowercase) */
            taker: string;
            /** @description ERC-1155 outcome token ID */
            position_id: string;
            /** @description Parent market condition ID */
            condition_id?: string | null;
            /** @description Outcome name (e.g. "Yes", "No") */
            outcome?: string | null;
            /**
             * Format: int32
             * @description Outcome index: 0 = Yes/Up, 1 = No
             */
            outcome_index?: number | null;
            /** @description Market question text */
            question?: string | null;
            /** @description Market slug */
            market_slug?: string | null;
            /** @description Parent event slug */
            event_slug?: string | null;
            /** @description Market image URL */
            image_url?: string | null;
            /** @description Unique trade identifier */
            trade_id: string;
            /** @description Transaction hash */
            hash: string;
            /**
             * Format: int64
             * @description Block number
             */
            block: number;
            /**
             * Format: int64
             * @description Block confirmation timestamp (Unix seconds)
             */
            confirmed_at: number;
            /**
             * Format: double
             * @description USD size of the trade (6 decimal places)
             */
            amount_usd: number;
            /**
             * Format: double
             * @description Outcome shares traded (6 decimal places)
             */
            shares_amount: number;
            /**
             * Format: double
             * @description Fee paid in USD (6 decimal places)
             */
            fee: number;
            /** @description Trade direction */
            side: "Buy" | "Sell";
            /**
             * Format: double
             * @description Outcome token price (0.0–1.0)
             */
            price: number;
            /**
             * Format: double
             * @description Implied probability (0.0–1.0); null when outcome is unknown
             */
            probability?: number | null;
            /** @description Exchange contract that processed the trade */
            exchange: "CTFExchange" | "NegRiskExchange" | "ConditionalTokens" | "NegRiskAdapter" | "CTFExchangeV2" | "NegRiskExchangeV2" | "Unknown";
            /** @description Trade type (webhook events only fire on order fills) */
            trade_type: "OrderFilled" | "OrdersMatched";
            /**
             * @description CLOB V2 builder code (lower-cased `0x...` bytes32 hex). Absent on V1
             *     trades; may be `0x0000…` for V2 trades placed without a builder code.
             */
            builder_code?: string | null;
            /**
             * Format: double
             * @description Builder fee in USDC. Absent when no builder code is attached.
             */
            builder_fee?: number | null;
        };
        /** @description Outer envelope for every webhook HTTP POST delivery. The `data` field contains the event-specific payload. Delivery headers sent with every POST: `X-Webhook-ID` (subscription UUID), `X-Delivery-ID` (this attempt's UUID), `X-Event-Type` (event name string, e.g. `trader_first_trade`), `X-Attempt` (attempt number, 1-indexed). When the webhook has a secret configured, `X-Webhook-Signature: sha256=<hmac-hex>` is also included — compute HMAC-SHA256 over the raw request body using your secret to verify. */
        WebhookDeliveryEnvelope: {
            /**
             * Format: uuid
             * @description UUID of this specific delivery attempt (matches X-Delivery-ID header)
             */
            id: string;
            /** @description Event name (e.g. `trader_first_trade`). On test deliveries the suffix `_test` is appended. */
            event: string;
            /** @description Event-specific payload — schema varies by event type; see the individual callback definitions */
            data: Record<string, never>;
            /**
             * Format: int64
             * @description Unix timestamp in milliseconds when this delivery was created
             */
            timestamp: number;
            /**
             * Format: uuid
             * @description UUID of the webhook subscription that fired (matches X-Webhook-ID header)
             */
            webhook_id: string;
            /** @description Delivery attempt number. 1 = first attempt; increments on each retry. */
            attempt: number;
        };
        /** @description Tagged union of trade-type variants delivered to `trader_trade_event` callbacks. Pending-only fields such as `received_at` are absent — callbacks fire only for confirmed trades. */
        WebhookTraderTradeEventPayload: {
            id: string;
            hash: string;
            /** Format: int64 */
            block: number;
            /** Format: int64 */
            confirmed_at: number;
            /** Format: int64 */
            log_index: number;
            /** Format: int64 */
            block_index: number;
            order_hash: string;
            trader: {
                address: string;
                name: string | null;
                pseudonym: string | null;
                profile_image: string | null;
                x_username: string | null;
                verified_badge: boolean;
            };
            taker: string;
            /** @enum {string} */
            side: "Buy" | "Sell";
            condition_id: string | null;
            position_id: string;
            outcome?: string;
            outcome_index: number | null;
            question?: string;
            image_url?: string;
            slug?: string;
            event_slug?: string;
            usd_amount: number;
            shares_amount: number;
            price: number;
            probability?: number;
            fee: number;
            fee_shares: number;
            fee_pct: number;
            /**
             * @description Exchange contract that processed the event
             * @enum {string}
             */
            exchange: "CTFExchange" | "NegRiskExchange" | "ConditionalTokens" | "NegRiskAdapter" | "Unknown";
            /** @description CLOB V2 builder code (lower-cased `0x...` bytes32 hex). Absent on V1 trades; may be `0x0000…` for V2 trades placed without a builder code. */
            builder_code?: string;
            /** @description Builder fee in USDC. Absent when no builder code is attached. */
            builder_fee?: number;
            /** @enum {string} */
            trade_type: "OrderFilled" | "OrdersMatched";
        } | {
            id: string;
            hash: string;
            /** Format: int64 */
            block: number;
            /** Format: int64 */
            confirmed_at: number;
            /** Format: int64 */
            log_index: number;
            /** Format: int64 */
            block_index: number;
            order_hash?: string;
            trader: {
                address: string;
                name: string | null;
                pseudonym: string | null;
                profile_image: string | null;
                x_username: string | null;
                verified_badge: boolean;
            };
            taker?: string;
            /** @enum {string} */
            side?: "Buy" | "Sell";
            condition_id?: string | null;
            position_id?: string;
            outcome?: string;
            outcome_index?: number | null;
            question?: string;
            image_url?: string;
            slug?: string;
            event_slug?: string;
            usd_amount: number;
            shares_amount?: number;
            price?: number;
            probability?: number;
            fee?: number;
            fee_shares?: number;
            fee_pct?: number;
            /**
             * @description Exchange contract that processed the event
             * @enum {string}
             */
            exchange: "CTFExchange" | "NegRiskExchange" | "ConditionalTokens" | "NegRiskAdapter" | "Unknown";
            /** @description CLOB V2 builder code (lower-cased `0x...` bytes32 hex). Absent on V1 trades; may be `0x0000…` for V2 trades placed without a builder code. */
            builder_code?: string;
            /** @description Builder fee in USDC. Absent when no builder code is attached. */
            builder_fee?: number;
            /** @enum {string} */
            trade_type: "MakerRebate" | "Reward" | "Yield";
        } | {
            id: string;
            hash: string;
            /** Format: int64 */
            block: number;
            /** Format: int64 */
            confirmed_at: number;
            /** Format: int64 */
            log_index: number;
            /** Format: int64 */
            block_index: number;
            trader: {
                address: string;
                name: string | null;
                pseudonym: string | null;
                profile_image: string | null;
                x_username: string | null;
                verified_badge: boolean;
            };
            condition_id: string | null;
            outcome?: string;
            outcome_index: number | null;
            question?: string;
            image_url?: string;
            slug?: string;
            event_slug?: string;
            usd_amount: number;
            winning_outcome_index?: number;
            position_details?: {
                position_id: string;
                outcome_index: number;
                outcome?: string;
                amount: string;
            }[];
            /**
             * @description Exchange contract that processed the event
             * @enum {string}
             */
            exchange: "CTFExchange" | "NegRiskExchange" | "ConditionalTokens" | "NegRiskAdapter" | "Unknown";
            /** @enum {string} */
            trade_type: "Redemption";
        } | {
            id: string;
            hash: string;
            /** Format: int64 */
            block: number;
            /** Format: int64 */
            confirmed_at: number;
            /** Format: int64 */
            log_index: number;
            /** Format: int64 */
            block_index: number;
            trader: {
                address: string;
                name: string | null;
                pseudonym: string | null;
                profile_image: string | null;
                x_username: string | null;
                verified_badge: boolean;
            };
            condition_id: string | null;
            question?: string;
            image_url?: string;
            slug?: string;
            event_slug?: string;
            usd_amount: number;
            position_details?: {
                position_id: string;
                outcome_index: number;
                outcome?: string;
                amount: string;
            }[];
            /**
             * @description Exchange contract that processed the event
             * @enum {string}
             */
            exchange: "CTFExchange" | "NegRiskExchange" | "ConditionalTokens" | "NegRiskAdapter" | "Unknown";
            /** @enum {string} */
            trade_type: "Merge";
        } | {
            id: string;
            hash: string;
            /** Format: int64 */
            block: number;
            /** Format: int64 */
            confirmed_at: number;
            /** Format: int64 */
            log_index: number;
            /** Format: int64 */
            block_index: number;
            trader: {
                address: string;
                name: string | null;
                pseudonym: string | null;
                profile_image: string | null;
                x_username: string | null;
                verified_badge: boolean;
            };
            condition_id: string | null;
            question?: string;
            image_url?: string;
            slug?: string;
            event_slug?: string;
            usd_amount: number;
            position_details?: {
                position_id: string;
                outcome_index: number;
                outcome?: string;
                amount: string;
            }[];
            /**
             * @description Exchange contract that processed the event
             * @enum {string}
             */
            exchange: "CTFExchange" | "NegRiskExchange" | "ConditionalTokens" | "NegRiskAdapter" | "Unknown";
            /** @enum {string} */
            trade_type: "Split";
        } | {
            id: string;
            hash: string;
            /** Format: int64 */
            block: number;
            /** Format: int64 */
            confirmed_at: number;
            /** Format: int64 */
            log_index: number;
            /** Format: int64 */
            block_index: number;
            trader: {
                address: string;
                name: string | null;
                pseudonym: string | null;
                profile_image: string | null;
                x_username: string | null;
                verified_badge: boolean;
            };
            market_id: string;
            index_set: string;
            shares_amount: number;
            fee?: number;
            fee_pct?: number;
            /** @description Per-position conversion amounts. */
            position_details?: {
                position_id: string;
                outcome_index: number;
                outcome?: string;
                amount: string;
            }[];
            /**
             * @description Exchange contract that processed the event
             * @enum {string}
             */
            exchange: "CTFExchange" | "NegRiskExchange" | "ConditionalTokens" | "NegRiskAdapter" | "Unknown";
            /** @enum {string} */
            trade_type: "PositionsConverted";
        } | {
            id: string;
            hash: string;
            /** Format: int64 */
            block: number;
            /** Format: int64 */
            confirmed_at: number;
            /** Format: int64 */
            log_index: number;
            /** Format: int64 */
            block_index: number;
            order_hash: string;
            question?: string;
            image_url?: string;
            slug?: string;
            event_slug?: string;
            /**
             * @description Exchange contract that processed the event
             * @enum {string}
             */
            exchange: "CTFExchange" | "NegRiskExchange" | "ConditionalTokens" | "NegRiskAdapter" | "Unknown";
            /** @enum {string} */
            trade_type: "Cancelled";
        } | {
            id: string;
            hash: string;
            /** Format: int64 */
            block: number;
            /** Format: int64 */
            confirmed_at: number;
            /** Format: int64 */
            log_index: number;
            /** Format: int64 */
            block_index: number;
            oracle_contract: string;
            condition_id: string;
            creator: string;
            reward_token: string;
            reward: string;
            proposal_bond: string;
            question?: string;
            image_url?: string;
            slug?: string;
            event_slug?: string;
            /** @enum {string} */
            trade_type: "Initialization";
        } | {
            id: string;
            hash: string;
            /** Format: int64 */
            block: number;
            /** Format: int64 */
            confirmed_at: number;
            /** Format: int64 */
            log_index: number;
            /** Format: int64 */
            block_index: number;
            oracle_contract: string;
            condition_id: string;
            assertion_id: string;
            domain_id: string;
            claim: string;
            asserter: string;
            callback_recipient: string;
            escalation_manager: string;
            caller: string;
            /** Format: int64 */
            expiration_time: number;
            currency: string;
            bond: string;
            identifier: string;
            proposed_outcome?: string;
            question?: string;
            image_url?: string;
            slug?: string;
            event_slug?: string;
            /** @enum {string} */
            trade_type: "Proposal";
        } | {
            id: string;
            hash: string;
            /** Format: int64 */
            block: number;
            /** Format: int64 */
            confirmed_at: number;
            /** Format: int64 */
            log_index: number;
            /** Format: int64 */
            block_index: number;
            oracle_contract: string;
            condition_id: string;
            assertion_id: string;
            caller: string;
            disputer: string;
            question?: string;
            image_url?: string;
            slug?: string;
            event_slug?: string;
            /** @enum {string} */
            trade_type: "Dispute";
        } | {
            id: string;
            hash: string;
            /** Format: int64 */
            block: number;
            /** Format: int64 */
            confirmed_at: number;
            /** Format: int64 */
            log_index: number;
            /** Format: int64 */
            block_index: number;
            oracle_contract: string;
            condition_id: string;
            assertion_id: string;
            bond_recipient: string;
            disputed: boolean;
            settlement_resolution: boolean;
            settle_caller: string;
            question?: string;
            image_url?: string;
            slug?: string;
            event_slug?: string;
            /** @enum {string} */
            trade_type: "Settled";
        } | {
            id: string;
            hash: string;
            /** Format: int64 */
            block: number;
            /** Format: int64 */
            confirmed_at: number;
            /** Format: int64 */
            log_index: number;
            /** Format: int64 */
            block_index: number;
            oracle_contract: string;
            condition_id: string;
            /** Format: int64 */
            settled_price: number;
            proposed_outcome?: string;
            question?: string;
            image_url?: string;
            slug?: string;
            event_slug?: string;
            /** @enum {string} */
            trade_type: "Resolution";
        } | {
            id: string;
            hash: string;
            /** Format: int64 */
            block: number;
            /** Format: int64 */
            confirmed_at: number;
            /** Format: int64 */
            log_index: number;
            /** Format: int64 */
            block_index: number;
            oracle_contract: string;
            condition_id: string;
            oracle: string;
            proposed_outcome?: string;
            question?: string;
            image_url?: string;
            slug?: string;
            event_slug?: string;
            /** @enum {string} */
            trade_type: "ConditionResolution";
        } | {
            id: string;
            hash: string;
            /** Format: int64 */
            block: number;
            /** Format: int64 */
            confirmed_at: number;
            /** Format: int64 */
            log_index: number;
            /** Format: int64 */
            block_index: number;
            oracle_contract: string;
            condition_id: string;
            question?: string;
            image_url?: string;
            slug?: string;
            event_slug?: string;
            /** @enum {string} */
            trade_type: "Reset" | "Flag" | "Unflag" | "Pause" | "Unpause";
        } | {
            id: string;
            hash: string;
            /** Format: int64 */
            block: number;
            /** Format: int64 */
            confirmed_at: number;
            /** Format: int64 */
            log_index: number;
            /** Format: int64 */
            block_index: number;
            oracle_contract: string;
            condition_id: string;
            proposed_outcome?: string;
            question?: string;
            image_url?: string;
            slug?: string;
            event_slug?: string;
            /** @enum {string} */
            trade_type: "ManualResolution";
        } | {
            id: string;
            hash: string;
            /** Format: int64 */
            block: number;
            /** Format: int64 */
            confirmed_at: number;
            /** Format: int64 */
            log_index: number;
            /** Format: int64 */
            block_index: number;
            oracle_contract: string;
            condition_id: string;
            proposed_outcome?: string;
            question?: string;
            image_url?: string;
            slug?: string;
            event_slug?: string;
            /** @enum {string} */
            trade_type: "NegRiskOutcomeReported";
        } | {
            id: string;
            hash: string;
            /** Format: int64 */
            block: number;
            /** Format: int64 */
            confirmed_at: number;
            /** Format: int64 */
            log_index: number;
            /** Format: int64 */
            block_index: number;
            condition_id: string;
            token0: string;
            token1: string;
            question?: string;
            image_url?: string;
            slug?: string;
            event_slug?: string;
            /**
             * @description Exchange contract that processed the event
             * @enum {string}
             */
            exchange: "CTFExchange" | "NegRiskExchange" | "ConditionalTokens" | "NegRiskAdapter" | "Unknown";
            /** @enum {string} */
            trade_type: "RegisterToken";
        };
        /**
         * @description All alert event types supported by both HTTP webhooks and the alerts WebSocket.
         * @enum {string}
         */
        WsAlertEventType: "trader_first_trade" | "trader_new_market" | "trader_whale_trade" | "trader_new_trade" | "trader_trade_event" | "trader_global_pnl" | "trader_market_pnl" | "trader_category_pnl" | "trader_position_resolved" | "trader_pnl_exits" | "position_holder_metrics" | "condition_holder_metrics" | "event_holder_metrics" | "condition_metrics" | "event_metrics" | "tag_metrics" | "position_metrics" | "market_volume_milestone" | "event_volume_milestone" | "position_volume_milestone" | "probability_spike" | "price_spike" | "market_volume_spike" | "event_volume_spike" | "position_volume_spike" | "close_to_bond" | "market_created" | "oracle_events" | "asset_price_tick" | "asset_price_window_update";
        /** @description Server acknowledgement for a successful alert subscription. */
        WsAlertSubscribedResponse: {
            /** @enum {string} */
            op: "subscribed";
            event: components["schemas"]["WsAlertEventType"];
            /** Format: uuid */
            subscription_id: string;
        };
        /** @description Server acknowledgement for a successful alert unsubscription. */
        WsAlertUnsubscribedResponse: {
            /** @enum {string} */
            op: "unsubscribed";
            event: components["schemas"]["WsAlertEventType"];
        };
        /** @description Error returned by the alerts WebSocket when a message is invalid or a subscription request fails. */
        WsAlertErrorResponse: {
            error: string;
        };
        WsAlertTraderFirstTradeSubscribeMessage: {
            /** @enum {string} */
            op: "subscribe";
            /** @enum {string} */
            event: "trader_first_trade";
        } & components["schemas"]["TraderFirstTradeFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "trader_first_trade";
        };
        WsAlertTraderFirstTradeUnsubscribeMessage: {
            /** @enum {string} */
            op: "unsubscribe";
            /** @enum {string} */
            event: "trader_first_trade";
        } & components["schemas"]["TraderFirstTradeFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "trader_first_trade";
        };
        /**
         * @description Pushed `trader_first_trade` alert. The `data` payload matches the corresponding HTTP webhook payload schema.
         * @example {
         *       "event": "trader_first_trade",
         *       "timestamp": 1743500000000,
         *       "data": {
         *         "trader": "0x0000000000000000000000000000000000000000",
         *         "taker": "0x0000000000000000000000000000000000000000",
         *         "position_id": "452312848583266388373324160190187140051835877600158453279131187530910662656",
         *         "condition_id": "0x0000000000000000000000000000000000000000000000000000000000000000",
         *         "outcome": "Yes",
         *         "outcome_index": 0,
         *         "question": "Will this test webhook fire correctly?",
         *         "market_slug": "test-market-0000000000",
         *         "event_slug": "test-event-0000000000",
         *         "image_url": "https://example.com/market.png",
         *         "trade_id": "00000000-0000-0000-0000-000000000000",
         *         "hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
         *         "block": 0,
         *         "confirmed_at": 1700000000,
         *         "amount_usd": 125,
         *         "shares_amount": 250,
         *         "fee": 0.125,
         *         "side": "Buy",
         *         "price": 0.5,
         *         "exchange": "CTFExchange",
         *         "trade_type": "OrderFilled"
         *       }
         *     }
         */
        WsAlertTraderFirstTradeEvent: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "trader_first_trade";
            /**
             * Format: int64
             * @description Unix timestamp in milliseconds
             */
            timestamp: number;
            data: components["schemas"]["FirstTradePayload"];
        };
        WsAlertTraderNewMarketSubscribeMessage: {
            /** @enum {string} */
            op: "subscribe";
            /** @enum {string} */
            event: "trader_new_market";
        } & components["schemas"]["TraderNewMarketFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "trader_new_market";
        };
        WsAlertTraderNewMarketUnsubscribeMessage: {
            /** @enum {string} */
            op: "unsubscribe";
            /** @enum {string} */
            event: "trader_new_market";
        } & components["schemas"]["TraderNewMarketFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "trader_new_market";
        };
        /**
         * @description Pushed `trader_new_market` alert. The `data` payload matches the corresponding HTTP webhook payload schema.
         * @example {
         *       "event": "trader_new_market",
         *       "timestamp": 1743500000000,
         *       "data": {
         *         "trader": "0x0000000000000000000000000000000000000000",
         *         "taker": "0x0000000000000000000000000000000000000000",
         *         "position_id": "452312848583266388373324160190187140051835877600158453279131187530910662656",
         *         "condition_id": "0x0000000000000000000000000000000000000000000000000000000000000000",
         *         "outcome": "Yes",
         *         "outcome_index": 0,
         *         "question": "Will this test webhook fire correctly?",
         *         "market_slug": "test-market-0000000000",
         *         "event_slug": "test-event-0000000000",
         *         "image_url": "https://example.com/market.png",
         *         "trade_id": "00000000-0000-0000-0000-000000000000",
         *         "hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
         *         "block": 0,
         *         "confirmed_at": 1700000000,
         *         "amount_usd": 125,
         *         "shares_amount": 250,
         *         "fee": 0.125,
         *         "side": "Buy",
         *         "price": 0.5,
         *         "probability": 0.5,
         *         "exchange": "CTFExchange",
         *         "trade_type": "OrderFilled"
         *       }
         *     }
         */
        WsAlertTraderNewMarketEvent: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "trader_new_market";
            /**
             * Format: int64
             * @description Unix timestamp in milliseconds
             */
            timestamp: number;
            data: components["schemas"]["NewMarketPayload"];
        };
        WsAlertTraderWhaleTradeSubscribeMessage: {
            /** @enum {string} */
            op: "subscribe";
            /** @enum {string} */
            event: "trader_whale_trade";
        } & components["schemas"]["TraderWhaleTradeFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "trader_whale_trade";
        };
        WsAlertTraderWhaleTradeUnsubscribeMessage: {
            /** @enum {string} */
            op: "unsubscribe";
            /** @enum {string} */
            event: "trader_whale_trade";
        } & components["schemas"]["TraderWhaleTradeFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "trader_whale_trade";
        };
        /**
         * @description Pushed `trader_whale_trade` alert. The `data` payload matches the corresponding HTTP webhook payload schema.
         * @example {
         *       "event": "trader_whale_trade",
         *       "timestamp": 1743500000000,
         *       "data": {
         *         "trader": "0x0000000000000000000000000000000000000000",
         *         "taker": "0x0000000000000000000000000000000000000000",
         *         "position_id": "452312848583266388373324160190187140051835877600158453279131187530910662656",
         *         "condition_id": "0x0000000000000000000000000000000000000000000000000000000000000000",
         *         "outcome": "Yes",
         *         "outcome_index": 0,
         *         "question": "Will this test webhook fire correctly?",
         *         "market_slug": "test-market-0000000000",
         *         "event_slug": "test-event-0000000000",
         *         "image_url": "https://example.com/market.png",
         *         "trade_id": "00000000-0000-0000-0000-000000000000",
         *         "hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
         *         "block": 0,
         *         "confirmed_at": 1700000000,
         *         "amount_usd": 125,
         *         "shares_amount": 250,
         *         "fee": 0.125,
         *         "side": "Buy",
         *         "price": 0.5,
         *         "probability": 0.5,
         *         "exchange": "CTFExchange",
         *         "trade_type": "OrderFilled",
         *         "builder_code": "0x0000000000000000000000000000000000000000000000000000000000000000",
         *         "builder_fee": 0.25
         *       }
         *     }
         */
        WsAlertTraderWhaleTradeEvent: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "trader_whale_trade";
            /**
             * Format: int64
             * @description Unix timestamp in milliseconds
             */
            timestamp: number;
            data: components["schemas"]["WhaleTradePayload"];
        };
        WsAlertTraderNewTradeSubscribeMessage: {
            /** @enum {string} */
            op: "subscribe";
            /** @enum {string} */
            event: "trader_new_trade";
        } & components["schemas"]["TraderNewTradeFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "trader_new_trade";
        };
        WsAlertTraderNewTradeUnsubscribeMessage: {
            /** @enum {string} */
            op: "unsubscribe";
            /** @enum {string} */
            event: "trader_new_trade";
        } & components["schemas"]["TraderNewTradeFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "trader_new_trade";
        };
        /**
         * @description Pushed `trader_new_trade` alert. The `data` payload matches the corresponding HTTP webhook payload schema.
         * @example {
         *       "event": "trader_new_trade",
         *       "timestamp": 1743500000000,
         *       "data": {
         *         "trader": "0x0000000000000000000000000000000000000000",
         *         "taker": "0x0000000000000000000000000000000000000000",
         *         "position_id": "452312848583266388373324160190187140051835877600158453279131187530910662656",
         *         "condition_id": "0x0000000000000000000000000000000000000000000000000000000000000000",
         *         "outcome": "Yes",
         *         "outcome_index": 0,
         *         "question": "Will this test webhook fire correctly?",
         *         "market_slug": "test-market-0000000000",
         *         "event_slug": "test-event-0000000000",
         *         "image_url": "https://example.com/market.png",
         *         "trade_id": "00000000-0000-0000-0000-000000000000",
         *         "hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
         *         "block": 0,
         *         "confirmed_at": 1700000000,
         *         "amount_usd": 25,
         *         "shares_amount": 50,
         *         "fee": 0.025,
         *         "side": "Buy",
         *         "price": 0.5,
         *         "probability": 0.5,
         *         "exchange": "CTFExchange",
         *         "trade_type": "OrderFilled",
         *         "builder_code": "0x0000000000000000000000000000000000000000000000000000000000000000",
         *         "builder_fee": 0.05
         *       }
         *     }
         */
        WsAlertTraderNewTradeEvent: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "trader_new_trade";
            /**
             * Format: int64
             * @description Unix timestamp in milliseconds
             */
            timestamp: number;
            data: components["schemas"]["NewTradePayload"];
        };
        WsAlertTraderTradeEventSubscribeMessage: {
            /** @enum {string} */
            op: "subscribe";
            /** @enum {string} */
            event: "trader_trade_event";
        } & components["schemas"]["TraderTradeEventFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "trader_trade_event";
        };
        WsAlertTraderTradeEventUnsubscribeMessage: {
            /** @enum {string} */
            op: "unsubscribe";
            /** @enum {string} */
            event: "trader_trade_event";
        } & components["schemas"]["TraderTradeEventFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "trader_trade_event";
        };
        /**
         * @description Pushed `trader_trade_event` alert. The `data` payload matches the corresponding HTTP webhook payload schema.
         * @example {
         *       "event": "trader_trade_event",
         *       "timestamp": 1743500000000,
         *       "data": {
         *         "trade_type": "OrderFilled",
         *         "id": "00000000-0000-0000-0000-000000000000",
         *         "hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
         *         "block": 65000000,
         *         "confirmed_at": 1700000000,
         *         "log_index": 0,
         *         "block_index": 0,
         *         "order_hash": "0x1111111111111111111111111111111111111111111111111111111111111111",
         *         "trader": {
         *           "address": "0x0000000000000000000000000000000000000000"
         *         },
         *         "taker": "0x0000000000000000000000000000000000000000",
         *         "side": "Buy",
         *         "condition_id": "0x0000000000000000000000000000000000000000000000000000000000000000",
         *         "position_id": "452312848583266388373324160190187140051835877600158453279131187530910662656",
         *         "outcome": "Yes",
         *         "outcome_index": 0,
         *         "question": "Will this typed trade-event webhook fire correctly?",
         *         "slug": "test-market-0000000000",
         *         "event_slug": "test-event-0000000000",
         *         "usd_amount": 25,
         *         "shares_amount": 50,
         *         "price": 0.5,
         *         "probability": 0.5,
         *         "fee": 0.025,
         *         "fee_shares": 0,
         *         "fee_pct": 0.1,
         *         "exchange": "CTFExchange"
         *       }
         *     }
         */
        WsAlertTraderTradeEventEvent: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "trader_trade_event";
            /**
             * Format: int64
             * @description Unix timestamp in milliseconds
             */
            timestamp: number;
            data: components["schemas"]["WebhookTraderTradeEventPayload"];
        };
        WsAlertTraderGlobalPnlSubscribeMessage: {
            /** @enum {string} */
            op: "subscribe";
            /** @enum {string} */
            event: "trader_global_pnl";
        } & components["schemas"]["TraderGlobalPnlFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "trader_global_pnl";
        };
        WsAlertTraderGlobalPnlUnsubscribeMessage: {
            /** @enum {string} */
            op: "unsubscribe";
            /** @enum {string} */
            event: "trader_global_pnl";
        } & components["schemas"]["TraderGlobalPnlFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "trader_global_pnl";
        };
        /**
         * @description Pushed `trader_global_pnl` alert. The `data` payload matches the corresponding HTTP webhook payload schema.
         * @example {
         *       "event": "trader_global_pnl",
         *       "timestamp": 1743500000000,
         *       "data": {
         *         "trader": "0x0000000000000000000000000000000000000000",
         *         "timeframe": "7d",
         *         "realized_pnl_usd": 250,
         *         "events_traded": 3,
         *         "markets_traded": 5,
         *         "total_buys": 12,
         *         "total_sells": 8,
         *         "total_redemptions": 1,
         *         "total_merges": 0,
         *         "total_splits": 0,
         *         "total_volume_usd": 1500,
         *         "buy_volume_usd": 900,
         *         "sell_volume_usd": 600,
         *         "redemption_volume_usd": 50,
         *         "merge_volume_usd": 0,
         *         "convert_collateral_usd": 0,
         *         "split_volume_usd": 0,
         *         "maker_rebate_count": 0,
         *         "maker_rebate_usd": 0,
         *         "reward_count": 0,
         *         "reward_usd": 0,
         *         "yield_count": 0,
         *         "yield_usd": 0,
         *         "total_credit_count": 0,
         *         "total_credit_usd": 0,
         *         "markets_won": 3,
         *         "markets_lost": 2,
         *         "market_win_rate_pct": 60,
         *         "total_wins_usd": 400,
         *         "total_losses_usd": 150,
         *         "avg_win_usd": 133.3,
         *         "avg_loss_usd": 75,
         *         "profit_factor": 2.67,
         *         "avg_hold_time_seconds": 86400,
         *         "total_fees": 7.5,
         *         "best_trade_pnl_usd": 180,
         *         "best_trade_condition_id": "0x0000000000000000000000000000000000000000000000000000000000000000",
         *         "worst_trade_pnl_usd": -50,
         *         "worst_trade_condition_id": "0x0000000000000000000000000000000000000000000000000000000000000001",
         *         "first_trade_at": 1700000000,
         *         "last_trade_at": 1700000000
         *       }
         *     }
         */
        WsAlertTraderGlobalPnlEvent: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "trader_global_pnl";
            /**
             * Format: int64
             * @description Unix timestamp in milliseconds
             */
            timestamp: number;
            data: components["schemas"]["GlobalPnlPayload"];
        };
        WsAlertTraderMarketPnlSubscribeMessage: {
            /** @enum {string} */
            op: "subscribe";
            /** @enum {string} */
            event: "trader_market_pnl";
        } & components["schemas"]["TraderMarketPnlFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "trader_market_pnl";
        };
        WsAlertTraderMarketPnlUnsubscribeMessage: {
            /** @enum {string} */
            op: "unsubscribe";
            /** @enum {string} */
            event: "trader_market_pnl";
        } & components["schemas"]["TraderMarketPnlFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "trader_market_pnl";
        };
        /**
         * @description Pushed `trader_market_pnl` alert. The `data` payload matches the corresponding HTTP webhook payload schema.
         * @example {
         *       "event": "trader_market_pnl",
         *       "timestamp": 1743500000000,
         *       "data": {
         *         "trader": "0x0000000000000000000000000000000000000000",
         *         "condition_id": "0x0000000000000000000000000000000000000000000000000000000000000000",
         *         "event_slug": "test-event-0000000000",
         *         "category": "crypto",
         *         "timeframe": "7d",
         *         "realized_pnl_usd": 100,
         *         "current_shares_balance": 150,
         *         "outcomes_traded": 2,
         *         "total_buys": 4,
         *         "total_sells": 3,
         *         "total_redemptions": 1,
         *         "total_merges": 0,
         *         "total_splits": 0,
         *         "buy_usd": 300,
         *         "sell_usd": 200,
         *         "redemption_usd": 50,
         *         "merge_usd": 0,
         *         "convert_collateral_usd": 0,
         *         "split_volume_usd": 0,
         *         "total_fees": 2.5,
         *         "total_shares_bought": 500,
         *         "first_trade_at": 1700000000,
         *         "last_trade_at": 1700000000
         *       }
         *     }
         */
        WsAlertTraderMarketPnlEvent: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "trader_market_pnl";
            /**
             * Format: int64
             * @description Unix timestamp in milliseconds
             */
            timestamp: number;
            data: components["schemas"]["MarketPnlPayload"];
        };
        WsAlertTraderCategoryPnlSubscribeMessage: {
            /** @enum {string} */
            op: "subscribe";
            /** @enum {string} */
            event: "trader_category_pnl";
        } & components["schemas"]["TraderCategoryPnlFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "trader_category_pnl";
        };
        WsAlertTraderCategoryPnlUnsubscribeMessage: {
            /** @enum {string} */
            op: "unsubscribe";
            /** @enum {string} */
            event: "trader_category_pnl";
        } & components["schemas"]["TraderCategoryPnlFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "trader_category_pnl";
        };
        /**
         * @description Pushed `trader_category_pnl` alert. The `data` payload matches the corresponding HTTP webhook payload schema.
         * @example {
         *       "event": "trader_category_pnl",
         *       "timestamp": 1743500000000,
         *       "data": {
         *         "trader": "0x0000000000000000000000000000000000000000",
         *         "category": "crypto",
         *         "timeframe": "7d",
         *         "realized_pnl_usd": 250,
         *         "markets_in_category": 15,
         *         "markets_traded": 5,
         *         "outcomes_traded": 8,
         *         "total_buys": 12,
         *         "total_sells": 8,
         *         "total_redemptions": 1,
         *         "total_merges": 0,
         *         "total_splits": 0,
         *         "total_volume_usd": 1500,
         *         "buy_usd": 900,
         *         "sell_usd": 600,
         *         "redemption_usd": 50,
         *         "merge_usd": 0,
         *         "convert_collateral_usd": 0,
         *         "split_volume_usd": 0,
         *         "total_fees": 7.5,
         *         "total_shares_bought": 500,
         *         "markets_won": 3,
         *         "markets_lost": 2,
         *         "market_win_rate_pct": 60,
         *         "avg_hold_time_seconds": 86400,
         *         "best_trade_pnl_usd": 180,
         *         "best_trade_condition_id": "0x0000000000000000000000000000000000000000000000000000000000000000",
         *         "worst_trade_pnl_usd": -50,
         *         "worst_trade_condition_id": "0x0000000000000000000000000000000000000000000000000000000000000001",
         *         "total_wins_usd": 400,
         *         "total_losses_usd": 150,
         *         "avg_win_usd": 133.3,
         *         "avg_loss_usd": 75,
         *         "profit_factor": 2.67,
         *         "first_trade_at": 1700000000,
         *         "last_trade_at": 1700000000
         *       }
         *     }
         */
        WsAlertTraderCategoryPnlEvent: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "trader_category_pnl";
            /**
             * Format: int64
             * @description Unix timestamp in milliseconds
             */
            timestamp: number;
            data: components["schemas"]["CategoryPnlPayload"];
        };
        WsAlertTraderPositionResolvedSubscribeMessage: {
            /** @enum {string} */
            op: "subscribe";
            /** @enum {string} */
            event: "trader_position_resolved";
        } & components["schemas"]["TraderPositionResolvedFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "trader_position_resolved";
        };
        WsAlertTraderPositionResolvedUnsubscribeMessage: {
            /** @enum {string} */
            op: "unsubscribe";
            /** @enum {string} */
            event: "trader_position_resolved";
        } & components["schemas"]["TraderPositionResolvedFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "trader_position_resolved";
        };
        /**
         * @description Pushed `trader_position_resolved` alert. The `data` payload matches the corresponding HTTP webhook payload schema.
         * @example {
         *       "event": "trader_position_resolved",
         *       "timestamp": 1743500000000,
         *       "data": {
         *         "trader": "0x0000000000000000000000000000000000000000",
         *         "position_id": "0x0000000000000000000000000000000000000000000000000000000000000000",
         *         "condition_id": "0x0000000000000000000000000000000000000000000000000000000000000000",
         *         "event_slug": "test-event-0000000000",
         *         "category": "politics",
         *         "outcome": "Yes",
         *         "outcome_index": 0,
         *         "total_buys": 4,
         *         "total_sells": 2,
         *         "total_merges": 0,
         *         "total_splits": 0,
         *         "winning_outcome_index": 0,
         *         "total_shares_bought": 500,
         *         "total_shares_sold": 200,
         *         "buy_usd": 300,
         *         "sell_usd": 150,
         *         "avg_entry_price": 0.6,
         *         "total_fees": 2.5,
         *         "realized_pnl_usd": 100,
         *         "total_pnl_usd": 100,
         *         "unrealized_pnl_usd": 0,
         *         "redemption_usd": 50,
         *         "open": false,
         *         "won": true,
         *         "first_trade_at": 1700000000,
         *         "last_trade_at": 1700000000,
         *         "dirty_kinds": [
         *           "position_resolved"
         *         ],
         *         "realized_pnl_pct": 0,
         *         "total_pnl_pct": 0,
         *         "converted_count": 0,
         *         "converted_shares_gained": 0,
         *         "converted_shares_lost": 0,
         *         "total_buy_usd": 0,
         *         "total_sell_usd": 0,
         *         "merge_usd": 0
         *       }
         *     }
         */
        WsAlertTraderPositionResolvedEvent: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "trader_position_resolved";
            /**
             * Format: int64
             * @description Unix timestamp in milliseconds
             */
            timestamp: number;
            data: components["schemas"]["PositionResolvedPayload"];
        };
        WsAlertTraderPnlExitsSubscribeMessage: {
            /** @enum {string} */
            op: "subscribe";
            /** @enum {string} */
            event: "trader_pnl_exits";
        } & components["schemas"]["TraderExitMarkersFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "trader_pnl_exits";
        };
        WsAlertTraderPnlExitsUnsubscribeMessage: {
            /** @enum {string} */
            op: "unsubscribe";
            /** @enum {string} */
            event: "trader_pnl_exits";
        } & components["schemas"]["TraderExitMarkersFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "trader_pnl_exits";
        };
        /**
         * @description Pushed `trader_pnl_exits` alert. The `data` payload matches the corresponding HTTP webhook payload schema.
         * @example {
         *       "event": "trader_pnl_exits",
         *       "timestamp": 1743500000000,
         *       "data": {
         *         "trader": "0x0000000000000000000000000000000000000000",
         *         "position_id": "0x0000000000000000000000000000000000000000000000000000000000000000",
         *         "condition_id": "0x0000000000000000000000000000000000000000000000000000000000000000",
         *         "event_slug": "test-event-0000000000",
         *         "market_slug": "test-market",
         *         "title": "Test Market",
         *         "question": "Will this test market resolve YES?",
         *         "image_url": "",
         *         "outcome": "Yes",
         *         "outcome_index": 0,
         *         "pnl_usd": 100,
         *         "pnl_pct": 33.3,
         *         "cost_basis_usd": 300,
         *         "reason": "resolved_win",
         *         "block": 1,
         *         "ts": 1700000000
         *       }
         *     }
         */
        WsAlertTraderPnlExitsEvent: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "trader_pnl_exits";
            /**
             * Format: int64
             * @description Unix timestamp in milliseconds
             */
            timestamp: number;
            data: components["schemas"]["ExitMarkersPayload"];
        };
        WsAlertPositionHolderMetricsSubscribeMessage: ({
            /** @enum {string} */
            op: "subscribe";
            /** @enum {string} */
            event: "position_holder_metrics";
        } & components["schemas"]["PositionHolderMetricsFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "position_holder_metrics";
        }) | unknown;
        WsAlertPositionHolderMetricsUnsubscribeMessage: ({
            /** @enum {string} */
            op: "unsubscribe";
            /** @enum {string} */
            event: "position_holder_metrics";
        } & components["schemas"]["PositionHolderMetricsFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "position_holder_metrics";
        }) | unknown;
        /**
         * @description Pushed `position_holder_metrics` alert. The `data` payload matches the corresponding HTTP webhook payload schema.
         * @example {
         *       "event": "position_holder_metrics",
         *       "timestamp": 1743500000000,
         *       "data": {
         *         "ts": 1700000000,
         *         "block": 1,
         *         "position_id": "0x0000000000000000000000000000000000000000000000000000000000000000",
         *         "holder_count": 10,
         *         "total_balance": 1000,
         *         "total_cost_basis": 500,
         *         "condition_holder_count": 15,
         *         "event_holder_count": 25
         *       }
         *     }
         */
        WsAlertPositionHolderMetricsEvent: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "position_holder_metrics";
            /**
             * Format: int64
             * @description Unix timestamp in milliseconds
             */
            timestamp: number;
            data: components["schemas"]["PositionHolderMetricsPayload"];
        };
        WsAlertConditionHolderMetricsSubscribeMessage: ({
            /** @enum {string} */
            op: "subscribe";
            /** @enum {string} */
            event: "condition_holder_metrics";
        } & components["schemas"]["ConditionHolderMetricsFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "condition_holder_metrics";
        }) | unknown;
        WsAlertConditionHolderMetricsUnsubscribeMessage: ({
            /** @enum {string} */
            op: "unsubscribe";
            /** @enum {string} */
            event: "condition_holder_metrics";
        } & components["schemas"]["ConditionHolderMetricsFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "condition_holder_metrics";
        }) | unknown;
        /**
         * @description Pushed `condition_holder_metrics` alert. The `data` payload matches the corresponding HTTP webhook payload schema.
         * @example {
         *       "event": "condition_holder_metrics",
         *       "timestamp": 1743500000000,
         *       "data": {
         *         "ts": 1700000000,
         *         "block": 1,
         *         "condition_id": "0x0000000000000000000000000000000000000000000000000000000000000000",
         *         "holder_count": 15
         *       }
         *     }
         */
        WsAlertConditionHolderMetricsEvent: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "condition_holder_metrics";
            /**
             * Format: int64
             * @description Unix timestamp in milliseconds
             */
            timestamp: number;
            data: components["schemas"]["ConditionHolderMetricsPayload"];
        };
        WsAlertEventHolderMetricsSubscribeMessage: ({
            /** @enum {string} */
            op: "subscribe";
            /** @enum {string} */
            event: "event_holder_metrics";
        } & components["schemas"]["EventHolderMetricsFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "event_holder_metrics";
        }) | unknown;
        WsAlertEventHolderMetricsUnsubscribeMessage: ({
            /** @enum {string} */
            op: "unsubscribe";
            /** @enum {string} */
            event: "event_holder_metrics";
        } & components["schemas"]["EventHolderMetricsFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "event_holder_metrics";
        }) | unknown;
        /**
         * @description Pushed `event_holder_metrics` alert. The `data` payload matches the corresponding HTTP webhook payload schema.
         * @example {
         *       "event": "event_holder_metrics",
         *       "timestamp": 1743500000000,
         *       "data": {
         *         "ts": 1700000000,
         *         "block": 1,
         *         "event_slug": "test-event-0000000000",
         *         "holder_count": 25
         *       }
         *     }
         */
        WsAlertEventHolderMetricsEvent: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "event_holder_metrics";
            /**
             * Format: int64
             * @description Unix timestamp in milliseconds
             */
            timestamp: number;
            data: components["schemas"]["EventHolderMetricsPayload"];
        };
        WsAlertConditionMetricsSubscribeMessage: {
            /** @enum {string} */
            op: "subscribe";
            /** @enum {string} */
            event: "condition_metrics";
        } & components["schemas"]["MarketMetricsFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "condition_metrics";
        };
        WsAlertConditionMetricsUnsubscribeMessage: {
            /** @enum {string} */
            op: "unsubscribe";
            /** @enum {string} */
            event: "condition_metrics";
        } & components["schemas"]["MarketMetricsFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "condition_metrics";
        };
        /**
         * @description Pushed `condition_metrics` alert. The `data` payload matches the corresponding HTTP webhook payload schema.
         * @example {
         *       "event": "condition_metrics",
         *       "timestamp": 1743500000000,
         *       "data": {
         *         "condition_id": "0x0000000000000000000000000000000000000000000000000000000000000000",
         *         "timeframe": "1h",
         *         "volume_usd": 50000,
         *         "shares_volume": 62000,
         *         "builder_usd_volume": 12500,
         *         "builder_shares_volume": 15500,
         *         "fees": 250,
         *         "builder_fees": 62.5,
         *         "txns": 320,
         *         "builder_txns": 80,
         *         "unique_traders": 85,
         *         "unique_makers": 60,
         *         "unique_takers": 48,
         *         "unique_builder_traders": 24
         *       }
         *     }
         */
        WsAlertConditionMetricsEvent: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "condition_metrics";
            /**
             * Format: int64
             * @description Unix timestamp in milliseconds
             */
            timestamp: number;
            data: components["schemas"]["ConditionMetricsPayload"];
        };
        WsAlertEventMetricsSubscribeMessage: {
            /** @enum {string} */
            op: "subscribe";
            /** @enum {string} */
            event: "event_metrics";
        } & components["schemas"]["EventMetricsFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "event_metrics";
        };
        WsAlertEventMetricsUnsubscribeMessage: {
            /** @enum {string} */
            op: "unsubscribe";
            /** @enum {string} */
            event: "event_metrics";
        } & components["schemas"]["EventMetricsFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "event_metrics";
        };
        /**
         * @description Pushed `event_metrics` alert. The `data` payload matches the corresponding HTTP webhook payload schema.
         * @example {
         *       "event": "event_metrics",
         *       "timestamp": 1743500000000,
         *       "data": {
         *         "event_slug": "test-event-0000000000",
         *         "timeframe": "1h",
         *         "volume_usd": 120000,
         *         "shares_volume": 148000,
         *         "builder_usd_volume": 30000,
         *         "builder_shares_volume": 37000,
         *         "fees": 600,
         *         "builder_fees": 150,
         *         "txns": 740,
         *         "builder_txns": 185,
         *         "unique_traders": 210,
         *         "unique_makers": 132,
         *         "unique_takers": 98,
         *         "unique_builder_traders": 54
         *       }
         *     }
         */
        WsAlertEventMetricsEvent: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "event_metrics";
            /**
             * Format: int64
             * @description Unix timestamp in milliseconds
             */
            timestamp: number;
            data: components["schemas"]["EventMetricsPayload"];
        };
        WsAlertTagMetricsSubscribeMessage: {
            /** @enum {string} */
            op: "subscribe";
            /** @enum {string} */
            event: "tag_metrics";
        } & components["schemas"]["TagMetricsFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "tag_metrics";
        };
        WsAlertTagMetricsUnsubscribeMessage: {
            /** @enum {string} */
            op: "unsubscribe";
            /** @enum {string} */
            event: "tag_metrics";
        } & components["schemas"]["TagMetricsFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "tag_metrics";
        };
        /**
         * @description Pushed `tag_metrics` alert. The `data` payload matches the corresponding HTTP webhook payload schema.
         * @example {
         *       "event": "tag_metrics",
         *       "timestamp": 1743500000000,
         *       "data": {
         *         "tag": "politics",
         *         "timeframe": "1h",
         *         "volume_usd": 120000,
         *         "shares_volume": 148000,
         *         "builder_usd_volume": 30000,
         *         "builder_shares_volume": 37000,
         *         "fees": 600,
         *         "builder_fees": 150,
         *         "txns": 740,
         *         "builder_txns": 185,
         *         "unique_traders": 210,
         *         "unique_makers": 132,
         *         "unique_takers": 98,
         *         "unique_builder_traders": 54
         *       }
         *     }
         */
        WsAlertTagMetricsEvent: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "tag_metrics";
            /**
             * Format: int64
             * @description Unix timestamp in milliseconds
             */
            timestamp: number;
            data: components["schemas"]["TagMetricsPayload"];
        };
        WsAlertPositionMetricsSubscribeMessage: {
            /** @enum {string} */
            op: "subscribe";
            /** @enum {string} */
            event: "position_metrics";
        } & components["schemas"]["PositionMetricsFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "position_metrics";
        };
        WsAlertPositionMetricsUnsubscribeMessage: {
            /** @enum {string} */
            op: "unsubscribe";
            /** @enum {string} */
            event: "position_metrics";
        } & components["schemas"]["PositionMetricsFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "position_metrics";
        };
        /**
         * @description Pushed `position_metrics` alert. The `data` payload matches the corresponding HTTP webhook payload schema.
         * @example {
         *       "event": "position_metrics",
         *       "timestamp": 1743500000000,
         *       "data": {
         *         "position_id": "452312848583266388373324160190187140051835877600158453279131187530910662656",
         *         "outcome": "Yes",
         *         "outcome_index": 0,
         *         "timeframe": "1h",
         *         "volume_usd": 25000,
         *         "buy_volume_usd": 15000,
         *         "sell_volume_usd": 10000,
         *         "shares_volume": 31000,
         *         "shares_buy_volume": 18600,
         *         "shares_sell_volume": 12400,
         *         "builder_usd_volume": 6250,
         *         "builder_usd_buy_volume": 3750,
         *         "builder_usd_sell_volume": 2500,
         *         "builder_shares_volume": 7750,
         *         "builder_shares_buy_volume": 4650,
         *         "builder_shares_sell_volume": 3100,
         *         "fees": 125,
         *         "builder_fees": 31.25,
         *         "txns": 160,
         *         "buys": 95,
         *         "sells": 65,
         *         "builder_txns": 40,
         *         "builder_buys": 24,
         *         "builder_sells": 16,
         *         "unique_traders": 48,
         *         "unique_makers": 32,
         *         "unique_takers": 24,
         *         "unique_builder_traders": 12,
         *         "price_open": 0.48,
         *         "price_close": 0.52,
         *         "price_high": 0.55,
         *         "price_low": 0.46,
         *         "probability_open": 0.48,
         *         "probability_close": 0.52,
         *         "probability_high": 0.55,
         *         "probability_low": 0.46,
         *         "avg_trade_shares": 193.75,
         *         "avg_buy_shares": 195.78947368421052,
         *         "avg_sell_shares": 190.76923076923077
         *       }
         *     }
         */
        WsAlertPositionMetricsEvent: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "position_metrics";
            /**
             * Format: int64
             * @description Unix timestamp in milliseconds
             */
            timestamp: number;
            data: components["schemas"]["PositionMetricsPayload"];
        };
        WsAlertMarketVolumeMilestoneSubscribeMessage: {
            /** @enum {string} */
            op: "subscribe";
            /** @enum {string} */
            event: "market_volume_milestone";
        } & components["schemas"]["MarketVolumeMilestoneFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "market_volume_milestone";
        };
        WsAlertMarketVolumeMilestoneUnsubscribeMessage: {
            /** @enum {string} */
            op: "unsubscribe";
            /** @enum {string} */
            event: "market_volume_milestone";
        } & components["schemas"]["MarketVolumeMilestoneFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "market_volume_milestone";
        };
        /**
         * @description Pushed `market_volume_milestone` alert. The `data` payload matches the corresponding HTTP webhook payload schema.
         * @example {
         *       "event": "market_volume_milestone",
         *       "timestamp": 1743500000000,
         *       "data": {
         *         "condition_id": "0x0000000000000000000000000000000000000000000000000000000000000000",
         *         "timeframe": "24h",
         *         "milestone_usd": 100000,
         *         "current_volume_usd": 100125,
         *         "fees": 500,
         *         "txns": 650
         *       }
         *     }
         */
        WsAlertMarketVolumeMilestoneEvent: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "market_volume_milestone";
            /**
             * Format: int64
             * @description Unix timestamp in milliseconds
             */
            timestamp: number;
            data: components["schemas"]["VolumeMilestonePayload"];
        };
        WsAlertEventVolumeMilestoneSubscribeMessage: {
            /** @enum {string} */
            op: "subscribe";
            /** @enum {string} */
            event: "event_volume_milestone";
        } & components["schemas"]["EventVolumeMilestoneFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "event_volume_milestone";
        };
        WsAlertEventVolumeMilestoneUnsubscribeMessage: {
            /** @enum {string} */
            op: "unsubscribe";
            /** @enum {string} */
            event: "event_volume_milestone";
        } & components["schemas"]["EventVolumeMilestoneFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "event_volume_milestone";
        };
        /**
         * @description Pushed `event_volume_milestone` alert. The `data` payload matches the corresponding HTTP webhook payload schema.
         * @example {
         *       "event": "event_volume_milestone",
         *       "timestamp": 1743500000000,
         *       "data": {
         *         "event_slug": "test-event-0000000000",
         *         "timeframe": "24h",
         *         "milestone_usd": 500000,
         *         "current_volume_usd": 500250,
         *         "fees": 2500,
         *         "txns": 3200
         *       }
         *     }
         */
        WsAlertEventVolumeMilestoneEvent: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "event_volume_milestone";
            /**
             * Format: int64
             * @description Unix timestamp in milliseconds
             */
            timestamp: number;
            data: components["schemas"]["EventVolumeMilestonePayload"];
        };
        WsAlertPositionVolumeMilestoneSubscribeMessage: {
            /** @enum {string} */
            op: "subscribe";
            /** @enum {string} */
            event: "position_volume_milestone";
        } & components["schemas"]["PositionVolumeMilestoneFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "position_volume_milestone";
        };
        WsAlertPositionVolumeMilestoneUnsubscribeMessage: {
            /** @enum {string} */
            op: "unsubscribe";
            /** @enum {string} */
            event: "position_volume_milestone";
        } & components["schemas"]["PositionVolumeMilestoneFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "position_volume_milestone";
        };
        /**
         * @description Pushed `position_volume_milestone` alert. The `data` payload matches the corresponding HTTP webhook payload schema.
         * @example {
         *       "event": "position_volume_milestone",
         *       "timestamp": 1743500000000,
         *       "data": {
         *         "condition_id": "0x0000000000000000000000000000000000000000000000000000000000000000",
         *         "position_id": "452312848583266388373324160190187140051835877600158453279131187530910662656",
         *         "outcome": "Yes",
         *         "outcome_index": 0,
         *         "timeframe": "24h",
         *         "milestone_usd": 50000,
         *         "current_volume_usd": 50125,
         *         "buy_volume_usd": 30000,
         *         "sell_volume_usd": 20000,
         *         "fees": 250,
         *         "txns": 320,
         *         "buys": 190,
         *         "sells": 130
         *       }
         *     }
         */
        WsAlertPositionVolumeMilestoneEvent: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "position_volume_milestone";
            /**
             * Format: int64
             * @description Unix timestamp in milliseconds
             */
            timestamp: number;
            data: components["schemas"]["PositionVolumeMilestonePayload"];
        };
        WsAlertProbabilitySpikeSubscribeMessage: {
            /** @enum {string} */
            op: "subscribe";
            /** @enum {string} */
            event: "probability_spike";
        } & components["schemas"]["ProbabilitySpikeFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "probability_spike";
        };
        WsAlertProbabilitySpikeUnsubscribeMessage: {
            /** @enum {string} */
            op: "unsubscribe";
            /** @enum {string} */
            event: "probability_spike";
        } & components["schemas"]["ProbabilitySpikeFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "probability_spike";
        };
        /**
         * @description Pushed `probability_spike` alert. The `data` payload matches the corresponding HTTP webhook payload schema.
         * @example {
         *       "event": "probability_spike",
         *       "timestamp": 1743500000000,
         *       "data": {
         *         "position_id": "452312848583266388373324160190187140051835877600158453279131187530910662656",
         *         "condition_id": "0x0000000000000000000000000000000000000000000000000000000000000000",
         *         "question": "Will this test webhook fire correctly?",
         *         "market_slug": "test-market-0000000000",
         *         "event_slug": "test-event-0000000000",
         *         "image_url": "https://polymarket-upload.s3.us-east-2.amazonaws.com/test.png",
         *         "outcome": "Yes",
         *         "outcome_index": 0,
         *         "previous_probability": 0.4,
         *         "current_probability": 0.5,
         *         "spike_direction": "up",
         *         "spike_pct": 25
         *       }
         *     }
         */
        WsAlertProbabilitySpikeEvent: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "probability_spike";
            /**
             * Format: int64
             * @description Unix timestamp in milliseconds
             */
            timestamp: number;
            data: components["schemas"]["ProbabilitySpikePayload"];
        };
        WsAlertPriceSpikeSubscribeMessage: {
            /** @enum {string} */
            op: "subscribe";
            /** @enum {string} */
            event: "price_spike";
        } & components["schemas"]["PriceSpikeFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "price_spike";
        };
        WsAlertPriceSpikeUnsubscribeMessage: {
            /** @enum {string} */
            op: "unsubscribe";
            /** @enum {string} */
            event: "price_spike";
        } & components["schemas"]["PriceSpikeFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "price_spike";
        };
        /**
         * @description Pushed `price_spike` alert. The `data` payload matches the corresponding HTTP webhook payload schema.
         * @example {
         *       "event": "price_spike",
         *       "timestamp": 1743500000000,
         *       "data": {
         *         "position_id": "452312848583266388373324160190187140051835877600158453279131187530910662656",
         *         "condition_id": "0x0000000000000000000000000000000000000000000000000000000000000000",
         *         "question": "Will this test webhook fire correctly?",
         *         "market_slug": "test-market-0000000000",
         *         "event_slug": "test-event-0000000000",
         *         "image_url": "https://polymarket-upload.s3.us-east-2.amazonaws.com/test.png",
         *         "outcome": "Yes",
         *         "outcome_index": 0,
         *         "previous_price": 0.4,
         *         "current_price": 0.5,
         *         "spike_direction": "up",
         *         "spike_pct": 25
         *       }
         *     }
         */
        WsAlertPriceSpikeEvent: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "price_spike";
            /**
             * Format: int64
             * @description Unix timestamp in milliseconds
             */
            timestamp: number;
            data: components["schemas"]["PriceSpikePayload"];
        };
        WsAlertMarketVolumeSpikeSubscribeMessage: {
            /** @enum {string} */
            op: "subscribe";
            /** @enum {string} */
            event: "market_volume_spike";
        } & components["schemas"]["MarketVolumeSpikeFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "market_volume_spike";
        };
        WsAlertMarketVolumeSpikeUnsubscribeMessage: {
            /** @enum {string} */
            op: "unsubscribe";
            /** @enum {string} */
            event: "market_volume_spike";
        } & components["schemas"]["MarketVolumeSpikeFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "market_volume_spike";
        };
        /**
         * @description Pushed `market_volume_spike` alert. The `data` payload matches the corresponding HTTP webhook payload schema.
         * @example {
         *       "event": "market_volume_spike",
         *       "timestamp": 1743500000000,
         *       "data": {
         *         "condition_id": "0x0000000000000000000000000000000000000000000000000000000000000000",
         *         "question": "Will this test webhook fire correctly?",
         *         "market_slug": "test-market-0000000000",
         *         "event_slug": "test-event-0000000000",
         *         "image_url": "https://polymarket-upload.s3.us-east-2.amazonaws.com/test.png",
         *         "timeframe": "1h",
         *         "current_volume_usd": 32000,
         *         "snapshot_volume_usd": 10000,
         *         "delta_volume_usd": 22000,
         *         "spike_pct": 220,
         *         "txns": 480,
         *         "fees": 160
         *       }
         *     }
         */
        WsAlertMarketVolumeSpikeEvent: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "market_volume_spike";
            /**
             * Format: int64
             * @description Unix timestamp in milliseconds
             */
            timestamp: number;
            data: components["schemas"]["MarketVolumeSpikePayload"];
        };
        WsAlertEventVolumeSpikeSubscribeMessage: {
            /** @enum {string} */
            op: "subscribe";
            /** @enum {string} */
            event: "event_volume_spike";
        } & components["schemas"]["EventVolumeSpikeFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "event_volume_spike";
        };
        WsAlertEventVolumeSpikeUnsubscribeMessage: {
            /** @enum {string} */
            op: "unsubscribe";
            /** @enum {string} */
            event: "event_volume_spike";
        } & components["schemas"]["EventVolumeSpikeFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "event_volume_spike";
        };
        /**
         * @description Pushed `event_volume_spike` alert. The `data` payload matches the corresponding HTTP webhook payload schema.
         * @example {
         *       "event": "event_volume_spike",
         *       "timestamp": 1743500000000,
         *       "data": {
         *         "event_slug": "test-event-0000000000",
         *         "event_title": "Test Event",
         *         "image_url": "https://polymarket-upload.s3.us-east-2.amazonaws.com/test.png",
         *         "timeframe": "1h",
         *         "current_volume_usd": 140000,
         *         "snapshot_volume_usd": 50000,
         *         "delta_volume_usd": 90000,
         *         "spike_pct": 180,
         *         "txns": 1100,
         *         "fees": 700
         *       }
         *     }
         */
        WsAlertEventVolumeSpikeEvent: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "event_volume_spike";
            /**
             * Format: int64
             * @description Unix timestamp in milliseconds
             */
            timestamp: number;
            data: components["schemas"]["EventVolumeSpikePayload"];
        };
        WsAlertPositionVolumeSpikeSubscribeMessage: {
            /** @enum {string} */
            op: "subscribe";
            /** @enum {string} */
            event: "position_volume_spike";
        } & components["schemas"]["PositionVolumeSpikeFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "position_volume_spike";
        };
        WsAlertPositionVolumeSpikeUnsubscribeMessage: {
            /** @enum {string} */
            op: "unsubscribe";
            /** @enum {string} */
            event: "position_volume_spike";
        } & components["schemas"]["PositionVolumeSpikeFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "position_volume_spike";
        };
        /**
         * @description Pushed `position_volume_spike` alert. The `data` payload matches the corresponding HTTP webhook payload schema.
         * @example {
         *       "event": "position_volume_spike",
         *       "timestamp": 1743500000000,
         *       "data": {
         *         "position_id": "452312848583266388373324160190187140051835877600158453279131187530910662656",
         *         "condition_id": "0x0000000000000000000000000000000000000000000000000000000000000000",
         *         "question": "Will this test webhook fire correctly?",
         *         "market_slug": "test-market-0000000000",
         *         "event_slug": "test-event-0000000000",
         *         "image_url": "https://polymarket-upload.s3.us-east-2.amazonaws.com/test.png",
         *         "outcome": "Yes",
         *         "outcome_index": 0,
         *         "timeframe": "1h",
         *         "current_volume_usd": 20500,
         *         "snapshot_volume_usd": 5000,
         *         "delta_volume_usd": 15500,
         *         "spike_pct": 310,
         *         "txns": 240,
         *         "fees": 102.5
         *       }
         *     }
         */
        WsAlertPositionVolumeSpikeEvent: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "position_volume_spike";
            /**
             * Format: int64
             * @description Unix timestamp in milliseconds
             */
            timestamp: number;
            data: components["schemas"]["PositionVolumeSpikePayload"];
        };
        WsAlertCloseToBondSubscribeMessage: ({
            /** @enum {string} */
            op: "subscribe";
            /** @enum {string} */
            event: "close_to_bond";
        } & components["schemas"]["CloseToBondFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "close_to_bond";
        }) | unknown | unknown;
        WsAlertCloseToBondUnsubscribeMessage: ({
            /** @enum {string} */
            op: "unsubscribe";
            /** @enum {string} */
            event: "close_to_bond";
        } & components["schemas"]["CloseToBondFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "close_to_bond";
        }) | unknown | unknown;
        /**
         * @description Pushed `close_to_bond` alert. The `data` payload matches the corresponding HTTP webhook payload schema.
         * @example {
         *       "event": "close_to_bond",
         *       "timestamp": 1743500000000,
         *       "data": {
         *         "trader": "0x0000000000000000000000000000000000000000",
         *         "taker": "0x0000000000000000000000000000000000000000",
         *         "position_id": "452312848583266388373324160190187140051835877600158453279131187530910662656",
         *         "condition_id": "0x0000000000000000000000000000000000000000000000000000000000000000",
         *         "outcome": "Yes",
         *         "outcome_index": 0,
         *         "question": "Will this test webhook fire correctly?",
         *         "market_slug": "test-market-0000000000",
         *         "event_slug": "test-event-0000000000",
         *         "trade_id": "00000000-0000-0000-0000-000000000000",
         *         "hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
         *         "block": 0,
         *         "confirmed_at": 1700000000,
         *         "amount_usd": 500,
         *         "shares_amount": 515.46,
         *         "fee": 2.5,
         *         "side": "Buy",
         *         "price": 0.97,
         *         "probability": 0.97,
         *         "bond_side": "high",
         *         "threshold": 0.95
         *       }
         *     }
         */
        WsAlertCloseToBondEvent: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "close_to_bond";
            /**
             * Format: int64
             * @description Unix timestamp in milliseconds
             */
            timestamp: number;
            data: components["schemas"]["CloseToBondPayload"];
        };
        WsAlertMarketCreatedSubscribeMessage: {
            /** @enum {string} */
            op: "subscribe";
            /** @enum {string} */
            event: "market_created";
        } & components["schemas"]["MarketCreatedFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "market_created";
        };
        WsAlertMarketCreatedUnsubscribeMessage: {
            /** @enum {string} */
            op: "unsubscribe";
            /** @enum {string} */
            event: "market_created";
        } & components["schemas"]["MarketCreatedFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "market_created";
        };
        /**
         * @description Pushed `market_created` alert. The `data` payload matches the corresponding HTTP webhook payload schema.
         * @example {
         *       "event": "market_created",
         *       "timestamp": 1743500000000,
         *       "data": {
         *         "condition_id": "0x0000000000000000000000000000000000000000000000000000000000000000",
         *         "market_slug": "test-market-0000000000",
         *         "event_slug": "test-event-0000000000",
         *         "event_id": null,
         *         "event_title": "Test Event 0000",
         *         "series_slug": null,
         *         "outcomes": [
         *           {
         *             "index": 0,
         *             "name": "Yes",
         *             "position_id": "452312848583266388373324160190187140051835877600158453279131187530910662656"
         *           },
         *           {
         *             "index": 1,
         *             "name": "No",
         *             "position_id": "0"
         *           }
         *         ],
         *         "question": "Will this test webhook fire correctly?",
         *         "title": "Test Market 0000",
         *         "description": "A test market for webhook payload verification.",
         *         "category": "Crypto",
         *         "tags": [
         *           "test",
         *           "crypto"
         *         ],
         *         "image_url": null,
         *         "neg_risk": false
         *       }
         *     }
         */
        WsAlertMarketCreatedEvent: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "market_created";
            /**
             * Format: int64
             * @description Unix timestamp in milliseconds
             */
            timestamp: number;
            data: components["schemas"]["MarketCreatedPayload"];
        };
        WsAlertOracleEventsSubscribeMessage: {
            /** @enum {string} */
            op: "subscribe";
            /** @enum {string} */
            event: "oracle_events";
        } & components["schemas"]["OracleEventsFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "oracle_events";
        };
        WsAlertOracleEventsUnsubscribeMessage: {
            /** @enum {string} */
            op: "unsubscribe";
            /** @enum {string} */
            event: "oracle_events";
        } & components["schemas"]["OracleEventsFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "oracle_events";
        };
        /**
         * @description Pushed `oracle_events` alert. The `data` payload matches the corresponding HTTP webhook payload schema.
         * @example {
         *       "event": "oracle_events",
         *       "timestamp": 1743500000000,
         *       "data": {
         *         "event_type": "QuestionResolved",
         *         "id": "0x0000000000000000000000000000000000000000000000000000000000000000",
         *         "hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
         *         "block": 0,
         *         "confirmed_at": 0,
         *         "log_index": 0,
         *         "block_index": 0,
         *         "oracle_contract": "0x0000000000000000000000000000000000000000",
         *         "condition_id": "0x0000000000000000000000000000000000000000000000000000000000000000",
         *         "settled_price": 1000000000000000000,
         *         "proposed_outcome": "Yes"
         *       }
         *     }
         */
        WsAlertOracleEventsEvent: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "oracle_events";
            /**
             * Format: int64
             * @description Unix timestamp in milliseconds
             */
            timestamp: number;
            data: components["schemas"]["OracleEventTyped"];
        };
        WsAlertAssetPriceTickSubscribeMessage: {
            /** @enum {string} */
            op: "subscribe";
            /** @enum {string} */
            event: "asset_price_tick";
        } & components["schemas"]["AssetPriceTickFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "asset_price_tick";
        };
        WsAlertAssetPriceTickUnsubscribeMessage: {
            /** @enum {string} */
            op: "unsubscribe";
            /** @enum {string} */
            event: "asset_price_tick";
        } & components["schemas"]["AssetPriceTickFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "asset_price_tick";
        };
        /**
         * @description Pushed `asset_price_tick` alert. The `data` payload matches the corresponding HTTP webhook payload schema.
         * @example {
         *       "event": "asset_price_tick",
         *       "timestamp": 1743500000000,
         *       "data": {
         *         "symbol": "BTC",
         *         "price": 65000,
         *         "timestamp_ms": 1700000000000
         *       }
         *     }
         */
        WsAlertAssetPriceTickEvent: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "asset_price_tick";
            /**
             * Format: int64
             * @description Unix timestamp in milliseconds
             */
            timestamp: number;
            data: components["schemas"]["AssetPriceTickPayload"];
        };
        WsAlertAssetPriceWindowUpdateSubscribeMessage: {
            /** @enum {string} */
            op: "subscribe";
            /** @enum {string} */
            event: "asset_price_window_update";
        } & components["schemas"]["AssetPriceWindowUpdateFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "asset_price_window_update";
        };
        WsAlertAssetPriceWindowUpdateUnsubscribeMessage: {
            /** @enum {string} */
            op: "unsubscribe";
            /** @enum {string} */
            event: "asset_price_window_update";
        } & components["schemas"]["AssetPriceWindowUpdateFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "asset_price_window_update";
        };
        /**
         * @description Pushed `asset_price_window_update` alert. The `data` payload matches the corresponding HTTP webhook payload schema.
         * @example {
         *       "event": "asset_price_window_update",
         *       "timestamp": 1743500000000,
         *       "data": {
         *         "symbol": "BTC",
         *         "variant": "1h",
         *         "start_time": 1700000000000,
         *         "end_time": 1700003600000,
         *         "open_price": 64800,
         *         "close_price": 65200,
         *         "update_type": "close"
         *       }
         *     }
         */
        WsAlertAssetPriceWindowUpdateEvent: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "asset_price_window_update";
            /**
             * Format: int64
             * @description Unix timestamp in milliseconds
             */
            timestamp: number;
            data: components["schemas"]["AssetPriceWindowUpdatePayload"];
        };
        /** @description Typed subscribe request for the alerts WebSocket. The request shape depends on `event`; filters follow the schema associated with that event type. */
        WsAlertSubscribeMessage: components["schemas"]["WsAlertTraderFirstTradeSubscribeMessage"] | components["schemas"]["WsAlertTraderNewMarketSubscribeMessage"] | components["schemas"]["WsAlertTraderWhaleTradeSubscribeMessage"] | components["schemas"]["WsAlertTraderNewTradeSubscribeMessage"] | components["schemas"]["WsAlertTraderTradeEventSubscribeMessage"] | components["schemas"]["WsAlertTraderGlobalPnlSubscribeMessage"] | components["schemas"]["WsAlertTraderMarketPnlSubscribeMessage"] | components["schemas"]["WsAlertTraderCategoryPnlSubscribeMessage"] | components["schemas"]["WsAlertTraderPositionResolvedSubscribeMessage"] | components["schemas"]["WsAlertTraderPnlExitsSubscribeMessage"] | components["schemas"]["WsAlertPositionHolderMetricsSubscribeMessage"] | components["schemas"]["WsAlertConditionHolderMetricsSubscribeMessage"] | components["schemas"]["WsAlertEventHolderMetricsSubscribeMessage"] | components["schemas"]["WsAlertConditionMetricsSubscribeMessage"] | components["schemas"]["WsAlertEventMetricsSubscribeMessage"] | components["schemas"]["WsAlertTagMetricsSubscribeMessage"] | components["schemas"]["WsAlertPositionMetricsSubscribeMessage"] | components["schemas"]["WsAlertMarketVolumeMilestoneSubscribeMessage"] | components["schemas"]["WsAlertEventVolumeMilestoneSubscribeMessage"] | components["schemas"]["WsAlertPositionVolumeMilestoneSubscribeMessage"] | components["schemas"]["WsAlertProbabilitySpikeSubscribeMessage"] | components["schemas"]["WsAlertPriceSpikeSubscribeMessage"] | components["schemas"]["WsAlertMarketVolumeSpikeSubscribeMessage"] | components["schemas"]["WsAlertEventVolumeSpikeSubscribeMessage"] | components["schemas"]["WsAlertPositionVolumeSpikeSubscribeMessage"] | components["schemas"]["WsAlertCloseToBondSubscribeMessage"] | components["schemas"]["WsAlertMarketCreatedSubscribeMessage"] | components["schemas"]["WsAlertOracleEventsSubscribeMessage"] | components["schemas"]["WsAlertAssetPriceTickSubscribeMessage"] | components["schemas"]["WsAlertAssetPriceWindowUpdateSubscribeMessage"];
        /** @description Typed unsubscribe request for the alerts WebSocket. The request shape depends on `event` and must match the original subscription filters. */
        WsAlertUnsubscribeMessage: components["schemas"]["WsAlertTraderFirstTradeUnsubscribeMessage"] | components["schemas"]["WsAlertTraderNewMarketUnsubscribeMessage"] | components["schemas"]["WsAlertTraderWhaleTradeUnsubscribeMessage"] | components["schemas"]["WsAlertTraderNewTradeUnsubscribeMessage"] | components["schemas"]["WsAlertTraderTradeEventUnsubscribeMessage"] | components["schemas"]["WsAlertTraderGlobalPnlUnsubscribeMessage"] | components["schemas"]["WsAlertTraderMarketPnlUnsubscribeMessage"] | components["schemas"]["WsAlertTraderCategoryPnlUnsubscribeMessage"] | components["schemas"]["WsAlertTraderPositionResolvedUnsubscribeMessage"] | components["schemas"]["WsAlertTraderPnlExitsUnsubscribeMessage"] | components["schemas"]["WsAlertPositionHolderMetricsUnsubscribeMessage"] | components["schemas"]["WsAlertConditionHolderMetricsUnsubscribeMessage"] | components["schemas"]["WsAlertEventHolderMetricsUnsubscribeMessage"] | components["schemas"]["WsAlertConditionMetricsUnsubscribeMessage"] | components["schemas"]["WsAlertEventMetricsUnsubscribeMessage"] | components["schemas"]["WsAlertTagMetricsUnsubscribeMessage"] | components["schemas"]["WsAlertPositionMetricsUnsubscribeMessage"] | components["schemas"]["WsAlertMarketVolumeMilestoneUnsubscribeMessage"] | components["schemas"]["WsAlertEventVolumeMilestoneUnsubscribeMessage"] | components["schemas"]["WsAlertPositionVolumeMilestoneUnsubscribeMessage"] | components["schemas"]["WsAlertProbabilitySpikeUnsubscribeMessage"] | components["schemas"]["WsAlertPriceSpikeUnsubscribeMessage"] | components["schemas"]["WsAlertMarketVolumeSpikeUnsubscribeMessage"] | components["schemas"]["WsAlertEventVolumeSpikeUnsubscribeMessage"] | components["schemas"]["WsAlertPositionVolumeSpikeUnsubscribeMessage"] | components["schemas"]["WsAlertCloseToBondUnsubscribeMessage"] | components["schemas"]["WsAlertMarketCreatedUnsubscribeMessage"] | components["schemas"]["WsAlertOracleEventsUnsubscribeMessage"] | components["schemas"]["WsAlertAssetPriceTickUnsubscribeMessage"] | components["schemas"]["WsAlertAssetPriceWindowUpdateUnsubscribeMessage"];
        /** @description Typed pushed-event envelope for the alerts WebSocket. The `data` payload depends on `event` and matches the corresponding HTTP webhook payload schema. */
        WsAlertEventPayload: components["schemas"]["WsAlertTraderFirstTradeEvent"] | components["schemas"]["WsAlertTraderNewMarketEvent"] | components["schemas"]["WsAlertTraderWhaleTradeEvent"] | components["schemas"]["WsAlertTraderNewTradeEvent"] | components["schemas"]["WsAlertTraderTradeEventEvent"] | components["schemas"]["WsAlertTraderGlobalPnlEvent"] | components["schemas"]["WsAlertTraderMarketPnlEvent"] | components["schemas"]["WsAlertTraderCategoryPnlEvent"] | components["schemas"]["WsAlertTraderPositionResolvedEvent"] | components["schemas"]["WsAlertTraderPnlExitsEvent"] | components["schemas"]["WsAlertPositionHolderMetricsEvent"] | components["schemas"]["WsAlertConditionHolderMetricsEvent"] | components["schemas"]["WsAlertEventHolderMetricsEvent"] | components["schemas"]["WsAlertConditionMetricsEvent"] | components["schemas"]["WsAlertEventMetricsEvent"] | components["schemas"]["WsAlertTagMetricsEvent"] | components["schemas"]["WsAlertPositionMetricsEvent"] | components["schemas"]["WsAlertMarketVolumeMilestoneEvent"] | components["schemas"]["WsAlertEventVolumeMilestoneEvent"] | components["schemas"]["WsAlertPositionVolumeMilestoneEvent"] | components["schemas"]["WsAlertProbabilitySpikeEvent"] | components["schemas"]["WsAlertPriceSpikeEvent"] | components["schemas"]["WsAlertMarketVolumeSpikeEvent"] | components["schemas"]["WsAlertEventVolumeSpikeEvent"] | components["schemas"]["WsAlertPositionVolumeSpikeEvent"] | components["schemas"]["WsAlertCloseToBondEvent"] | components["schemas"]["WsAlertMarketCreatedEvent"] | components["schemas"]["WsAlertOracleEventsEvent"] | components["schemas"]["WsAlertAssetPriceTickEvent"] | components["schemas"]["WsAlertAssetPriceWindowUpdateEvent"];
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;

export interface WsAlertSubscribeMap {
	trader_first_trade: components["schemas"]["WsAlertTraderFirstTradeSubscribeMessage"];
	trader_new_market: components["schemas"]["WsAlertTraderNewMarketSubscribeMessage"];
	trader_whale_trade: components["schemas"]["WsAlertTraderWhaleTradeSubscribeMessage"];
	trader_new_trade: components["schemas"]["WsAlertTraderNewTradeSubscribeMessage"];
	trader_trade_event: components["schemas"]["WsAlertTraderTradeEventSubscribeMessage"];
	trader_global_pnl: components["schemas"]["WsAlertTraderGlobalPnlSubscribeMessage"];
	trader_market_pnl: components["schemas"]["WsAlertTraderMarketPnlSubscribeMessage"];
	trader_category_pnl: components["schemas"]["WsAlertTraderCategoryPnlSubscribeMessage"];
	trader_position_resolved: components["schemas"]["WsAlertTraderPositionResolvedSubscribeMessage"];
	trader_pnl_exits: components["schemas"]["WsAlertTraderPnlExitsSubscribeMessage"];
	position_holder_metrics: components["schemas"]["WsAlertPositionHolderMetricsSubscribeMessage"];
	condition_holder_metrics: components["schemas"]["WsAlertConditionHolderMetricsSubscribeMessage"];
	event_holder_metrics: components["schemas"]["WsAlertEventHolderMetricsSubscribeMessage"];
	condition_metrics: components["schemas"]["WsAlertConditionMetricsSubscribeMessage"];
	event_metrics: components["schemas"]["WsAlertEventMetricsSubscribeMessage"];
	tag_metrics: components["schemas"]["WsAlertTagMetricsSubscribeMessage"];
	position_metrics: components["schemas"]["WsAlertPositionMetricsSubscribeMessage"];
	market_volume_milestone: components["schemas"]["WsAlertMarketVolumeMilestoneSubscribeMessage"];
	event_volume_milestone: components["schemas"]["WsAlertEventVolumeMilestoneSubscribeMessage"];
	position_volume_milestone: components["schemas"]["WsAlertPositionVolumeMilestoneSubscribeMessage"];
	probability_spike: components["schemas"]["WsAlertProbabilitySpikeSubscribeMessage"];
	price_spike: components["schemas"]["WsAlertPriceSpikeSubscribeMessage"];
	market_volume_spike: components["schemas"]["WsAlertMarketVolumeSpikeSubscribeMessage"];
	event_volume_spike: components["schemas"]["WsAlertEventVolumeSpikeSubscribeMessage"];
	position_volume_spike: components["schemas"]["WsAlertPositionVolumeSpikeSubscribeMessage"];
	close_to_bond: components["schemas"]["WsAlertCloseToBondSubscribeMessage"];
	market_created: components["schemas"]["WsAlertMarketCreatedSubscribeMessage"];
	oracle_events: components["schemas"]["WsAlertOracleEventsSubscribeMessage"];
	asset_price_tick: components["schemas"]["WsAlertAssetPriceTickSubscribeMessage"];
	asset_price_window_update: components["schemas"]["WsAlertAssetPriceWindowUpdateSubscribeMessage"];
}

export interface WsAlertEventDataMap {
	trader_first_trade: components["schemas"]["FirstTradePayload"];
	trader_new_market: components["schemas"]["NewMarketPayload"];
	trader_whale_trade: components["schemas"]["WhaleTradePayload"];
	trader_new_trade: components["schemas"]["NewTradePayload"];
	trader_trade_event: components["schemas"]["WebhookTraderTradeEventPayload"];
	trader_global_pnl: components["schemas"]["GlobalPnlPayload"];
	trader_market_pnl: components["schemas"]["MarketPnlPayload"];
	trader_category_pnl: components["schemas"]["CategoryPnlPayload"];
	trader_position_resolved: components["schemas"]["PositionResolvedPayload"];
	trader_pnl_exits: components["schemas"]["ExitMarkersPayload"];
	position_holder_metrics: components["schemas"]["PositionHolderMetricsPayload"];
	condition_holder_metrics: components["schemas"]["ConditionHolderMetricsPayload"];
	event_holder_metrics: components["schemas"]["EventHolderMetricsPayload"];
	condition_metrics: components["schemas"]["ConditionMetricsPayload"];
	event_metrics: components["schemas"]["EventMetricsPayload"];
	tag_metrics: components["schemas"]["TagMetricsPayload"];
	position_metrics: components["schemas"]["PositionMetricsPayload"];
	market_volume_milestone: components["schemas"]["VolumeMilestonePayload"];
	event_volume_milestone: components["schemas"]["EventVolumeMilestonePayload"];
	position_volume_milestone: components["schemas"]["PositionVolumeMilestonePayload"];
	probability_spike: components["schemas"]["ProbabilitySpikePayload"];
	price_spike: components["schemas"]["PriceSpikePayload"];
	market_volume_spike: components["schemas"]["MarketVolumeSpikePayload"];
	event_volume_spike: components["schemas"]["EventVolumeSpikePayload"];
	position_volume_spike: components["schemas"]["PositionVolumeSpikePayload"];
	close_to_bond: components["schemas"]["CloseToBondPayload"];
	market_created: components["schemas"]["MarketCreatedPayload"];
	oracle_events: components["schemas"]["OracleEventTyped"];
	asset_price_tick: components["schemas"]["AssetPriceTickPayload"];
	asset_price_window_update: components["schemas"]["AssetPriceWindowUpdatePayload"];
}

export type WsAlertEventName = keyof WsAlertSubscribeMap;

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
            /**
             * @description Fire-and-delete: when `true`, delete the subscription after its first
             *     successful delivery. Applies to any webhook event.
             */
            one_shot?: boolean | null;
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
            /**
             * @description Fire-and-delete: when `true`, delete the subscription after its first
             *     successful delivery. Applies to any webhook event.
             */
            one_shot?: boolean | null;
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
            /** @description Trader wallet address. */
            trader?: string | null;
            /** @description Category. */
            category?: string | null;
            /** @description Aggregation timeframe: "1d", "7d", "30d", or "lifetime" */
            timeframe: string;
            /**
             * Format: double
             * @description Realized pnl in USD.
             */
            realized_pnl_usd?: number | null;
            /**
             * Format: int64
             * @description Markets in this category.
             */
            markets_in_category?: number | null;
            /**
             * Format: int64
             * @description Markets traded.
             */
            markets_traded?: number | null;
            /**
             * Format: int64
             * @description Number of outcomes traded.
             */
            outcomes_traded?: number | null;
            /**
             * Format: int64
             * @description Total buy count.
             */
            total_buys?: number | null;
            /**
             * Format: int64
             * @description Total sell count.
             */
            total_sells?: number | null;
            /**
             * Format: int64
             * @description Total redemption count.
             */
            total_redemptions?: number | null;
            /**
             * Format: int64
             * @description Total merge count.
             */
            total_merges?: number | null;
            /**
             * Format: int64
             * @description Total split count.
             */
            total_splits?: number | null;
            /**
             * Format: double
             * @description Total volume in USD.
             */
            total_volume_usd?: number | null;
            /**
             * Format: double
             * @description Buy in USD.
             */
            buy_usd?: number | null;
            /**
             * Format: double
             * @description Sell in USD.
             */
            sell_usd?: number | null;
            /**
             * Format: double
             * @description Redemption in USD.
             */
            redemption_usd?: number | null;
            /**
             * Format: double
             * @description Merge in USD.
             */
            merge_usd?: number | null;
            /**
             * Format: double
             * @description Convert collateral in USD.
             */
            convert_collateral_usd?: number | null;
            /**
             * Format: double
             * @description Split volume in USD.
             */
            split_volume_usd?: number | null;
            /**
             * Format: double
             * @description Total fees amount.
             */
            total_fees?: number | null;
            /**
             * Format: double
             * @description Total shares bought.
             */
            total_shares_bought?: number | null;
            /**
             * Format: int64
             * @description Markets won.
             */
            markets_won?: number | null;
            /**
             * Format: int64
             * @description Markets lost.
             */
            markets_lost?: number | null;
            /**
             * Format: double
             * @description Market win rate percent.
             */
            market_win_rate_pct?: number | null;
            /**
             * Format: double
             * @description Average hold time seconds.
             */
            avg_hold_time_seconds?: number | null;
            /**
             * Format: double
             * @description Best trade pnl in USD.
             */
            best_trade_pnl_usd?: number | null;
            /** @description Best trade condition id. */
            best_trade_condition_id?: string | null;
            /**
             * Format: double
             * @description Worst trade pnl in USD.
             */
            worst_trade_pnl_usd?: number | null;
            /** @description Worst trade condition id. */
            worst_trade_condition_id?: string | null;
            /**
             * Format: double
             * @description Total wins in USD.
             */
            total_wins_usd?: number | null;
            /**
             * Format: double
             * @description Total losses in USD.
             */
            total_losses_usd?: number | null;
            /**
             * Format: double
             * @description Average win in USD.
             */
            avg_win_usd?: number | null;
            /**
             * Format: double
             * @description Average loss in USD.
             */
            avg_loss_usd?: number | null;
            /**
             * Format: double
             * @description Profit factor.
             */
            profit_factor?: number | null;
            /**
             * Format: int64
             * @description First trade timestamp.
             */
            first_trade_at?: number | null;
            /**
             * Format: int64
             * @description Last trade timestamp.
             */
            last_trade_at?: number | null;
        };
        /**
         * @description Subscription filters for the `close_to_bond` event. At least one of
         *     `min_price` or `max_price` is required (enforced at runtime).
         */
        CloseToBondFilters: {
            /**
             * @description Fire-and-delete: when `true`, delete the subscription after its first
             *     successful delivery. Applies to any webhook event.
             */
            one_shot?: boolean | null;
            /** @description Restrict to markets carrying any of these tags or category names (case-insensitive). Empty = all. */
            tags?: string[] | null;
            /** @description Restrict to markets in any of these series (by slug, case-insensitive). Empty = all. */
            series_slugs?: string[] | null;
            /**
             * Format: double
             * @description Trigger when the traded position's price is ≥ this value (e.g. 0.95 for a near-certain outcome). At least one of `min_price` or `max_price` must be set.
             */
            min_price?: number | null;
            /**
             * Format: double
             * @description Trigger when the traded position's price is ≤ this value (e.g. 0.05 for a near-zero outcome).
             */
            max_price?: number | null;
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
            /** @description Which bond zone was entered: `"high"` (price ≥ `min_price`) or `"low"` (price ≤ `max_price`) */
            bond_side: string;
            /**
             * Format: double
             * @description The price threshold from the subscriber's filter that was breached
             */
            threshold: number;
        };
        ConditionHolderMetricsFilters: {
            /** @description Market condition IDs to match. */
            condition_ids?: string[];
            /**
             * @description Fire-and-delete: when `true`, delete the subscription after its first
             *     successful delivery. Applies to any webhook event.
             */
            one_shot?: boolean | null;
        };
        ConditionHolderMetricsPayload: {
            /**
             * Format: int32
             * @description Unix timestamp in seconds.
             */
            ts: number;
            /**
             * Format: int64
             * @description Block number.
             */
            block: number;
            /** @description Market condition ID. */
            condition_id: string;
            /**
             * Format: int32
             * @description Number of holders.
             */
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
            /** @description Whether the webhook was deleted. */
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
            /** @description Event slugs to match. */
            event_slugs?: string[];
            /**
             * @description Fire-and-delete: when `true`, delete the subscription after its first
             *     successful delivery. Applies to any webhook event.
             */
            one_shot?: boolean | null;
        };
        EventHolderMetricsPayload: {
            /**
             * Format: int32
             * @description Unix timestamp in seconds.
             */
            ts: number;
            /**
             * Format: int64
             * @description Block number.
             */
            block: number;
            /** @description Event slug. */
            event_slug: string;
            /**
             * Format: int32
             * @description Number of holders.
             */
            holder_count: number;
        };
        /**
         * @description Subscription filters for the `event_liquidity` event.
         *
         *     At least one of `min_liquidity_usd`, `max_liquidity_usd`, or `one_shot` must be set.
         *     Thresholds are edge-triggered: a callback fires when liquidity crosses the threshold,
         *     then re-arms once it crosses back (unless `one_shot`).
         */
        EventLiquidityFilters: {
            /**
             * @description Fire-and-delete: when `true`, delete the subscription after its first
             *     successful delivery.
             */
            one_shot?: boolean | null;
            /**
             * Format: double
             * @description Fire when total liquidity crosses up through this USD value.
             */
            min_liquidity_usd?: number | null;
            /**
             * Format: double
             * @description Fire when total liquidity crosses down through this USD value.
             */
            max_liquidity_usd?: number | null;
            /** @description **Required.** Events to receive liquidity updates for. */
            event_slugs: string[];
        };
        /** @description Event liquidity webhook payload. */
        EventLiquidityPayload: {
            /** @description Event slug. */
            event_slug: string;
            /**
             * Format: double
             * @description Total order-book liquidity in USD at the time of firing.
             */
            liquidity_usd: number;
            /**
             * Format: double
             * @description The threshold (USD) that was crossed.
             */
            threshold_usd: number;
            /**
             * @description `"above"` when liquidity crossed up through `min_liquidity_usd`,
             *     `"below"` when it crossed down through `max_liquidity_usd`.
             */
            direction: string;
            /**
             * Format: int64
             * @description Update timestamp (Unix millis).
             */
            liquidity_updated_at: number;
        };
        /** @description Subscription filters for the `event_metrics` event. All fields are optional. */
        EventMetricsFilters: {
            /**
             * @description Fire-and-delete: when `true`, delete the subscription after its first
             *     successful delivery. Applies to any webhook event.
             */
            one_shot?: boolean | null;
            /** @description Restrict to these events. Empty = all events. */
            event_slugs?: string[] | null;
            /** @description Restrict to these aggregation windows. */
            timeframes?: components["schemas"]["MetricFilterTimeframe"][] | null;
            /**
             * Format: double
             * @description Only fire when aggregated event volume ≥ this value (USD).
             */
            min_volume_usd?: number | null;
            /**
             * Format: double
             * @description Maximum volume USD.
             */
            max_volume_usd?: number | null;
            /**
             * Format: int64
             * @description Minimum transactions.
             */
            min_txns?: number | null;
            /**
             * Format: int64
             * @description Minimum unique traders.
             */
            min_unique_traders?: number | null;
            /**
             * Format: double
             * @description Minimum fees.
             */
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
            /**
             * @description Fire-and-delete: when `true`, delete the subscription after its first
             *     successful delivery. Applies to any webhook event.
             */
            one_shot?: boolean | null;
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
            /** @description Event slug. */
            event_slug: string;
            /** @description Metric timeframe. */
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
             * @description Fire-and-delete: when `true`, delete the subscription after its first
             *     successful delivery. Applies to any webhook event.
             */
            one_shot?: boolean | null;
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
            /** @description Event slug. */
            event_slug: string;
            /** @description Event title. */
            event_title?: string | null;
            /** @description Image URL. */
            image_url?: string | null;
            /** @description Metric timeframe. */
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
            /** @description Trader wallet address. */
            trader: string;
            /** @description Outcome token ID. */
            position_id: string;
            /** @description Market condition ID. */
            condition_id: string;
            /** @description Event slug. */
            event_slug: string;
            /** @description Market slug. */
            market_slug: string;
            /** @description Title. */
            title: string;
            /** @description Market question. */
            question: string;
            /** @description Image URL. */
            image_url: string;
            /** @description Outcome name. */
            outcome: string;
            /**
             * Format: int32
             * @description Outcome index.
             */
            outcome_index?: number | null;
            /**
             * Format: double
             * @description Pnl in USD.
             */
            pnl_usd: number;
            /**
             * Format: double
             * @description Pnl percent.
             */
            pnl_pct: number;
            /**
             * Format: double
             * @description Cost basis in USD.
             */
            cost_basis_usd: number;
            /** @description resolved_win | resolved_loss | sold_win | sold_loss */
            reason: string;
            /**
             * Format: int64
             * @description Block number.
             */
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
            exchange: "CTFExchange" | "NegRiskExchange" | "ConditionalTokens" | "NegRiskAdapter" | "CTFExchangeV2" | "NegRiskExchangeV2" | "ComboExchange" | "ComboCombinatorialModule" | "ComboNegRiskModule" | "Unknown";
            /** @description Trade type (webhook events only fire on order fills) */
            trade_type: "OrderFilled" | "OrdersMatched" | "ComboExecution";
        };
        /** @description Global PnL webhook payload. */
        GlobalPnlPayload: {
            /** @description Trader wallet address. */
            trader?: string | null;
            /** @description Aggregation timeframe: "1d", "7d", "30d", or "lifetime" */
            timeframe: string;
            /**
             * Format: double
             * @description Realized PnL for the timeframe (matches REST `/pnl/global`).
             */
            realized_pnl_usd?: number | null;
            /**
             * Format: int64
             * @description Events traded.
             */
            events_traded?: number | null;
            /**
             * Format: int64
             * @description Markets traded.
             */
            markets_traded?: number | null;
            /**
             * Format: int64
             * @description Total buy count.
             */
            total_buys?: number | null;
            /**
             * Format: int64
             * @description Total sell count.
             */
            total_sells?: number | null;
            /**
             * Format: int64
             * @description Total redemption count.
             */
            total_redemptions?: number | null;
            /**
             * Format: int64
             * @description Total merge count.
             */
            total_merges?: number | null;
            /**
             * Format: int64
             * @description Total split count.
             */
            total_splits?: number | null;
            /**
             * Format: double
             * @description Total volume in USD.
             */
            total_volume_usd?: number | null;
            /**
             * Format: double
             * @description Buy volume in USD.
             */
            buy_volume_usd?: number | null;
            /**
             * Format: double
             * @description Sell volume in USD.
             */
            sell_volume_usd?: number | null;
            /**
             * Format: double
             * @description Redemption volume in USD.
             */
            redemption_volume_usd?: number | null;
            /**
             * Format: double
             * @description Merge volume in USD.
             */
            merge_volume_usd?: number | null;
            /**
             * Format: double
             * @description Convert collateral in USD.
             */
            convert_collateral_usd?: number | null;
            /**
             * Format: double
             * @description Split volume in USD.
             */
            split_volume_usd?: number | null;
            /**
             * Format: int64
             * @description Maker rebate count.
             */
            maker_rebate_count?: number | null;
            /**
             * Format: double
             * @description Maker rebate in USD.
             */
            maker_rebate_usd?: number | null;
            /**
             * Format: int64
             * @description Reward count.
             */
            reward_count?: number | null;
            /**
             * Format: double
             * @description Reward in USD.
             */
            reward_usd?: number | null;
            /**
             * Format: int64
             * @description Yield count.
             */
            yield_count?: number | null;
            /**
             * Format: double
             * @description Yield in USD.
             */
            yield_usd?: number | null;
            /**
             * Format: int64
             * @description Total credit count.
             */
            total_credit_count?: number | null;
            /**
             * Format: double
             * @description Total credit in USD.
             */
            total_credit_usd?: number | null;
            /**
             * Format: int64
             * @description Markets won.
             */
            markets_won?: number | null;
            /**
             * Format: int64
             * @description Markets lost.
             */
            markets_lost?: number | null;
            /**
             * Format: double
             * @description Market win rate percent.
             */
            market_win_rate_pct?: number | null;
            /**
             * Format: double
             * @description Total wins in USD.
             */
            total_wins_usd?: number | null;
            /**
             * Format: double
             * @description Total losses in USD.
             */
            total_losses_usd?: number | null;
            /**
             * Format: double
             * @description Average win in USD.
             */
            avg_win_usd?: number | null;
            /**
             * Format: double
             * @description Average loss in USD.
             */
            avg_loss_usd?: number | null;
            /**
             * Format: double
             * @description Profit factor.
             */
            profit_factor?: number | null;
            /**
             * Format: double
             * @description Average hold time seconds.
             */
            avg_hold_time_seconds?: number | null;
            /**
             * Format: double
             * @description Total fees amount.
             */
            total_fees?: number | null;
            /**
             * Format: double
             * @description Best trade pnl in USD.
             */
            best_trade_pnl_usd?: number | null;
            /** @description Best trade condition id. */
            best_trade_condition_id?: string | null;
            /**
             * Format: double
             * @description Worst trade pnl in USD.
             */
            worst_trade_pnl_usd?: number | null;
            /** @description Worst trade condition id. */
            worst_trade_condition_id?: string | null;
            /**
             * Format: int64
             * @description First trade timestamp.
             */
            first_trade_at?: number | null;
            /**
             * Format: int64
             * @description Last trade timestamp.
             */
            last_trade_at?: number | null;
        };
        /** @description Response for GET /v1/webhook/events */
        ListEventsResponse: {
            /** @description Supported webhook events. */
            events: components["schemas"]["WebhookEventInfo"][];
        };
        /** @description Subscription filters for the `market_created` event. All fields are optional. */
        MarketCreatedFilters: {
            /**
             * @description Fire-and-delete: when `true`, delete the subscription after its first
             *     successful delivery. Applies to any webhook event.
             */
            one_shot?: boolean | null;
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
        /** @description Subscription filters for the `market_disputed` event. All fields are optional. */
        MarketDisputedFilters: {
            /**
             * @description Fire-and-delete: when `true`, delete the subscription after its first
             *     successful delivery. Applies to any webhook event.
             */
            one_shot?: boolean | null;
            /** @description Restrict to these markets. */
            condition_ids?: string[] | null;
            /** @description Restrict to markets in these events. */
            event_slugs?: string[] | null;
            /** @description When `true`, suppress webhooks for short-term "updown" markets. Default: `false`. */
            exclude_shortterm_markets?: boolean | null;
        };
        /** @description Market-disputed webhook payload */
        MarketDisputedPayload: {
            /** @description Condition ID (the contested market), when resolvable */
            condition_id?: string | null;
            /** @description Which oracle event produced this dispute: `"dispute_price"` or `"assertion_disputed"`. */
            dispute_kind: string;
            /** @description Address that filed the dispute */
            disputer: string;
            /** @description Address that made the disputed proposal/assertion, when known */
            proposer?: string | null;
            /** @description The proposed outcome that was disputed, when known (e.g. "Yes", "No") */
            proposed_outcome?: string | null;
            /**
             * Format: double
             * @description The proposed price (0.0–1.0) that was disputed (`DisputePrice` only)
             */
            proposed_price?: number | null;
            /** @description Market question */
            question?: string | null;
            /** @description Market slug */
            market_slug?: string | null;
            /** @description Event slug */
            event_slug?: string | null;
            /** @description Market image URL */
            image_url?: string | null;
            /** @description Transaction hash of the dispute event */
            hash: string;
            /**
             * Format: int64
             * @description Block number
             */
            block?: number | null;
            /**
             * Format: int64
             * @description Confirmed timestamp (Unix seconds)
             */
            confirmed_at?: number | null;
        };
        /**
         * @description Subscription filters for the `market_liquidity` event.
         *
         *     At least one of `min_liquidity_usd`, `max_liquidity_usd`, or `one_shot` must be set.
         *     Thresholds are edge-triggered: a callback fires when liquidity crosses the threshold,
         *     then re-arms once it crosses back (unless `one_shot`).
         */
        MarketLiquidityFilters: {
            /**
             * @description Fire-and-delete: when `true`, delete the subscription after its first
             *     successful delivery.
             */
            one_shot?: boolean | null;
            /**
             * Format: double
             * @description Fire when total liquidity crosses up through this USD value.
             */
            min_liquidity_usd?: number | null;
            /**
             * Format: double
             * @description Fire when total liquidity crosses down through this USD value.
             */
            max_liquidity_usd?: number | null;
            /** @description **Required.** Markets to receive liquidity updates for. */
            condition_ids: string[];
        };
        /** @description Market liquidity webhook payload. */
        MarketLiquidityPayload: {
            /** @description Market condition ID. */
            condition_id: string;
            /**
             * Format: double
             * @description Total order-book liquidity in USD at the time of firing.
             */
            liquidity_usd: number;
            /**
             * Format: double
             * @description The threshold (USD) that was crossed.
             */
            threshold_usd: number;
            /**
             * @description `"above"` when liquidity crossed up through `min_liquidity_usd`,
             *     `"below"` when it crossed down through `max_liquidity_usd`.
             */
            direction: string;
            /**
             * Format: int64
             * @description Update timestamp (Unix millis).
             */
            liquidity_updated_at: number;
        };
        /** @description Subscription filters for the `condition_metrics` event. All fields are optional. */
        MarketMetricsFilters: {
            /**
             * @description Fire-and-delete: when `true`, delete the subscription after its first
             *     successful delivery. Applies to any webhook event.
             */
            one_shot?: boolean | null;
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
            /** @description Trader wallet address. */
            trader?: string | null;
            /** @description Market condition ID. */
            condition_id?: string | null;
            /** @description Event slug. */
            event_slug?: string | null;
            /** @description Category. */
            category?: string | null;
            /** @description Aggregation timeframe: "1d", "7d", "30d", or "lifetime" */
            timeframe: string;
            /**
             * Format: double
             * @description Realized pnl in USD.
             */
            realized_pnl_usd?: number | null;
            /**
             * Format: double
             * @description Current shares balance.
             */
            current_shares_balance?: number | null;
            /**
             * Format: int64
             * @description Number of outcomes traded.
             */
            outcomes_traded?: number | null;
            /**
             * Format: int64
             * @description Total buy count.
             */
            total_buys?: number | null;
            /**
             * Format: int64
             * @description Total sell count.
             */
            total_sells?: number | null;
            /**
             * Format: int64
             * @description Total redemption count.
             */
            total_redemptions?: number | null;
            /**
             * Format: int64
             * @description Total merge count.
             */
            total_merges?: number | null;
            /**
             * Format: int64
             * @description Total split count.
             */
            total_splits?: number | null;
            /**
             * Format: double
             * @description Buy in USD.
             */
            buy_usd?: number | null;
            /**
             * Format: double
             * @description Sell in USD.
             */
            sell_usd?: number | null;
            /**
             * Format: double
             * @description Redemption in USD.
             */
            redemption_usd?: number | null;
            /**
             * Format: double
             * @description Merge in USD.
             */
            merge_usd?: number | null;
            /**
             * Format: double
             * @description Convert collateral in USD.
             */
            convert_collateral_usd?: number | null;
            /**
             * Format: double
             * @description Split volume in USD.
             */
            split_volume_usd?: number | null;
            /**
             * Format: double
             * @description Total fees amount.
             */
            total_fees?: number | null;
            /**
             * Format: double
             * @description Total shares bought.
             */
            total_shares_bought?: number | null;
            /**
             * Format: int64
             * @description First trade timestamp.
             */
            first_trade_at?: number | null;
            /**
             * Format: int64
             * @description Last trade timestamp.
             */
            last_trade_at?: number | null;
        };
        /** @description Subscription filters for the `market_resolved` event. All fields are optional. */
        MarketResolvedFilters: {
            /**
             * @description Fire-and-delete: when `true`, delete the subscription after its first
             *     successful delivery. Applies to any webhook event.
             */
            one_shot?: boolean | null;
            /** @description Restrict to these markets. */
            condition_ids?: string[] | null;
            /** @description Restrict to markets in these events. */
            event_slugs?: string[] | null;
            /** @description Only fire when the winning outcome matches one of these (e.g. \["Yes"\]). */
            outcomes?: string[] | null;
            /** @description When `true`, suppress webhooks for short-term "updown" markets. Default: `false`. */
            exclude_shortterm_markets?: boolean | null;
        };
        /** @description Market-resolved webhook payload */
        MarketResolvedPayload: {
            /** @description Condition ID (the resolved market) */
            condition_id: string;
            /** @description Winning outcome name when known (e.g. "Yes", "No") */
            winning_outcome?: string | null;
            /**
             * Format: double
             * @description Settled price (0.0–1.0) when the resolution event carries one
             *     (`QuestionResolved` only). 1.0 = full YES, 0.0 = full NO, 0.5 = split.
             */
            settled_price?: number | null;
            /**
             * @description Which oracle event produced this resolution: `"question_resolved"`,
             *     `"question_emergency_resolved"`, `"condition_resolution"`, or `"neg_risk_outcome_reported"`.
             */
            resolution_kind: string;
            /** @description Market question */
            question?: string | null;
            /** @description Market slug */
            market_slug?: string | null;
            /** @description Event slug */
            event_slug?: string | null;
            /** @description Market image URL */
            image_url?: string | null;
            /** @description Transaction hash of the resolution event */
            hash: string;
            /**
             * Format: int64
             * @description Block number
             */
            block?: number | null;
            /**
             * Format: int64
             * @description Confirmed timestamp (Unix seconds)
             */
            confirmed_at?: number | null;
        };
        /** @description Subscription filters for the `market_volume_milestone` event. */
        MarketVolumeMilestoneFilters: {
            /**
             * @description Fire-and-delete: when `true`, delete the subscription after its first
             *     successful delivery. Applies to any webhook event.
             */
            one_shot?: boolean | null;
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
             * @description Fire-and-delete: when `true`, delete the subscription after its first
             *     successful delivery. Applies to any webhook event.
             */
            one_shot?: boolean | null;
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
            /** @description Market condition ID. */
            condition_id: string;
            /** @description Market question. */
            question?: string | null;
            /** @description Market slug. */
            market_slug?: string | null;
            /** @description Event slug. */
            event_slug?: string | null;
            /** @description Image URL. */
            image_url?: string | null;
            /** @description Metric timeframe. */
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
            exchange: "CTFExchange" | "NegRiskExchange" | "ConditionalTokens" | "NegRiskAdapter" | "CTFExchangeV2" | "NegRiskExchangeV2" | "ComboExchange" | "ComboCombinatorialModule" | "ComboNegRiskModule" | "Unknown";
            /** @description Trade type (webhook events only fire on order fills) */
            trade_type: "OrderFilled" | "OrdersMatched" | "ComboExecution";
        };
        /**
         * @description Trade types accepted by `trader_new_trade.trade_types`. Webhook fires on
         *     fill-style trades only.
         * @enum {string}
         */
        NewTradeFilterType: "OrderFilled" | "OrdersMatched" | "ComboExecution";
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
            exchange: "CTFExchange" | "NegRiskExchange" | "ConditionalTokens" | "NegRiskAdapter" | "CTFExchangeV2" | "NegRiskExchangeV2" | "ComboExchange" | "ComboCombinatorialModule" | "ComboNegRiskModule" | "Unknown";
            /** @description Trade type (webhook events only fire on order fills) */
            trade_type: "OrderFilled" | "OrdersMatched" | "ComboExecution";
            /**
             * @description CLOB V2 builder code (lower-cased `0x...` bytes32 hex). Absent on V1
             *     trades; may be `0x0000…` for V2 trades placed without a builder code.
             *     CLOB builder code.
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
            /**
             * @description Fire-and-delete: when `true`, delete the subscription after its first
             *     successful delivery. Applies to any webhook event.
             */
            one_shot?: boolean | null;
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
        PolymarketWebhookEvent: "trader_first_trade" | "trader_new_market" | "trader_whale_trade" | "trader_new_trade" | "trader_trade_event" | "trader_global_pnl" | "trader_market_pnl" | "trader_category_pnl" | "trader_position_resolved" | "trader_exit_markers" | "position_holder_metrics" | "condition_holder_metrics" | "event_holder_metrics" | "condition_metrics" | "event_metrics" | "tag_metrics" | "position_metrics" | "position_liquidity" | "market_liquidity" | "event_liquidity" | "market_volume_milestone" | "event_volume_milestone" | "position_volume_milestone" | "market_volume_spike" | "event_volume_spike" | "position_volume_spike" | "close_to_bond" | "market_created" | "asset_price_tick" | "asset_price_window_update" | "price_spike" | "probability_spike" | "oracle_events" | "price_threshold" | "market_resolved" | "market_disputed";
        /**
         * @description Polymarket-specific webhook filters
         *
         *     Different webhook handlers use different subsets of these fields.
         *     The trade-driven events `price_spike` and
         *     `close_to_bond` additionally accept `tags` (matches a market's tags OR its
         *     category) and `series_slugs` (matches the market's parent series); these are
         *     resolved from the tags/series the crawler enriches onto each trade.
         *     - first_trade: wallet_addresses, min_usd_value, min_price, max_price, condition_ids, event_slugs, tags
         *     - new_market: wallet_addresses, condition_ids, event_slugs, min_usd_value, min_price, max_price
         *     - whale_trade: min_usd_value (required), min_price, max_price, condition_ids, event_slugs
         *     - global_pnl: traders, min_realized_pnl_usd, max_realized_pnl_usd, min_volume_usd, min_win_rate, min_markets_traded
         *     - market_pnl: traders, min_realized_pnl_usd, max_realized_pnl_usd, min_buy_usd, condition_ids, event_slugs
         *     - event_pnl: traders, min_realized_pnl_usd, max_realized_pnl_usd, min_volume_usd, event_slugs, min_markets_traded
         *     - condition_metrics: condition_ids, min_volume_usd, max_volume_usd, min_fees, min_txns, timeframes
         *     - event_metrics: event_slugs, min_volume_usd, max_volume_usd, min_fees, min_txns, timeframes
         *     - tag_metrics: tags, min_volume_usd, max_volume_usd, min_fees, min_txns, timeframes
         *     - position_metrics: position_ids, condition_ids, outcomes, min_volume_usd, max_volume_usd, min_buy_usd, min_sell_volume_usd, min_fees, min_txns, min_price_change_pct, min_probability_change_pct, timeframes
         *     - volume_milestone: condition_ids, timeframes, milestone_amounts
         *     - close_to_bond: min_price (high zone threshold), max_price (low zone threshold), condition_ids, tags, series_slugs, position_ids, outcomes, position_outcome_indices, event_slugs, exclude_shortterm_markets
         *     - market_created: event_slugs, tags, exclude_shortterm_markets
         *     - price_spike: condition_ids, event_slugs, tags, series_slugs, outcomes, min_price_change_pct, spike_direction, window_secs, exclude_shortterm_markets
         *     - trader_new_trade: wallet_addresses, min_usd_value, min_price, max_price, condition_ids, event_slugs, trade_types, exclude_shortterm_markets
         *     - trader_trade_event: wallet_addresses, min_usd_value, min_price, max_price, condition_ids, event_slugs, trade_types, exclude_shortterm_markets
         *     - trader_first_trade: wallet_addresses, min_usd_value, min_price, max_price, exclude_shortterm_markets
         *     - trader_new_market: wallet_addresses, condition_ids, event_slugs, min_usd_value, min_price, max_price, exclude_shortterm_markets
         *     - trader_whale_trade: min_usd_value (required), min_price, max_price, condition_ids, event_slugs, exclude_shortterm_markets
         *     - trader_event_pnl: traders, min_realized_pnl_usd, max_realized_pnl_usd, min_volume_usd, event_slugs, min_markets_traded, exclude_shortterm_markets
         *     - trader_market_pnl: traders, min_realized_pnl_usd, max_realized_pnl_usd, min_buy_usd, condition_ids, event_slugs, exclude_shortterm_markets
         *
         *     Implements Hash + Eq manually (f64 fields use bit representation)
         */
        PolymarketWebhookFilter: {
            /**
             * @description Filter by wallet addresses (for first_trade, normalized to lowercase). Max 500 entries.
             *     Wallet addresses to match.
             */
            wallet_addresses?: string[];
            /**
             * @description Filter by trader addresses (for PnL webhooks, normalized to lowercase). Max 500 entries.
             *     Trader wallet addresses to match.
             */
            traders?: string[];
            /**
             * @description Filter by market/condition IDs. Max 500 entries.
             *     Market condition IDs to match.
             */
            condition_ids?: string[];
            /**
             * Format: double
             * @description Filter by minimum USD value (for trades)
             */
            min_usd_value?: number | null;
            /**
             * @description Filter by event slugs. Max 500 entries.
             *     Event slugs to match.
             */
            event_slugs?: string[];
            /**
             * @description Filter by tags or category names (case-insensitive). Matches a market's
             *     tags or its category label. Max 500 entries.
             *     Tags to match.
             */
            tags?: string[];
            /**
             * @description Filter by series slugs (case-insensitive). Matches a market's parent
             *     series. Max 500 entries.
             *     Series slugs to match.
             */
            series_slugs?: string[];
            /**
             * Format: double
             * @description Minimum trade price threshold (0.0 - 1.0). Accepts the legacy `min_probability` key.
             */
            min_price?: number | null;
            /**
             * Format: double
             * @description Maximum trade price threshold (0.0 - 1.0). Accepts the legacy `max_probability` key.
             */
            max_price?: number | null;
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
             * @description Minimum order-book liquidity (USD) - for liquidity webhooks.
             *     Fires when liquidity crosses up through this value.
             */
            min_liquidity_usd?: number | null;
            /**
             * Format: double
             * @description Maximum order-book liquidity (USD) - for liquidity webhooks.
             *     Fires when liquidity crosses down through this value.
             */
            max_liquidity_usd?: number | null;
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
            /**
             * @description Filter by position IDs - for position PnL webhooks. Max 500 entries.
             *     Outcome token IDs to match.
             */
            position_ids?: string[];
            /**
             * @description Filter by outcomes (e.g., "Yes", "No") - for position PnL webhooks. Max 500 entries.
             *     Outcome names to match.
             */
            outcomes?: string[];
            /**
             * @description Filter by position outcome index — for close_to_bond. Position 0 usually represents Yes/Up, 1 = No.
             *     When non-empty, only trades whose outcome_index is in this list will match. Max 500 entries.
             *     Outcome indices to match.
             */
            position_outcome_indices?: number[];
            /**
             * @description Filter by trade type (e.g. "OrderFilled", "Redemption", "Merge", "Split"). Empty = default behavior per handler.
             *     Trade types to match.
             */
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
            /**
             * @description Timeframes to track - for metrics webhooks (1m, 5m, 30m, 1h, 6h, 24h, 7d, 30d).
             *     Metric timeframes to match.
             */
            timeframes?: components["schemas"]["WebhookTimeframe"][];
            /**
             * @description Milestone amounts to track - for volume milestone webhooks (e.g., 10000, 100000, 1000000). Max 500 entries.
             *     Milestone amounts to match.
             */
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
             *     Supported by: close_to_bond, market_created, price_spike,
             *     trader_first_trade, trader_new_market, trader_whale_trade, trader_event_pnl, trader_market_pnl,
             *     event_metrics, event_volume_milestone, event_volume_spike.
             */
            exclude_shortterm_markets?: boolean;
            /**
             * @description Filter by crypto asset symbol — for `asset_price_tick` and `asset_price_window_update` webhooks.
             *     Valid values: "BTC", "ETH", "SOL", "XRP", "DOGE", "BNB", "HYPE". Empty = all assets.
             *     Asset symbols to match.
             */
            asset_symbols?: components["schemas"]["WebhookAssetSymbol"][];
            spike_direction?: null | components["schemas"]["SpikeDirection"];
            /**
             * Format: int64
             * @description Observation window in seconds for `price_spike`.
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
             *     Oracle event types to match.
             */
            oracle_event_types?: string[];
            /**
             * @description Fire-and-delete: when `true`, the subscription is deleted after its first
             *     successful delivery. Works on any webhook event. (`price_threshold`
             *     additionally requires `position_ids` or `condition_ids`.)
             */
            one_shot?: boolean;
            /**
             * @description For `price_threshold` — when `true`, fire immediately if the first observed
             *     price is already past the target (no prior baseline). Default `false`.
             */
            fire_if_already_past?: boolean;
        };
        PositionHolderMetricsFilters: {
            /** @description Outcome token IDs to match. */
            position_ids?: string[];
            /**
             * @description Fire-and-delete: when `true`, delete the subscription after its first
             *     successful delivery. Applies to any webhook event.
             */
            one_shot?: boolean | null;
        };
        PositionHolderMetricsPayload: {
            /**
             * Format: int32
             * @description Unix timestamp in seconds.
             */
            ts: number;
            /**
             * Format: int64
             * @description Block number.
             */
            block: number;
            /** @description Outcome token ID. */
            position_id: string;
            /**
             * Format: int32
             * @description Number of holders.
             */
            holder_count: number;
            /**
             * Format: double
             * @description Total shares held.
             */
            total_balance: number;
            /**
             * Format: double
             * @description Total holder cost basis in USD.
             */
            total_cost_basis: number;
            /**
             * Format: int32
             * @description Number of market-level holders.
             */
            condition_holder_count?: number | null;
            /**
             * Format: int32
             * @description Number of event-level holders.
             */
            event_holder_count?: number | null;
        };
        /**
         * @description Subscription filters for the `position_liquidity` event.
         *
         *     At least one of `min_liquidity_usd`, `max_liquidity_usd`, or `one_shot` must be set.
         *     Thresholds are edge-triggered: a callback fires when liquidity crosses the threshold,
         *     then re-arms once it crosses back (unless `one_shot`).
         */
        PositionLiquidityFilters: {
            /**
             * @description Fire-and-delete: when `true`, delete the subscription after its first
             *     successful delivery.
             */
            one_shot?: boolean | null;
            /**
             * Format: double
             * @description Fire when liquidity crosses up through this USD value.
             */
            min_liquidity_usd?: number | null;
            /**
             * Format: double
             * @description Fire when liquidity crosses down through this USD value.
             */
            max_liquidity_usd?: number | null;
            /** @description **Required.** Outcome token IDs to receive liquidity updates for. */
            position_ids: string[];
        };
        /** @description Position liquidity webhook payload. */
        PositionLiquidityPayload: {
            /** @description Outcome token (position) ID. */
            position_id: string;
            /**
             * Format: double
             * @description Order-book liquidity in USD at the time of firing.
             */
            liquidity_usd: number;
            /**
             * Format: double
             * @description The threshold (USD) that was crossed.
             */
            threshold_usd: number;
            /**
             * @description `"above"` when liquidity crossed up through `min_liquidity_usd`,
             *     `"below"` when it crossed down through `max_liquidity_usd`.
             */
            direction: string;
            /**
             * Format: int64
             * @description Update timestamp (Unix millis).
             */
            liquidity_updated_at: number;
        };
        /** @description Subscription filters for the `position_metrics` event. All fields are optional. */
        PositionMetricsFilters: {
            /**
             * @description Fire-and-delete: when `true`, delete the subscription after its first
             *     successful delivery. Applies to any webhook event.
             */
            one_shot?: boolean | null;
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
            /**
             * Format: double
             * @description Maximum volume USD.
             */
            max_volume_usd?: number | null;
            /**
             * Format: double
             * @description Minimum buy USD.
             */
            min_buy_usd?: number | null;
            /**
             * Format: double
             * @description Minimum sell volume USD.
             */
            min_sell_volume_usd?: number | null;
            /**
             * Format: int64
             * @description Minimum transactions.
             */
            min_txns?: number | null;
            /**
             * Format: int64
             * @description Minimum unique traders.
             */
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
            /**
             * Format: double
             * @description Minimum fees.
             */
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
            /**
             * Format: int64
             * @description Transaction count.
             */
            txns?: number | null;
            /**
             * Format: int64
             * @description Buy count.
             */
            buys?: number | null;
            /**
             * Format: int64
             * @description Sell count.
             */
            sells?: number | null;
            /**
             * Format: int64
             * @description Builder-attributed transaction count.
             */
            builder_txns?: number | null;
            /**
             * Format: int64
             * @description Builder-attributed buy count.
             */
            builder_buys?: number | null;
            /**
             * Format: int64
             * @description Builder-attributed sell count.
             */
            builder_sells?: number | null;
            /**
             * Format: int64
             * @description Unique traders.
             */
            unique_traders?: number | null;
            /**
             * Format: int64
             * @description Unique makers.
             */
            unique_makers?: number | null;
            /**
             * Format: int64
             * @description Unique takers.
             */
            unique_takers?: number | null;
            /**
             * Format: int64
             * @description Unique builder traders.
             */
            unique_builder_traders?: number | null;
            /**
             * Format: double
             * @description Opening price.
             */
            price_open?: number | null;
            /**
             * Format: double
             * @description Closing price.
             */
            price_close?: number | null;
            /**
             * Format: double
             * @description Highest price.
             */
            price_high?: number | null;
            /**
             * Format: double
             * @description Lowest price.
             */
            price_low?: number | null;
            /**
             * Format: double
             * @description Opening implied probability.
             */
            probability_open?: number | null;
            /**
             * Format: double
             * @description Closing implied probability.
             */
            probability_close?: number | null;
            /**
             * Format: double
             * @description Highest implied probability.
             */
            probability_high?: number | null;
            /**
             * Format: double
             * @description Lowest implied probability.
             */
            probability_low?: number | null;
            /**
             * Format: double
             * @description Average shares per trade.
             */
            avg_trade_shares?: number | null;
            /**
             * Format: double
             * @description Average shares per buy.
             */
            avg_buy_shares?: number | null;
            /**
             * Format: double
             * @description Average shares per sell.
             */
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
            /**
             * @description Fire-and-delete: when `true`, delete the subscription after its first
             *     successful delivery. Applies to any webhook event.
             */
            one_shot?: boolean | null;
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
            /** @description Market condition ID. */
            condition_id?: string | null;
            /** @description Outcome token ID. */
            position_id: string;
            /** @description Outcome name. */
            outcome?: string | null;
            /**
             * Format: int32
             * @description Outcome index.
             */
            outcome_index?: number | null;
            /** @description Metric timeframe. */
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
             * @description Fire-and-delete: when `true`, delete the subscription after its first
             *     successful delivery. Applies to any webhook event.
             */
            one_shot?: boolean | null;
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
            /** @description Outcome token ID. */
            position_id: string;
            /** @description Market condition ID. */
            condition_id: string;
            /** @description Market question. */
            question?: string | null;
            /** @description Market slug. */
            market_slug?: string | null;
            /** @description Event slug. */
            event_slug?: string | null;
            /** @description Image URL. */
            image_url?: string | null;
            /** @description Outcome name. */
            outcome?: string | null;
            /**
             * Format: int32
             * @description Outcome index.
             */
            outcome_index?: number | null;
            /** @description Metric timeframe. */
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
            /**
             * @description Fire-and-delete: when `true`, delete the subscription after its first
             *     successful delivery. Applies to any webhook event.
             */
            one_shot?: boolean | null;
            /** @description Restrict to specific outcome token IDs. Empty = all positions. */
            position_ids?: string[] | null;
            /** @description Restrict to specific market condition IDs. Empty = all markets. */
            condition_ids?: string[] | null;
            /** @description Restrict to specific events. Empty = all events. */
            event_slugs?: string[] | null;
            /** @description Restrict to these outcome names (e.g. \["Yes", "No"\]). */
            outcomes?: string[] | null;
            /** @description Restrict to markets carrying any of these tags or category names (case-insensitive). Empty = all. */
            tags?: string[] | null;
            /** @description Restrict to markets in any of these series (by slug, case-insensitive). Empty = all. */
            series_slugs?: string[] | null;
            /**
             * Format: double
             * @description Minimum price percentage move to trigger (e.g. `10` for a 10% move).
             */
            min_price_change_pct?: number | null;
            /**
             * Format: double
             * @description Minimum YES probability (0-1).
             */
            min_price?: number | null;
            /**
             * Format: double
             * @description Maximum YES probability (0-1).
             */
            max_price?: number | null;
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
            /** @description Outcome token ID. */
            position_id: string;
            /** @description Market condition ID. */
            condition_id?: string | null;
            /** @description Market question. */
            question?: string | null;
            /** @description Market slug. */
            market_slug?: string | null;
            /** @description Event slug. */
            event_slug?: string | null;
            /** @description Image URL. */
            image_url?: string | null;
            /** @description Outcome name. */
            outcome?: string | null;
            /**
             * Format: int32
             * @description Outcome index.
             */
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
        /** @description Subscription filters for the `price_threshold` event. */
        PriceThresholdFilters: {
            /** @description Restrict to markets carrying any of these tags or category names (case-insensitive). Empty = all. */
            tags?: string[] | null;
            /** @description Restrict to markets in any of these series (by slug, case-insensitive). Empty = all. */
            series_slugs?: string[] | null;
            /**
             * Format: double
             * @description Upward target — fire when the YES price crosses up to ≥ this value (e.g. 0.75 for 75%). At least one of `min_price` or `max_price` must be set.
             */
            min_price?: number | null;
            /**
             * Format: double
             * @description Downward target — fire when the YES price crosses down to ≤ this value (e.g. 0.25).
             */
            max_price?: number | null;
            /** @description When `true`, delete the subscription after its first delivery (fire-and-delete). Requires `position_ids` or `condition_ids`. Default: `false`. */
            one_shot?: boolean | null;
            /** @description When `true`, fire immediately if the first observed price is already past the target (no prior baseline). Default: `false` (wait for an actual crossing). */
            fire_if_already_past?: boolean | null;
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
        /** @description Price-threshold crossing webhook payload */
        PriceThresholdPayload: {
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
             * @description Last observed price before this trade (the baseline the crossing is measured from)
             */
            previous_price: number;
            /**
             * Format: double
             * @description Price per share (0.0–1.0) that crossed the threshold
             */
            price: number;
            /**
             * Format: double
             * @description Implied probability of the outcome (0.0–1.0)
             */
            probability?: number | null;
            /**
             * @description Crossing direction: `"up"` (crossed up to the `min_price` target) or
             *     `"down"` (crossed down to the `max_price` target)
             */
            direction: string;
            /**
             * Format: double
             * @description The target threshold from the subscriber's filter that was crossed
             */
            threshold: number;
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
            /**
             * @description Fire-and-delete: when `true`, delete the subscription after its first
             *     successful delivery. Applies to any webhook event.
             */
            one_shot?: boolean | null;
            /** @description Restrict to these tags. Empty = all tags. */
            tags?: string[] | null;
            /** @description Restrict to these aggregation windows. */
            timeframes?: components["schemas"]["MetricFilterTimeframe"][] | null;
            /**
             * Format: double
             * @description Only fire when aggregated tag volume >= this value (USD).
             */
            min_volume_usd?: number | null;
            /**
             * Format: double
             * @description Maximum volume USD.
             */
            max_volume_usd?: number | null;
            /**
             * Format: int64
             * @description Minimum transactions.
             */
            min_txns?: number | null;
            /**
             * Format: int64
             * @description Minimum unique traders.
             */
            min_unique_traders?: number | null;
            /**
             * Format: double
             * @description Minimum fees.
             */
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
        TradeEventFilterType: "OrderFilled" | "OrdersMatched" | "MakerRebate" | "Reward" | "Yield" | "Redemption" | "Merge" | "Split" | "Cancelled" | "PositionsConverted" | "ComboCreation" | "ComboExecution" | "ComboStatusUpdate" | "ComboLifecycle" | "Initialization" | "Proposal" | "Dispute" | "Settled" | "Resolution" | "ConditionResolution" | "Reset" | "Flag" | "Unflag" | "Pause" | "Unpause" | "ManualResolution" | "NegRiskOutcomeReported" | "RegisterToken";
        /** @description Subscription filters for the `trader_category_pnl` event. All fields are optional. */
        TraderCategoryPnlFilters: {
            /**
             * @description Fire-and-delete: when `true`, delete the subscription after its first
             *     successful delivery. Applies to any webhook event.
             */
            one_shot?: boolean | null;
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
            /**
             * @description Fire-and-delete: when `true`, delete the subscription after its first
             *     successful delivery. Applies to any webhook event.
             */
            one_shot?: boolean | null;
            /** @description Track only these trader wallet addresses. Empty = all traders. */
            traders?: string[] | null;
            /** @description Restrict to these markets. */
            condition_ids?: string[] | null;
            /** @description Restrict to positions in these events. */
            event_slugs?: string[] | null;
        };
        /** @description Subscription filters for the `trader_first_trade` event. All fields are optional. */
        TraderFirstTradeFilters: {
            /**
             * @description Fire-and-delete: when `true`, delete the subscription after its first
             *     successful delivery. Applies to any webhook event.
             */
            one_shot?: boolean | null;
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
            min_price?: number | null;
            /**
             * Format: double
             * @description Only fire when the outcome probability is ≤ this value.
             */
            max_price?: number | null;
            /** @description When `true`, suppress webhooks for short-term "updown" markets (event slugs containing `updown`). Default: `false`. */
            exclude_shortterm_markets?: boolean | null;
        };
        /** @description Subscription filters for the `trader_global_pnl` event. All fields are optional. */
        TraderGlobalPnlFilters: {
            /**
             * @description Fire-and-delete: when `true`, delete the subscription after its first
             *     successful delivery. Applies to any webhook event.
             */
            one_shot?: boolean | null;
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
            /**
             * @description Fire-and-delete: when `true`, delete the subscription after its first
             *     successful delivery. Applies to any webhook event.
             */
            one_shot?: boolean | null;
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
            /**
             * @description Fire-and-delete: when `true`, delete the subscription after its first
             *     successful delivery. Applies to any webhook event.
             */
            one_shot?: boolean | null;
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
            min_price?: number | null;
            /**
             * Format: double
             * @description Only fire when the outcome probability is ≤ this value.
             */
            max_price?: number | null;
            /** @description When `true`, suppress webhooks for short-term "updown" markets. Default: `false`. */
            exclude_shortterm_markets?: boolean | null;
        };
        /** @description Subscription filters for the `trader_new_trade` event. All fields are optional. */
        TraderNewTradeFilters: {
            /**
             * @description Fire-and-delete: when `true`, delete the subscription after its first
             *     successful delivery. Applies to any webhook event.
             */
            one_shot?: boolean | null;
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
            min_price?: number | null;
            /**
             * Format: double
             * @description Only fire when outcome probability is ≤ this value.
             */
            max_price?: number | null;
            /** @description Only fire for these fill-style trade types. Empty = OrderFilled, OrdersMatched, and ComboExecution only (default). */
            trade_types?: ("OrderFilled" | "OrdersMatched" | "ComboExecution")[] | null;
            /** @description When `true`, suppress webhooks for short-term "updown" markets. Default: `false`. */
            exclude_shortterm_markets?: boolean | null;
        };
        /** @description Subscription filters for the `trader_position_resolved` event. All fields are optional. */
        TraderPositionResolvedFilters: {
            /**
             * @description Fire-and-delete: when `true`, delete the subscription after its first
             *     successful delivery. Applies to any webhook event.
             */
            one_shot?: boolean | null;
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
            /**
             * @description Fire-and-delete: when `true`, delete the subscription after its first
             *     successful delivery. Applies to any webhook event.
             */
            one_shot?: boolean | null;
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
            min_price?: number | null;
            /**
             * Format: double
             * @description Only fire when event probability is ≤ this value. Events without probability data do not match.
             */
            max_price?: number | null;
            /** @description Only fire for these trade types. Empty = all supported trade-event variants. */
            trade_types?: ("OrderFilled" | "OrdersMatched" | "MakerRebate" | "Reward" | "Yield" | "Redemption" | "Merge" | "Split" | "Cancelled" | "PositionsConverted" | "ComboCreation" | "ComboExecution" | "ComboStatusUpdate" | "ComboLifecycle" | "Initialization" | "Proposal" | "Dispute" | "Settled" | "Resolution" | "ConditionResolution" | "Reset" | "Flag" | "Unflag" | "Pause" | "Unpause" | "ManualResolution" | "NegRiskOutcomeReported" | "RegisterToken")[] | null;
            /** @description When `true`, suppress webhooks for short-term "updown" markets. Requires explicit `trade_types` that exclude `PositionsConverted`. Default: `false`. */
            exclude_shortterm_markets?: boolean | null;
        };
        /** @description Subscription filters for the `trader_whale_trade` event. All fields are optional. */
        TraderWhaleTradeFilters: {
            /**
             * @description Fire-and-delete: when `true`, delete the subscription after its first
             *     successful delivery. Applies to any webhook event.
             */
            one_shot?: boolean | null;
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
            min_price?: number | null;
            /**
             * Format: double
             * @description Only fire when outcome probability is ≤ this value.
             */
            max_price?: number | null;
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
            /** @description Market condition ID. */
            condition_id: string;
            /** @description Metric timeframe. */
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
            /** @description Category grouping: "trader", "market", "event", or "position" */
            category: string;
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
            /**
             * @description Filter by tags or category names (case-insensitive). Matches a market's tags or its
             *     category label — for market_created and all market-keyed events. Max 500 entries.
             */
            tags?: string[];
            /**
             * @description Filter by series slugs (case-insensitive). Matches a market's parent series — for all
             *     market-keyed events. Max 500 entries.
             */
            series_slugs?: string[];
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
             * @description Minimum price threshold (0.0 - 1.0). Accepts the legacy `min_probability` key.
             */
            min_price?: number | null;
            /**
             * Format: double
             * @description Maximum price threshold (0.0 - 1.0). Accepts the legacy `max_probability` key.
             */
            max_price?: number | null;
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
             * @description Minimum probability change percentage (legacy spike filter field)
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
             * @description Observation window in seconds (max 600) — for price_spike, volume_spike
             */
            window_secs?: number | null;
            /** @description When true, suppress webhooks for short-term "updown" markets */
            exclude_shortterm_markets?: boolean;
            /**
             * @description Filter by crypto asset symbol — for `asset_price_tick` and `asset_price_window_update`.
             *     Valid values: "BTC", "ETH", "SOL", "XRP", "DOGE", "BNB", "HYPE". Empty = all assets (send everything).
             */
            asset_symbols?: components["schemas"]["WebhookAssetSymbol"][];
            /**
             * @description Fire-and-delete: delete the subscription after its first successful
             *     delivery. Works on any webhook event. (`price_threshold` additionally
             *     requires `position_ids` or `condition_ids`.)
             */
            one_shot?: boolean;
            /**
             * @description For `price_threshold` — fire immediately if the first observed price is
             *     already past the target. Default `false` (wait for an actual crossing).
             */
            fire_if_already_past?: boolean;
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
            /** @description Current status: "active", "paused", or "disabled" */
            status: string;
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
            exchange: "CTFExchange" | "NegRiskExchange" | "ConditionalTokens" | "NegRiskAdapter" | "CTFExchangeV2" | "NegRiskExchangeV2" | "ComboExchange" | "ComboCombinatorialModule" | "ComboNegRiskModule" | "Unknown";
            /** @description Trade type (webhook events only fire on order fills) */
            trade_type: "OrderFilled" | "OrdersMatched" | "ComboExecution";
            /**
             * @description CLOB V2 builder code (lower-cased `0x...` bytes32 hex). Absent on V1
             *     trades; may be `0x0000…` for V2 trades placed without a builder code.
             *     CLOB builder code.
             */
            builder_code?: string | null;
            /**
             * Format: double
             * @description Builder fee in USDC. Absent when no builder code is attached.
             */
            builder_fee?: number | null;
        };
        /** @description Server acknowledgement for an oracle events stream subscription */
        OracleEventsStreamSubscribeResponse: {
            /** @description Accepted market condition IDs. */
            condition_ids?: string[];
            /** @description Accepted market slugs. */
            market_slugs?: string[];
            /** @description Accepted event slugs. */
            event_slugs?: string[];
            /** @description Accepted oracle event types. */
            oracle_event_types?: string[];
            /**
             * @description Trade status filter.
             * @enum {string}
             */
            status?: "confirmed" | "pending" | "all";
            /** @description Whether to subscribe to all matching events. */
            subscribe_all?: boolean;
            /** @description Filter values that were rejected (invalid format or unknown type) */
            rejected?: string[];
        };
        /** @description Subscribe to the oracle events stream. No filters = subscribe to all events. */
        OracleEventsStreamSubscribeMessage: {
            /**
             * @description Subscription action.
             * @enum {string}
             */
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
            /**
             * @description WebSocket room ID.
             * @enum {string}
             */
            room_id: "polymarket_markets_stream";
            /**
             * @description Subscription mode.
             * @enum {string}
             */
            mode: "filter" | "ids";
            /**
             * @description Flush interval in milliseconds.
             * @enum {integer}
             */
            interval_ms: 500 | 1000 | 3000 | 10000;
            /** @description Full market rows (same shape as `GET /polymarket/market`). Not a delta — each element is a complete row replacement. */
            data: Record<string, never>[];
        };
        /** @description Server acknowledgement for a markets_stream subscribe/unsubscribe. Envelope type: "markets_stream_subscribe_response". */
        MarketsStreamSubscribeResponse: {
            /**
             * @description Subscription mode.
             * @enum {string}
             */
            mode?: "filter" | "ids" | "";
            /** @description Flush interval in milliseconds. */
            interval_ms?: number;
            /** @description Accepted condition_ids (ids mode). */
            condition_ids?: string[];
            /** @description Accepted market slugs. */
            market_slugs?: string[];
            /** @description Accepted event slugs. */
            event_slugs?: string[];
            /** @description Ids that failed normalization or exceeded the per-sub cap. */
            rejected?: string[];
            /** @description Non-null when the subscribe was rejected. */
            error?: string | null;
        };
        /** @description List-API-shaped filter applied to changed rows. `status` is NOT accepted — only open markets are streamed. */
        MarketsStreamFilter: {
            /** @description Case-insensitive substring match on `title`. 3–100 chars. */
            search?: string;
            /** @description Categories to include. */
            categories?: string[];
            /** @description Categories to exclude. */
            exclude_categories?: string[];
            /** @description Accepted tag slugs. */
            tags?: string[];
            /** @description Tags to exclude. */
            exclude_tags?: string[];
            /** @description Minimum volume. */
            min_volume?: number;
            /** @description Maximum volume. */
            max_volume?: number;
            /** @description Minimum transaction count. */
            min_txns?: number;
            /** @description Maximum transaction count. */
            max_txns?: number;
            /** @description Minimum unique trader count. */
            min_unique_traders?: number;
            /** @description Maximum unique trader count. */
            max_unique_traders?: number;
            /** @description Minimum liquidity. */
            min_liquidity?: number;
            /** @description Maximum liquidity. */
            max_liquidity?: number;
            /**
             * Format: int64
             * @description Minimum holder count.
             */
            min_holders?: number;
            /**
             * Format: int64
             * @description Maximum holder count.
             */
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
            timeframe?: "1m" | "5m" | "30m" | "1h" | "6h" | "24h" | "7d" | "30d" | "lifetime";
        };
        /** @description Subscribe to the trades stream. No filters = subscribe to all trades. */
        TradesStreamSubscribeMessage: {
            /**
             * @description Subscription action.
             * @enum {string}
             */
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
            trade_types?: ("OrderFilled" | "OrdersMatched" | "ComboExecution" | "Redemption" | "Merge" | "Split" | "Cancelled" | "PositionsConverted" | "MakerRebate" | "Reward" | "Yield" | "Initialization" | "Proposal" | "Dispute" | "Settled" | "Resolution" | "ConditionResolution" | "Reset" | "Flag" | "Unflag" | "Pause" | "Unpause" | "ManualResolution" | "NegRiskOutcomeReported" | "RegisterToken")[];
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
            /** @description Accepted market condition IDs. */
            condition_ids?: string[];
            /** @description Accepted market slugs. */
            market_slugs?: string[];
            /** @description Accepted event slugs. */
            event_slugs?: string[];
            /** @description Accepted outcome token IDs. */
            position_ids?: string[];
            /** @description Accepted trader wallets. */
            traders?: string[];
            /** @description Accepted trade types. */
            trade_types?: string[];
            /**
             * @description Trade status filter.
             * @enum {string}
             */
            status?: "confirmed" | "pending" | "all";
            /** @description Whether to subscribe to all matching events. */
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
            /**
             * @description Trade type.
             * @enum {string}
             */
            trade_type: "OrderFilled" | "OrdersMatched" | "ComboExecution";
            /** @description Event ID. */
            id: string;
            /** @description Transaction hash. */
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
                /** @description Wallet address. */
                address?: string;
                /** @description Display name. */
                name?: string | null;
                /** @description Pseudonym. */
                pseudonym?: string | null;
                /** @description Profile image URL. */
                profile_image?: string | null;
                /** @description X username. */
                x_username?: string | null;
                /** @description Whether the profile is verified. */
                verified_badge?: boolean;
            };
            /** @description Absent for pending trades */
            taker?: string;
            /**
             * @description Trade side.
             * @enum {string}
             */
            side?: "Buy" | "Sell";
            /** @description Market condition ID. */
            condition_id?: string | null;
            /** @description Outcome token ID. */
            position_id?: string;
            /** @description Outcome name. */
            outcome?: string | null;
            /** @description Outcome index. */
            outcome_index?: number | null;
            /** @description Market question. */
            question?: string | null;
            /** @description Image URL. */
            image_url?: string | null;
            /** @description Market slug. */
            slug?: string | null;
            /** @description Event slug. */
            event_slug?: string | null;
            /** @description Trade amount in USD. */
            usd_amount?: number;
            /** @description Trade size in shares. */
            shares_amount?: number;
            /** @description Outcome price. */
            price?: number;
            /** @description Implied probability. */
            probability?: number | null;
            /** @description Absent for pending trades */
            fee?: number;
            /** @description Absent for pending trades */
            fee_shares?: number;
            /** @description Absent for pending trades */
            fee_pct?: number;
            /** @description Exchange identifier. */
            exchange: number;
            /** @description CLOB V2 builder code (lower-cased `0x...` bytes32 hex). Absent on V1 trades; may be `0x0000…` for V2 trades placed without a builder code. */
            builder_code?: string;
            /** @description Builder fee in USDC. Absent when no builder code is attached. */
            builder_fee?: number;
        } | {
            /**
             * @description Trade type.
             * @enum {string}
             */
            trade_type: "MakerRebate" | "Reward" | "Yield";
            /** @description Event ID. */
            id: string;
            /** @description Transaction hash. */
            hash: string;
            /** @description Block number. */
            block?: number;
            /** @description Confirmation timestamp. */
            confirmed_at?: number;
            /** @description Receive timestamp. */
            received_at?: number;
            /** @description Log index. */
            log_index?: number;
            /** @description Block index. */
            block_index?: number;
            trader: {
                /** @description Wallet address. */
                address?: string;
                /** @description Display name. */
                name?: string | null;
                /** @description Pseudonym. */
                pseudonym?: string | null;
                /** @description Profile image URL. */
                profile_image?: string | null;
                /** @description X username. */
                x_username?: string | null;
                /** @description Whether the profile is verified. */
                verified_badge?: boolean;
            };
            /** @description Payout distributor address */
            taker?: string;
            /** @description Trade amount in USD. */
            usd_amount?: number;
            /** @description Always 0 for payout credits */
            shares_amount?: number;
            /** @description Always 0 for payout credits */
            price?: number;
            /** @description Always 0 for payout credits */
            fee?: number;
            /** @description Always 0 for payout credits */
            fee_shares?: number;
            /** @description Always 0 for payout credits */
            fee_pct?: number;
            /** @description Unknown/non-exchange credit source */
            exchange: number;
        } | {
            /**
             * @description Trade type.
             * @enum {string}
             */
            trade_type: "Redemption";
            /** @description Event ID. */
            id: string;
            /** @description Transaction hash. */
            hash: string;
            /** @description Block number. */
            block?: number;
            /** @description Confirmation timestamp. */
            confirmed_at?: number;
            /** @description Receive timestamp. */
            received_at?: number;
            /** @description Log index. */
            log_index?: number;
            /** @description Block index. */
            block_index?: number;
            trader: {
                /** @description Wallet address. */
                address?: string;
                /** @description Display name. */
                name?: string | null;
                /** @description Pseudonym. */
                pseudonym?: string | null;
                /** @description Profile image URL. */
                profile_image?: string | null;
                /** @description X username. */
                x_username?: string | null;
                /** @description Whether the profile is verified. */
                verified_badge?: boolean;
            };
            /** @description Market condition ID. */
            condition_id?: string | null;
            /** @description Outcome name. */
            outcome?: string | null;
            /** @description Outcome index. */
            outcome_index?: number | null;
            /** @description Market question. */
            question?: string | null;
            /** @description Image URL. */
            image_url?: string | null;
            /** @description Market slug. */
            slug?: string | null;
            /** @description Event slug. */
            event_slug?: string | null;
            /** @description Trade amount in USD. */
            usd_amount?: number;
            /** @description Winning outcome index. */
            winning_outcome_index?: number | null;
            /** @description Position details. */
            position_details?: {
                /** @description Outcome token ID. */
                position_id?: string;
                /** @description Outcome index. */
                outcome_index?: number;
                /** @description Amount as a decimal string. */
                amount?: string;
            }[];
            /** @description Exchange identifier. */
            exchange: number;
        } | {
            /**
             * @description Trade type.
             * @enum {string}
             */
            trade_type: "Merge";
            /** @description Event ID. */
            id: string;
            /** @description Transaction hash. */
            hash: string;
            /** @description Block number. */
            block?: number;
            /** @description Confirmation timestamp. */
            confirmed_at?: number;
            /** @description Receive timestamp. */
            received_at?: number;
            /** @description Log index. */
            log_index?: number;
            /** @description Block index. */
            block_index?: number;
            trader: {
                /** @description Wallet address. */
                address?: string;
                /** @description Display name. */
                name?: string | null;
                /** @description Pseudonym. */
                pseudonym?: string | null;
                /** @description Profile image URL. */
                profile_image?: string | null;
                /** @description X username. */
                x_username?: string | null;
                /** @description Whether the profile is verified. */
                verified_badge?: boolean;
            };
            /** @description Market condition ID. */
            condition_id?: string | null;
            /** @description Market question. */
            question?: string | null;
            /** @description Image URL. */
            image_url?: string | null;
            /** @description Market slug. */
            slug?: string | null;
            /** @description Event slug. */
            event_slug?: string | null;
            /** @description Trade amount in USD. */
            usd_amount?: number;
            /** @description Position details. */
            position_details?: {
                /** @description Outcome token ID. */
                position_id?: string;
                /** @description Outcome index. */
                outcome_index?: number;
                /** @description Amount as a decimal string. */
                amount?: string;
            }[];
            /** @description Exchange identifier. */
            exchange: number;
        } | {
            /**
             * @description Trade type.
             * @enum {string}
             */
            trade_type: "Split";
            /** @description Event ID. */
            id: string;
            /** @description Transaction hash. */
            hash: string;
            /** @description Block number. */
            block?: number;
            /** @description Confirmation timestamp. */
            confirmed_at?: number;
            /** @description Receive timestamp. */
            received_at?: number;
            /** @description Log index. */
            log_index?: number;
            /** @description Block index. */
            block_index?: number;
            trader: {
                /** @description Wallet address. */
                address?: string;
                /** @description Display name. */
                name?: string | null;
                /** @description Pseudonym. */
                pseudonym?: string | null;
                /** @description Profile image URL. */
                profile_image?: string | null;
                /** @description X username. */
                x_username?: string | null;
                /** @description Whether the profile is verified. */
                verified_badge?: boolean;
            };
            /** @description Market condition ID. */
            condition_id?: string | null;
            /** @description Market question. */
            question?: string | null;
            /** @description Image URL. */
            image_url?: string | null;
            /** @description Market slug. */
            slug?: string | null;
            /** @description Event slug. */
            event_slug?: string | null;
            /** @description Trade amount in USD. */
            usd_amount?: number;
            /** @description Position details. */
            position_details?: {
                /** @description Outcome token ID. */
                position_id?: string;
                /** @description Outcome index. */
                outcome_index?: number;
                /** @description Amount as a decimal string. */
                amount?: string;
            }[];
            /** @description Exchange identifier. */
            exchange: number;
        } | {
            /**
             * @description Trade type.
             * @enum {string}
             */
            trade_type: "PositionsConverted";
            /** @description Event ID. */
            id: string;
            /** @description Transaction hash. */
            hash: string;
            /** @description Block number. */
            block?: number;
            /** @description Confirmation timestamp. */
            confirmed_at?: number;
            /** @description Receive timestamp. */
            received_at?: number;
            /** @description Log index. */
            log_index?: number;
            /** @description Block index. */
            block_index?: number;
            trader: {
                /** @description Wallet address. */
                address?: string;
                /** @description Display name. */
                name?: string | null;
                /** @description Pseudonym. */
                pseudonym?: string | null;
                /** @description Profile image URL. */
                profile_image?: string | null;
                /** @description X username. */
                x_username?: string | null;
                /** @description Whether the profile is verified. */
                verified_badge?: boolean;
            };
            /** @description Market id. */
            market_id?: string;
            /** @description Index set. */
            index_set?: string;
            /** @description Trade size in shares. */
            shares_amount?: number;
            /** @description Fee. */
            fee?: number;
            /** @description Fee percent. */
            fee_pct?: number;
            /** @description Per-position conversion amounts */
            position_details?: {
                /** @description Outcome token ID. */
                position_id?: string;
                /** @description Outcome index. */
                outcome_index?: number;
                /** @description Amount as a decimal string. */
                amount?: string;
            }[];
            /** @description Exchange identifier. */
            exchange: number;
        } | {
            /**
             * @description Trade type.
             * @enum {string}
             */
            trade_type: "Cancelled";
            /** @description Event ID. */
            id: string;
            /** @description Transaction hash. */
            hash: string;
            /** @description Block number. */
            block?: number;
            /** @description Confirmation timestamp. */
            confirmed_at?: number;
            /** @description Receive timestamp. */
            received_at?: number;
            /** @description Log index. */
            log_index?: number;
            /** @description Block index. */
            block_index?: number;
            /** @description Order hash. */
            order_hash?: string;
            /** @description Market question. */
            question?: string | null;
            /** @description Image URL. */
            image_url?: string | null;
            /** @description Market slug. */
            slug?: string | null;
            /** @description Event slug. */
            event_slug?: string | null;
            /** @description Exchange identifier. */
            exchange: number;
        } | {
            /**
             * @description Oracle lifecycle event type.
             * @enum {string}
             */
            trade_type: "Initialization" | "Proposal" | "Dispute" | "Settled" | "Resolution" | "ConditionResolution" | "Reset" | "Flag" | "Unflag" | "Pause" | "Unpause" | "ManualResolution" | "NegRiskOutcomeReported";
            /** @description Event ID. */
            id: string;
            /** @description Transaction hash. */
            hash: string;
            /** @description Block number. */
            block?: number;
            /** @description Confirmation timestamp. */
            confirmed_at?: number;
            /** @description Receive timestamp. */
            received_at?: number;
            /** @description Log index. */
            log_index?: number;
            /** @description Block index. */
            block_index?: number;
            /** @description Oracle contract. */
            oracle_contract: string;
            /** @description Market condition ID. */
            condition_id: string;
            /** @description Market question. */
            question?: string | null;
            /** @description Image URL. */
            image_url?: string | null;
            /** @description Market slug. */
            slug?: string | null;
            /** @description Event slug. */
            event_slug?: string | null;
            /** @description Assertion id. */
            assertion_id?: string | null;
            /** @description Proposer. */
            proposer?: string | null;
            /** @description Disputer. */
            disputer?: string | null;
            /** @description Proposed outcome. */
            proposed_outcome?: string | null;
            /** @description Settled price. */
            settled_price?: number | null;
            /** @description Disputed. */
            disputed?: boolean | null;
            /** @description Settlement resolution. */
            settlement_resolution?: boolean | null;
            /** @description Bond. */
            bond?: string | null;
            /** @description Expiration time. */
            expiration_time?: number | null;
            /** @description Creator. */
            creator?: string | null;
            /** @description Reward token. */
            reward_token?: string | null;
            /** @description Reward details. */
            reward?: string | null;
            /** @description Proposal bond. */
            proposal_bond?: string | null;
        } | {
            /**
             * @description Trade type.
             * @enum {string}
             */
            trade_type: "RegisterToken";
            /** @description Event ID. */
            id: string;
            /** @description Transaction hash. */
            hash: string;
            /** @description Block number. */
            block?: number;
            /** @description Confirmation timestamp. */
            confirmed_at?: number;
            /** @description Receive timestamp. */
            received_at?: number;
            /** @description Log index. */
            log_index?: number;
            /** @description Block index. */
            block_index?: number;
            /** @description Market condition ID. */
            condition_id: string;
            /** @description Token0. */
            token0?: string;
            /** @description Token1. */
            token1?: string;
            /** @description Market question. */
            question?: string | null;
            /** @description Image URL. */
            image_url?: string | null;
            /** @description Market slug. */
            slug?: string | null;
            /** @description Event slug. */
            event_slug?: string | null;
            /** @description Exchange identifier. */
            exchange: number;
        };
        /** @description Subscribe to the asset prices stream. Empty asset_symbols = all assets. */
        AssetPricesSubscribeMessage: {
            /**
             * @description Subscription action.
             * @enum {string}
             */
            action: "subscribe" | "unsubscribe_all";
            /** @description Uppercase asset symbols (BTC, ETH, SOL, XRP, DOGE, BNB, HYPE). Empty = subscribe to all. */
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
            /** @description Uppercase asset symbol (BTC, ETH, SOL, XRP, DOGE, BNB, HYPE) */
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
            /** @description Uppercase asset symbol (BTC, ETH, SOL, XRP, DOGE, BNB, HYPE) */
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
            /**
             * @description Subscription action.
             * @enum {string}
             */
            action: "subscribe" | "unsubscribe_all";
            /** @description Uppercase asset symbols (BTC, ETH, SOL, XRP, DOGE, BNB, HYPE) */
            asset_symbols?: string[];
            /** @description Candle sizes to filter by. "1d" and "24h" are treated as equivalent. */
            timeframes?: ("5m" | "15m" | "1h" | "4h" | "1d" | "24h")[];
        };
        /** @description Server acknowledgement for an asset window updates subscription */
        AssetWindowUpdatesSubscribeResponse: {
            /** @description Accepted asset symbols. */
            asset_symbols?: string[];
            /** @description Accepted metric timeframes. */
            timeframes?: string[];
            /** @description Set if the subscription was rejected (e.g. no filters provided) */
            error?: string | null;
        };
        /** @description Server-pushed event from the polymarket_asset_window_updates room. Same payload as AssetPriceWindowUpdateEvent. Envelope type: "asset_price_window_update". */
        AssetWindowUpdateEvent: components["schemas"]["AssetPriceWindowUpdateEvent"];
        /** @description Subscribe to the market metrics stream. condition_ids is required and must be non-empty. */
        MarketMetricsSubscribeMessage: {
            /**
             * @description Subscription action.
             * @enum {string}
             */
            action: "subscribe" | "unsubscribe_all";
            /** @description 64-char hex condition IDs (with or without 0x prefix) */
            condition_ids: string[];
            /** @description Accepted metric timeframes. */
            timeframes?: ("1m" | "5m" | "30m" | "1h" | "6h" | "24h" | "7d" | "30d" | "lifetime")[];
        };
        /** @description Server acknowledgement for a market metrics subscription */
        MarketMetricsSubscribeResponse: {
            /** @description Accepted market condition IDs. */
            condition_ids?: string[];
            /** @description Accepted metric timeframes. */
            timeframes?: string[];
            /** @description Condition IDs that were rejected (invalid format) */
            rejected?: string[];
            /** @description Set if the entire subscription was rejected */
            error?: string | null;
        };
        /** @description Server-pushed event: metrics update for one timeframe of a condition. Envelope type: "market_metrics_update". One event is emitted per timeframe window on each update. */
        MarketMetricsEvent: {
            /** @description 64-char hex condition ID */
            condition_id: string;
            /**
             * @description Metric timeframe.
             * @enum {string}
             */
            timeframe: "1m" | "5m" | "30m" | "1h" | "6h" | "24h" | "7d" | "30d" | "lifetime";
            /**
             * Format: int64
             * @description Optional event timestamp (Unix seconds)
             */
            timestamp?: number | null;
            /** @description USD volume in this timeframe window (decimal string) */
            usd_volume: string;
            /** @description Shares/contracts volume in this timeframe window (decimal string) */
            shares_volume: string;
            /** @description Builder-attributed USD volume in this timeframe window (decimal string) */
            builder_usd_volume: string;
            /** @description Builder-attributed shares/contracts volume in this timeframe window (decimal string) */
            builder_shares_volume: string;
            /** @description Total fees in this window */
            fees: number;
            /** @description Builder-attributed fees in this window */
            builder_fees: number;
            /**
             * Format: int64
             * @description Number of transactions
             */
            txns: number;
            /**
             * Format: int64
             * @description Builder-attributed transactions
             */
            builder_txns: number;
            /**
             * Format: int64
             * @description Unique trader count.
             */
            unique_traders: number;
            /**
             * Format: int64
             * @description Unique maker count.
             */
            unique_makers: number;
            /**
             * Format: int64
             * @description Unique taker count.
             */
            unique_takers: number;
            /**
             * Format: int64
             * @description Unique builder-attributed trader count.
             */
            unique_builder_traders: number;
        };
        /** @description Subscribe to the event metrics stream. event_slugs is required and must be non-empty. */
        EventMetricsSubscribeMessage: {
            /**
             * @description Subscription action.
             * @enum {string}
             */
            action: "subscribe" | "unsubscribe_all";
            /** @description Event slugs (lowercase) */
            event_slugs: string[];
            /** @description Accepted metric timeframes. */
            timeframes?: ("1m" | "5m" | "30m" | "1h" | "6h" | "24h" | "7d" | "30d" | "lifetime")[];
        };
        /** @description Server acknowledgement for an event metrics subscription */
        EventMetricsSubscribeResponse: {
            /** @description Accepted event slugs. */
            event_slugs?: string[];
            /** @description Accepted metric timeframes. */
            timeframes?: string[];
            /** @description Rejected filter values. */
            rejected?: string[];
            /** @description Subscription error message. */
            error?: string | null;
        };
        /** @description Server-pushed event: aggregated metrics update for one timeframe of an event. Envelope type: "event_metrics_update". One event is emitted per timeframe window on each update. */
        EventMetricsEvent: {
            /** @description Event slug. */
            event_slug: string;
            /**
             * @description Metric timeframe.
             * @enum {string}
             */
            timeframe: "1m" | "5m" | "30m" | "1h" | "6h" | "24h" | "7d" | "30d" | "lifetime";
            /**
             * Format: int64
             * @description Optional event timestamp (Unix seconds)
             */
            timestamp?: number | null;
            /** @description USD volume in this timeframe window (decimal string) */
            usd_volume: string;
            /** @description Shares/contracts volume in this timeframe window (decimal string) */
            shares_volume: string;
            /** @description Builder-attributed USD volume in this timeframe window (decimal string) */
            builder_usd_volume: string;
            /** @description Builder-attributed shares/contracts volume in this timeframe window (decimal string) */
            builder_shares_volume: string;
            /** @description Total fees. */
            fees: number;
            /** @description Builder-attributed fees. */
            builder_fees: number;
            /**
             * Format: int64
             * @description Transaction count.
             */
            txns: number;
            /**
             * Format: int64
             * @description Builder-attributed transaction count.
             */
            builder_txns: number;
            /**
             * Format: int64
             * @description Unique trader count.
             */
            unique_traders: number;
            /**
             * Format: int64
             * @description Unique maker count.
             */
            unique_makers: number;
            /**
             * Format: int64
             * @description Unique taker count.
             */
            unique_takers: number;
            /**
             * Format: int64
             * @description Unique builder-attributed trader count.
             */
            unique_builder_traders: number;
        };
        /** @description Subscribe to the tag metrics stream. tags is required and must be non-empty. */
        TagMetricsSubscribeMessage: {
            /**
             * @description Subscription action.
             * @enum {string}
             */
            action: "subscribe" | "unsubscribe_all";
            /** @description Tag labels or slugs, matched case-insensitively */
            tags: string[];
            /** @description Accepted metric timeframes. */
            timeframes?: ("1m" | "5m" | "30m" | "1h" | "6h" | "24h" | "7d" | "30d" | "lifetime")[];
        };
        /** @description Server acknowledgement for a tag metrics subscription */
        TagMetricsSubscribeResponse: {
            /** @description Accepted tag slugs. */
            tags?: string[];
            /** @description Accepted metric timeframes. */
            timeframes?: string[];
            /** @description Rejected filter values. */
            rejected?: string[];
            /** @description Subscription error message. */
            error?: string | null;
        };
        /** @description Server-pushed event: aggregated metrics update for one timeframe of a tag. Envelope type: "tag_metrics_update". One event is emitted per timeframe window on each update. */
        TagMetricsEvent: {
            /** @description Tag slug. */
            tag: string;
            /**
             * @description Metric timeframe.
             * @enum {string}
             */
            timeframe: "1m" | "5m" | "30m" | "1h" | "6h" | "24h" | "7d" | "30d" | "lifetime";
            /**
             * Format: int64
             * @description Optional event timestamp (Unix seconds)
             */
            timestamp?: number | null;
            /** @description USD volume in this timeframe window (decimal string) */
            usd_volume: string;
            /** @description Shares/contracts volume in this timeframe window (decimal string) */
            shares_volume: string;
            /** @description Builder-attributed USD volume in this timeframe window (decimal string) */
            builder_usd_volume: string;
            /** @description Builder-attributed shares/contracts volume in this timeframe window (decimal string) */
            builder_shares_volume: string;
            /** @description Total fees. */
            fees: number;
            /** @description Builder-attributed fees. */
            builder_fees: number;
            /**
             * Format: int64
             * @description Transaction count.
             */
            txns: number;
            /**
             * Format: int64
             * @description Builder-attributed transaction count.
             */
            builder_txns: number;
            /**
             * Format: int64
             * @description Unique trader count.
             */
            unique_traders: number;
            /**
             * Format: int64
             * @description Unique maker count.
             */
            unique_makers: number;
            /**
             * Format: int64
             * @description Unique taker count.
             */
            unique_takers: number;
            /**
             * Format: int64
             * @description Unique builder-attributed trader count.
             */
            unique_builder_traders: number;
        };
        /** @description Subscribe to the position metrics stream. position_ids is required and must be non-empty. */
        PositionMetricsSubscribeMessage: {
            /**
             * @description Subscription action.
             * @enum {string}
             */
            action: "subscribe" | "unsubscribe_all";
            /** @description ERC-1155 outcome token IDs (decimal or hex strings) */
            position_ids: string[];
            /** @description Accepted metric timeframes. */
            timeframes?: ("1m" | "5m" | "30m" | "1h" | "6h" | "24h" | "7d" | "30d" | "lifetime")[];
        };
        /** @description Server acknowledgement for a position metrics subscription */
        PositionMetricsSubscribeResponse: {
            /** @description Accepted outcome token IDs. */
            position_ids?: string[];
            /** @description Accepted metric timeframes. */
            timeframes?: string[];
            /** @description Rejected filter values. */
            rejected?: string[];
            /** @description Subscription error message. */
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
            /** @description Outcome index. */
            outcome_index?: number | null;
            /**
             * @description Metric timeframe.
             * @enum {string}
             */
            timeframe: "1m" | "5m" | "30m" | "1h" | "6h" | "24h" | "7d" | "30d" | "lifetime";
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
            /** @description Total shares/contracts volume (decimal string) */
            shares_volume: string;
            /** @description Buy shares/contracts volume (decimal string) */
            shares_buy_volume: string;
            /** @description Sell shares/contracts volume (decimal string) */
            shares_sell_volume: string;
            /** @description Builder-attributed USD volume (decimal string) */
            builder_usd_volume: string;
            /** @description Builder-attributed USD buy volume (decimal string) */
            builder_usd_buy_volume: string;
            /** @description Builder-attributed USD sell volume (decimal string) */
            builder_usd_sell_volume: string;
            /** @description Builder-attributed shares/contracts volume (decimal string) */
            builder_shares_volume: string;
            /** @description Builder-attributed buy shares/contracts volume (decimal string) */
            builder_shares_buy_volume: string;
            /** @description Builder-attributed sell shares/contracts volume (decimal string) */
            builder_shares_sell_volume: string;
            /** @description Total fees. */
            fees: number;
            /** @description Builder-attributed fees. */
            builder_fees: number;
            /**
             * Format: int64
             * @description Transaction count.
             */
            txns: number;
            /**
             * Format: int64
             * @description Buy count.
             */
            buys: number;
            /**
             * Format: int64
             * @description Sell count.
             */
            sells: number;
            /**
             * Format: int64
             * @description Builder-attributed transaction count.
             */
            builder_txns: number;
            /**
             * Format: int64
             * @description Builder-attributed buy count.
             */
            builder_buys: number;
            /**
             * Format: int64
             * @description Builder-attributed sell count.
             */
            builder_sells: number;
            /**
             * Format: int64
             * @description Unique trader count.
             */
            unique_traders: number;
            /**
             * Format: int64
             * @description Unique maker count.
             */
            unique_makers: number;
            /**
             * Format: int64
             * @description Unique taker count.
             */
            unique_takers: number;
            /**
             * Format: int64
             * @description Unique builder-attributed trader count.
             */
            unique_builder_traders: number;
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
            /** @description Average shares per trade. */
            avg_trade_shares: number;
            /** @description Average shares per buy. */
            avg_buy_shares: number;
            /** @description Average shares per sell. */
            avg_sell_shares: number;
        };
        /** @description Subscribe to the position liquidity stream. position_ids is optional — omit for firehose. */
        PositionLiquiditySubscribeMessage: {
            /**
             * @description Subscription action.
             * @enum {string}
             */
            action: "subscribe" | "unsubscribe_all";
            /** @description ERC-1155 outcome token IDs (decimal or hex). Empty/omitted = all positions. */
            position_ids?: string[];
        };
        /** @description Server-pushed event: latest USD liquidity for an outcome token. Envelope type: "position_liquidity_update". */
        PositionLiquidityEvent: {
            /** @description ERC-1155 token ID (decimal string) */
            position_id: string;
            /** @description Order-book liquidity in USD */
            liquidity_usd: number;
            /**
             * Format: int64
             * @description Update timestamp (Unix millis)
             */
            liquidity_updated_at: number;
        };
        /** @description Subscribe to the market liquidity stream. condition_ids is optional — omit for firehose. */
        MarketLiquiditySubscribeMessage: {
            /**
             * @description Subscription action.
             * @enum {string}
             */
            action: "subscribe" | "unsubscribe_all";
            /** @description 64-char hex market IDs. Empty/omitted = all markets. */
            condition_ids?: string[];
        };
        /** @description Server-pushed event: latest total USD liquidity for a market. Envelope type: "market_liquidity_update". */
        MarketLiquidityEvent: {
            /** @description 64-char hex condition ID */
            condition_id: string;
            /** @description Total order-book liquidity in USD */
            liquidity_usd: number;
            /**
             * Format: int64
             * @description Update timestamp (Unix millis)
             */
            liquidity_updated_at: number;
        };
        /** @description Subscribe to the event liquidity stream. event_slugs is optional — omit for firehose. */
        EventLiquiditySubscribeMessage: {
            /**
             * @description Subscription action.
             * @enum {string}
             */
            action: "subscribe" | "unsubscribe_all";
            /** @description Event slugs. Empty/omitted = all events. */
            event_slugs?: string[];
        };
        /** @description Server-pushed event: latest total USD liquidity for an event. Envelope type: "event_liquidity_update". */
        EventLiquidityEvent: {
            /** @description Event slug */
            event_slug: string;
            /** @description Total order-book liquidity in USD */
            liquidity_usd: number;
            /**
             * Format: int64
             * @description Update timestamp (Unix millis)
             */
            liquidity_updated_at: number;
        };
        /** @description Subscribe to the trader PnL stream. `traders` is required and must be non-empty. `update_types` and `timeframes` are optional narrowing filters — omit or leave empty to receive all update types / timeframes. */
        TraderPnlSubscribeMessage: {
            /**
             * @description Subscription action.
             * @enum {string}
             */
            action: "subscribe" | "unsubscribe_all";
            /** @description EVM wallet addresses */
            traders: string[];
            /** @description Restrict pushed updates to this subset of PnL granularities. Empty/omitted = all four. Unknown values reject the subscription. */
            update_types?: ("global" | "market" | "category")[];
            /** @description Restrict pushed updates to these aggregation timeframes. Empty/omitted = all four. Unknown values reject the subscription. Ignored by window-agnostic tick / resolution events. */
            timeframes?: ("1d" | "7d" | "30d" | "lifetime")[];
            /** @description Restrict pushed updates to events whose `dirty_kinds` intersects this set. Empty/omitted or `["all"]` = every kind. Unknown values reject the subscription. */
            dirty_kinds?: ("trade" | "price" | "window" | "market_resolved" | "all")[];
        };
        /** @description Server acknowledgement for a trader PnL subscription. Echoes the accepted (normalized) filter sets so clients can confirm the active subscription. */
        TraderPnlSubscribeResponse: {
            /** @description Accepted trader wallets. */
            traders?: string[];
            /** @description Accepted update types. Empty = all. */
            update_types?: ("global" | "market" | "category")[];
            /** @description Accepted timeframes. Empty = all. */
            timeframes?: ("1d" | "7d" | "30d" | "lifetime")[];
            /** @description Trader addresses that were rejected (invalid EVM format). */
            rejected?: string[];
            /** @description Set if the entire subscription was rejected (e.g. empty traders, or an invalid update_type / timeframe value). */
            error?: string | null;
        };
        /** @description One global (portfolio-level) PnL row inside a `trader_global_pnl_batch` envelope's `data` array. */
        TraderGlobalPnlRow: {
            /** @description Trader EVM wallet address */
            trader: string;
            /** @description Dirty update kinds included in this event. */
            dirty_kinds?: ("trade" | "price" | "window" | "market_resolved")[];
            /** @description "1d", "7d", "30d", or "lifetime" */
            timeframe?: string | null;
            /** @description Realized PnL for the timeframe */
            realized_pnl_usd: number;
            /**
             * Format: int64
             * @description Events traded.
             */
            events_traded?: number;
            /**
             * Format: int64
             * @description Markets traded.
             */
            markets_traded?: number;
            /**
             * Format: int64
             * @description Total buy count.
             */
            total_buys?: number;
            /**
             * Format: int64
             * @description Total sell count.
             */
            total_sells?: number;
            /**
             * Format: int64
             * @description Total redemption count.
             */
            total_redemptions?: number;
            /**
             * Format: int64
             * @description Total merge count.
             */
            total_merges?: number;
            /**
             * Format: int64
             * @description Total split count.
             */
            total_splits?: number;
            /** @description Total volume in USD. */
            total_volume_usd?: number;
            /** @description Buy volume in USD. */
            buy_volume_usd?: number;
            /** @description Sell volume in USD. */
            sell_volume_usd?: number;
            /** @description Redemption volume in USD. */
            redemption_volume_usd?: number;
            /** @description Merge volume in USD. */
            merge_volume_usd?: number;
            /** @description Split volume in USD. */
            split_volume_usd?: number;
            /**
             * Format: int64
             * @description Maker rebate count.
             */
            maker_rebate_count?: number;
            /** @description Maker rebates in USD. */
            maker_rebate_usd?: number;
            /**
             * Format: int64
             * @description Reward count.
             */
            reward_count?: number;
            /** @description Rewards in USD. */
            reward_usd?: number;
            /**
             * Format: int64
             * @description Yield count.
             */
            yield_count?: number;
            /** @description Yield in USD. */
            yield_usd?: number;
            /**
             * Format: int64
             * @description Total credit count.
             */
            total_credit_count?: number;
            /** @description Total credits in USD. */
            total_credit_usd?: number;
            /**
             * Format: int64
             * @description Markets won.
             */
            markets_won?: number;
            /**
             * Format: int64
             * @description Markets lost.
             */
            markets_lost?: number;
            /** @description Market win rate percent. */
            market_win_rate_pct?: number;
            /** @description Total wins in USD. */
            total_wins_usd?: number;
            /** @description Total losses in USD. */
            total_losses_usd?: number;
            /** @description Average win in USD. */
            avg_win_usd?: number | null;
            /** @description Average loss in USD. */
            avg_loss_usd?: number | null;
            /** @description Profit factor. */
            profit_factor?: number | null;
            /** @description Average hold time in seconds. */
            avg_hold_time_seconds?: number;
            /** @description Total fees. */
            total_fees?: number;
            /** @description Best trade PnL in USD. */
            best_trade_pnl_usd?: number | null;
            /** @description Best trade condition ID. */
            best_trade_condition_id?: string | null;
            /** @description Worst trade PnL in USD. */
            worst_trade_pnl_usd?: number | null;
            /** @description Worst trade condition ID. */
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
        };
        /** @description One per-market PnL row inside a `trader_market_pnl_batch` envelope's `data` array. */
        TraderMarketPnlRow: {
            /** @description Trader wallet address. */
            trader: string;
            /** @description Dirty update kinds included in this event. */
            dirty_kinds?: ("trade" | "price" | "window" | "market_resolved")[];
            /** @description "1d", "7d", "30d", or "lifetime" */
            timeframe?: string | null;
            /** @description 64-char hex condition ID */
            condition_id: string;
            /** @description Realized PnL in USD. */
            realized_pnl_usd?: number;
            /** @description Current shares balance. */
            current_shares_balance?: number;
            /** @description Category label. */
            category?: string | null;
            /** @description Event slug. */
            event_slug?: string | null;
            /**
             * Format: int64
             * @description Outcomes traded.
             */
            outcomes_traded?: number;
            /**
             * Format: int64
             * @description Total buy count.
             */
            total_buys?: number;
            /**
             * Format: int64
             * @description Total sell count.
             */
            total_sells?: number;
            /**
             * Format: int64
             * @description Total redemption count.
             */
            total_redemptions?: number;
            /**
             * Format: int64
             * @description Total merge count.
             */
            total_merges?: number;
            /**
             * Format: int64
             * @description Total split count.
             */
            total_splits?: number;
            /** @description Buy volume in USD. */
            buy_usd?: number;
            /** @description Sell volume in USD. */
            sell_usd?: number;
            /** @description Redemption volume in USD. */
            redemption_usd?: number;
            /** @description Merge volume in USD. */
            merge_usd?: number;
            /** @description Split volume in USD. */
            split_volume_usd?: number;
            /** @description Total fees. */
            total_fees?: number;
            /** @description Total shares bought. */
            total_shares_bought?: number;
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
        };
        /** @description One per-category PnL row inside a `trader_category_pnl_batch` envelope's `data` array. */
        TraderCategoryPnlRow: {
            /** @description Trader wallet address. */
            trader: string;
            /** @description Dirty update kinds included in this event. */
            dirty_kinds?: ("trade" | "price" | "window" | "market_resolved")[];
            /** @description "1d", "7d", "30d", or "lifetime" */
            timeframe?: string | null;
            /** @description Category label. */
            category: string;
            /** @description Realized PnL in USD. */
            realized_pnl_usd?: number;
            /**
             * Format: int64
             * @description Markets in this category.
             */
            markets_in_category?: number;
            /**
             * Format: int64
             * @description Markets traded.
             */
            markets_traded?: number;
            /**
             * Format: int64
             * @description Outcomes traded.
             */
            outcomes_traded?: number;
            /**
             * Format: int64
             * @description Total buy count.
             */
            total_buys?: number;
            /**
             * Format: int64
             * @description Total sell count.
             */
            total_sells?: number;
            /**
             * Format: int64
             * @description Total redemption count.
             */
            total_redemptions?: number;
            /**
             * Format: int64
             * @description Total merge count.
             */
            total_merges?: number;
            /**
             * Format: int64
             * @description Total split count.
             */
            total_splits?: number;
            /** @description Total volume in USD. */
            total_volume_usd?: number;
            /** @description Buy volume in USD. */
            buy_usd?: number;
            /** @description Sell volume in USD. */
            sell_usd?: number;
            /** @description Redemption volume in USD. */
            redemption_usd?: number;
            /** @description Merge volume in USD. */
            merge_usd?: number;
            /** @description Split volume in USD. */
            split_volume_usd?: number;
            /** @description Total fees. */
            total_fees?: number;
            /** @description Total shares bought. */
            total_shares_bought?: number;
            /**
             * Format: int64
             * @description Markets won.
             */
            markets_won?: number;
            /**
             * Format: int64
             * @description Markets lost.
             */
            markets_lost?: number;
            /** @description Market win rate percent. */
            market_win_rate_pct?: number;
            /** @description Average hold time in seconds. */
            avg_hold_time_seconds?: number;
            /** @description Best trade PnL in USD. */
            best_trade_pnl_usd?: number | null;
            /** @description Best trade condition ID. */
            best_trade_condition_id?: string | null;
            /** @description Worst trade PnL in USD. */
            worst_trade_pnl_usd?: number | null;
            /** @description Worst trade condition ID. */
            worst_trade_condition_id?: string | null;
            /** @description Total wins in USD. */
            total_wins_usd?: number;
            /** @description Total losses in USD. */
            total_losses_usd?: number;
            /** @description Average win in USD. */
            avg_win_usd?: number | null;
            /** @description Average loss in USD. */
            avg_loss_usd?: number | null;
            /** @description Profit factor. */
            profit_factor?: number | null;
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
        };
        /** @description Row carried by `trader_global_tick_batch` (price-only trader aggregate). */
        TraderGlobalTickRow: {
            /** @description Trader wallet address. */
            trader: string;
            /** @description Realized PnL in USD. */
            realized_pnl_usd?: number;
            /** @description Open positions value. */
            open_positions_value?: number;
            /**
             * Format: int64
             * @description Last block number.
             */
            last_block?: number;
            /**
             * Format: int64
             * @description Unix seconds
             */
            last_trade_at?: number | null;
            dirty_kinds?: "price"[];
        };
        /** @description Row carried by `trader_market_tick_batch` (price-only per-market). */
        TraderMarketTickRow: {
            /** @description Trader wallet address. */
            trader: string;
            /** @description Market condition ID. */
            condition_id: string;
            /** @description Realized PnL in USD. */
            realized_pnl_usd?: number;
            /**
             * Format: int64
             * @description Last block number.
             */
            last_block?: number;
            /**
             * Format: int64
             * @description Unix seconds
             */
            last_trade_at?: number | null;
            dirty_kinds?: "price"[];
        };
        /** @description Row carried by `trader_category_tick_batch` (price-only per-category). */
        TraderCategoryTickRow: {
            /** @description Trader wallet address. */
            trader: string;
            /** @description Category label. */
            category: string;
            /** @description Realized PnL in USD. */
            realized_pnl_usd?: number;
            /**
             * Format: int64
             * @description Last block number.
             */
            last_block?: number;
            /**
             * Format: int64
             * @description Unix seconds
             */
            last_trade_at?: number | null;
            dirty_kinds?: "price"[];
        };
        /** @description Row carried by `trader_global_resolution_batch` (trader-aggregate resolution). */
        TraderGlobalResolutionRow: {
            /** @description Trader wallet address. */
            trader: string;
            /** @description Realized PnL in USD. */
            realized_pnl_usd?: number;
            /**
             * Format: int64
             * @description Markets won.
             */
            markets_won?: number;
            /**
             * Format: int64
             * @description Markets lost.
             */
            markets_lost?: number;
            /**
             * Format: int64
             * @description Markets resolved.
             */
            markets_resolved?: number;
            /** @description Total wins usd lifetime. */
            total_wins_usd_lifetime?: number;
            /** @description Total losses usd lifetime. */
            total_losses_usd_lifetime?: number;
            /**
             * Format: int64
             * @description Last block number.
             */
            last_block?: number;
            /**
             * Format: int64
             * @description Unix seconds
             */
            last_trade_at?: number | null;
            dirty_kinds?: "market_resolved"[];
        };
        /** @description Row carried by `trader_market_resolution_batch` (per-market resolution). */
        TraderMarketResolutionRow: {
            /** @description Trader wallet address. */
            trader: string;
            /** @description Market condition ID. */
            condition_id: string;
            /** @description Whether the market is resolved. */
            resolved?: boolean;
            /** @description Whether the position won. */
            won?: boolean | null;
            /** @description Realized PnL in USD. */
            realized_pnl_usd?: number;
            /**
             * Format: int64
             * @description Last block number.
             */
            last_block?: number;
            /**
             * Format: int64
             * @description Unix seconds
             */
            last_trade_at?: number | null;
            dirty_kinds?: "market_resolved"[];
        };
        /** @description Row carried by `trader_category_resolution_batch` (per-category resolution). */
        TraderCategoryResolutionRow: {
            /** @description Trader wallet address. */
            trader: string;
            /** @description Category label. */
            category: string;
            /** @description Realized PnL in USD. */
            realized_pnl_usd?: number;
            /**
             * Format: int64
             * @description Markets won.
             */
            markets_won?: number;
            /**
             * Format: int64
             * @description Markets lost.
             */
            markets_lost?: number;
            /** @description Total wins usd lifetime. */
            total_wins_usd_lifetime?: number;
            /** @description Total losses usd lifetime. */
            total_losses_usd_lifetime?: number;
            /**
             * Format: int64
             * @description Last block number.
             */
            last_block?: number;
            /**
             * Format: int64
             * @description Unix seconds
             */
            last_trade_at?: number | null;
            dirty_kinds?: "market_resolved"[];
        };
        /** @description Server-pushed per-block batch. Envelope type: `trader_global_pnl_batch`. `data` carries every matching row from the block. */
        TraderGlobalPnlBatchEvent: {
            /** @enum {string} */
            type: "trader_global_pnl_batch";
            /** @enum {string} */
            room_id: "polymarket_trader_pnl";
            /** Format: int64 */
            block: number;
            /** @description "1d", "7d", "30d", or "lifetime" */
            timeframe?: string | null;
            data: components["schemas"]["TraderGlobalPnlRow"][];
        };
        /** @description Server-pushed per-block batch. Envelope type: `trader_market_pnl_batch`. `data` carries every matching row from the block. */
        TraderMarketPnlBatchEvent: {
            /** @enum {string} */
            type: "trader_market_pnl_batch";
            /** @enum {string} */
            room_id: "polymarket_trader_pnl";
            /** Format: int64 */
            block: number;
            /** @description "1d", "7d", "30d", or "lifetime" */
            timeframe?: string | null;
            data: components["schemas"]["TraderMarketPnlRow"][];
        };
        /** @description Server-pushed per-block batch. Envelope type: `trader_category_pnl_batch`. `data` carries every matching row from the block. */
        TraderCategoryPnlBatchEvent: {
            /** @enum {string} */
            type: "trader_category_pnl_batch";
            /** @enum {string} */
            room_id: "polymarket_trader_pnl";
            /** Format: int64 */
            block: number;
            /** @description "1d", "7d", "30d", or "lifetime" */
            timeframe?: string | null;
            data: components["schemas"]["TraderCategoryPnlRow"][];
        };
        /** @description Server-pushed per-block batch. Envelope type: `trader_global_tick_batch`. `data` carries every matching row from the block. */
        TraderGlobalTickBatchEvent: {
            /** @enum {string} */
            type: "trader_global_tick_batch";
            /** @enum {string} */
            room_id: "polymarket_trader_pnl";
            /** Format: int64 */
            block: number;
            data: components["schemas"]["TraderGlobalTickRow"][];
        };
        /** @description Server-pushed per-block batch. Envelope type: `trader_market_tick_batch`. `data` carries every matching row from the block. */
        TraderMarketTickBatchEvent: {
            /** @enum {string} */
            type: "trader_market_tick_batch";
            /** @enum {string} */
            room_id: "polymarket_trader_pnl";
            /** Format: int64 */
            block: number;
            data: components["schemas"]["TraderMarketTickRow"][];
        };
        /** @description Server-pushed per-block batch. Envelope type: `trader_category_tick_batch`. `data` carries every matching row from the block. */
        TraderCategoryTickBatchEvent: {
            /** @enum {string} */
            type: "trader_category_tick_batch";
            /** @enum {string} */
            room_id: "polymarket_trader_pnl";
            /** Format: int64 */
            block: number;
            data: components["schemas"]["TraderCategoryTickRow"][];
        };
        /** @description Server-pushed per-block batch. Envelope type: `trader_global_resolution_batch`. `data` carries every matching row from the block. */
        TraderGlobalResolutionBatchEvent: {
            /** @enum {string} */
            type: "trader_global_resolution_batch";
            /** @enum {string} */
            room_id: "polymarket_trader_pnl";
            /** Format: int64 */
            block: number;
            data: components["schemas"]["TraderGlobalResolutionRow"][];
        };
        /** @description Server-pushed per-block batch. Envelope type: `trader_market_resolution_batch`. `data` carries every matching row from the block. */
        TraderMarketResolutionBatchEvent: {
            /** @enum {string} */
            type: "trader_market_resolution_batch";
            /** @enum {string} */
            room_id: "polymarket_trader_pnl";
            /** Format: int64 */
            block: number;
            data: components["schemas"]["TraderMarketResolutionRow"][];
        };
        /** @description Server-pushed per-block batch. Envelope type: `trader_category_resolution_batch`. `data` carries every matching row from the block. */
        TraderCategoryResolutionBatchEvent: {
            /** @enum {string} */
            type: "trader_category_resolution_batch";
            /** @enum {string} */
            room_id: "polymarket_trader_pnl";
            /** Format: int64 */
            block: number;
            data: components["schemas"]["TraderCategoryResolutionRow"][];
        };
        /** @description Subscribe to the trader positions stream. `traders` is required and must be non-empty. `dirty_kinds` is an optional narrowing filter — empty/omitted or `["all"]` = receive every kind of update. */
        TraderPositionsSubscribeMessage: {
            /**
             * @description Subscription action.
             * @enum {string}
             */
            action: "subscribe" | "unsubscribe_all";
            /** @description EVM wallet addresses */
            traders: string[];
            /** @description Restrict pushed updates to this subset of update kinds. Omit, leave empty, or pass `["all"]` to accept every kind (the default). Unknown values reject the subscription. */
            dirty_kinds?: ("trade" | "price" | "position_resolved" | "all")[];
        };
        /** @description Server acknowledgement for a trader positions subscription. */
        TraderPositionsSubscribeResponse: {
            /** @description Accepted trader wallets. */
            traders?: string[];
            /** @description Echoed accepted dirty_kinds filter. Empty = all. */
            dirty_kinds?: ("trade" | "price" | "position_resolved")[];
            /** @description Rejected filter values. */
            rejected?: string[];
            /** @description Subscription error message. */
            error?: string | null;
        };
        /** @description One position-update row inside a `trader_position_batch` envelope's `data` array. */
        TraderPositionRow: {
            /** @description ERC-1155 token ID (decimal string) */
            position_id?: string | null;
            /** @description Market condition ID. */
            condition_id?: string | null;
            /** @description Market slug. */
            market_slug?: string | null;
            /** @description Event slug. */
            event_slug?: string | null;
            title?: string | null;
            /** @description Market question. */
            question?: string | null;
            /** @description Image URL. */
            image_url?: string | null;
            /** @description Outcome name (e.g. "Yes") */
            outcome?: string | null;
            /** @description Outcome index. */
            outcome_index?: number | null;
            /** @description Whether the position is open. */
            open?: boolean | null;
            /** @description Resolution outcome — present once the market resolved */
            won?: boolean | null;
            /**
             * Format: int64
             * @description Total buy count.
             */
            total_buys?: number | null;
            /**
             * Format: int64
             * @description Total sell count.
             */
            total_sells?: number | null;
            /**
             * Format: int64
             * @description Conversion count.
             */
            converted_count?: number | null;
            /** @description Converted shares gained. */
            converted_shares_gained?: number | null;
            /** @description Converted shares lost. */
            converted_shares_lost?: number | null;
            /** @description Total shares bought. */
            total_shares_bought?: number | null;
            /** @description Total shares sold. */
            total_shares_sold?: number | null;
            /** @description Total buys in USD. */
            total_buy_usd?: number | null;
            /** @description Total sells in USD. */
            total_sell_usd?: number | null;
            /** @description Redemption volume in USD. */
            redemption_usd?: number | null;
            /** @description Merge volume in USD. */
            merge_usd?: number | null;
            /** @description 0–1 */
            avg_entry_price?: number | null;
            /** @description Average exit price. */
            avg_exit_price?: number | null;
            /** @description Volume-weighted across buys + sells */
            avg_price?: number | null;
            /** @description Realized PnL in USD. */
            realized_pnl_usd?: number | null;
            /** @description Realized PnL percent. */
            realized_pnl_pct?: number | null;
            /** @description Total fees. */
            total_fees?: number | null;
            /**
             * Format: int64
             * @description Unix milliseconds
             */
            first_trade_at?: number | null;
            /**
             * Format: int64
             * @description Unix milliseconds
             */
            last_trade_at?: number | null;
            /** @description Latest on-chain mark for the outcome token */
            current_price?: number | null;
            /** @description Current shares balance. */
            current_shares_balance?: number | null;
            /** @description current_price × current_shares_balance */
            current_value?: number | null;
            /** @description Last traded price. */
            last_traded_price?: number | null;
            /**
             * Format: int64
             * @description Market resolution deadline (Unix seconds)
             */
            end_date?: number | null;
            /** @description True for multi-outcome NegRisk markets */
            is_neg_risk?: boolean | null;
            /** @description Market resolved AND trader still holds shares */
            redeemable?: boolean | null;
            /** @description NegRisk market, unresolved, trader holds shares */
            mergeable?: boolean | null;
            /** @description What kind of activity triggered this update. One or more of: `trade` (a buy, sell, merge, split, redemption, or NegRisk convert landed), `price` (outcome price moved), `position_resolved` (the position's market resolved on this update). */
            dirty_kinds?: ("trade" | "price" | "position_resolved")[];
        };
        /** @description Server-pushed per-block batch of position updates. Envelope type: `trader_position_batch`. Carries every row from the named block that matched the subscriber's filter. Empty batches are not sent. Each row's `dirty_kinds` field describes what triggered that row's update — including resolutions (`position_resolved`). */
        TraderPositionBatchEvent: {
            /** @enum {string} */
            type: "trader_position_batch";
            /**
             * @description WebSocket room ID.
             * @enum {string}
             */
            room_id: "polymarket_trader_positions";
            /**
             * Format: int64
             * @description Block number these rows were computed at.
             */
            block: number;
            data: components["schemas"]["TraderPositionRow"][];
        };
        /** @description One price-tick row inside a `trader_position_price_batch` envelope's `data` array. */
        TraderPositionPriceRow: {
            /** @description Trader wallet address. */
            trader?: string | null;
            /** @description ERC-1155 token ID (decimal string) */
            position_id?: string | null;
            /** @description Market condition ID. */
            condition_id?: string | null;
            /** @description Latest on-chain mark for the outcome token */
            current_price?: number | null;
            /** @description Current position value. */
            current_value?: number | null;
            /** @description Realized PnL in USD. */
            realized_pnl_usd?: number | null;
            /** @description Realized PnL percent. */
            realized_pnl_pct?: number | null;
            /**
             * Format: int64
             * @description Last block number.
             */
            last_block?: number | null;
            /**
             * Format: int64
             * @description Unix milliseconds
             */
            last_trade_at?: number | null;
            /** @description Dirty update kinds included in this event. */
            dirty_kinds?: "price"[];
        };
        /** @description Server-pushed per-block batch of position price ticks (mark-to-market refreshes). Envelope type: `trader_position_price_batch`. */
        TraderPositionPriceBatchEvent: {
            /** @enum {string} */
            type: "trader_position_price_batch";
            /**
             * @description WebSocket room ID.
             * @enum {string}
             */
            room_id: "polymarket_trader_positions";
            /**
             * Format: int64
             * @description Block number.
             */
            block: number;
            data: components["schemas"]["TraderPositionPriceRow"][];
        };
        /** @description One resolution row inside a `trader_position_resolution_batch` envelope's `data` array. */
        TraderPositionResolutionRow: {
            /** @description Trader wallet address. */
            trader?: string | null;
            /** @description ERC-1155 token ID (decimal string) */
            position_id?: string | null;
            /** @description Market condition ID. */
            condition_id?: string | null;
            /** @description Whether the market is resolved. */
            resolved?: boolean | null;
            /** @description Whether the position won. */
            won?: boolean | null;
            /** @description Realized PnL in USD. */
            realized_pnl_usd?: number | null;
            /** @description Realized PnL percent. */
            realized_pnl_pct?: number | null;
            /**
             * Format: int64
             * @description Last block number.
             */
            last_block?: number | null;
            /**
             * Format: int64
             * @description Unix milliseconds
             */
            last_trade_at?: number | null;
            /** @description Dirty update kinds included in this event. */
            dirty_kinds?: "position_resolved"[];
        };
        /** @description Server-pushed per-block batch of position resolutions. Envelope type: `trader_position_resolution_batch`. */
        TraderPositionResolutionBatchEvent: {
            /** @enum {string} */
            type: "trader_position_resolution_batch";
            /**
             * @description WebSocket room ID.
             * @enum {string}
             */
            room_id: "polymarket_trader_positions";
            /**
             * Format: int64
             * @description Block number.
             */
            block: number;
            data: components["schemas"]["TraderPositionResolutionRow"][];
        };
        /** @description Subscribe to the trader exit markers stream. `traders` is required and must be non-empty. `reasons` is an optional narrowing filter — empty/omitted or `["all"]` = receive every exit reason. */
        TraderExitMarkersSubscribeMessage: {
            /**
             * @description Subscription action.
             * @enum {string}
             */
            action: "subscribe" | "unsubscribe_all";
            /** @description EVM wallet addresses */
            traders: string[];
            /** @description Restrict pushed exits to this subset of reasons. Omit, leave empty, or pass `["all"]` to accept every reason (the default). Unknown values reject the subscription. */
            reasons?: ("resolved_win" | "resolved_loss" | "sold_win" | "sold_loss" | "all")[];
        };
        /** @description Server acknowledgement for a trader exit markers subscription. */
        TraderExitMarkersSubscribeResponse: {
            /** @description Accepted trader wallets. */
            traders?: string[];
            /** @description Echoed accepted reasons filter. Empty = all. */
            reasons?: ("resolved_win" | "resolved_loss" | "sold_win" | "sold_loss")[];
            /** @description Rejected filter values. */
            rejected?: string[];
            /** @description Subscription error message. */
            error?: string | null;
        };
        /** @description One exit row inside a `trader_exit_marker_batch` envelope's `data` array. */
        TraderExitMarkerRow: {
            /** @description EVM wallet address */
            trader?: string;
            /** @description ERC-1155 token ID (decimal string) */
            position_id?: string;
            /** @description Market condition ID. */
            condition_id?: string;
            /** @description Event slug. */
            event_slug?: string;
            /** @description Market slug. */
            market_slug?: string;
            title?: string;
            /** @description Full market question text */
            question?: string;
            /** @description Image URL. */
            image_url?: string;
            /** @description Outcome name (e.g. "Yes") */
            outcome?: string;
            /** @description Outcome index. */
            outcome_index?: number | null;
            /** @description Realized PnL at exit, USD */
            pnl_usd?: number;
            /** @description Realized PnL at exit, percent */
            pnl_pct?: number;
            /** @description Cost basis in USD. */
            cost_basis_usd?: number;
            /**
             * @description Why the position closed: `resolved_*` held to market resolution (win/loss by verdict); `sold_*` closed before resolution (win/loss by realized PnL sign).
             * @enum {string}
             */
            reason?: "resolved_win" | "resolved_loss" | "sold_win" | "sold_loss";
            /**
             * Format: int64
             * @description Block the exit was recorded at
             */
            block?: number;
            /**
             * Format: int64
             * @description Exit time, Unix seconds
             */
            ts?: number;
        };
        /** @description Server-pushed per-block batch of position exits. Envelope type: `trader_exit_marker_batch`. Carries every exit from the named block that matched the subscriber's filter. Empty batches are not sent. */
        TraderExitMarkerBatchEvent: {
            /** @enum {string} */
            type: "trader_exit_marker_batch";
            /**
             * @description WebSocket room ID.
             * @enum {string}
             */
            room_id: "polymarket_trader_pnl_exits";
            /**
             * Format: int64
             * @description Block number these exits were recorded at.
             */
            block: number;
            data: components["schemas"]["TraderExitMarkerRow"][];
        };
        /** @description Subscribe to holder metrics for explicit positions, conditions, or events. At least one identifier array must be non-empty. Omitted arrays receive no updates for that metric family. Up to 500 total identifiers are accepted. */
        HolderMetricsSubscribeMessage: {
            /**
             * @description Subscription action.
             * @enum {string}
             */
            action: "subscribe" | "unsubscribe_all";
            /** @description Position token IDs to receive position holder metrics for. */
            position_ids?: string[];
            /** @description Condition IDs to receive condition holder metrics for. */
            condition_ids?: string[];
            /** @description Event slugs to receive event holder metrics for. */
            event_slugs?: string[];
        };
        PositionHolderMetricsRow: {
            /** @description Unix timestamp in seconds. */
            ts?: number;
            /** @description Block number. */
            block?: number;
            /** @description Outcome token ID. */
            position_id?: string;
            /** @description Number of holders. */
            holder_count?: number;
            /** @description Total shares held. */
            total_balance?: number;
            /** @description Total holder cost basis in USD. */
            total_cost_basis?: number;
            /** @description Number of market-level holders. */
            condition_holder_count?: number | null;
            /** @description Number of event-level holders. */
            event_holder_count?: number | null;
        };
        ConditionHolderMetricsRow: {
            /** @description Unix timestamp in seconds. */
            ts?: number;
            /** @description Block number. */
            block?: number;
            /** @description Market condition ID. */
            condition_id?: string;
            /** @description Number of holders. */
            holder_count?: number;
        };
        EventHolderMetricsRow: {
            /** @description Unix timestamp in seconds. */
            ts?: number;
            /** @description Block number. */
            block?: number;
            /** @description Event slug. */
            event_slug?: string;
            /** @description Number of holders. */
            holder_count?: number;
        };
        HolderMetricsPositionBatchEvent: {
            /** @enum {string} */
            type: "holder_metrics_position_batch";
            /**
             * @description WebSocket room ID.
             * @enum {string}
             */
            room_id: "polymarket_holder_metrics";
            /** @description Block number. */
            block: number;
            data: components["schemas"]["PositionHolderMetricsRow"][];
        };
        HolderMetricsConditionBatchEvent: {
            /** @enum {string} */
            type: "holder_metrics_condition_batch";
            /**
             * @description WebSocket room ID.
             * @enum {string}
             */
            room_id: "polymarket_holder_metrics";
            /** @description Block number. */
            block: number;
            data: components["schemas"]["ConditionHolderMetricsRow"][];
        };
        HolderMetricsEventBatchEvent: {
            /** @enum {string} */
            type: "holder_metrics_event_batch";
            /**
             * @description WebSocket room ID.
             * @enum {string}
             */
            room_id: "polymarket_holder_metrics";
            /** @description Block number. */
            block: number;
            data: components["schemas"]["EventHolderMetricsRow"][];
        };
        /** @description Subscribe to the accounts stream. `wallets` is required. Share balance updates (`accounts_update`) are always delivered. Set `include_usdce`, `include_pusd`, or `include_matic` to also receive those balance streams. */
        AccountsSubscribeMessage: {
            /**
             * @description Subscription action.
             * @enum {string}
             */
            action: "subscribe" | "unsubscribe_all";
            /** @description EVM wallet addresses */
            wallets: string[];
            /** @description Also stream USDCe collateral balance updates for subscribed wallets (V1) */
            include_usdce?: boolean;
            /** @description Also stream pUSD collateral balance updates for subscribed wallets (V2 CLOB) */
            include_pusd?: boolean;
            /** @description Also stream MATIC gas balance updates for subscribed wallets */
            include_matic?: boolean;
        };
        /** @description Server acknowledgement for an accounts subscription */
        AccountsSubscribeResponse: {
            /** @description Accepted wallet addresses. */
            wallets?: string[];
            /** @description Addresses rejected (invalid format) */
            rejected?: string[];
            /** @description Whether to include USDC.e balances. */
            include_usdce?: boolean;
            /** @description Whether to include pUSD balances. */
            include_pusd?: boolean;
            /** @description Whether to include MATIC balances. */
            include_matic?: boolean;
            /** @description Subscription error message. */
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
            /**
             * Format: int64
             * @description Block number.
             */
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
            /**
             * Format: uint64
             * @description Block number.
             */
            block_number: number;
            /**
             * Format: int64
             * @description Unix seconds
             */
            updated_at: number;
        };
        /** @description Server-pushed event: pUSD (V2 CLOB collateral) balance change for a wallet. Envelope type: "pusd_update". Only delivered when `include_pusd: true`. */
        PusdUpdateEvent: {
            /** @description Wallet address (0x-prefixed hex) */
            address: string;
            /** @description pUSD contract address — omitted when not available */
            token_address?: string;
            /** @description Current pUSD balance (decimal string) — omitted when not available */
            balance?: string;
            /**
             * Format: uint64
             * @description Block number.
             */
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
            /**
             * Format: uint64
             * @description Block number.
             */
            block_number: number;
            /**
             * Format: int64
             * @description Unix seconds
             */
            updated_at: number;
        };
        /** @description Subscribe to the order book stream. At least one filter is required. Maximum 500 combined condition_ids + position_ids per client. No `type` field is needed — the server routes by room_id. */
        OrderBookSubscribeMessage: {
            /**
             * @description Subscription action.
             * @enum {string}
             */
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
        /** @description A single order book price level. Matches the HTTP order book API's OrderbookLevel. */
        OrderBookLevel: {
            /** @description Price as a decimal string (0–1) */
            p: string;
            /** @description Size as a decimal string */
            s: string;
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
        /** @description Subscribe to CLOB reward changes. Either provide specific condition_ids or set subscribe_all to true. */
        ClobRewardsSubscribeMessage: {
            /**
             * @description Subscription action.
             * @enum {string}
             */
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
                /** @description Market condition ID. */
                condition_id?: string;
                rewards_config?: {
                    /** @description Event ID. */
                    id?: number;
                    /** @description Reward token address (e.g. USDC) */
                    asset_address?: string;
                    /**
                     * Format: date
                     * @description Reward start date.
                     */
                    start_date?: string;
                    /**
                     * Format: date
                     * @description Reward end date.
                     */
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
        /** @description List-API-shaped filter applied to changed rows. `status` is NOT an accepted field — only open events are streamed. */
        EventsStreamFilter: {
            /** @description Case-insensitive substring match on `title`. 3–100 chars. */
            search?: string;
            /** @description Categories to include. */
            categories?: string[];
            /** @description Categories to exclude. */
            exclude_categories?: string[];
            /** @description Match by tag slug OR label (case-insensitive). */
            tags?: string[];
            /** @description Tags to exclude. */
            exclude_tags?: string[];
            /** @description Minimum volume. */
            min_volume?: number;
            /** @description Maximum volume. */
            max_volume?: number;
            /** @description Minimum transaction count. */
            min_txns?: number;
            /** @description Maximum transaction count. */
            max_txns?: number;
            /** @description Minimum unique trader count. */
            min_unique_traders?: number;
            /** @description Maximum unique trader count. */
            max_unique_traders?: number;
            /**
             * @description Timeframe that `volume`/`txns`/`unique_traders` thresholds are evaluated against. Default `24h`.
             * @enum {string}
             */
            timeframe?: "1m" | "5m" | "30m" | "1h" | "6h" | "24h" | "7d" | "30d" | "lifetime";
        };
        /** @description Server acknowledgement for an events_stream subscribe/unsubscribe. Envelope type: "events_stream_subscribe_response". */
        EventsStreamSubscribeResponse: {
            /**
             * @description Subscription mode.
             * @enum {string}
             */
            mode?: "filter" | "ids" | "";
            /** @description Flush interval in milliseconds. */
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
            /**
             * @description WebSocket room ID.
             * @enum {string}
             */
            room_id: "polymarket_events_stream";
            /**
             * @description Subscription mode.
             * @enum {string}
             */
            mode: "filter" | "ids";
            /**
             * @description Flush interval in milliseconds.
             * @enum {integer}
             */
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
        /**
         * OrderFilled / OrdersMatched / ComboExecution
         * @description A buy/sell trade was matched on the exchange.
         */
        TradeOrderFilledEvent: {
            /**
             * @description Trade type.
             * @enum {string}
             */
            trade_type: "OrderFilled" | "OrdersMatched" | "ComboExecution";
            /** @description Event ID. */
            id: string;
            /** @description Transaction hash. */
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
                /** @description Wallet address. */
                address?: string;
                /** @description Display name. */
                name?: string | null;
                /** @description Pseudonym. */
                pseudonym?: string | null;
                /** @description Profile image URL. */
                profile_image?: string | null;
                /** @description X username. */
                x_username?: string | null;
                /** @description Whether the profile is verified. */
                verified_badge?: boolean;
            };
            /** @description Absent for pending trades */
            taker?: string;
            /**
             * @description Trade side.
             * @enum {string}
             */
            side?: "Buy" | "Sell";
            /** @description Market condition ID. */
            condition_id?: string | null;
            /** @description Outcome token ID. */
            position_id?: string;
            /** @description Outcome name. */
            outcome?: string | null;
            /** @description Outcome index. */
            outcome_index?: number | null;
            /** @description Market question. */
            question?: string | null;
            /** @description Image URL. */
            image_url?: string | null;
            /** @description Market slug. */
            slug?: string | null;
            /** @description Event slug. */
            event_slug?: string | null;
            /** @description Trade amount in USD. */
            usd_amount?: number;
            /** @description Trade size in shares. */
            shares_amount?: number;
            /** @description Outcome price. */
            price?: number;
            /** @description Implied probability. */
            probability?: number | null;
            /** @description Absent for pending trades */
            fee?: number;
            /** @description Absent for pending trades */
            fee_shares?: number;
            /** @description Absent for pending trades */
            fee_pct?: number;
            /** @description Exchange identifier. */
            exchange: number;
            /** @description CLOB V2 builder code (lower-cased `0x...` bytes32 hex). Absent on V1 trades; may be `0x0000…` for V2 trades placed without a builder code. */
            builder_code?: string;
            /** @description Builder fee in USDC. Absent when no builder code is attached. */
            builder_fee?: number;
        };
        /**
         * MakerRebate / Reward / Yield
         * @description pUSD credit paid directly to the trader wallet.
         */
        TradeRedemptionEvent: {
            /**
             * @description Trade type.
             * @enum {string}
             */
            trade_type: "MakerRebate" | "Reward" | "Yield";
            /** @description Event ID. */
            id: string;
            /** @description Transaction hash. */
            hash: string;
            /** @description Block number. */
            block?: number;
            /** @description Confirmation timestamp. */
            confirmed_at?: number;
            /** @description Receive timestamp. */
            received_at?: number;
            /** @description Log index. */
            log_index?: number;
            /** @description Block index. */
            block_index?: number;
            trader: {
                /** @description Wallet address. */
                address?: string;
                /** @description Display name. */
                name?: string | null;
                /** @description Pseudonym. */
                pseudonym?: string | null;
                /** @description Profile image URL. */
                profile_image?: string | null;
                /** @description X username. */
                x_username?: string | null;
                /** @description Whether the profile is verified. */
                verified_badge?: boolean;
            };
            /** @description Payout distributor address */
            taker?: string;
            /** @description Trade amount in USD. */
            usd_amount?: number;
            /** @description Always 0 for payout credits */
            shares_amount?: number;
            /** @description Always 0 for payout credits */
            price?: number;
            /** @description Always 0 for payout credits */
            fee?: number;
            /** @description Always 0 for payout credits */
            fee_shares?: number;
            /** @description Always 0 for payout credits */
            fee_pct?: number;
            /** @description Unknown/non-exchange credit source */
            exchange: number;
        };
        /**
         * Redemption
         * @description Positions redeemed after market resolution.
         */
        TradeMergeEvent: {
            /**
             * @description Trade type.
             * @enum {string}
             */
            trade_type: "Redemption";
            /** @description Event ID. */
            id: string;
            /** @description Transaction hash. */
            hash: string;
            /** @description Block number. */
            block?: number;
            /** @description Confirmation timestamp. */
            confirmed_at?: number;
            /** @description Receive timestamp. */
            received_at?: number;
            /** @description Log index. */
            log_index?: number;
            /** @description Block index. */
            block_index?: number;
            trader: {
                /** @description Wallet address. */
                address?: string;
                /** @description Display name. */
                name?: string | null;
                /** @description Pseudonym. */
                pseudonym?: string | null;
                /** @description Profile image URL. */
                profile_image?: string | null;
                /** @description X username. */
                x_username?: string | null;
                /** @description Whether the profile is verified. */
                verified_badge?: boolean;
            };
            /** @description Market condition ID. */
            condition_id?: string | null;
            /** @description Outcome name. */
            outcome?: string | null;
            /** @description Outcome index. */
            outcome_index?: number | null;
            /** @description Market question. */
            question?: string | null;
            /** @description Image URL. */
            image_url?: string | null;
            /** @description Market slug. */
            slug?: string | null;
            /** @description Event slug. */
            event_slug?: string | null;
            /** @description Trade amount in USD. */
            usd_amount?: number;
            /** @description Winning outcome index. */
            winning_outcome_index?: number | null;
            /** @description Position details. */
            position_details?: {
                /** @description Outcome token ID. */
                position_id?: string;
                /** @description Outcome index. */
                outcome_index?: number;
                /** @description Amount as a decimal string. */
                amount?: string;
            }[];
            /** @description Exchange identifier. */
            exchange: number;
        };
        /**
         * Merge
         * @description Outcome tokens burned to receive collateral.
         */
        TradeSplitEvent: {
            /**
             * @description Trade type.
             * @enum {string}
             */
            trade_type: "Merge";
            /** @description Event ID. */
            id: string;
            /** @description Transaction hash. */
            hash: string;
            /** @description Block number. */
            block?: number;
            /** @description Confirmation timestamp. */
            confirmed_at?: number;
            /** @description Receive timestamp. */
            received_at?: number;
            /** @description Log index. */
            log_index?: number;
            /** @description Block index. */
            block_index?: number;
            trader: {
                /** @description Wallet address. */
                address?: string;
                /** @description Display name. */
                name?: string | null;
                /** @description Pseudonym. */
                pseudonym?: string | null;
                /** @description Profile image URL. */
                profile_image?: string | null;
                /** @description X username. */
                x_username?: string | null;
                /** @description Whether the profile is verified. */
                verified_badge?: boolean;
            };
            /** @description Market condition ID. */
            condition_id?: string | null;
            /** @description Market question. */
            question?: string | null;
            /** @description Image URL. */
            image_url?: string | null;
            /** @description Market slug. */
            slug?: string | null;
            /** @description Event slug. */
            event_slug?: string | null;
            /** @description Trade amount in USD. */
            usd_amount?: number;
            /** @description Position details. */
            position_details?: {
                /** @description Outcome token ID. */
                position_id?: string;
                /** @description Outcome index. */
                outcome_index?: number;
                /** @description Amount as a decimal string. */
                amount?: string;
            }[];
            /** @description Exchange identifier. */
            exchange: number;
        };
        /**
         * Split
         * @description Collateral deposited to receive outcome tokens.
         */
        TradePositionsConvertedEvent: {
            /**
             * @description Trade type.
             * @enum {string}
             */
            trade_type: "Split";
            /** @description Event ID. */
            id: string;
            /** @description Transaction hash. */
            hash: string;
            /** @description Block number. */
            block?: number;
            /** @description Confirmation timestamp. */
            confirmed_at?: number;
            /** @description Receive timestamp. */
            received_at?: number;
            /** @description Log index. */
            log_index?: number;
            /** @description Block index. */
            block_index?: number;
            trader: {
                /** @description Wallet address. */
                address?: string;
                /** @description Display name. */
                name?: string | null;
                /** @description Pseudonym. */
                pseudonym?: string | null;
                /** @description Profile image URL. */
                profile_image?: string | null;
                /** @description X username. */
                x_username?: string | null;
                /** @description Whether the profile is verified. */
                verified_badge?: boolean;
            };
            /** @description Market condition ID. */
            condition_id?: string | null;
            /** @description Market question. */
            question?: string | null;
            /** @description Image URL. */
            image_url?: string | null;
            /** @description Market slug. */
            slug?: string | null;
            /** @description Event slug. */
            event_slug?: string | null;
            /** @description Trade amount in USD. */
            usd_amount?: number;
            /** @description Position details. */
            position_details?: {
                /** @description Outcome token ID. */
                position_id?: string;
                /** @description Outcome index. */
                outcome_index?: number;
                /** @description Amount as a decimal string. */
                amount?: string;
            }[];
            /** @description Exchange identifier. */
            exchange: number;
        };
        /**
         * PositionsConverted
         * @description NegRisk NO tokens converted to YES tokens + collateral.
         */
        TradeCancelledEvent: {
            /**
             * @description Trade type.
             * @enum {string}
             */
            trade_type: "PositionsConverted";
            /** @description Event ID. */
            id: string;
            /** @description Transaction hash. */
            hash: string;
            /** @description Block number. */
            block?: number;
            /** @description Confirmation timestamp. */
            confirmed_at?: number;
            /** @description Receive timestamp. */
            received_at?: number;
            /** @description Log index. */
            log_index?: number;
            /** @description Block index. */
            block_index?: number;
            trader: {
                /** @description Wallet address. */
                address?: string;
                /** @description Display name. */
                name?: string | null;
                /** @description Pseudonym. */
                pseudonym?: string | null;
                /** @description Profile image URL. */
                profile_image?: string | null;
                /** @description X username. */
                x_username?: string | null;
                /** @description Whether the profile is verified. */
                verified_badge?: boolean;
            };
            /** @description Market id. */
            market_id?: string;
            /** @description Index set. */
            index_set?: string;
            /** @description Trade size in shares. */
            shares_amount?: number;
            /** @description Fee. */
            fee?: number;
            /** @description Fee percent. */
            fee_pct?: number;
            /** @description Per-position conversion amounts */
            position_details?: {
                /** @description Outcome token ID. */
                position_id?: string;
                /** @description Outcome index. */
                outcome_index?: number;
                /** @description Amount as a decimal string. */
                amount?: string;
            }[];
            /** @description Exchange identifier. */
            exchange: number;
        };
        /**
         * Cancelled
         * @description Order cancelled on-chain.
         */
        TradeOracleLifecycleEvent: {
            /**
             * @description Trade type.
             * @enum {string}
             */
            trade_type: "Cancelled";
            /** @description Event ID. */
            id: string;
            /** @description Transaction hash. */
            hash: string;
            /** @description Block number. */
            block?: number;
            /** @description Confirmation timestamp. */
            confirmed_at?: number;
            /** @description Receive timestamp. */
            received_at?: number;
            /** @description Log index. */
            log_index?: number;
            /** @description Block index. */
            block_index?: number;
            /** @description Order hash. */
            order_hash?: string;
            /** @description Market question. */
            question?: string | null;
            /** @description Image URL. */
            image_url?: string | null;
            /** @description Market slug. */
            slug?: string | null;
            /** @description Event slug. */
            event_slug?: string | null;
            /** @description Exchange identifier. */
            exchange: number;
        };
        /**
         * Oracle Lifecycle Event
         * @description Market lifecycle events: Initialization, Proposal, Dispute, Settled, Resolution, ConditionResolution, Reset, Flag, Unflag, Pause, Unpause, ManualResolution, NegRiskOutcomeReported.
         */
        TradeRegisterTokenEvent: {
            /**
             * @description Oracle lifecycle event type.
             * @enum {string}
             */
            trade_type: "Initialization" | "Proposal" | "Dispute" | "Settled" | "Resolution" | "ConditionResolution" | "Reset" | "Flag" | "Unflag" | "Pause" | "Unpause" | "ManualResolution" | "NegRiskOutcomeReported";
            /** @description Event ID. */
            id: string;
            /** @description Transaction hash. */
            hash: string;
            /** @description Block number. */
            block?: number;
            /** @description Confirmation timestamp. */
            confirmed_at?: number;
            /** @description Receive timestamp. */
            received_at?: number;
            /** @description Log index. */
            log_index?: number;
            /** @description Block index. */
            block_index?: number;
            /** @description Oracle contract. */
            oracle_contract: string;
            /** @description Market condition ID. */
            condition_id: string;
            /** @description Market question. */
            question?: string | null;
            /** @description Image URL. */
            image_url?: string | null;
            /** @description Market slug. */
            slug?: string | null;
            /** @description Event slug. */
            event_slug?: string | null;
            /** @description Assertion id. */
            assertion_id?: string | null;
            /** @description Proposer. */
            proposer?: string | null;
            /** @description Disputer. */
            disputer?: string | null;
            /** @description Proposed outcome. */
            proposed_outcome?: string | null;
            /** @description Settled price. */
            settled_price?: number | null;
            /** @description Disputed. */
            disputed?: boolean | null;
            /** @description Settlement resolution. */
            settlement_resolution?: boolean | null;
            /** @description Bond. */
            bond?: string | null;
            /** @description Expiration time. */
            expiration_time?: number | null;
            /** @description Creator. */
            creator?: string | null;
            /** @description Reward token. */
            reward_token?: string | null;
            /** @description Reward details. */
            reward?: string | null;
            /** @description Proposal bond. */
            proposal_bond?: string | null;
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

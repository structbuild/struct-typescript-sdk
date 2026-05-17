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
        /** @description Payload delivered when a market's volume or transaction metrics cross a configured threshold */
        ConditionMetricsPayload: {
            /** @description Market condition ID */
            condition_id?: string | null;
            /** @description Aggregation window */
            timeframe?: null | ("1m" | "5m" | "15m" | "30m" | "1h" | "4h" | "6h" | "1d" | "24h" | "7d" | "30d");
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
            timeframe?: null | ("1m" | "5m" | "15m" | "30m" | "1h" | "4h" | "6h" | "1d" | "24h" | "7d" | "30d");
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
        /** @description Event PnL webhook payload. */
        EventPnlPayload: {
            trader?: string | null;
            event_slug?: string | null;
            /** @description Aggregation timeframe: "1d", "7d", "30d", or "lifetime" */
            timeframe: string;
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
            realized_pnl_usd?: number | null;
            /** Format: int64 */
            winning_markets?: number | null;
            /** Format: int64 */
            losing_markets?: number | null;
            /** Format: double */
            total_fees?: number | null;
            /** Format: int64 */
            first_trade_at?: number | null;
            /** Format: int64 */
            last_trade_at?: number | null;
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
            /** Format: double */
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
            /** Format: int64 */
            markets_won?: number | null;
            /** Format: int64 */
            markets_lost?: number | null;
            /** Format: double */
            market_win_rate_pct?: number | null;
            /** Format: double */
            avg_pnl_per_market?: number | null;
            /** Format: double */
            avg_pnl_per_trade?: number | null;
            /** Format: double */
            avg_hold_time_seconds?: number | null;
            /** Format: double */
            total_fees?: number | null;
            /** Format: double */
            best_trade_pnl_usd?: number | null;
            best_trade_condition_id?: string | null;
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
            /** @description Aggregation timeframe: "1d", "7d", "30d", or "lifetime" */
            timeframe: string;
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
            /** Format: double */
            buy_usd?: number | null;
            /** Format: double */
            sell_usd?: number | null;
            /** Format: double */
            redemption_usd?: number | null;
            /** Format: double */
            merge_usd?: number | null;
            /** Format: double */
            realized_pnl_usd?: number | null;
            /** Format: int64 */
            winning_outcomes?: number | null;
            /** Format: double */
            total_fees?: number | null;
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
        /**
         * @description PnL aggregation windows accepted by `*_pnl.timeframes`.
         * @enum {string}
         */
        PnlFilterTimeframe: "1d" | "7d" | "30d" | "lifetime";
        /**
         * @description PnL timeframe enum for webhook filtering
         * @enum {string}
         */
        PnlTimeframeFilter: "1d" | "7d" | "30d" | "lifetime";
        /**
         * @description Polymarket webhook event types
         * @enum {string}
         */
        PolymarketWebhookEvent: "trader_first_trade" | "trader_new_market" | "trader_whale_trade" | "trader_new_trade" | "trader_trade_event" | "trader_global_pnl" | "trader_market_pnl" | "trader_event_pnl" | "trader_global_pnl_v3" | "trader_market_pnl_v3" | "trader_event_pnl_v3" | "trader_category_pnl_v3" | "trader_position_resolved_v3" | "condition_metrics" | "event_metrics" | "tag_metrics" | "position_metrics" | "market_volume_milestone" | "event_volume_milestone" | "position_volume_milestone" | "probability_spike" | "market_volume_spike" | "event_volume_spike" | "position_volume_spike" | "close_to_bond" | "market_created" | "asset_price_tick" | "asset_price_window_update" | "price_spike" | "oracle_events";
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
            timeframe?: null | ("1m" | "5m" | "15m" | "30m" | "1h" | "4h" | "6h" | "1d" | "24h" | "7d" | "30d");
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
             * @description Probability at the start of the observation window (the baseline snapshot)
             */
            previous_probability: number;
            /**
             * Format: double
             * @description Current probability that triggered the spike
             */
            current_probability: number;
            /** @description Direction of the spike: `"up"` (probability rising) or `"down"` (probability falling) */
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
            timeframe?: null | ("1m" | "5m" | "15m" | "30m" | "1h" | "4h" | "6h" | "1d" | "24h" | "7d" | "30d");
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
        TradeEventFilterType: "OrderFilled" | "Redemption" | "Merge" | "Split" | "Cancelled" | "PositionsConverted" | "OrdersMatched" | "Initialization" | "Proposal" | "Dispute" | "Settled" | "Resolution" | "ConditionResolution" | "Reset" | "Flag" | "Unflag" | "Pause" | "Unpause" | "ManualResolution" | "NegRiskOutcomeReported" | "RegisterToken" | "Approval";
        /** @description Subscription filters for the `trader_event_pnl` event. All fields are optional. */
        TraderEventPnlFilters: {
            /** @description Track only these trader wallet addresses. */
            traders?: string[] | null;
            /** @description Restrict to these events. */
            event_slugs?: string[] | null;
            /**
             * Format: double
             * @description Only fire when per-event realized PnL ≥ this value (USD).
             */
            min_realized_pnl_usd?: number | null;
            /**
             * Format: double
             * @description Only fire when per-event realized PnL ≤ this value (USD).
             */
            max_realized_pnl_usd?: number | null;
            /**
             * Format: double
             * @description Only fire when total event volume ≥ this value (USD).
             */
            min_volume_usd?: number | null;
            /**
             * Format: double
             * @description Only fire when total event volume ≤ this value (USD).
             */
            max_volume_usd?: number | null;
            /**
             * Format: double
             * @description Only fire when buy volume within the event ≥ this value (USD).
             */
            min_buy_usd?: number | null;
            /**
             * Format: double
             * @description Only fire when sell volume within the event ≥ this value (USD).
             */
            min_sell_volume_usd?: number | null;
            /**
             * Format: int64
             * @description Only fire when the trader has traded in ≥ this many markets within the event.
             */
            min_markets_traded?: number | null;
            /** @description Restrict to these PnL windows. */
            timeframes?: components["schemas"]["PnlFilterTimeframe"][] | null;
            /** @description When `true`, suppress webhooks for short-term "updown" markets. Default: `false`. */
            exclude_shortterm_markets?: boolean | null;
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
            trade_types?: ("OrderFilled" | "Redemption" | "Merge" | "Split" | "Cancelled" | "PositionsConverted" | "OrdersMatched" | "Initialization" | "Proposal" | "Dispute" | "Settled" | "Resolution" | "ConditionResolution" | "Reset" | "Flag" | "Unflag" | "Pause" | "Unpause" | "ManualResolution" | "NegRiskOutcomeReported" | "RegisterToken" | "Approval")[] | null;
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
        WebhookTimeframe: "1m" | "5m" | "15m" | "30m" | "1h" | "4h" | "6h" | "1d" | "24h" | "7d" | "30d";
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
            trade_types?: ("OrderFilled" | "OrdersMatched" | "Redemption" | "Merge" | "Split" | "Cancelled" | "PositionsConverted" | "MakerRebate" | "Reward" | "Yield" | "Initialization" | "Proposal" | "Dispute" | "Settled" | "Resolution" | "ConditionResolution" | "Reset" | "Flag" | "Unflag" | "Pause" | "Unpause" | "ManualResolution" | "NegRiskOutcomeReported" | "RegisterToken")[];
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
            trade_type: "MakerRebate" | "Reward" | "Yield";
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
            /** @description Payout distributor address */
            taker?: string;
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
        };
        /** @description Subscribe to the asset prices stream. Empty asset_symbols = all assets. */
        AssetPricesSubscribeMessage: {
            /** @enum {string} */
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
            /** @enum {string} */
            action: "subscribe" | "unsubscribe_all";
            /** @description Uppercase asset symbols (BTC, ETH, SOL, XRP, DOGE, BNB, HYPE) */
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
            /** Format: int64 */
            unique_traders: number;
            /** Format: int64 */
            unique_makers: number;
            /** Format: int64 */
            unique_takers: number;
            /** Format: int64 */
            unique_builder_traders: number;
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
            /** @description Shares/contracts volume in this timeframe window (decimal string) */
            shares_volume: string;
            /** @description Builder-attributed USD volume in this timeframe window (decimal string) */
            builder_usd_volume: string;
            /** @description Builder-attributed shares/contracts volume in this timeframe window (decimal string) */
            builder_shares_volume: string;
            fees: number;
            builder_fees: number;
            /** Format: int64 */
            txns: number;
            /** Format: int64 */
            builder_txns: number;
            /** Format: int64 */
            unique_traders: number;
            /** Format: int64 */
            unique_makers: number;
            /** Format: int64 */
            unique_takers: number;
            /** Format: int64 */
            unique_builder_traders: number;
        };
        /** @description Subscribe to the tag metrics stream. tags is required and must be non-empty. */
        TagMetricsSubscribeMessage: {
            /** @enum {string} */
            action: "subscribe" | "unsubscribe_all";
            /** @description Tag labels or slugs, matched case-insensitively */
            tags: string[];
        };
        /** @description Server acknowledgement for a tag metrics subscription */
        TagMetricsSubscribeResponse: {
            tags?: string[];
            rejected?: string[];
            error?: string | null;
        };
        /** @description Server-pushed event: aggregated metrics update for one timeframe of a tag. Envelope type: "tag_metrics_update". One event is emitted per timeframe window on each update. */
        TagMetricsEvent: {
            tag: string;
            /** @enum {string} */
            timeframe: "1m" | "5m" | "30m" | "1h" | "6h" | "24h" | "7d" | "30d";
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
            fees: number;
            builder_fees: number;
            /** Format: int64 */
            txns: number;
            /** Format: int64 */
            builder_txns: number;
            /** Format: int64 */
            unique_traders: number;
            /** Format: int64 */
            unique_makers: number;
            /** Format: int64 */
            unique_takers: number;
            /** Format: int64 */
            unique_builder_traders: number;
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
            fees: number;
            builder_fees: number;
            /** Format: int64 */
            txns: number;
            /** Format: int64 */
            buys: number;
            /** Format: int64 */
            sells: number;
            /** Format: int64 */
            builder_txns: number;
            /** Format: int64 */
            builder_buys: number;
            /** Format: int64 */
            builder_sells: number;
            /** Format: int64 */
            unique_traders: number;
            /** Format: int64 */
            unique_makers: number;
            /** Format: int64 */
            unique_takers: number;
            /** Format: int64 */
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
            avg_trade_shares: number;
            avg_buy_shares: number;
            avg_sell_shares: number;
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
        /** @description Subscribe to the trader PnL v3 stream. `traders` is required and must be non-empty. `update_types` and `timeframes` are optional narrowing filters — omit or leave empty to receive all update types / timeframes. */
        TraderPnlV3SubscribeMessage: {
            /** @enum {string} */
            action: "subscribe" | "unsubscribe_all";
            /** @description EVM wallet addresses */
            traders: string[];
            /** @description Restrict pushed updates to this subset of PnL granularities. Empty/omitted = all four. Unknown values reject the subscription. */
            update_types?: ("global" | "market" | "event" | "category")[];
            /** @description Restrict pushed updates to these aggregation timeframes. Empty/omitted = all four. Unknown values reject the subscription. */
            timeframes?: ("1d" | "7d" | "30d" | "lifetime")[];
        };
        /** @description Server acknowledgement for a trader PnL v3 subscription. Echoes the accepted (normalized) filter sets so clients can confirm the active subscription. */
        TraderPnlV3SubscribeResponse: {
            traders?: string[];
            /** @description Accepted update types. Empty = all. */
            update_types?: ("global" | "market" | "event" | "category")[];
            /** @description Accepted timeframes. Empty = all. */
            timeframes?: ("1d" | "7d" | "30d" | "lifetime")[];
            /** @description Trader addresses that were rejected (invalid EVM format). */
            rejected?: string[];
            /** @description Set if the entire subscription was rejected (e.g. empty traders, or an invalid update_type / timeframe value). */
            error?: string | null;
        };
        /** @description Server-pushed event: global (portfolio-level) PnL update for a trader. Envelope type: "trader_global_pnl_update_v3". */
        TraderGlobalPnlV3Event: {
            /** @description Trader EVM wallet address */
            trader: string;
            /** @description "1d", "7d", "30d", or "lifetime" */
            timeframe?: string | null;
            current_pnl: number;
            pnl_1d?: number | null;
            pnl_7d?: number | null;
            pnl_30d?: number | null;
            /** Format: int64 */
            events_traded?: number;
            /** Format: int64 */
            markets_traded?: number;
            /** Format: int64 */
            total_buys?: number;
            /** Format: int64 */
            total_sells?: number;
            /** Format: int64 */
            total_redemptions?: number;
            /** Format: int64 */
            total_merges?: number;
            /** Format: int64 */
            total_splits?: number;
            total_volume_usd?: number;
            buy_volume_usd?: number;
            sell_volume_usd?: number;
            redemption_volume_usd?: number;
            merge_volume_usd?: number;
            split_volume_usd?: number;
            /** Format: int64 */
            maker_rebate_count?: number;
            maker_rebate_usd?: number;
            /** Format: int64 */
            reward_count?: number;
            reward_usd?: number;
            /** Format: int64 */
            yield_count?: number;
            yield_usd?: number;
            /** Format: int64 */
            total_credit_count?: number;
            total_credit_usd?: number;
            /** Format: int64 */
            markets_won?: number;
            /** Format: int64 */
            markets_lost?: number;
            market_win_rate_pct?: number;
            total_wins_usd?: number;
            total_losses_usd?: number;
            avg_win_usd?: number | null;
            avg_loss_usd?: number | null;
            profit_factor?: number | null;
            avg_hold_time_seconds?: number;
            total_fees?: number;
            best_trade_pnl_usd?: number | null;
            best_trade_condition_id?: string | null;
            worst_trade_pnl_usd?: number | null;
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
        /** @description Server-pushed event: per-market PnL update for a trader. Envelope type: "trader_market_pnl_update_v3". */
        TraderMarketPnlV3Event: {
            trader: string;
            /** @description "1d", "7d", "30d", or "lifetime" */
            timeframe?: string | null;
            /** @description 64-char hex condition ID */
            condition_id: string;
            realized_pnl_usd?: number;
            open_positions_value?: number;
            current_shares_balance?: number;
            category?: string | null;
            event_slug?: string | null;
            /** Format: int64 */
            outcomes_traded?: number;
            /** Format: int64 */
            total_buys?: number;
            /** Format: int64 */
            total_sells?: number;
            /** Format: int64 */
            total_redemptions?: number;
            /** Format: int64 */
            total_merges?: number;
            /** Format: int64 */
            total_splits?: number;
            buy_usd?: number;
            sell_usd?: number;
            redemption_usd?: number;
            merge_usd?: number;
            split_volume_usd?: number;
            total_fees?: number;
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
        /** @description Server-pushed event: per-event PnL update for a trader. Envelope type: "trader_event_pnl_update_v3". */
        TraderEventPnlV3Event: {
            trader: string;
            /** @description "1d", "7d", "30d", or "lifetime" */
            timeframe?: string | null;
            event_slug: string;
            /** Format: int64 */
            markets_traded?: number;
            /** Format: int64 */
            outcomes_traded?: number;
            /** Format: int64 */
            total_buys?: number;
            /** Format: int64 */
            total_sells?: number;
            /** Format: int64 */
            total_redemptions?: number;
            /** Format: int64 */
            total_merges?: number;
            /** Format: int64 */
            total_splits?: number;
            total_volume_usd?: number;
            buy_usd?: number;
            sell_usd?: number;
            redemption_usd?: number;
            merge_usd?: number;
            split_volume_usd?: number;
            total_fees?: number;
            realized_pnl_usd?: number;
            open_positions_value?: number;
            current_shares_balance?: number;
            /** Format: int64 */
            markets_won?: number;
            /** Format: int64 */
            markets_lost?: number;
            market_win_rate_pct?: number;
            total_wins_usd?: number;
            total_losses_usd?: number;
            avg_win_usd?: number | null;
            avg_loss_usd?: number | null;
            profit_factor?: number | null;
            avg_hold_time_seconds?: number;
            best_trade_pnl_usd?: number | null;
            best_trade_condition_id?: string | null;
            worst_trade_pnl_usd?: number | null;
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
        /** @description Server-pushed event: per-category PnL update for a trader. Envelope type: "trader_category_pnl_update_v3". */
        TraderCategoryPnlV3Event: {
            trader: string;
            /** @description "1d", "7d", "30d", or "lifetime" */
            timeframe?: string | null;
            category: string;
            realized_pnl_usd?: number;
            open_positions_value?: number;
            current_shares_balance?: number;
            /** Format: int64 */
            markets_in_category?: number;
            /** Format: int64 */
            markets_traded?: number;
            /** Format: int64 */
            outcomes_traded?: number;
            /** Format: int64 */
            total_buys?: number;
            /** Format: int64 */
            total_sells?: number;
            /** Format: int64 */
            total_redemptions?: number;
            /** Format: int64 */
            total_merges?: number;
            /** Format: int64 */
            total_splits?: number;
            total_volume_usd?: number;
            buy_usd?: number;
            sell_usd?: number;
            redemption_usd?: number;
            merge_usd?: number;
            split_volume_usd?: number;
            total_fees?: number;
            total_shares_bought?: number;
            /** Format: int64 */
            markets_won?: number;
            /** Format: int64 */
            markets_lost?: number;
            market_win_rate_pct?: number;
            avg_hold_time_seconds?: number;
            best_trade_pnl_usd?: number | null;
            best_trade_condition_id?: string | null;
            worst_trade_pnl_usd?: number | null;
            worst_trade_condition_id?: string | null;
            total_wins_usd?: number;
            total_losses_usd?: number;
            avg_win_usd?: number | null;
            avg_loss_usd?: number | null;
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
        /** @description Subscribe to the trader positions v3 stream. `traders` is required and must be non-empty. `update_types` is an optional narrowing filter — empty/omitted = both. */
        TraderPositionsV3SubscribeMessage: {
            /** @enum {string} */
            action: "subscribe" | "unsubscribe_all";
            /** @description EVM wallet addresses */
            traders: string[];
            /** @description Restrict pushed updates to this subset. Empty/omitted = both. Unknown values reject the subscription. */
            update_types?: ("lifetime" | "resolved")[];
        };
        /** @description Server acknowledgement for a trader positions v3 subscription. */
        TraderPositionsV3SubscribeResponse: {
            traders?: string[];
            /** @description Accepted update types. Empty = all. */
            update_types?: ("lifetime" | "resolved")[];
            rejected?: string[];
            error?: string | null;
        };
        /** @description Server-pushed event: lifetime position snapshot for a tracked trader. Envelope type: "trader_position_lifetime_update_v3". Pushed whenever the position's PnL changes. */
        TraderPositionLifetimeUpdateV3Event: {
            /** @description Trader EVM wallet address */
            trader: string;
            /** @description ERC-1155 token ID (decimal string) */
            position_id: string;
            condition_id?: string | null;
            event_slug?: string | null;
            /** @description Outcome name (e.g. "Yes") */
            outcome?: string | null;
            outcome_index?: number | null;
            /** Format: int64 */
            total_buys?: number;
            /** Format: int64 */
            total_sells?: number;
            /** Format: int64 */
            total_merges?: number;
            /** Format: int64 */
            total_splits?: number;
            winning_outcome_index?: number | null;
            total_shares_bought?: number;
            total_shares_sold?: number;
            buy_usd?: number;
            sell_usd?: number;
            /** @description Average entry price (0–1) */
            avg_entry_price?: number;
            total_fees?: number;
            realized_pnl_usd?: number;
            redemption_usd?: number;
            /** @description True if this outcome resolved as winner */
            won?: boolean | null;
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
        /** @description Server-pushed event: a position has resolved. Envelope type: "trader_position_resolved_v3". Pushed once per resolved position. Inspect `won` to see whether the outcome paid out. */
        TraderPositionResolvedV3Event: {
            /** @description Trader EVM wallet address */
            trader: string;
            /** @description ERC-1155 token ID (decimal string) */
            position_id: string;
            condition_id?: string | null;
            event_slug?: string | null;
            /** @description Outcome name (e.g. "Yes") */
            outcome?: string | null;
            outcome_index?: number | null;
            /** Format: int64 */
            total_buys?: number;
            /** Format: int64 */
            total_sells?: number;
            /** Format: int64 */
            total_merges?: number;
            /** Format: int64 */
            total_splits?: number;
            winning_outcome_index?: number | null;
            total_shares_bought?: number;
            total_shares_sold?: number;
            buy_usd?: number;
            sell_usd?: number;
            /** @description Average entry price (0–1) */
            avg_entry_price?: number;
            total_fees?: number;
            realized_pnl_usd?: number;
            redemption_usd?: number;
            /** @description True if this outcome resolved as winner */
            won?: boolean | null;
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
        /** @description Subscribe to the trader position-resolved v3 stream. `traders` is required and must be non-empty. */
        TraderPositionResolvedV3SubscribeMessage: {
            /** @enum {string} */
            action: "subscribe" | "unsubscribe_all";
            /** @description EVM wallet addresses */
            traders: string[];
        };
        /** @description Server acknowledgement for a trader position-resolved v3 subscription. */
        TraderPositionResolvedV3SubscribeResponse: {
            traders?: string[];
            rejected?: string[];
            error?: string | null;
        };
        /** @description Server-pushed event: a position has resolved. Envelope type: "trader_position_resolved_v3". Pushed once per resolved position. Inspect `won` to see whether the outcome paid out. */
        TraderPositionResolvedV3OnlyEvent: {
            /** @description Trader EVM wallet address */
            trader: string;
            /** @description ERC-1155 token ID (decimal string) */
            position_id: string;
            condition_id?: string | null;
            event_slug?: string | null;
            /** @description Outcome name (e.g. "Yes") */
            outcome?: string | null;
            outcome_index?: number | null;
            /** Format: int64 */
            total_buys?: number;
            /** Format: int64 */
            total_sells?: number;
            /** Format: int64 */
            total_merges?: number;
            /** Format: int64 */
            total_splits?: number;
            winning_outcome_index?: number | null;
            total_shares_bought?: number;
            total_shares_sold?: number;
            buy_usd?: number;
            sell_usd?: number;
            /** @description Average entry price (0–1) */
            avg_entry_price?: number;
            total_fees?: number;
            realized_pnl_usd?: number;
            redemption_usd?: number;
            /** @description True if this outcome resolved as winner */
            won?: boolean | null;
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
        /** @description Subscribe to the accounts stream. `wallets` is required. Share balance updates (`accounts_update`) are always delivered. Set `include_usdce`, `include_pusd`, or `include_matic` to also receive those balance streams. */
        AccountsSubscribeMessage: {
            /** @enum {string} */
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
            wallets?: string[];
            /** @description Addresses rejected (invalid format) */
            rejected?: string[];
            include_usdce?: boolean;
            include_pusd?: boolean;
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
        /** @description Server-pushed event: pUSD (V2 CLOB collateral) balance change for a wallet. Envelope type: "pusd_update". Only delivered when `include_pusd: true`. */
        PusdUpdateEvent: {
            /** @description Wallet address (0x-prefixed hex) */
            address: string;
            /** @description pUSD contract address — omitted when not available */
            token_address?: string;
            /** @description Current pUSD balance (decimal string) — omitted when not available */
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
         * MakerRebate / Reward / Yield
         * @description pUSD credit paid directly to the trader wallet.
         */
        TradeRedemptionEvent: {
            /** @enum {string} */
            trade_type: "MakerRebate" | "Reward" | "Yield";
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
            /** @description Payout distributor address */
            taker?: string;
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
        TradeSplitEvent: {
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
        TradePositionsConvertedEvent: {
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
        TradeCancelledEvent: {
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
        TradeOracleLifecycleEvent: {
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
        TradeRegisterTokenEvent: {
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
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;

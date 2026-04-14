export type paths = Record<string, never>;
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
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
            /** @description Outcome index: 0 = Yes/Up, 1 = No */
            outcome_index?: number | null;
            /** @description Market question text */
            question?: string | null;
            /** @description Market slug */
            market_slug?: string | null;
            /** @description Parent event slug */
            event_slug?: string | null;
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
            /** @description USD size of the trade (6 decimal places) */
            amount_usd: number;
            /** @description Outcome shares traded (6 decimal places) */
            shares_amount: number;
            /** @description Fee paid in USD (6 decimal places) */
            fee: number;
            /**
             * @description Trade direction
             * @enum {string}
             */
            side: "Buy" | "Sell";
            /** @description Outcome token price (0.0–1.0) */
            price: number;
            /**
             * @description Exchange contract that processed the trade
             * @enum {string}
             */
            exchange: "CTFExchange" | "NegRiskExchange" | "ConditionalTokens" | "NegRiskAdapter" | "Unknown";
            /**
             * @description Trade type (webhook events only fire on order fills)
             * @enum {string}
             */
            trade_type: "OrderFilled" | "OrdersMatched";
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
            /** @description Outcome index: 0 = Yes/Up, 1 = No */
            outcome_index?: number | null;
            /** @description Market question text */
            question?: string | null;
            /** @description Market slug */
            market_slug?: string | null;
            /** @description Parent event slug */
            event_slug?: string | null;
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
            /** @description USD size of the trade (6 decimal places) */
            amount_usd: number;
            /** @description Outcome shares traded (6 decimal places) */
            shares_amount: number;
            /** @description Fee paid in USD (6 decimal places) */
            fee: number;
            /**
             * @description Trade direction
             * @enum {string}
             */
            side: "Buy" | "Sell";
            /** @description Outcome token price (0.0–1.0) */
            price: number;
            /** @description Implied probability (0.0–1.0); null when outcome is unknown */
            probability?: number | null;
            /**
             * @description Exchange contract that processed the trade
             * @enum {string}
             */
            exchange: "CTFExchange" | "NegRiskExchange" | "ConditionalTokens" | "NegRiskAdapter" | "Unknown";
            /**
             * @description Trade type (webhook events only fire on order fills)
             * @enum {string}
             */
            trade_type: "OrderFilled" | "OrdersMatched";
        };
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
            /** @description Outcome index: 0 = Yes/Up, 1 = No */
            outcome_index?: number | null;
            /** @description Market question text */
            question?: string | null;
            /** @description Market slug */
            market_slug?: string | null;
            /** @description Parent event slug */
            event_slug?: string | null;
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
            /** @description USD size of the trade (6 decimal places) */
            amount_usd: number;
            /** @description Outcome shares traded (6 decimal places) */
            shares_amount: number;
            /** @description Fee paid in USD (6 decimal places) */
            fee: number;
            /**
             * @description Trade direction
             * @enum {string}
             */
            side: "Buy" | "Sell";
            /** @description Outcome token price (0.0–1.0) */
            price: number;
            /** @description Implied probability (0.0–1.0); null when outcome is unknown */
            probability?: number | null;
            /**
             * @description Exchange contract that processed the trade
             * @enum {string}
             */
            exchange: "CTFExchange" | "NegRiskExchange" | "ConditionalTokens" | "NegRiskAdapter" | "Unknown";
            /**
             * @description Trade type (webhook events only fire on order fills)
             * @enum {string}
             */
            trade_type: "OrderFilled" | "OrdersMatched";
        };
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
            /** @description Outcome index: 0 = Yes/Up, 1 = No */
            outcome_index?: number | null;
            /** @description Market question text */
            question?: string | null;
            /** @description Market slug */
            market_slug?: string | null;
            /** @description Parent event slug */
            event_slug?: string | null;
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
            /** @description USD size of the trade (6 decimal places) */
            amount_usd: number;
            /** @description Outcome shares traded (6 decimal places) */
            shares_amount: number;
            /** @description Fee paid in USD (6 decimal places) */
            fee: number;
            /**
             * @description Trade direction
             * @enum {string}
             */
            side: "Buy" | "Sell";
            /** @description Outcome token price (0.0–1.0) */
            price: number;
            /** @description Implied probability (0.0–1.0); null when outcome is unknown */
            probability?: number | null;
            /**
             * @description Exchange contract that processed the trade
             * @enum {string}
             */
            exchange: "CTFExchange" | "NegRiskExchange" | "ConditionalTokens" | "NegRiskAdapter" | "Unknown";
            /**
             * @description Trade type (webhook events only fire on order fills)
             * @enum {string}
             */
            trade_type: "OrderFilled" | "OrdersMatched";
        };
        /** @description Exact payload union for `trade_event` webhook deliveries. These callbacks are emitted from the live confirmed trade pipeline, so pending-only fields such as `received_at` are absent. */
        WebhookTradeEventPayload: {
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
            operator: string;
            approved: boolean;
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
            trade_type: "Approval";
        };
        /** @description Payload delivered when a trader's global PnL (across all markets) crosses a configured threshold */
        GlobalPnlPayload: {
            /** @description Trader wallet address (lowercase) */
            trader?: string | null;
            /**
             * @description PnL aggregation window
             * @enum {string}
             */
            timeframe: "1d" | "7d" | "30d" | "lifetime";
            /** @description Realized PnL in USD (positive = profit, negative = loss) */
            realized_pnl_usd?: number | null;
            /**
             * Format: int64
             * @description Number of distinct events traded
             */
            events_traded?: number | null;
            /**
             * Format: int64
             * @description Number of distinct markets traded
             */
            markets_traded?: number | null;
            /**
             * Format: int64
             * @description Total buy transactions
             */
            total_buys?: number | null;
            /**
             * Format: int64
             * @description Total sell transactions
             */
            total_sells?: number | null;
            /**
             * Format: int64
             * @description Total redemption transactions
             */
            total_redemptions?: number | null;
            /**
             * Format: int64
             * @description Total merge transactions
             */
            total_merges?: number | null;
            /** @description Total USD volume (buys + sells + redemptions + merges) */
            total_volume_usd?: number | null;
            /** @description Total buy volume in USD */
            buy_volume_usd?: number | null;
            /** @description Total sell volume in USD */
            sell_volume_usd?: number | null;
            /** @description Total redemption volume in USD */
            redemption_volume_usd?: number | null;
            /** @description Total merge volume in USD */
            merge_volume_usd?: number | null;
            /**
             * Format: int64
             * @description Number of markets where trader realised a profit
             */
            markets_won?: number | null;
            /**
             * Format: int64
             * @description Number of markets where trader realised a loss
             */
            markets_lost?: number | null;
            /** @description Market win rate as a percentage (0.0–100.0) */
            market_win_rate_pct?: number | null;
            /** @description Average PnL per market in USD */
            avg_pnl_per_market?: number | null;
            /** @description Average PnL per trade in USD */
            avg_pnl_per_trade?: number | null;
            /** @description Average hold time across all positions (seconds) */
            avg_hold_time_seconds?: number | null;
            /** @description Total fees paid in USD */
            total_fees?: number | null;
            /** @description Best single-trade PnL in USD */
            best_trade_pnl_usd?: number | null;
            /** @description Condition ID of the best trade */
            best_trade_condition_id?: string | null;
            /**
             * Format: int64
             * @description Timestamp of the first trade (Unix seconds)
             */
            first_trade_at?: number | null;
            /**
             * Format: int64
             * @description Timestamp of the most recent trade (Unix seconds)
             */
            last_trade_at?: number | null;
        };
        /** @description Payload delivered when a trader's per-market PnL crosses a configured threshold */
        MarketPnlPayload: {
            /** @description Trader wallet address (lowercase) */
            trader?: string | null;
            /** @description Market condition ID */
            condition_id?: string | null;
            /** @description Parent event slug */
            event_slug?: string | null;
            /**
             * @description PnL aggregation window
             * @enum {string}
             */
            timeframe: "1d" | "7d" | "30d" | "lifetime";
            /**
             * Format: int64
             * @description Number of distinct outcomes traded in this market
             */
            outcomes_traded?: number | null;
            /** Format: int64 */
            total_buys?: number | null;
            /** Format: int64 */
            total_sells?: number | null;
            /** Format: int64 */
            total_redemptions?: number | null;
            /** Format: int64 */
            total_merges?: number | null;
            /** @description Total buy volume in USD */
            buy_usd?: number | null;
            /** @description Total sell volume in USD */
            sell_usd?: number | null;
            /** @description Total redemption volume in USD */
            redemption_usd?: number | null;
            /** @description Total merge volume in USD */
            merge_usd?: number | null;
            /** @description Realized PnL in USD for this market */
            realized_pnl_usd?: number | null;
            /**
             * Format: int64
             * @description Number of outcomes with positive PnL
             */
            winning_outcomes?: number | null;
            /** @description Total fees paid in USD for this market */
            total_fees?: number | null;
            /**
             * Format: int64
             * @description Timestamp of first trade in market (Unix seconds)
             */
            first_trade_at?: number | null;
            /**
             * Format: int64
             * @description Timestamp of most recent trade in market (Unix seconds)
             */
            last_trade_at?: number | null;
        };
        /** @description Payload delivered when a trader's per-event PnL crosses a configured threshold */
        EventPnlPayload: {
            /** @description Trader wallet address (lowercase) */
            trader?: string | null;
            /** @description Event slug */
            event_slug?: string | null;
            /**
             * @description PnL aggregation window
             * @enum {string}
             */
            timeframe: "1d" | "7d" | "30d" | "lifetime";
            /**
             * Format: int64
             * @description Number of distinct markets traded in this event
             */
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
            /** @description Total volume in USD */
            total_volume_usd?: number | null;
            buy_usd?: number | null;
            sell_usd?: number | null;
            redemption_usd?: number | null;
            merge_usd?: number | null;
            /** @description Realized PnL in USD for this event */
            realized_pnl_usd?: number | null;
            /** Format: int64 */
            winning_markets?: number | null;
            /** Format: int64 */
            losing_markets?: number | null;
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
        };
        /** @description Payload delivered when a market's volume or transaction metrics cross a configured threshold */
        ConditionMetricsPayload: {
            /** @description Market condition ID */
            condition_id?: string | null;
            /**
             * @description Aggregation window
             * @enum {string|null}
             */
            timeframe?: "1m" | "5m" | "30m" | "1h" | "6h" | "24h" | "7d" | "30d" | null;
            /** @description Total trading volume in USD for this timeframe */
            volume_usd?: number | null;
            /** @description Total fees collected in USD */
            fees?: number | null;
            /**
             * Format: int64
             * @description Total number of transactions
             */
            txns?: number | null;
            /**
             * Format: int64
             * @description Number of unique traders
             */
            unique_traders?: number | null;
        };
        /** @description Payload delivered when an event's aggregated volume or transaction metrics cross a configured threshold */
        EventMetricsPayload: {
            /** @description Event slug */
            event_slug?: string | null;
            /**
             * @description Aggregation window
             * @enum {string|null}
             */
            timeframe?: "1m" | "5m" | "30m" | "1h" | "6h" | "24h" | "7d" | "30d" | null;
            /** @description Total aggregated volume across all markets in the event (USD) */
            volume_usd?: number | null;
            /** @description Total fees collected in USD */
            fees?: number | null;
            /**
             * Format: int64
             * @description Total number of transactions
             */
            txns?: number | null;
            /**
             * Format: int64
             * @description Number of unique traders
             */
            unique_traders?: number | null;
        };
        /** @description Payload delivered when a position's volume or transaction metrics cross a configured threshold */
        PositionMetricsPayload: {
            /** @description ERC-1155 outcome token ID */
            position_id?: string | null;
            /** @description Outcome name (e.g. "Yes", "No") */
            outcome?: string | null;
            /**
             * Format: int16
             * @description Outcome index
             */
            outcome_index?: number | null;
            /**
             * @description Aggregation window
             * @enum {string|null}
             */
            timeframe?: "1m" | "5m" | "30m" | "1h" | "6h" | "24h" | "7d" | "30d" | null;
            /** @description Total trading volume in USD */
            volume_usd?: number | null;
            /** @description Buy volume in USD */
            buy_volume_usd?: number | null;
            /** @description Sell volume in USD */
            sell_volume_usd?: number | null;
            /** @description Total fees in USD */
            fees?: number | null;
            /** Format: int64 */
            txns?: number | null;
            /** Format: int64 */
            buys?: number | null;
            /** Format: int64 */
            sells?: number | null;
            /** Format: int64 */
            unique_traders?: number | null;
            price_open?: number | null;
            price_close?: number | null;
            price_high?: number | null;
            price_low?: number | null;
            probability_open?: number | null;
            probability_close?: number | null;
            probability_high?: number | null;
            probability_low?: number | null;
        };
        /** @description Payload delivered when a market's trading volume crosses a USD milestone in the specified timeframe */
        VolumeMilestonePayload: {
            /** @description Market condition ID */
            condition_id: string;
            /**
             * @description Aggregation window that crossed the milestone
             * @enum {string}
             */
            timeframe: "1m" | "5m" | "30m" | "1h" | "6h" | "24h" | "7d" | "30d";
            /** @description The USD milestone amount that was crossed */
            milestone_usd: number;
            /** @description Current volume at time of trigger (USD) */
            current_volume_usd: number;
            /** @description Total fees in USD for this timeframe */
            fees: number;
            /**
             * Format: int64
             * @description Total transactions in this timeframe
             */
            txns: number;
        };
        /** @description Payload delivered when an event's aggregated trading volume crosses a USD milestone */
        EventVolumeMilestonePayload: {
            /** @description Event slug */
            event_slug: string;
            /**
             * @description Aggregation window
             * @enum {string}
             */
            timeframe: "1m" | "5m" | "30m" | "1h" | "6h" | "24h" | "7d" | "30d";
            /** @description The USD milestone amount that was crossed */
            milestone_usd: number;
            /** @description Current aggregated event volume at time of trigger (USD) */
            current_volume_usd: number;
            /** @description Total fees in USD for this timeframe */
            fees: number;
            /**
             * Format: int64
             * @description Total transactions in this timeframe
             */
            txns: number;
        };
        /** @description Payload delivered when a position's trading volume crosses a USD milestone */
        PositionVolumeMilestonePayload: {
            /** @description Parent market condition ID */
            condition_id?: string | null;
            /** @description ERC-1155 outcome token ID */
            position_id: string;
            /** @description Outcome name (e.g. "Yes", "No") */
            outcome?: string | null;
            /**
             * Format: int16
             * @description Outcome index
             */
            outcome_index?: number | null;
            /**
             * @description Aggregation window
             * @enum {string}
             */
            timeframe: "1m" | "5m" | "30m" | "1h" | "6h" | "24h" | "7d" | "30d";
            /** @description The USD milestone amount that was crossed */
            milestone_usd: number;
            /** @description Current position volume at time of trigger (USD) */
            current_volume_usd: number;
            /** @description Buy volume in USD for this timeframe */
            buy_volume_usd: number;
            /** @description Sell volume in USD for this timeframe */
            sell_volume_usd: number;
            /** @description Total fees in USD */
            fees: number;
            /** Format: int64 */
            txns: number;
            /** Format: int64 */
            buys: number;
            /** Format: int64 */
            sells: number;
        };
        ProbabilitySpikePayload: {
            /** @description Outcome token ID */
            position_id: string;
            /** @description Market condition ID */
            condition_id?: string | null;
            /** @description Event slug */
            event_slug?: string | null;
            /** @description Outcome name (e.g. "Yes", "No") */
            outcome?: string | null;
            /**
             * Format: int16
             * @description Outcome index
             */
            outcome_index?: number | null;
            /** @description Probability at the start of the observation window (baseline snapshot, 0.0–1.0) */
            previous_probability: number;
            /** @description Current probability that triggered the spike (0.0–1.0) */
            current_probability: number;
            /**
             * @description `"up"` = probability rising, `"down"` = probability falling
             * @enum {string}
             */
            spike_direction: "up" | "down";
            /** @description Percentage move that triggered this notification. Positive = up, negative = down. */
            spike_pct: number;
        };
        PriceSpikePayload: {
            /** @description Outcome token ID */
            position_id: string;
            /** @description Market condition ID */
            condition_id?: string | null;
            /** @description Event slug */
            event_slug?: string | null;
            /** @description Outcome name (e.g. "Yes", "No") */
            outcome?: string | null;
            /**
             * Format: int16
             * @description Outcome index
             */
            outcome_index?: number | null;
            /** @description Price at the start of the observation window (baseline snapshot, 0.0–1.0) */
            previous_price: number;
            /** @description Current price that triggered the spike (0.0–1.0) */
            current_price: number;
            /**
             * @description `"up"` = price rising, `"down"` = price falling
             * @enum {string}
             */
            spike_direction: "up" | "down";
            /** @description Percentage move that triggered this notification. Positive = up, negative = down. */
            spike_pct: number;
        };
        /** @description Payload delivered when a market's volume has spiked since the last snapshot */
        MarketVolumeSpikePayload: {
            /** @description Market condition ID */
            condition_id: string;
            /**
             * @description Aggregation window
             * @enum {string}
             */
            timeframe: "1m" | "5m" | "30m" | "1h" | "6h" | "1d" | "24h" | "7d" | "30d";
            /** @description Current volume at the time of the spike (USD) */
            current_volume_usd: number;
            /** @description Volume at the snapshot baseline (USD) */
            snapshot_volume_usd: number;
            /** @description New volume since the snapshot that triggered this notification (USD) */
            delta_volume_usd: number;
            /** @description Volume growth as a percentage of the snapshot (e.g. 200.0 means volume tripled) */
            spike_pct: number;
            /**
             * Format: int64
             * @description Total transactions in this timeframe
             */
            txns: number;
            /** @description Total fees in USD for this timeframe */
            fees: number;
        };
        /** @description Payload delivered when an event's aggregated volume has spiked since the last snapshot */
        EventVolumeSpikePayload: {
            /** @description Event slug */
            event_slug: string;
            /**
             * @description Aggregation window
             * @enum {string}
             */
            timeframe: "1m" | "5m" | "30m" | "1h" | "6h" | "1d" | "24h" | "7d" | "30d";
            /** @description Current aggregated event volume at time of the spike (USD) */
            current_volume_usd: number;
            /** @description Volume at the snapshot baseline (USD) */
            snapshot_volume_usd: number;
            /** @description New volume since the snapshot that triggered this notification (USD) */
            delta_volume_usd: number;
            /** @description Volume growth as a percentage of the snapshot (e.g. 200.0 means volume tripled) */
            spike_pct: number;
            /** Format: int64 */
            txns: number;
            fees: number;
        };
        /** @description Payload delivered when a position's volume has spiked since the last snapshot */
        PositionVolumeSpikePayload: {
            /** @description ERC-1155 outcome token ID */
            position_id: string;
            /** @description Parent market condition ID */
            condition_id: string;
            /** @description Outcome name (e.g. "Yes", "No") */
            outcome?: string | null;
            /** Format: int16 */
            outcome_index?: number | null;
            /**
             * @description Aggregation window
             * @enum {string}
             */
            timeframe: "1m" | "5m" | "30m" | "1h" | "6h" | "1d" | "24h" | "7d" | "30d";
            /** @description Current position volume at the time of the spike (USD) */
            current_volume_usd: number;
            /** @description Volume at the snapshot baseline (USD) */
            snapshot_volume_usd: number;
            /** @description New volume since the snapshot that triggered this notification (USD) */
            delta_volume_usd: number;
            /** @description Volume growth as a percentage of the snapshot (e.g. 200.0 means volume tripled) */
            spike_pct: number;
            /** Format: int64 */
            txns: number;
            fees: number;
        };
        /** @description Payload delivered when a trade occurs at a near-certain-outcome price */
        CloseToBondPayload: {
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
            /** @description 0 = Yes/Up, 1 = No */
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
            /** @description USD size of the trade */
            amount_usd: number;
            shares_amount: number;
            /** @description Fee paid in USD */
            fee: number;
            /** @enum {string} */
            side: "Buy" | "Sell";
            /** @description Price that triggered the notification (0.0–1.0) */
            price: number;
            /** @description Implied probability (0.0–1.0) */
            probability?: number | null;
            /**
             * @description "high" when near YES (price ≥ threshold), "low" when near NO (price ≤ threshold)
             * @enum {string}
             */
            bond_side: "high" | "low";
            /** @description The probability threshold from the subscription filter that was breached */
            threshold: number;
        };
        /** @description An outcome entry within a newly created market */
        MarketCreatedOutcome: {
            /** @description Outcome index (0 = Yes, 1 = No) */
            index: number;
            /** @description Outcome name (e.g. "Yes", "No") */
            name: string;
            /** @description ERC-1155 position token ID for this outcome */
            position_id: string;
        };
        /** @description Payload delivered when a new prediction market is detected on-chain and enriched with Gamma API metadata */
        MarketCreatedPayload: {
            /** @description Condition ID (0x-prefixed hex, lowercase) */
            condition_id: string;
            /** @description Market slug */
            market_slug: string;
            /** @description Parent event slug */
            event_slug?: string | null;
            /** @description Parent event ID */
            event_id?: string | null;
            /** @description Parent event title */
            event_title?: string | null;
            /** @description Series slug (for recurring markets) */
            series_slug?: string | null;
            /** @description List of market outcomes with their position IDs */
            outcomes: components["schemas"]["MarketCreatedOutcome"][];
            /** @description Full market question text */
            question: string;
            /** @description Short display title */
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
        /** @description Payload delivered on every raw Chainlink price tick for a tracked crypto asset */
        AssetPriceTickPayload: {
            /**
             * @description Asset symbol
             * @enum {string}
             */
            symbol: "BTC" | "ETH" | "SOL" | "XRP" | "DOGE" | "BNB" | "HYPE";
            /** @description Current asset price in USD from the Chainlink feed */
            price: number;
            /**
             * Format: int64
             * @description Tick timestamp (milliseconds since Unix epoch)
             */
            timestamp_ms: number;
        };
        /** @description Payload delivered twice per candle — once on open and once on close. `close_price` is 0.0 on the "open" update. */
        AssetPriceWindowUpdatePayload: {
            /**
             * @description Asset symbol
             * @enum {string}
             */
            symbol: "BTC" | "ETH" | "SOL" | "XRP" | "DOGE" | "BNB" | "HYPE";
            /**
             * @description Candle / window size
             * @enum {string}
             */
            variant: "5m" | "15m" | "1h" | "4h" | "1d" | "24h";
            /**
             * Format: int64
             * @description Window start timestamp (milliseconds since Unix epoch)
             */
            start_time: number;
            /**
             * Format: int64
             * @description Window end timestamp (milliseconds since Unix epoch)
             */
            end_time: number;
            /** @description Opening price at start_time (USD) */
            open_price: number;
            /** @description Closing price at end_time (USD). 0.0 when update_type is "open" (not yet available). */
            close_price: number;
            /**
             * @description "open" when the candle opens, "close" when it closes with a confirmed price
             * @enum {string}
             */
            update_type: "open" | "close";
        };
        /** @description Subscription filters for the `trader_first_trade` event. All fields are optional. */
        TraderFirstTradeFilters: {
            /** @description Only fire for trades by these wallet addresses (lowercase). Empty = all traders. */
            wallet_addresses?: string[];
            /** @description Restrict to trades in these markets. Empty = all markets. */
            condition_ids?: string[];
            /** @description Restrict to trades in markets belonging to these events. */
            event_slugs?: string[];
            /** @description Minimum trade size in USD. Omit to match all sizes. */
            min_usd_value?: number;
            /** @description Only fire when the outcome probability is ≥ this value. */
            min_probability?: number;
            /** @description Only fire when the outcome probability is ≤ this value. */
            max_probability?: number;
            /** @description When `true`, suppress webhooks for short-term "updown" markets (event slugs containing `updown`). Default: `false`. */
            exclude_shortterm_markets?: boolean;
        };
        /** @description Subscription filters for the `trader_new_market` event. All fields are optional. */
        TraderNewMarketFilters: {
            /** @description Only fire for these wallet addresses (lowercase). Empty = all traders. */
            wallet_addresses?: string[];
            /** @description Restrict to these markets. */
            condition_ids?: string[];
            /** @description Restrict to markets belonging to these events. */
            event_slugs?: string[];
            /** @description Minimum trade size in USD. Omit to match all sizes. */
            min_usd_value?: number;
            /** @description Only fire when the outcome probability is ≥ this value. */
            min_probability?: number;
            /** @description Only fire when the outcome probability is ≤ this value. */
            max_probability?: number;
            /** @description When `true`, suppress webhooks for short-term "updown" markets. Default: `false`. */
            exclude_shortterm_markets?: boolean;
        };
        /** @description Subscription filters for the `trader_whale_trade` event. All fields are optional. */
        TraderWhaleTradeFilters: {
            /** @description Only fire for trades by these wallet addresses. Empty = all traders. */
            wallet_addresses?: string[];
            /** @description Restrict to these markets. */
            condition_ids?: string[];
            /** @description Restrict to markets belonging to these events. */
            event_slugs?: string[];
            /** @description Minimum trade size in USD. Defaults to 0 (matches all trades). */
            min_usd_value?: number;
            /** @description Only fire when outcome probability is ≥ this value. */
            min_probability?: number;
            /** @description Only fire when outcome probability is ≤ this value. */
            max_probability?: number;
            /** @description When `true`, suppress webhooks for short-term "updown" markets. Default: `false`. */
            exclude_shortterm_markets?: boolean;
        };
        /** @description Subscription filters for the `trader_new_trade` event. All fields are optional. */
        TraderNewTradeFilters: {
            /** @description Only fire for trades by these wallet addresses. Empty = all traders. */
            wallet_addresses?: string[];
            /** @description Restrict to these markets. */
            condition_ids?: string[];
            /** @description Restrict to markets belonging to these events. */
            event_slugs?: string[];
            /** @description Minimum trade size in USD. Defaults to 0 (matches all trades). */
            min_usd_value?: number;
            /** @description Only fire when outcome probability is ≥ this value. */
            min_probability?: number;
            /** @description Only fire when outcome probability is ≤ this value. */
            max_probability?: number;
            /** @description Only fire for these fill-style trade types. Empty = OrderFilled and OrdersMatched only (default). */
            trade_types?: ("OrderFilled" | "OrdersMatched")[];
            /** @description When `true`, suppress webhooks for short-term "updown" markets. Default: `false`. */
            exclude_shortterm_markets?: boolean;
        };
        /** @description Subscription filters for the `trade_event` event. All fields are optional. `event_slugs` and `exclude_shortterm_markets` require explicit `trade_types` that exclude `PositionsConverted`, because conversion events do not currently carry `event_slug` in the typed webhook payload. */
        TradeEventFilters: {
            /** @description Only fire for events associated with these wallet addresses. Empty = all traders. */
            wallet_addresses?: string[];
            /** @description Restrict to these markets. For `PositionsConverted`, this also matches the NegRisk `market_id`. */
            condition_ids?: string[];
            /** @description Restrict to markets belonging to these events. Requires explicit `trade_types` that exclude `PositionsConverted`. */
            event_slugs?: string[];
            /** @description Minimum USD amount for the underlying event. Defaults to 0 (matches all events). */
            min_usd_value?: number;
            /** @description Only fire when event probability is ≥ this value. Events without probability data do not match. */
            min_probability?: number;
            /** @description Only fire when event probability is ≤ this value. Events without probability data do not match. */
            max_probability?: number;
            /** @description Only fire for these trade types currently emitted through the webhook pipeline. Empty = all supported trade-event variants. */
            trade_types?: ("OrderFilled" | "Redemption" | "Merge" | "Split" | "Cancelled" | "PositionsConverted" | "OrdersMatched" | "Initialization" | "Proposal" | "Dispute" | "Settled" | "Resolution" | "ConditionResolution" | "Reset" | "Flag" | "Unflag" | "Pause" | "Unpause" | "ManualResolution" | "NegRiskOutcomeReported" | "RegisterToken" | "Approval")[];
            /** @description When `true`, suppress webhooks for short-term "updown" markets. Requires explicit `trade_types` that exclude `PositionsConverted`. Default: `false`. */
            exclude_shortterm_markets?: boolean;
        };
        /** @description Subscription filters for the `trader_global_pnl` event. All fields are optional. */
        TraderGlobalPnlFilters: {
            /** @description Track only these trader wallet addresses. Empty = all traders. */
            traders?: string[];
            /** @description Only fire when realized PnL ≥ this value (USD). Use negative values for loss thresholds. */
            min_realized_pnl_usd?: number;
            /** @description Only fire when realized PnL ≤ this value (USD). */
            max_realized_pnl_usd?: number;
            /** @description Only fire when total trading volume ≥ this value (USD). */
            min_volume_usd?: number;
            /** @description Only fire when total trading volume ≤ this value (USD). */
            max_volume_usd?: number;
            /** @description Only fire when buy volume ≥ this value (USD). */
            min_buy_usd?: number;
            /** @description Only fire when sell volume ≥ this value (USD). */
            min_sell_volume_usd?: number;
            /** @description Only fire when market win rate ≥ this percentage (0.0–100.0). */
            min_win_rate?: number;
            /**
             * Format: int64
             * @description Only fire when the trader has traded in ≥ this many markets.
             */
            min_markets_traded?: number;
            /** @description Restrict to these PnL windows. Empty = all windows. */
            timeframes?: ("1d" | "7d" | "30d" | "lifetime")[];
        };
        /** @description Subscription filters for the `trader_market_pnl` event. All fields are optional. */
        TraderMarketPnlFilters: {
            /** @description Track only these trader wallet addresses. */
            traders?: string[];
            /** @description Restrict to these markets. */
            condition_ids?: string[];
            /** @description Restrict to markets in these events. */
            event_slugs?: string[];
            /** @description Only fire when per-market realized PnL ≥ this value (USD). */
            min_realized_pnl_usd?: number;
            /** @description Only fire when per-market realized PnL ≤ this value (USD). */
            max_realized_pnl_usd?: number;
            /** @description Only fire when total volume (buy + sell + redemption + merge) ≥ this value (USD). */
            min_volume_usd?: number;
            /** @description Only fire when total volume ≤ this value (USD). */
            max_volume_usd?: number;
            /** @description Only fire when buy volume in the market ≥ this value (USD). */
            min_buy_usd?: number;
            /** @description Only fire when sell volume in the market ≥ this value (USD). */
            min_sell_volume_usd?: number;
            /** @description Restrict to these PnL windows. */
            timeframes?: ("1d" | "7d" | "30d" | "lifetime")[];
            /** @description When `true`, suppress webhooks for short-term "updown" markets. Default: `false`. */
            exclude_shortterm_markets?: boolean;
        };
        /** @description Subscription filters for the `trader_event_pnl` event. All fields are optional. */
        TraderEventPnlFilters: {
            /** @description Track only these trader wallet addresses. */
            traders?: string[];
            /** @description Restrict to these events. */
            event_slugs?: string[];
            /** @description Only fire when per-event realized PnL ≥ this value (USD). */
            min_realized_pnl_usd?: number;
            /** @description Only fire when per-event realized PnL ≤ this value (USD). */
            max_realized_pnl_usd?: number;
            /** @description Only fire when total event volume ≥ this value (USD). */
            min_volume_usd?: number;
            /** @description Only fire when total event volume ≤ this value (USD). */
            max_volume_usd?: number;
            /** @description Only fire when buy volume within the event ≥ this value (USD). */
            min_buy_usd?: number;
            /** @description Only fire when sell volume within the event ≥ this value (USD). */
            min_sell_volume_usd?: number;
            /**
             * Format: int64
             * @description Only fire when the trader has traded in ≥ this many markets within the event.
             */
            min_markets_traded?: number;
            /** @description Restrict to these PnL windows. */
            timeframes?: ("1d" | "7d" | "30d" | "lifetime")[];
            /** @description When `true`, suppress webhooks for short-term "updown" markets. Default: `false`. */
            exclude_shortterm_markets?: boolean;
        };
        /** @description Subscription filters for the `condition_metrics` event. All fields are optional. */
        MarketMetricsFilters: {
            /** @description Restrict to these markets. Empty = all markets. */
            condition_ids?: string[];
            /** @description Restrict to these aggregation windows. Empty = all windows. */
            timeframes?: ("1m" | "5m" | "30m" | "1h" | "6h" | "24h" | "7d" | "30d")[];
            /** @description Only fire when volume ≥ this value (USD). */
            min_volume_usd?: number;
            /** @description Only fire when volume ≤ this value (USD). */
            max_volume_usd?: number;
            /**
             * Format: int64
             * @description Only fire when transaction count ≥ this value.
             */
            min_txns?: number;
            /**
             * Format: int64
             * @description Only fire when unique trader count ≥ this value.
             */
            min_unique_traders?: number;
            /** @description Only fire when total fees ≥ this value (USD). */
            min_fees?: number;
        };
        /** @description Subscription filters for the `event_metrics` event. All fields are optional. */
        EventMetricsFilters: {
            /** @description Restrict to these events. Empty = all events. */
            event_slugs?: string[];
            /** @description Restrict to these aggregation windows. */
            timeframes?: ("1m" | "5m" | "30m" | "1h" | "6h" | "24h" | "7d" | "30d")[];
            /** @description Only fire when aggregated event volume ≥ this value (USD). */
            min_volume_usd?: number;
            max_volume_usd?: number;
            /** Format: int64 */
            min_txns?: number;
            /** Format: int64 */
            min_unique_traders?: number;
            min_fees?: number;
            /** @description When `true`, suppress webhooks for short-term "updown" markets. Default: `false`. */
            exclude_shortterm_markets?: boolean;
        };
        /** @description Subscription filters for the `position_metrics` event. All fields are optional. */
        PositionMetricsFilters: {
            /** @description Restrict to these outcome token IDs. */
            position_ids?: string[];
            /** @description Restrict to positions within these markets. */
            condition_ids?: string[];
            /** @description Restrict to positions with these outcome names (e.g. ["Yes", "No"]). */
            outcomes?: string[];
            /** @description Restrict to these aggregation windows. */
            timeframes?: ("1m" | "5m" | "30m" | "1h" | "6h" | "24h" | "7d" | "30d")[];
            /** @description Only fire when position volume ≥ this value (USD). */
            min_volume_usd?: number;
            max_volume_usd?: number;
            min_buy_usd?: number;
            min_sell_volume_usd?: number;
            /** Format: int64 */
            min_txns?: number;
            /** Format: int64 */
            min_unique_traders?: number;
            /** @description Only fire when price change % ≥ this value. */
            min_price_change_pct?: number;
            /** @description Only fire when probability change % ≥ this value. */
            min_probability_change_pct?: number;
            min_fees?: number;
        };
        /** @description Subscription filters for the `market_volume_milestone` event. */
        MarketVolumeMilestoneFilters: {
            /** @description **Required.** Aggregation windows to monitor (e.g. ["1h", "24h"]). */
            timeframes: ("1m" | "5m" | "30m" | "1h" | "6h" | "24h" | "7d" | "30d")[];
            /** @description Restrict to these markets. Empty = all markets. */
            condition_ids?: string[];
            /** @description Specific USD milestones to trigger on (e.g. [10000, 100000, 1000000]). Empty = all milestones. */
            milestone_amounts?: number[];
        };
        /** @description Subscription filters for the `event_volume_milestone` event. */
        EventVolumeMilestoneFilters: {
            /** @description **Required.** Aggregation windows to monitor. */
            timeframes: ("1m" | "5m" | "30m" | "1h" | "6h" | "24h" | "7d" | "30d")[];
            /** @description Restrict to these events. */
            event_slugs?: string[];
            /** @description Specific USD milestones to trigger on. */
            milestone_amounts?: number[];
            /** @description When `true`, suppress webhooks for short-term "updown" markets. Default: `false`. */
            exclude_shortterm_markets?: boolean;
        };
        /** @description Subscription filters for the `position_volume_milestone` event. */
        PositionVolumeMilestoneFilters: {
            /** @description **Required.** Aggregation windows to monitor. */
            timeframes: ("1m" | "5m" | "30m" | "1h" | "6h" | "24h" | "7d" | "30d")[];
            /** @description Restrict to these outcome token IDs. */
            position_ids?: string[];
            /** @description Restrict to positions within these markets. */
            condition_ids?: string[];
            /** @description Specific USD milestones to trigger on. */
            milestone_amounts?: number[];
        };
        /** @description Subscription filters for the `probability_spike` event. */
        ProbabilitySpikeFilters: {
            /** @description Restrict to specific outcome token IDs. Empty = all positions. */
            position_ids?: string[];
            /** @description Restrict to specific market condition IDs. Empty = all markets. */
            condition_ids?: string[];
            /** @description Restrict to specific events. Empty = all events. */
            event_slugs?: string[];
            /** @description Restrict to these outcome names (e.g. ["Yes", "No"]). */
            outcomes?: string[];
            /** @description Minimum probability percentage move to trigger (e.g. `10` for a 10% move). */
            min_probability_change_pct?: number;
            /**
             * @description `"up"` = probability rising only (default when omitted), `"down"` = falling only, `"both"` = either direction.
             * @enum {string}
             */
            spike_direction?: "up" | "down" | "both";
            /** @description Observation window in seconds. The first trade in each window sets the reference price; subsequent trades are compared to it. E.g. `60` detects moves that occur within 60 seconds. */
            window_secs?: number;
            /** @description When `true`, suppress webhooks for short-term "updown" markets. Default: `false`. */
            exclude_shortterm_markets?: boolean;
        };
        /** @description Subscription filters for the `price_spike` event. */
        PriceSpikeFilters: {
            /** @description Restrict to specific outcome token IDs. Empty = all positions. */
            position_ids?: string[];
            /** @description Restrict to specific market condition IDs. Empty = all markets. */
            condition_ids?: string[];
            /** @description Restrict to specific events. Empty = all events. */
            event_slugs?: string[];
            /** @description Restrict to these outcome names (e.g. ["Yes", "No"]). */
            outcomes?: string[];
            /** @description Minimum price percentage move to trigger (e.g. `10` for a 10% move). */
            min_price_change_pct?: number;
            /**
             * @description `"up"` = price rising only (default when omitted), `"down"` = falling only, `"both"` = either direction.
             * @enum {string}
             */
            spike_direction?: "up" | "down" | "both";
            /** @description Observation window in seconds. The first trade in each window sets the reference price; subsequent trades are compared to it. E.g. `60` detects moves that occur within 60 seconds. */
            window_secs?: number;
            /** @description When `true`, suppress webhooks for short-term "updown" markets. Default: `false`. */
            exclude_shortterm_markets?: boolean;
        };
        /** @description Subscription filters for the `market_volume_spike` event. `spike_ratio` is required. */
        MarketVolumeSpikeFilters: {
            /** @description **Required.** Multiplier threshold (must be > 1.0). Fires when current volume >= snapshot × ratio. The snapshot is set automatically on first data and resets after each fire. */
            spike_ratio: number;
            /** @description Force snapshot reset after this many seconds (max 600 / 10 minutes). */
            window_secs?: number;
            /** @description Restrict to these markets. Empty = all markets. */
            condition_ids?: string[];
            /** @description Restrict to these aggregation windows. Empty = all windows. */
            timeframes?: ("1m" | "5m" | "30m" | "1h" | "6h" | "1d" | "24h" | "7d" | "30d")[];
        };
        /** @description Subscription filters for the `event_volume_spike` event. `spike_ratio` is required. */
        EventVolumeSpikeFilters: {
            /** @description **Required.** Multiplier threshold (must be > 1.0). Fires when current volume >= snapshot × ratio. */
            spike_ratio: number;
            /** @description Force snapshot reset after this many seconds (max 600 / 10 minutes). */
            window_secs?: number;
            /** @description Restrict to these events. */
            event_slugs?: string[];
            /** @description Restrict to these aggregation windows. */
            timeframes?: ("1m" | "5m" | "30m" | "1h" | "6h" | "1d" | "24h" | "7d" | "30d")[];
            /** @description When `true`, suppress webhooks for short-term "updown" markets. Default: `false`. */
            exclude_shortterm_markets?: boolean;
        };
        /** @description Subscription filters for the `position_volume_spike` event. `spike_ratio` is required. */
        PositionVolumeSpikeFilters: {
            /** @description **Required.** Multiplier threshold (must be > 1.0). Fires when current volume >= snapshot × ratio. */
            spike_ratio: number;
            /** @description Force snapshot reset after this many seconds (max 600 / 10 minutes). */
            window_secs?: number;
            /** @description Restrict to these outcome token IDs. */
            position_ids?: string[];
            /** @description Restrict to positions within these markets. */
            condition_ids?: string[];
            /** @description Restrict to these outcome names. */
            outcomes?: string[];
            /** @description Restrict to these aggregation windows. */
            timeframes?: ("1m" | "5m" | "30m" | "1h" | "6h" | "1d" | "24h" | "7d" | "30d")[];
        };
        /** @description Subscription filters for the `close_to_bond` event. At least one of `min_probability` or `max_probability` is required. */
        CloseToBondFilters: {
            /** @description Trigger when the YES outcome price is ≥ this value (e.g. 0.95 for 95% certainty). At least one of `min_probability` or `max_probability` must be set. */
            min_probability?: number;
            /** @description Trigger when the YES outcome price is ≤ this value (e.g. 0.05 for near-certain NO). */
            max_probability?: number;
            /** @description Restrict to these markets. */
            condition_ids?: string[];
            /** @description Restrict to these outcome token IDs. */
            position_ids?: string[];
            /** @description Restrict to markets in these events. */
            event_slugs?: string[];
            /** @description Restrict to these outcome names (e.g. ["Yes", "No"]). */
            outcomes?: string[];
            /** @description Restrict by outcome index. 0 = Yes/Up, 1 = No. Position 0 usually represents the Up/Yes side in binary markets. */
            position_outcome_indices?: number[];
            /** @description When `true`, suppress webhooks for short-term "updown" markets. Default: `false`. */
            exclude_shortterm_markets?: boolean;
        } | unknown | unknown;
        /** @description Subscription filters for the `market_created` event. All fields are optional. */
        MarketCreatedFilters: {
            /** @description Restrict to markets with these tags or category names (case-insensitive match). */
            tags?: string[];
            /** @description Restrict to markets belonging to these events. */
            event_slugs?: string[];
            /** @description When `true`, suppress webhooks for short-term "updown" markets (event slugs containing `updown`). Default: `false`. */
            exclude_shortterm_markets?: boolean;
        };
        /** @description Subscription filters for the `asset_price_tick` event. All fields are optional. */
        AssetPriceTickFilters: {
            /** @description Restrict to these crypto assets. Empty = all assets. */
            asset_symbols?: ("BTC" | "ETH" | "SOL" | "XRP" | "DOGE" | "BNB" | "HYPE")[];
        };
        /** @description Subscription filters for the `asset_price_window_update` event. All fields are optional. */
        AssetPriceWindowUpdateFilters: {
            /** @description Restrict to these crypto assets. Empty = all assets. */
            asset_symbols?: ("BTC" | "ETH" | "SOL" | "XRP" | "DOGE" | "BNB" | "HYPE")[];
            /** @description Restrict to these candle sizes. Empty = all sizes. */
            timeframes?: ("5m" | "15m" | "1h" | "4h" | "1d" | "24h")[];
        };
        /**
         * @description All alert event types supported by both HTTP webhooks and the alerts WebSocket.
         * @enum {string}
         */
        WsAlertEventType: "trader_first_trade" | "trader_new_market" | "trader_whale_trade" | "trader_new_trade" | "trade_event" | "trader_global_pnl" | "trader_market_pnl" | "trader_event_pnl" | "condition_metrics" | "event_metrics" | "position_metrics" | "market_volume_milestone" | "event_volume_milestone" | "position_volume_milestone" | "probability_spike" | "price_spike" | "market_volume_spike" | "event_volume_spike" | "position_volume_spike" | "close_to_bond" | "market_created" | "asset_price_tick" | "asset_price_window_update";
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
         *         "trade_id": "00000000-0000-0000-0000-000000000000",
         *         "hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
         *         "block": 0,
         *         "confirmed_at": 1700000000,
         *         "amount_usd": 125,
         *         "shares_amount": 250,
         *         "fee": 0.125,
         *         "side": "Buy",
         *         "price": 0.5,
         *         "exchange": "polymarket",
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
         *         "exchange": "polymarket",
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
         *         "exchange": "polymarket",
         *         "trade_type": "OrderFilled"
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
         *         "exchange": "polymarket",
         *         "trade_type": "OrderFilled"
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
        WsAlertTradeEventSubscribeMessage: {
            /** @enum {string} */
            op: "subscribe";
            /** @enum {string} */
            event: "trade_event";
        } & components["schemas"]["TradeEventFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "trade_event";
        };
        WsAlertTradeEventUnsubscribeMessage: {
            /** @enum {string} */
            op: "unsubscribe";
            /** @enum {string} */
            event: "trade_event";
        } & components["schemas"]["TradeEventFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "trade_event";
        };
        /**
         * @description Pushed `trade_event` alert. The `data` payload matches the corresponding HTTP webhook payload schema.
         * @example {
         *       "event": "trade_event",
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
        WsAlertTradeEventEvent: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "trade_event";
            /**
             * Format: int64
             * @description Unix timestamp in milliseconds
             */
            timestamp: number;
            data: components["schemas"]["WebhookTradeEventPayload"];
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
         *         "total_volume_usd": 1500,
         *         "buy_volume_usd": 900,
         *         "sell_volume_usd": 600,
         *         "redemption_volume_usd": 50,
         *         "merge_volume_usd": 0,
         *         "markets_won": 3,
         *         "markets_lost": 2,
         *         "market_win_rate_pct": 60,
         *         "avg_pnl_per_market": 50,
         *         "avg_pnl_per_trade": 12.5,
         *         "avg_hold_time_seconds": 86400,
         *         "total_fees": 7.5,
         *         "best_trade_pnl_usd": 180,
         *         "best_trade_condition_id": "0x0000000000000000000000000000000000000000000000000000000000000000",
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
         *         "timeframe": "7d",
         *         "outcomes_traded": 2,
         *         "total_buys": 4,
         *         "total_sells": 3,
         *         "total_redemptions": 1,
         *         "total_merges": 0,
         *         "buy_usd": 300,
         *         "sell_usd": 200,
         *         "redemption_usd": 50,
         *         "merge_usd": 0,
         *         "realized_pnl_usd": 100,
         *         "winning_outcomes": 1,
         *         "total_fees": 2.5,
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
        WsAlertTraderEventPnlSubscribeMessage: {
            /** @enum {string} */
            op: "subscribe";
            /** @enum {string} */
            event: "trader_event_pnl";
        } & components["schemas"]["TraderEventPnlFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "trader_event_pnl";
        };
        WsAlertTraderEventPnlUnsubscribeMessage: {
            /** @enum {string} */
            op: "unsubscribe";
            /** @enum {string} */
            event: "trader_event_pnl";
        } & components["schemas"]["TraderEventPnlFilters"] & {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "trader_event_pnl";
        };
        /**
         * @description Pushed `trader_event_pnl` alert. The `data` payload matches the corresponding HTTP webhook payload schema.
         * @example {
         *       "event": "trader_event_pnl",
         *       "timestamp": 1743500000000,
         *       "data": {
         *         "trader": "0x0000000000000000000000000000000000000000",
         *         "event_slug": "test-event-0000000000",
         *         "timeframe": "7d",
         *         "markets_traded": 2,
         *         "outcomes_traded": 3,
         *         "total_buys": 6,
         *         "total_sells": 4,
         *         "total_redemptions": 1,
         *         "total_merges": 0,
         *         "total_volume_usd": 800,
         *         "buy_usd": 480,
         *         "sell_usd": 320,
         *         "redemption_usd": 50,
         *         "merge_usd": 0,
         *         "realized_pnl_usd": 150,
         *         "winning_markets": 1,
         *         "losing_markets": 1,
         *         "total_fees": 4,
         *         "first_trade_at": 1700000000,
         *         "last_trade_at": 1700000000
         *       }
         *     }
         */
        WsAlertTraderEventPnlEvent: {
            /**
             * @description discriminator enum property added by openapi-typescript
             * @enum {string}
             */
            event: "trader_event_pnl";
            /**
             * Format: int64
             * @description Unix timestamp in milliseconds
             */
            timestamp: number;
            data: components["schemas"]["EventPnlPayload"];
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
         *         "fees": 250,
         *         "txns": 320,
         *         "unique_traders": 85
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
         *         "fees": 600,
         *         "txns": 740,
         *         "unique_traders": 210
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
         *         "fees": 125,
         *         "txns": 160,
         *         "buys": 95,
         *         "sells": 65,
         *         "unique_traders": 48,
         *         "price_open": 0.48,
         *         "price_close": 0.52,
         *         "price_high": 0.55,
         *         "price_low": 0.46,
         *         "probability_open": 0.48,
         *         "probability_close": 0.52,
         *         "probability_high": 0.55,
         *         "probability_low": 0.46
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
         *         "event_slug": "test-event-0000000000",
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
         *         "event_slug": "test-event-0000000000",
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
        /** @description Typed subscribe request for the alerts WebSocket. The request shape depends on `event` and reuses the matching webhook filter schema. */
        WsAlertSubscribeMessage: components["schemas"]["WsAlertTraderFirstTradeSubscribeMessage"] | components["schemas"]["WsAlertTraderNewMarketSubscribeMessage"] | components["schemas"]["WsAlertTraderWhaleTradeSubscribeMessage"] | components["schemas"]["WsAlertTraderNewTradeSubscribeMessage"] | components["schemas"]["WsAlertTradeEventSubscribeMessage"] | components["schemas"]["WsAlertTraderGlobalPnlSubscribeMessage"] | components["schemas"]["WsAlertTraderMarketPnlSubscribeMessage"] | components["schemas"]["WsAlertTraderEventPnlSubscribeMessage"] | components["schemas"]["WsAlertConditionMetricsSubscribeMessage"] | components["schemas"]["WsAlertEventMetricsSubscribeMessage"] | components["schemas"]["WsAlertPositionMetricsSubscribeMessage"] | components["schemas"]["WsAlertMarketVolumeMilestoneSubscribeMessage"] | components["schemas"]["WsAlertEventVolumeMilestoneSubscribeMessage"] | components["schemas"]["WsAlertPositionVolumeMilestoneSubscribeMessage"] | components["schemas"]["WsAlertProbabilitySpikeSubscribeMessage"] | components["schemas"]["WsAlertPriceSpikeSubscribeMessage"] | components["schemas"]["WsAlertMarketVolumeSpikeSubscribeMessage"] | components["schemas"]["WsAlertEventVolumeSpikeSubscribeMessage"] | components["schemas"]["WsAlertPositionVolumeSpikeSubscribeMessage"] | components["schemas"]["WsAlertCloseToBondSubscribeMessage"] | components["schemas"]["WsAlertMarketCreatedSubscribeMessage"] | components["schemas"]["WsAlertAssetPriceTickSubscribeMessage"] | components["schemas"]["WsAlertAssetPriceWindowUpdateSubscribeMessage"];
        /** @description Typed unsubscribe request for the alerts WebSocket. The request shape depends on `event` and must match the original subscription filters. */
        WsAlertUnsubscribeMessage: components["schemas"]["WsAlertTraderFirstTradeUnsubscribeMessage"] | components["schemas"]["WsAlertTraderNewMarketUnsubscribeMessage"] | components["schemas"]["WsAlertTraderWhaleTradeUnsubscribeMessage"] | components["schemas"]["WsAlertTraderNewTradeUnsubscribeMessage"] | components["schemas"]["WsAlertTradeEventUnsubscribeMessage"] | components["schemas"]["WsAlertTraderGlobalPnlUnsubscribeMessage"] | components["schemas"]["WsAlertTraderMarketPnlUnsubscribeMessage"] | components["schemas"]["WsAlertTraderEventPnlUnsubscribeMessage"] | components["schemas"]["WsAlertConditionMetricsUnsubscribeMessage"] | components["schemas"]["WsAlertEventMetricsUnsubscribeMessage"] | components["schemas"]["WsAlertPositionMetricsUnsubscribeMessage"] | components["schemas"]["WsAlertMarketVolumeMilestoneUnsubscribeMessage"] | components["schemas"]["WsAlertEventVolumeMilestoneUnsubscribeMessage"] | components["schemas"]["WsAlertPositionVolumeMilestoneUnsubscribeMessage"] | components["schemas"]["WsAlertProbabilitySpikeUnsubscribeMessage"] | components["schemas"]["WsAlertPriceSpikeUnsubscribeMessage"] | components["schemas"]["WsAlertMarketVolumeSpikeUnsubscribeMessage"] | components["schemas"]["WsAlertEventVolumeSpikeUnsubscribeMessage"] | components["schemas"]["WsAlertPositionVolumeSpikeUnsubscribeMessage"] | components["schemas"]["WsAlertCloseToBondUnsubscribeMessage"] | components["schemas"]["WsAlertMarketCreatedUnsubscribeMessage"] | components["schemas"]["WsAlertAssetPriceTickUnsubscribeMessage"] | components["schemas"]["WsAlertAssetPriceWindowUpdateUnsubscribeMessage"];
        /** @description Typed pushed-event envelope for the alerts WebSocket. The `data` payload depends on `event` and matches the corresponding HTTP webhook payload schema. */
        WsAlertEventPayload: components["schemas"]["WsAlertTraderFirstTradeEvent"] | components["schemas"]["WsAlertTraderNewMarketEvent"] | components["schemas"]["WsAlertTraderWhaleTradeEvent"] | components["schemas"]["WsAlertTraderNewTradeEvent"] | components["schemas"]["WsAlertTradeEventEvent"] | components["schemas"]["WsAlertTraderGlobalPnlEvent"] | components["schemas"]["WsAlertTraderMarketPnlEvent"] | components["schemas"]["WsAlertTraderEventPnlEvent"] | components["schemas"]["WsAlertConditionMetricsEvent"] | components["schemas"]["WsAlertEventMetricsEvent"] | components["schemas"]["WsAlertPositionMetricsEvent"] | components["schemas"]["WsAlertMarketVolumeMilestoneEvent"] | components["schemas"]["WsAlertEventVolumeMilestoneEvent"] | components["schemas"]["WsAlertPositionVolumeMilestoneEvent"] | components["schemas"]["WsAlertProbabilitySpikeEvent"] | components["schemas"]["WsAlertPriceSpikeEvent"] | components["schemas"]["WsAlertMarketVolumeSpikeEvent"] | components["schemas"]["WsAlertEventVolumeSpikeEvent"] | components["schemas"]["WsAlertPositionVolumeSpikeEvent"] | components["schemas"]["WsAlertCloseToBondEvent"] | components["schemas"]["WsAlertMarketCreatedEvent"] | components["schemas"]["WsAlertAssetPriceTickEvent"] | components["schemas"]["WsAlertAssetPriceWindowUpdateEvent"];
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
	trade_event: components["schemas"]["WsAlertTradeEventSubscribeMessage"];
	trader_global_pnl: components["schemas"]["WsAlertTraderGlobalPnlSubscribeMessage"];
	trader_market_pnl: components["schemas"]["WsAlertTraderMarketPnlSubscribeMessage"];
	trader_event_pnl: components["schemas"]["WsAlertTraderEventPnlSubscribeMessage"];
	condition_metrics: components["schemas"]["WsAlertConditionMetricsSubscribeMessage"];
	event_metrics: components["schemas"]["WsAlertEventMetricsSubscribeMessage"];
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
	asset_price_tick: components["schemas"]["WsAlertAssetPriceTickSubscribeMessage"];
	asset_price_window_update: components["schemas"]["WsAlertAssetPriceWindowUpdateSubscribeMessage"];
}

export interface WsAlertEventDataMap {
	trader_first_trade: components["schemas"]["FirstTradePayload"];
	trader_new_market: components["schemas"]["NewMarketPayload"];
	trader_whale_trade: components["schemas"]["WhaleTradePayload"];
	trader_new_trade: components["schemas"]["NewTradePayload"];
	trade_event: components["schemas"]["WebhookTradeEventPayload"];
	trader_global_pnl: components["schemas"]["GlobalPnlPayload"];
	trader_market_pnl: components["schemas"]["MarketPnlPayload"];
	trader_event_pnl: components["schemas"]["EventPnlPayload"];
	condition_metrics: components["schemas"]["ConditionMetricsPayload"];
	event_metrics: components["schemas"]["EventMetricsPayload"];
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
	asset_price_tick: components["schemas"]["AssetPriceTickPayload"];
	asset_price_window_update: components["schemas"]["AssetPriceWindowUpdatePayload"];
}

export type WsAlertEventName = keyof WsAlertSubscribeMap;

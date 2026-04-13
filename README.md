# @structbuild/sdk

TypeScript SDK for prediction market data via [api.struct.to](https://api.struct.to). Access real-time and historical data for markets, events, trades, portfolios, and more. Supports REST and WebSocket APIs with full type safety.

## Install

```bash
npm install @structbuild/sdk
# or
bun add @structbuild/sdk
```

## Quick Start

```typescript
import { StructClient } from "@structbuild/sdk";

const client = new StructClient({
  apiKey: "your-api-key",
});

const markets = await client.markets.getMarkets();
console.log(markets.data);
```

## REST API

The client exposes namespaced methods that map to the Struct API:

```typescript
const client = new StructClient({
  apiKey: "your-api-key",
  venue: "polymarket",    // default
  timeout: 10000,         // request timeout in ms
  retry: {                // auto-retry on 429/5xx
    maxRetries: 3,
    initialDelay: 500,
  },
});
```

### Markets

```typescript
const markets = await client.markets.getMarkets({ limit: 10 });
const market = await client.markets.getMarket({ conditionId: "0x..." });
const marketBySlug = await client.markets.getMarketBySlug({ marketSlug: "will-x-happen" });
const trades = await client.markets.getTrades({ condition_ids: "0x..." });
const candles = await client.markets.getCandlestick({ condition_id: "0x...", resolution: "1h" });
const chart = await client.markets.getMarketChart({ condition_id: "0x..." });
const metrics = await client.markets.getMarketMetrics({ condition_id: "0x..." });
const volumeChart = await client.markets.getMarketVolumeChart({ condition_id: "0x..." });
const priceJumps = await client.markets.getPriceJumps();
```

### Events

```typescript
const events = await client.events.getEvents({ limit: 10 });
const event = await client.events.getEvent({ identifier: "123" });
const eventBySlug = await client.events.getEventBySlug({ slug: "us-election" });
const eventMetrics = await client.events.getEventMetrics({ event_slug: "us-election", timeframe: "24h" });
const outcomes = await client.events.getEventOutcomes({ event_slug: "us-election" });
const chart = await client.events.getEventChart({ event_slug: "us-election" });
```

### Trader / Portfolio

```typescript
const trades = await client.trader.getTraderTrades({ address: "0x..." });
const profile = await client.trader.getTraderProfile({ address: "0x..." });
const profiles = await client.trader.getTraderProfilesBatch({ addresses: "0x...,0x..." });
const pnl = await client.trader.getTraderPnl({ address: "0x..." });
const marketPnl = await client.trader.getTraderMarketPnl({ address: "0x..." });
const eventPnl = await client.trader.getTraderEventPnl({ address: "0x..." });
const outcomePnl = await client.trader.getTraderOutcomePnl({ address: "0x..." });
const pnlCandles = await client.trader.getTraderPnlCandles({ address: "0x..." });
const pnlCalendar = await client.trader.getTraderPnlCalendar({ address: "0x..." });
const volumeChart = await client.trader.getTraderVolumeChart({ address: "0x..." });
const leaderboard = await client.trader.getGlobalPnl();
```

### Holders

```typescript
const marketHolders = await client.holders.getMarketHolders({ condition_id: "0x..." });
const positionHolders = await client.holders.getPositionHolders({ positionId: "123" });
const history = await client.holders.getMarketHoldersHistory({ condition_id: "0x..." });
const posHistory = await client.holders.getPositionHoldersHistory({ positionId: "123" });
```

### Order Book

```typescript
const orderBook = await client.orderBook.getOrderBook({ asset_id: "0x..." });
const history = await client.orderBook.getOrderBookHistory();
const marketBook = await client.orderBook.getMarketOrderBook();
const spreads = await client.orderBook.getSpreadHistory();
```

### Series, Search, Tags, Assets, Bonds

```typescript
const series = await client.series.getSeriesList();
const outcomes = await client.series.getSeriesOutcomes({ series_slug: "my-series" });
const assetHistory = await client.assets.getAssetHistory({ symbol: "BTC", variant: "1d" });
const results = await client.search.search({ query: "election" });
const tags = await client.tags.getTags();
const tag = await client.tags.getTag({ identifier: "politics" });
const bonds = await client.bonds.getBonds();
```

### Trade Types

Trade endpoints (`getTrades`, `getTraderTrades`) return a discriminated union of all on-chain event types. Use the `trade_type` field to narrow:

```typescript
import type { Trade, MarketTrade, OracleEvent, TradeEventType } from "@structbuild/sdk";

const { data: trades } = await client.markets.getTrades();

for (const trade of trades) {
  switch (trade.trade_type) {
    case "OrderFilled":
    case "OrdersMatched":
      console.log(trade.price, trade.usd_amount, trade.shares_amount);
      break;
    case "Redemption":
      console.log(trade.winning_outcome_index, trade.position_details);
      break;
    case "Merge":
    case "Split":
      console.log(trade.usd_amount, trade.position_details);
      break;
    case "Resolution":
      console.log(trade.payout_numerators);
      break;
  }
}
```

The SDK exports convenience sub-unions for common filtering:

- **`MarketTrade`** — actual on-chain trades: `OrderFilled`, `OrdersMatched`, `Redemption`, `Merge`, `Split`, `PositionsConverted`, `Cancelled`, `RegisterToken`, `Approval`
- **`OracleEvent`** — protocol lifecycle events: `Initialization`, `Proposal`, `Dispute`, `Settled`, `Resolution`, `ConditionResolution`, `Reset`, `Flag`, `Unflag`, `Pause`, `Unpause`, `ManualResolution`, `NegRiskOutcomeReported`
- **`TradeEventType`** — string literal union of all `trade_type` values for autocomplete

Individual schemas are also exported: `OrderFilledTrade`, `RedemptionTrade`, `MergeTrade`, `SplitTrade`, `CancelledTrade`, `PositionsConvertedTrade`, `RegisterTokenTrade`, `ApprovalTrade`, and all oracle event types.

### Webhooks

Manage webhook subscriptions for real-time event notifications:

```typescript
const webhooks = await client.webhooks.list();
const webhook = await client.webhooks.create({
  url: "https://example.com/webhook",
  events: ["first_trade", "probability_spike"],
  filters: {
    condition_ids: ["0x..."],
    min_usd_value: 100,
  },
});
await client.webhooks.test({ webhookId: webhook.data.id });
await client.webhooks.rotateSecret({ webhookId: webhook.data.id });
await client.webhooks.deleteWebhook({ webhookId: webhook.data.id });
const events = await client.webhooks.listEvents();
```

## WebSocket API

Real-time streaming via room-based subscriptions with fully typed filters, responses, and events.

```typescript
import { StructWebSocket } from "@structbuild/sdk";

const ws = new StructWebSocket({ apiKey: "your-api-key" });
await ws.connect();
```

### Subscribing to rooms

Each room has typed filters and a typed subscribe response:

```typescript
const res = await ws.subscribe("polymarket_trades", {
  condition_ids: ["0xabc123"],
});

await ws.subscribe("polymarket_order_book", {
  asset_ids: ["0xabc123"],
});

// Some rooms have optional filters
await ws.subscribe("polymarket_asset_prices");
await ws.subscribe("polymarket_clob_rewards", { subscribe_all: true });
```

### Listening for events

```typescript
ws.on("trade_stream_update", (event) => {
  event.condition_id;
  event.price;
  event.size;
  event.side;
});

ws.on("order_book_update", (event) => {
  event.asset_id;
  event.bids;
  event.asks;
});

ws.on("clob_rewards_update", (event) => {
  event.event_type;    // "added" | "removed" | "updated"
  event.condition_id;
  event.reward;
});
```

### Alerts

Alerts use a separate client with per-event typed filters and payloads:

```typescript
import { StructAlertsWebSocket } from "@structbuild/sdk";

const alerts = new StructAlertsWebSocket({ apiKey: "your-api-key" });
await alerts.connect();

await alerts.subscribe("trader_whale_trade", {
  wallet_addresses: ["0xd91..."],
  min_usd_value: 10000,
});

await alerts.subscribe("probability_spike", {
  spike_direction: "up",
  min_probability_change_pct: 5,
});

alerts.on("trader_whale_trade", (payload) => {
  payload.data.trader;
  payload.data.amount_usd;
});

alerts.on("probability_spike", (payload) => {
  payload.data.spike_direction;
  payload.data.spike_pct;
});
```

### Available rooms

| Room | Filters | Event |
|------|---------|-------|
| `polymarket_trades` | `condition_ids?`, `market_slugs?`, `event_slugs?`, `position_ids?`, `traders?`, `trade_types?`, `status?`, `subscribe_all?` | `trade_stream_update` |
| `polymarket_asset_prices` | `asset_symbols?` | `asset_price_tick`, `asset_price_window_update` |
| `polymarket_asset_window_updates` | `asset_symbols?`, `timeframes?` | `asset_window_update` |
| `polymarket_market_metrics` | `condition_ids` | `market_metrics_update` |
| `polymarket_event_metrics` | `event_slugs` | `event_metrics_update` |
| `polymarket_position_metrics` | `position_ids` | `position_metrics_update` |
| `polymarket_trader_pnl` | `traders` | `trader_global_pnl_update`, `trader_market_pnl_update`, `trader_event_pnl_update` |
| `polymarket_trader_positions` | `traders` | `trader_position_update` |
| `polymarket_accounts` | `wallets`, `include_usdce?`, `include_matic?` | `accounts_update`, `usdce_update`, `matic_update` |
| `polymarket_order_book` | `condition_ids?`, `position_ids?` | `order_book_update` |
| `polymarket_clob_rewards` | `condition_ids?`, `subscribe_all?` | `clob_rewards_update` |

### Lifecycle events

```typescript
ws.on("connected", () => {});
ws.on("disconnected", ({ code, reason }) => {});
ws.on("reconnecting", ({ attempt }) => {});
ws.on("reconnect_failed", (err) => {});
ws.on("auth_failed", (err) => {});
ws.on("warning", (warning) => {});
ws.on("error", (err) => {});
```

### Cleanup

```typescript
ws.unsubscribe("polymarket_trades");
ws.disconnect();
```

## JWT Auth

Let your end users authenticate directly using JWTs from their own auth provider (Privy, Auth0, Google, Turnkey, etc.) without exposing your `sk_*` API key client-side.

Create a JWT public key (`pk_jwt_*`) in your [Struct dashboard](https://struct.to), then pass it alongside the user's JWT:

```typescript
import { StructClient, StructWebSocket } from "@structbuild/sdk";

const client = new StructClient({
  apiKey: "pk_jwt_a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4",
  jwt: userAccessToken,
});

const ws = new StructWebSocket({
  apiKey: "pk_jwt_a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4",
  jwt: userAccessToken,
});
```

The `pk_jwt_*` key is safe to hardcode in frontend bundles — it is useless without a valid JWT from your configured auth provider.

If your JWT can rotate while a socket stays alive, prefer `getJwt` so reconnects always rebuild the URL with a fresh token:

```typescript
const ws = new StructWebSocket({
  apiKey: "pk_jwt_a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4",
  getJwt: () => userAccessToken,
});
```

## Pagination

Use the `paginate` helper to iterate through all results:

```typescript
import { StructClient, paginate } from "@structbuild/sdk";

const client = new StructClient({ apiKey: "your-api-key" });

for await (const market of paginate(
  (params) => client.markets.getMarkets(params),
  { limit: 100 },
)) {
  console.log(market);
}
```

## Error Handling

```typescript
import { HttpError, TimeoutError, NetworkError } from "@structbuild/sdk";

try {
  await client.markets.getMarket({ conditionId: "0x..." });
} catch (error) {
  if (error instanceof HttpError) {
    console.log(error.status, error.body);
  } else if (error instanceof TimeoutError) {
    console.log("Request timed out");
  } else if (error instanceof NetworkError) {
    console.log("Network error");
  }
}
```

## Request Hooks

```typescript
const client = new StructClient({
  apiKey: "your-api-key",
  onRequest: (info) => {
    console.log(`${info.method} ${info.url}`);
  },
  onResponse: (info) => {
    console.log(`${info.status} in ${info.duration}ms`);
  },
});
```

## Testing

WebSocket unit tests stay in the default fast suite:

```bash
bun test
bun run typecheck
```

The live websocket soak test is opt-in and env-gated. It first calls the REST API to fetch a recent market, event, position, and trader, then subscribes across the main websocket rooms and keeps the socket alive for 5 minutes by default.

```bash
STRUCT_RUN_WS_LIVE_TESTS=1 \
STRUCT_API_KEY=your-api-key \
bun run test:ws:live
```

To run longer than 5 minutes, set `STRUCT_WS_SOAK_DURATION_MS`:

```bash
STRUCT_RUN_WS_LIVE_TESTS=1 \
STRUCT_API_KEY=your-api-key \
STRUCT_WS_SOAK_DURATION_MS=420000 \
bun run test:ws:live
```

## License

MIT

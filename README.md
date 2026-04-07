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
const marketBySlug = await client.markets.getMarketBySlug({ slug: "will-x-happen" });
const trades = await client.markets.getTrades({ condition_id: "0x..." });
const candles = await client.markets.getCandlestick({ condition_id: "0x...", fidelity: 60 });
const metrics = await client.markets.getMarketMetrics({ condition_id: "0x..." });
const volumeChart = await client.markets.getMarketVolumeChart({ condition_id: "0x..." });
const priceJumps = await client.markets.getPriceJumps();
```

### Events

```typescript
const events = await client.events.getEvents({ limit: 10 });
const event = await client.events.getEvent({ identifier: "123" });
const eventBySlug = await client.events.getEventBySlug({ slug: "us-election" });
const eventMetrics = await client.events.getEventMetrics({ event_id: "123" });
const chart = await client.events.getEventChart({ event_slug: "us-election" });
```

### Trader / Portfolio

```typescript
const trades = await client.trader.getTraderTrades({ address: "0x..." });
const profile = await client.trader.getTraderProfile({ address: "0x..." });
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
const results = await client.search.search({ query: "election" });
const tags = await client.tags.getTags();
const assetHistory = await client.assets.getAssetHistory({ asset_id: "0x..." });
const bonds = await client.bonds.getBonds();
```

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
await client.webhooks.deleteWebhook({ webhookId: webhook.data.id });
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

Subscribe to typed alerts with per-event filter narrowing. TypeScript ensures you only use filters valid for the selected event:

```typescript
await ws.subscribe("ws_alerts", {
  event: "trader_whale_trade",
  wallet_addresses: ["0xd91..."],
  min_usd_value: 10000,
});

await ws.subscribe("ws_alerts", {
  event: "probability_spike",
  spike_direction: "up",
  min_probability_change_pct: 5,
});

ws.on("ws_alert", (payload) => {
  if (payload.event === "trader_whale_trade") {
    payload.data.trader;
    payload.data.amount_usd;
  }
  if (payload.event === "probability_spike") {
    payload.data.spike_direction;
    payload.data.spike_pct;
  }
});
```

### Wallet tracking

```typescript
const res = await ws.subscribe("polymarket_wallet_tracking", {
  wallet_addresses: ["0xd91..."],
});
res.subscribed_count;
res.current_user_wallets;

ws.on("wallet_tracking_alert", (event) => {
  event.wallet_address;
  event.trade;
});
```

### Available rooms

| Room | Filters | Event |
|------|---------|-------|
| `polymarket_trades` | `condition_ids` | `trade_stream_update` |
| `polymarket_asset_prices` | `condition_ids?` | `asset_price_tick`, `asset_price_window_update` |
| `polymarket_asset_window_updates` | `condition_ids` | `asset_window_update` |
| `polymarket_market_metrics` | `condition_ids` | `market_metrics_update` |
| `polymarket_event_metrics` | `event_slugs` | `event_metrics_update` |
| `polymarket_position_metrics` | `position_ids` | `position_metrics_update` |
| `polymarket_trader_pnl` | `addresses` | `trader_global_pnl_update`, `trader_market_pnl_update`, `trader_event_pnl_update` |
| `polymarket_trader_positions` | `addresses` | `trader_position_update` |
| `polymarket_accounts` | `wallets` | `accounts_update`, `usdce_update`, `matic_update` |
| `polymarket_order_book` | `asset_ids` | `order_book_update` |
| `polymarket_clob_rewards` | `condition_ids?`, `subscribe_all?` | `clob_rewards_update` |
| `polymarket_wallet_tracking` | `wallet_addresses` | `wallet_tracking_alert` |
| `ws_alerts` | per-event typed filters | `ws_alert` |

### Lifecycle events

```typescript
ws.on("connected", () => {});
ws.on("disconnected", ({ code, reason }) => {});
ws.on("reconnecting", ({ attempt }) => {});
ws.on("error", (err) => {});
```

### Cleanup

```typescript
ws.unsubscribe("polymarket_trades");
ws.disconnect();
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

## License

MIT

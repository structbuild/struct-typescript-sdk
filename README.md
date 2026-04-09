# @structbuild/sdk

TypeScript SDK for prediction market data via [api.struct.to](https://api.struct.to). Access real-time and historical data for markets, events, trades, portfolios, and more. Supports REST and WebSocket APIs with full type safety.

## Install

```bash
npm install @structbuild/sdk
# or
pnpm add @structbuild/sdk
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
const pnlByMarket = await client.trader.getTraderMarketPnl({ address: "0x..." });
const pnlByEvent = await client.trader.getTraderEventPnl({ address: "0x..." });
const pnlCandles = await client.trader.getTraderPnlCandles({ address: "0x..." });
const calendar = await client.trader.getTraderPnlCalendar({ address: "0x..." });
const positionPnl = await client.trader.getTraderOutcomePnl({ address: "0x..." });
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

### Series

```typescript
const series = await client.series.getSeriesList();
const outcomes = await client.series.getSeriesOutcomes({ series_slug: "my-series" });
```

### Assets, Search, Tags, Bonds

```typescript
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

Manage webhook subscriptions for real-time event notifications. Webhook endpoints are platform-level (not venue-scoped).

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
const detail = await client.webhooks.getWebhook({ webhookId: webhook.data.id });
await client.webhooks.update({ webhookId: webhook.data.id, events: ["first_trade"] });
await client.webhooks.test({ webhookId: webhook.data.id });
await client.webhooks.rotateSecret({ webhookId: webhook.data.id });
await client.webhooks.deleteWebhook({ webhookId: webhook.data.id });
const events = await client.webhooks.listEvents();
```

#### Webhook Payload Types

The SDK exports typed payload schemas for building webhook receivers:

```typescript
import type {
  FirstTradePayload,
  ProbabilitySpikePayload,
  GlobalPnlPayload,
  VolumeMilestonePayload,
} from "@structbuild/sdk";

function handleWebhook(payload: FirstTradePayload) {
  console.log(payload.trader, payload.price, payload.side);
}
```

Available payload types: `FirstTradePayload`, `GlobalPnlPayload`, `MarketPnlPayload`, `EventPnlPayload`, `ConditionMetricsPayload`, `EventMetricsPayload`, `PositionMetricsPayload`, `VolumeMilestonePayload`, `EventVolumeMilestonePayload`, `PositionVolumeMilestonePayload`, `ProbabilitySpikePayload`.

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

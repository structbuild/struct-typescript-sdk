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
const market = await client.markets.getMarket({ condition_id: "0x..." });
const marketBySlug = await client.markets.getMarketBySlug({ slug: "will-x-happen" });
const trades = await client.markets.getTrades({ condition_id: "0x..." });
const candles = await client.markets.getCandlestick({ condition_id: "0x...", timeframe: "1d", interval: "1h" });
const metrics = await client.markets.getMarketMetrics({ condition_id: "0x..." });
const volumeChart = await client.markets.getMarketVolumeChart({ condition_id: "0x..." });
```

### Events

```typescript
const events = await client.events.getEvents({ limit: 10 });
const event = await client.events.getEvent({ id: "123" });
const eventBySlug = await client.events.getEventBySlug({ slug: "us-election" });
const eventMetrics = await client.events.getEventMetrics({ event_id: "123" });
```

### Trader / Portfolio

```typescript
const portfolio = await client.trader.getPortfolio({ address: "0x..." });
const positions = await client.trader.getPortfolioPositions({ address: "0x..." });
const trades = await client.trader.getTraderTrades({ address: "0x..." });
const profile = await client.trader.getTraderProfile({ address: "0x..." });
const pnl = await client.trader.getTraderPnl({ address: "0x..." });
const pnlByMarket = await client.trader.getTraderMarketPnl({ address: "0x..." });
const pnlByEvent = await client.trader.getTraderEventPnl({ address: "0x..." });
const pnlCandles = await client.trader.getTraderPnlCandles({ address: "0x..." });
const volumeChart = await client.trader.getTraderVolumeChart({ address: "0x..." });
```

### Holders

```typescript
const marketHolders = await client.holders.getMarketHolders({ condition_id: "0x..." });
const eventHolders = await client.holders.getEventHolders({ event_slug: "us-election" });
const positionHolders = await client.holders.getPositionHolders({ position_id: "123" });
const history = await client.holders.getMarketHoldersHistory({ condition_id: "0x..." });
```

### Series

```typescript
const series = await client.series.getSeriesList();
const detail = await client.series.getSeriesDetail({ identifier: "my-series" });
const seriesEvents = await client.series.getSeriesEvents({ identifier: "my-series" });
```

### Search, Tags, Bonds

```typescript
const results = await client.search.search({ query: "election" });
const tags = await client.tags.getTags();
const bonds = await client.bonds.getBonds();
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
  await client.markets.getMarket({ condition_id: "0x..." });
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

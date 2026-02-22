# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

TypeScript SDK (`@struct/sdk`) for prediction market APIs via `api.struct.to`. Supports multiple venues (Polymarket now, Kalshi etc. later) through a namespace-based client. Published as a dual ESM/CJS package.

## Commands

- **Build:** `bun run build` (outputs ESM + CJS to `dist/`, generates declaration files)
- **Typecheck:** `bun run typecheck`
- **Install deps:** `bun install`
- **Fetch OpenAPI spec:** `bun run fetch-spec:polymarket`
- **Generate types:** `bun run generate:polymarket`

No test framework is configured yet.

## Architecture

- `src/client.ts` — `StructClient` takes `StructClientConfig` (API key, optional venue/baseUrl/timeout/retry/hooks) and wraps `HttpClient` with auth headers. Instantiates 9 namespace objects: holders, scoring, tags, events, markets, series, trader, bonds, search.
- `src/namespaces/base.ts` — `Namespace` base class that holds `HttpClient` and `defaultVenue`. Provides a `get()` helper that prepends `/{venue}` to paths.
- `src/namespaces/*.ts` — Domain-specific namespace classes extending `Namespace`. Each method accepts an optional `venue` parameter as its last argument. Namespaces: holders, scoring, tags, events, markets, series, trader, bonds, search.
- `src/http.ts` — Generic `HttpClient` built on `fetch` with timeout via `AbortController`, query param building, exponential backoff retry (429/5xx), request/response hooks, and typed `HttpResponse<T>` responses.
- `src/errors.ts` — Error hierarchy: `StructError` → `HttpError` | `NetworkError` | `TimeoutError` | `WebSocketError` | `WebSocketClosedError`.
- `src/paginate.ts` — `paginate()` async generator for offset-based pagination across any namespace method.
- `src/ws.ts` — `StructWebSocket` for real-time trade streaming. Event system (`on`/`off`/`once`), subscriptions (markets, positions, wallets, conditions, whale/smart-money/insider rooms), auto-replays subscriptions on reconnect.
- `src/ws-transport.ts` — Low-level WebSocket connection management with reconnection (exponential backoff + jitter), pending/replay message queues.
- `src/types/` — All type definitions. `common.ts` (pagination/sort/Venue), `helpers.ts` (OpenAPI type utilities: `OperationQuery`, `OperationPath`, `OperationResponse`), `http.ts` (client config/request/response), `ws.ts` (WebSocket types). `index.ts` barrel exports all types.
- `src/generated/polymarket.ts` — Auto-generated types from the Polymarket OpenAPI spec via `openapi-typescript`. Do not edit manually.
- `src/index.ts` — Public barrel export.

## Conventions

- Bun is the runtime and package manager (not npm/yarn)
- Strict TypeScript (`strict: true`, `noUncheckedIndexedAccess`, `verbatimModuleSyntax`)
- API response types use `snake_case` to match the REST API; SDK config/params use `camelCase`
- All internal imports use `.js` extensions (required by `verbatimModuleSyntax` + ESM)
- No inline code comments
- Client API pattern: `client.{namespace}.{method}(params, venue?)`
- Venue defaults to `"polymarket"` but can be overridden per-call or at client construction
- Types in `src/types/index.ts` re-export from generated OpenAPI types with SDK-friendly names; add new type aliases there when wrapping generated types
- Use `OperationQuery<K>`, `OperationPath<K>`, `OperationResponse<K>` from `src/types/helpers.ts` to extract typed params/responses from the generated OpenAPI spec

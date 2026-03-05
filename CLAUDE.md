# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

TypeScript SDK (`@structbuild/sdk`) for prediction market APIs via `api.struct.to`. Supports multiple venues (Polymarket now, Kalshi etc. later) through a namespace-based client. Published as a dual ESM/CJS package.

## Commands

- **Build:** `bun run build` (outputs ESM + CJS to `dist/`, generates declaration files)
- **Typecheck:** `bun run typecheck`
- **Install deps:** `bun install`
- **Fetch OpenAPI spec:** `bun run fetch-spec:polymarket`
- **Generate types:** `bun run generate:polymarket`
- **Full pipeline:** `bun run prep` (fetch specs, generate types, check routes, build)
- **Check routes:** `bun run check-routes` (validates namespace routes match OpenAPI spec)
- **Fetch webhook spec:** `bun run fetch-spec:webhooks`
- **Generate webhook types:** `bun run generate:webhooks`
- **Fix spec:** `bun run fix-spec` (fixes broken `$ref`s in the OpenAPI spec)
- **Test:** `bun test` (integration tests against live API, requires `STRUCT_API_KEY`)
- **Test watch:** `bun test --watch`

## Architecture

- `src/client.ts` — `StructClient` takes `StructClientConfig` (API key, optional venue/baseUrl/timeout/retry/hooks) and wraps `HttpClient` with auth headers. Instantiates 10 namespace objects: assets, holders, tags, events, markets, series, trader, bonds, search, webhooks.
- `src/namespaces/base.ts` — `Namespace` base class that holds `HttpClient` and `defaultVenue`. Provides a `get()` helper that prepends `/{venue}` to paths.
- `src/namespaces/*.ts` — Domain-specific namespace classes extending `Namespace`. Each method accepts an optional `venue` parameter as its last argument. Namespaces: assets, holders, tags, events, markets, series, trader, bonds, search, webhooks (webhooks extends `PlatformNamespace` — no venue parameter).
- `src/http.ts` — Generic `HttpClient` built on `fetch` with timeout via `AbortController`, query param building, exponential backoff retry (429/5xx), request/response hooks, and typed `HttpResponse<T>` responses.
- `src/errors.ts` — Error hierarchy: `StructError` → `HttpError` | `NetworkError` | `TimeoutError` | `WebSocketError` | `WebSocketClosedError`.
- `src/paginate.ts` — `paginate()` async generator for offset-based pagination across any namespace method.
- `src/ws.ts` — `StructWebSocket` for real-time trade streaming. Event system (`on`/`off`/`once`), subscriptions (markets, positions, wallets, conditions, whale/smart-money/insider rooms), auto-replays subscriptions on reconnect.
- `src/ws-transport.ts` — Low-level WebSocket connection management with reconnection (exponential backoff + jitter), pending/replay message queues.
- `src/types/` — All type definitions. `common.ts` (pagination/sort/Venue), `helpers.ts` (OpenAPI type utilities: `OperationQuery`, `OperationPath`, `OperationResponse`), `webhook-helpers.ts` (webhook OpenAPI type utilities), `http.ts` (client config/request/response), `ws.ts` (WebSocket types). `index.ts` barrel exports all types.
- `src/generated/polymarket.ts` — Auto-generated types from the Polymarket OpenAPI spec via `openapi-typescript`. Do not edit manually.
- `src/generated/webhooks.ts` — Auto-generated types from the Webhooks OpenAPI spec. Do not edit manually.
- `src/index.ts` — Public barrel export.
- `tests/integration.test.ts` — Auto-discovers namespace methods and runs them against the live API. Test config in `tests/integration.meta.ts` defines params and operationId mappings per method.

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

---
name: fix-prep
description: Fix route mismatches found by `bun run prep`. Run when the OpenAPI spec changes and SDK routes need updating.
disable-model-invocation: false
allowed-tools: Bash, Read, Edit, Write, Grep, Glob, Task
---

# Fix Prep — Sync SDK Routes with OpenAPI Spec

## Step 1: Run prep and capture errors

Run `bun run prep` (or `bun run prep:staging` if the user passed `staging`) and parse the output. Identify:

- **Phantom routes**: SDK methods that reference paths no longer in the OpenAPI spec
- **Unimplemented routes**: OpenAPI spec paths with no corresponding SDK method

If prep passes with no errors, skip Steps 2–5 and proceed directly to Step 6 (description leak scan). Always run Step 6 regardless of whether prep passed or failed.

## Step 2: Investigate each phantom route

For each phantom route:

1. Read the namespace file (e.g. `src/namespaces/holders.ts`) to see the current implementation
2. Query the OpenAPI spec (`openapi/polymarket.json`) for the correct path, checking if:
   - A path parameter was changed to a query parameter (or vice versa)
   - The route path itself changed
   - The endpoint was removed entirely
3. Check the generated types in `src/generated/polymarket.ts` for the operation ID and parameter schema

## Step 3: Investigate each unimplemented route

For each unimplemented route:

1. Query the OpenAPI spec for the endpoint's operation ID, parameters, and response schema
2. Determine which namespace file it belongs to based on the URL path prefix (e.g. `/holders/*` → `holders.ts`, `/trader/*` → `trader.ts`)
3. Check if there's an existing method with a similar name that might conflict

## Step 4: Apply fixes

### Fixing phantom routes

- Update the namespace method to use the correct path and parameter style
- Update the corresponding params type in `src/types/index.ts`:
  - If the API now uses query params, extend `OperationQuery<"operation_id">` and remove manual field definitions that are now covered by the generated types
  - If the API now uses path params, add the path param field and destructure it in the method

### Adding unimplemented routes

1. Add a type alias in `src/types/index.ts` for any new schemas (e.g. `export type NewType = Schemas["NewType"]`)
2. Add a params interface in `src/types/index.ts`, extending `OperationQuery<"operation_id">` for query params and adding path params as explicit fields with `address: string` pattern
3. Add the method to the appropriate namespace file following the existing pattern:
   - Import the new types
   - Destructure path params from the params object
   - Call `this.get<ResponseType>(venue, path, { params: query })`
4. Ensure no duplicate method names — if a name conflicts, choose a descriptive alternative

## Step 5: Verify

Run `bun run prep` again. It must pass with zero errors (exit code 0). If it fails, repeat from Step 2.

## Step 6: Scan for description leaks

Even when prep passes, OpenAPI `description` and `summary` fields can leak internal implementation details. Public SDK consumers should see *what* an endpoint does, not *how* it is built.

Scan all files in `openapi/` and report any `description`/`summary` text that reveals:

- **Storage or transport tech** — names of databases, caches, message queues, search engines, object stores, or any other infra primitive that holds or moves data
- **Data-pipeline jargon** — terms describing precomputation strategies, table roles in a warehouse, or orchestration tooling that should be invisible to API consumers
- **Internal-only references** — service names, repo names, ticket IDs, owner team names, or anything prefixed with "internal"
- **Author markers** — `TODO`, `FIXME`, `HACK`, `XXX`, "deprecated but…", or apologies/explanations aimed at internal readers
- **SQL fragments or column names** that obviously came from a query rather than user-facing copy

Do **not** enumerate the specific forbidden terms in this file — `.claude/` is committed to git and naming the project's stack here would itself be the leak. Generate the term list at scan time from your general knowledge of the categories above.

### How to scan

For each spec file, restrict matches to lines containing `"description"` or `"summary"` (avoids false positives in schema names) using ripgrep with a case-insensitive regex assembled from the categories above. Iterate over `openapi/polymarket.json`, `openapi/webhooks.json`, `openapi/ws.json`, `openapi/ws-alerts.json`.

### Reporting

For each match, report:
- File and line number
- Which category it fell into (storage/pipeline/internal/author-marker/sql)
- The full `description`/`summary` string
- The owning operation ID or schema name (look upward in the JSON for the nearest `operationId` or schema key)

Group findings by spec file. Do not silently rewrite the spec — these files are auto-fetched by `bun run fetch-specs` and will be overwritten on next run.

### Fixing leaks

Spec descriptions originate in the backend repo (`/Users/quantum/Documents/GitHub/struct-backend`). Hand the report to the user and offer to:

1. Open the backend repo and locate the route handler / schema with the leaking description
2. Rewrite the description to describe behavior only — what it returns, what params mean — never the storage layer, materialization strategy, or internal service names
3. Re-run `bun run fetch-specs` once the backend change is deployed to refresh the local spec

If no leaks are found, say so explicitly.

## Conventions

- All params types go in `src/types/index.ts`
- Generated type aliases use `Schemas["TypeName"]` from `src/types/helpers.ts`
- Namespace methods follow the pattern: `async methodName(params: ParamsType, venue?: Venue): Promise<HttpResponse<ResponseType>>`
- Path params are destructured: `const { pathParam, ...query } = params`
- Query-only methods spread params: `{ params: { ...params } }`
- Use `encodeURIComponent()` for path params in template literals
- No inline code comments

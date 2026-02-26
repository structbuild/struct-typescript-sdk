---
name: fix-prep
description: Fix route mismatches found by `bun run prep`. Run when the OpenAPI spec changes and SDK routes need updating.
disable-model-invocation: false
allowed-tools: Bash, Read, Edit, Write, Grep, Glob, Task
---

# Fix Prep — Sync SDK Routes with OpenAPI Spec

## Step 1: Run prep and capture errors

Run `bun run prep` and parse the output. Identify:

- **Phantom routes**: SDK methods that reference paths no longer in the OpenAPI spec
- **Unimplemented routes**: OpenAPI spec paths with no corresponding SDK method

If prep passes with no errors, stop — nothing to fix.

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

## Conventions

- All params types go in `src/types/index.ts`
- Generated type aliases use `Schemas["TypeName"]` from `src/types/helpers.ts`
- Namespace methods follow the pattern: `async methodName(params: ParamsType, venue?: Venue): Promise<HttpResponse<ResponseType>>`
- Path params are destructured: `const { pathParam, ...query } = params`
- Query-only methods spread params: `{ params: { ...params } }`
- Use `encodeURIComponent()` for path params in template literals
- No inline code comments

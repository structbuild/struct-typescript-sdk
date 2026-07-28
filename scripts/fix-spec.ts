import type { OpenAPI3 } from "openapi-typescript";

const polymarketSpecPath = "openapi/polymarket.json";
const webhooksSpecPath = "openapi/webhooks.json";

const polymarketSpec = (await Bun.file(polymarketSpecPath).json()) as OpenAPI3;

const inlineSchemas: Record<string, object> = {
  "#/components/schemas/ChartResolution": {
    type: "string" as const,
    enum: ["1H", "6H", "1D", "1W", "1M", "ALL"],
  },
  "#/components/schemas/PositionStatus": {
    type: "string" as const,
    enum: ["open", "closed"],
  },
  "#/components/schemas/ChangeTimeframe": {
    type: "string" as const,
    enum: ["1h", "24h", "7d", "30d", "1mo", "1y"],
  },
  "#/components/schemas/ComboFilter": {
    anyOf: [
      { type: "boolean" as const },
      { type: "string" as const, enum: ["binary", "negrisk", "combinatorial"] },
    ],
  },
};

let polymarketFixed = 0;

for (const [, pathItem] of Object.entries(polymarketSpec.paths ?? {})) {
  for (const method of Object.values(pathItem ?? {})) {
    if (typeof method !== "object" || method === null || !("parameters" in method)) continue;
    for (const param of (method as any).parameters ?? []) {
      const replacement = inlineSchemas[param?.schema?.$ref];
      if (replacement) {
        param.schema = replacement;
        polymarketFixed++;
      }
    }
  }
}

if (polymarketFixed > 0) {
  await Bun.write(polymarketSpecPath, JSON.stringify(polymarketSpec));
  console.log(`Fixed ${polymarketFixed} broken $ref(s) in ${polymarketSpecPath}`);
} else {
  console.log(`No broken refs found in ${polymarketSpecPath} — spec is clean.`);
}

const webhooksSpec = (await Bun.file(webhooksSpecPath).json()) as OpenAPI3 & {
  webhooks?: Record<string, unknown>;
};

const knownSchemas = new Set(Object.keys(webhooksSpec.components?.schemas ?? {}));

function collectRefs(node: unknown, refs: Set<string>): void {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    for (const item of node) collectRefs(item, refs);
    return;
  }
  for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
    if (key === "$ref" && typeof value === "string") refs.add(value);
    else collectRefs(value, refs);
  }
}

const droppedOps: string[] = [];
const webhooksMap = (webhooksSpec.webhooks ?? {}) as Record<string, Record<string, unknown>>;

for (const [opName, opItem] of Object.entries(webhooksMap)) {
  const refs = new Set<string>();
  collectRefs(opItem, refs);
  const missing = [...refs].filter((ref) => {
    if (!ref.startsWith("#/components/schemas/")) return false;
    const name = ref.slice("#/components/schemas/".length);
    return !knownSchemas.has(name);
  });
  if (missing.length > 0) {
    delete webhooksMap[opName];
    droppedOps.push(opName);
  }
}

const droppedEventValues = droppedOps.map((op) => op.replace(/-/g, "_"));
const eventEnum = (webhooksSpec.components?.schemas as Record<string, { enum?: string[] }> | undefined)?.PolymarketWebhookEvent?.enum;
let strippedEnumValues: string[] = [];
if (eventEnum && droppedEventValues.length > 0) {
  strippedEnumValues = eventEnum.filter((v) => droppedEventValues.includes(v));
  (webhooksSpec.components!.schemas as Record<string, { enum?: string[] }>).PolymarketWebhookEvent.enum =
    eventEnum.filter((v) => !droppedEventValues.includes(v));
}

if (droppedOps.length > 0) {
  await Bun.write(webhooksSpecPath, JSON.stringify(webhooksSpec));
  console.log(`Dropped ${droppedOps.length} webhook operation(s) with unresolved $refs: ${droppedOps.join(", ")}`);
  if (strippedEnumValues.length > 0) {
    console.log(`Stripped ${strippedEnumValues.length} value(s) from PolymarketWebhookEvent enum: ${strippedEnumValues.join(", ")}`);
  }
} else {
  console.log(`No broken refs found in ${webhooksSpecPath} — spec is clean.`);
}

const wsSpecPaths = ["openapi/ws.json", "openapi/ws-alerts.json"];

for (const wsPath of wsSpecPaths) {
  const wsSpec = (await Bun.file(wsPath).json()) as {
    components?: { schemas?: Record<string, unknown> };
  };
  const schemas = wsSpec.components?.schemas ?? {};
  const wsKnownSchemas = new Set(Object.keys(schemas));
  const wsRefs = new Set<string>();
  collectRefs(schemas, wsRefs);

  const missingSchemas = [...wsRefs]
    .filter((ref) => ref.startsWith("#/components/schemas/"))
    .map((ref) => ref.slice("#/components/schemas/".length))
    .filter((name) => !wsKnownSchemas.has(name));

  const uniqueMissing = [...new Set(missingSchemas)];

  if (uniqueMissing.length > 0) {
    for (const name of uniqueMissing) {
      schemas[name] = { type: "object", additionalProperties: true };
    }
    await Bun.write(wsPath, JSON.stringify(wsSpec));
    console.log(`Stubbed ${uniqueMissing.length} missing schema(s) in ${wsPath}: ${uniqueMissing.join(", ")}`);
  } else {
    console.log(`No broken refs found in ${wsPath} — spec is clean.`);
  }
}

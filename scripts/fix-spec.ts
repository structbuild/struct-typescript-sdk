import type { OpenAPI3 } from "openapi-typescript";

const specPath = "openapi/polymarket.json";
const spec = (await Bun.file(specPath).json()) as OpenAPI3;

const inlineSchemas: Record<string, object> = {
  "#/components/schemas/ChartResolution": {
    type: "string" as const,
    enum: ["1H", "6H", "1D", "1W", "1M", "ALL"],
  },
  "#/components/schemas/PositionStatus": {
    type: "string" as const,
    enum: ["open", "closed"],
  },
};

let fixed = 0;

for (const [, pathItem] of Object.entries(spec.paths ?? {})) {
  for (const method of Object.values(pathItem ?? {})) {
    if (typeof method !== "object" || method === null || !("parameters" in method)) continue;
    for (const param of (method as any).parameters ?? []) {
      const replacement = inlineSchemas[param?.schema?.$ref];
      if (replacement) {
        param.schema = replacement;
        fixed++;
      }
    }
  }
}

if (fixed > 0) {
  await Bun.write(specPath, JSON.stringify(spec));
  console.log(`Fixed ${fixed} broken $ref(s) in ${specPath}`);
} else {
  console.log("No broken refs found — spec is clean.");
}

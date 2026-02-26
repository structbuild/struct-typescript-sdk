import type { OpenAPI3 } from "openapi-typescript";

const specPath = "openapi/polymarket.json";
const spec = (await Bun.file(specPath).json()) as OpenAPI3;

const chartResolutionSchema = {
  type: "string" as const,
  enum: ["1H", "6H", "1D", "1W", "1M", "ALL"],
};

let fixed = 0;

for (const [, pathItem] of Object.entries(spec.paths ?? {})) {
  for (const method of Object.values(pathItem ?? {})) {
    if (typeof method !== "object" || method === null || !("parameters" in method)) continue;
    for (const param of (method as any).parameters ?? []) {
      if (param?.schema?.$ref === "#/components/schemas/ChartResolution") {
        param.schema = chartResolutionSchema;
        fixed++;
      }
    }
  }
}

if (fixed > 0) {
  await Bun.write(specPath, JSON.stringify(spec));
  console.log(`Fixed ${fixed} broken ChartResolution $ref(s) in ${specPath}`);
} else {
  console.log("No broken ChartResolution refs found — spec is clean.");
}

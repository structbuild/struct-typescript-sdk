import { describe, expect, test, beforeAll, afterAll } from "bun:test";
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { StructClient, HttpError } from "../src/index.js";
import { Namespace, PlatformNamespace } from "../src/namespaces/index.js";
import { methodMeta, type MethodConfig } from "./integration.meta.js";

const API_KEY = Bun.env.STRUCT_API_KEY ?? "";
const REPORT_PATH = "logs/integration-report.md";

type OpenAPISpec = {
	paths: Record<string, Record<string, { operationId?: string; responses?: Record<string, { content?: Record<string, { schema?: Record<string, unknown> }> }> }>>;
	components: { schemas: Record<string, Record<string, unknown>> };
};

function loadSpecs(): { polymarket: OpenAPISpec; webhooks: OpenAPISpec } {
	const base = join(import.meta.dir, "..", "openapi");
	return {
		polymarket: JSON.parse(readFileSync(join(base, "polymarket.json"), "utf-8")),
		webhooks: JSON.parse(readFileSync(join(base, "webhooks.json"), "utf-8")),
	};
}

function resolveRef(spec: OpenAPISpec, ref: string): Record<string, unknown> | null {
	const parts = ref.replace("#/", "").split("/");
	let current: unknown = spec;
	for (const p of parts) {
		if (current && typeof current === "object") current = (current as Record<string, unknown>)[p];
		else return null;
	}
	return (current as Record<string, unknown>) ?? null;
}

interface SchemaInfo {
	type: string;
	schemaName: string | null;
	properties: string[];
	required: string[];
	itemSchemaName: string | null;
	itemProperties: string[];
	itemRequired: string[];
}

function resolveResponseSchema(spec: OpenAPISpec, operationId: string): SchemaInfo | null {
	for (const methods of Object.values(spec.paths)) {
		for (const details of Object.values(methods)) {
			if (details?.operationId !== operationId) continue;
			const schema = details.responses?.["200"]?.content?.["application/json"]?.schema
				?? details.responses?.["201"]?.content?.["application/json"]?.schema;
			if (!schema) return null;
			return parseSchema(spec, schema as Record<string, unknown>);
		}
	}
	return null;
}

function parseSchema(spec: OpenAPISpec, schema: Record<string, unknown>): SchemaInfo {
	const info: SchemaInfo = {
		type: "unknown",
		schemaName: null,
		properties: [],
		required: [],
		itemSchemaName: null,
		itemProperties: [],
		itemRequired: [],
	};

	let resolved = schema;
	if (typeof schema["$ref"] === "string") {
		info.schemaName = schema["$ref"].split("/").pop() ?? null;
		resolved = resolveRef(spec, schema["$ref"]) ?? schema;
	}

	info.type = (resolved["type"] as string) ?? (info.schemaName ? "object" : "unknown");

	if (resolved["properties"] && typeof resolved["properties"] === "object") {
		info.properties = Object.keys(resolved["properties"]);
		info.required = Array.isArray(resolved["required"]) ? (resolved["required"] as string[]) : [];
	}

	if (info.type === "array" && resolved["items"] && typeof resolved["items"] === "object") {
		const items = resolved["items"] as Record<string, unknown>;
		let resolvedItems = items;
		if (typeof items["$ref"] === "string") {
			info.itemSchemaName = items["$ref"].split("/").pop() ?? null;
			resolvedItems = resolveRef(spec, items["$ref"]) ?? items;
		}
		if (resolvedItems["properties"] && typeof resolvedItems["properties"] === "object") {
			info.itemProperties = Object.keys(resolvedItems["properties"]);
			info.itemRequired = Array.isArray(resolvedItems["required"]) ? (resolvedItems["required"] as string[]) : [];
		}
	}

	return info;
}

function formatSchemaInfo(schema: SchemaInfo): string {
	const parts: string[] = [];

	if (schema.type === "array") {
		const name = schema.itemSchemaName ?? "unknown";
		parts.push(`array<${name}>`);
		if (schema.itemProperties.length > 0) {
			parts.push(`item keys: [${schema.itemProperties.join(", ")}]`);
		}
		if (schema.itemRequired.length > 0) {
			parts.push(`item required: [${schema.itemRequired.join(", ")}]`);
		}
	} else {
		const name = schema.schemaName ?? schema.type;
		parts.push(name);
		if (schema.properties.length > 0) {
			parts.push(`keys: [${schema.properties.join(", ")}]`);
		}
		if (schema.required.length > 0) {
			parts.push(`required: [${schema.required.join(", ")}]`);
		}
	}

	return parts.join(" | ");
}

const specs = loadSpecs();

function getExpectedSchema(meta: MethodConfig | undefined): { schema: SchemaInfo | null; formatted: string } {
	if (!meta?.operationId) return { schema: null, formatted: "n/a (no operationId)" };
	const schema = resolveResponseSchema(specs.polymarket, meta.operationId)
		?? resolveResponseSchema(specs.webhooks, meta.operationId);
	if (!schema) return { schema: null, formatted: `n/a (operationId "${meta.operationId}" not found in spec)` };
	return { schema, formatted: formatSchemaInfo(schema) };
}

function deriveShapeFromSchema(schema: SchemaInfo | null): {
	shape: "array" | "object" | "defined";
	requiredKeys: string[];
} {
	if (!schema) return { shape: "defined", requiredKeys: [] };

	if (schema.type === "array") {
		return { shape: "array", requiredKeys: schema.itemRequired };
	}

	if (schema.type === "object" || schema.properties.length > 0) {
		return { shape: "object", requiredKeys: schema.required };
	}

	return { shape: "defined", requiredKeys: [] };
}

interface TestResult {
	namespace: string;
	method: string;
	status: "pass" | "fail";
	httpMethod: string;
	url: string;
	httpStatus: number | null;
	durationMs: number;
	expectedShape: string;
	openApiSchema: string;
	actualShape: string | null;
	error: string | null;
	responseBody: string | null;
}

const results: TestResult[] = [];
let lastRequest: { method: string; url: string } | null = null;
let lastResponse: { status: number; durationMs: number } | null = null;

function recordPass(namespace: string, method: string, expectedShape: string, openApiSchema: string) {
	results.push({
		namespace,
		method,
		status: "pass",
		httpMethod: lastRequest?.method ?? "",
		url: lastRequest?.url ?? "",
		httpStatus: lastResponse?.status ?? null,
		durationMs: lastResponse?.durationMs ?? 0,
		expectedShape,
		openApiSchema,
		actualShape: null,
		error: null,
		responseBody: null,
	});
}

function recordFail(
	namespace: string,
	method: string,
	expectedShape: string,
	openApiSchema: string,
	opts: { actualShape?: string; error: string; httpStatus?: number; responseBody?: string },
) {
	results.push({
		namespace,
		method,
		status: "fail",
		httpMethod: lastRequest?.method ?? "",
		url: lastRequest?.url ?? "",
		httpStatus: opts.httpStatus ?? lastResponse?.status ?? null,
		durationMs: lastResponse?.durationMs ?? 0,
		expectedShape,
		openApiSchema,
		actualShape: opts.actualShape ?? null,
		error: opts.error,
		responseBody: opts.responseBody ?? null,
	});
}

function writeReport() {
	mkdirSync("logs", { recursive: true });

	const passes = results.filter((r) => r.status === "pass");
	const failures = results.filter((r) => r.status === "fail");

	let md = `# Integration Test Report\n\n`;
	md += `**Date:** ${new Date().toISOString()}\n`;
	md += `**Base URL:** https://api.struct.to/v1\n`;
	md += `**Total:** ${results.length} | **Pass:** ${passes.length} | **Fail:** ${failures.length}\n\n`;

	if (failures.length > 0) {
		md += `---\n\n## Failures\n\n`;

		for (const f of failures) {
			md += `### ${f.namespace}.${f.method}\n\n`;
			md += `| Field | Value |\n`;
			md += `|-------|-------|\n`;
			md += `| Endpoint | \`${f.httpMethod} ${f.url}\` |\n`;
			md += `| HTTP Status | ${f.httpStatus ?? "N/A"} |\n`;
			md += `| Duration | ${Math.round(f.durationMs)}ms |\n`;
			md += `| Expected | ${f.expectedShape} |\n`;
			md += `| OpenAPI Schema | ${f.openApiSchema} |\n`;
			if (f.actualShape) {
				md += `| Actual | ${f.actualShape} |\n`;
			}
			md += `| Error | ${f.error} |\n`;
			md += `\n`;

			if (f.responseBody) {
				md += `<details>\n<summary>Response body</summary>\n\n\`\`\`json\n${f.responseBody}\n\`\`\`\n\n</details>\n\n`;
			}
		}
	}

	md += `---\n\n## All Results\n\n`;
	md += `| Status | Namespace | Method | Endpoint | HTTP | Duration | OpenAPI Schema |\n`;
	md += `|--------|-----------|--------|----------|------|----------|----------------|\n`;

	for (const r of results) {
		const icon = r.status === "pass" ? "PASS" : "FAIL";
		const path = r.url.replace("https://api.struct.to/v1", "");
		const shortPath = path.length > 60 ? path.slice(0, 57) + "..." : path;
		md += `| ${icon} | ${r.namespace} | ${r.method} | \`${r.httpMethod} ${shortPath}\` | ${r.httpStatus ?? "-"} | ${Math.round(r.durationMs)}ms | ${r.openApiSchema} |\n`;
	}

	md += `\n`;
	writeFileSync(REPORT_PATH, md);
}

function describeShape(value: unknown): string {
	if (value === null) return "null";
	if (value === undefined) return "undefined";
	if (Array.isArray(value)) return `array(${value.length})`;
	if (typeof value === "object") return `object{${Object.keys(value).join(", ")}}`;
	return typeof value;
}

function assertShape(
	namespace: string,
	method: string,
	res: { success: boolean; data: unknown },
	expected: "array" | "object" | "defined",
	openApiSchema: string,
	requiredKeys?: string[],
) {
	const issues: string[] = [];

	if (!res.success) issues.push(`success was false, expected true`);

	if (expected === "array" && !Array.isArray(res.data)) {
		issues.push(`data should be an array but got ${describeShape(res.data)}`);
	} else if (expected === "object" && (typeof res.data !== "object" || res.data === null || Array.isArray(res.data))) {
		issues.push(`data should be an object but got ${describeShape(res.data)}`);
	} else if (expected === "defined" && res.data === undefined) {
		issues.push(`data should be defined but was undefined`);
	}

	if (requiredKeys && res.data && typeof res.data === "object" && !Array.isArray(res.data)) {
		const obj = res.data as Record<string, unknown>;
		for (const key of requiredKeys) {
			if (!(key in obj)) issues.push(`missing required key "${key}" in data`);
		}
	}

	if (requiredKeys && Array.isArray(res.data) && res.data.length > 0) {
		const first = res.data[0] as Record<string, unknown>;
		if (first && typeof first === "object") {
			for (const key of requiredKeys) {
				if (!(key in first)) issues.push(`missing required key "${key}" in data[0]`);
			}
		}
	}

	const shapeLabel = `${expected}${requiredKeys ? ` with keys [${requiredKeys.join(", ")}]` : ""}`;

	if (issues.length > 0) {
		recordFail(namespace, method, shapeLabel, openApiSchema, {
			actualShape: describeShape(res.data),
			error: issues.join("; "),
			responseBody: JSON.stringify(res.data, null, 2).slice(0, 2000),
		});
		throw new Error(`[${namespace}.${method}] ${issues.join("; ")}`);
	}

	recordPass(namespace, method, shapeLabel, openApiSchema);
}

function handleHttpError(namespace: string, method: string, expectedShape: string, openApiSchema: string, err: unknown): never {
	const alreadyRecorded = results.some(
		(r) => r.namespace === namespace && r.method === method && r.status === "fail",
	);

	if (!alreadyRecorded) {
		if (err instanceof HttpError) {
			const body = typeof err.body === "object" && err.body !== null ? err.body as Record<string, unknown> : null;
			recordFail(namespace, method, expectedShape, openApiSchema, {
				httpStatus: err.status,
				error: `HTTP ${err.status}: ${body?.message ?? err.statusText}`,
				responseBody: err.body != null ? JSON.stringify(err.body, null, 2).slice(0, 2000) : undefined,
			});
		} else {
			recordFail(namespace, method, expectedShape, openApiSchema, {
				error: err instanceof Error ? err.message : String(err),
			});
		}
	}

	throw err;
}

type SetupData = Record<string, string>;

function resolveParams(params: Record<string, unknown>, setupData: SetupData): Record<string, unknown> {
	const resolved: Record<string, unknown> = {};
	for (const [key, value] of Object.entries(params)) {
		if (typeof value === "string" && value.startsWith("$")) {
			resolved[key] = setupData[value.slice(1)]!;
		} else {
			resolved[key] = value;
		}
	}
	return resolved;
}

const EXCLUDED_METHODS = new Set(["constructor", "get", "post", "put", "delete"]);

describe.skipIf(!API_KEY)("integration", () => {
	const client = new StructClient({
		apiKey: API_KEY,
		onRequest: (info) => {
			lastRequest = { method: info.method, url: info.url };
		},
		onResponse: (info) => {
			lastResponse = { status: info.status, durationMs: info.durationMs };
		},
	});

	const setupData: SetupData = {};

	beforeAll(async () => {
		const [marketsRes, eventsRes, tagsRes, seriesRes, globalPnlRes] =
			await Promise.all([
				client.markets.getMarkets({ limit: 1 }),
				client.events.getEvents({ limit: 1 }),
				client.tags.getTags({ limit: 1 }),
				client.series.getSeriesList({ limit: 1 }),
				client.trader.getGlobalPnl({ limit: 1 }),
			]);

		const market = marketsRes.data[0]!;
		setupData.conditionId = market.condition_id;
		setupData.positionId = market.outcomes![0]!.position_id!;

		const event = eventsRes.data[0]!;
		setupData.eventSlug = event.event_slug!;

		const tag = tagsRes.data[0]!;
		setupData.tagId = tag.slug!;

		const series = seriesRes.data[0]!;
		setupData.seriesId = series.slug!;

		const trader = globalPnlRes.data[0]!;
		setupData.address = trader.trader!.address;
	});

	afterAll(() => {
		writeReport();
	});

	const namespaces: [string, any][] = [];
	for (const key of Object.getOwnPropertyNames(client)) {
		const val = (client as any)[key];
		if (val instanceof Namespace || val instanceof PlatformNamespace) {
			namespaces.push([key, val]);
		}
	}

	for (const [ns, instance] of namespaces) {
		describe(ns, () => {
			const proto = Object.getPrototypeOf(instance);
			const methods = Object.getOwnPropertyNames(proto).filter(
				(m) => !EXCLUDED_METHODS.has(m) && typeof instance[m] === "function",
			);

			for (const method of methods) {
				const key = `${ns}.${method}`;
				const meta: MethodConfig | undefined = methodMeta[key];

				if (meta?.skip) continue;

				test(method, async () => {
					const { schema, formatted: openApiSchema } = getExpectedSchema(meta);
					const derived = deriveShapeFromSchema(schema);
					const shape = derived.shape;
					const requiredKeys = derived.requiredKeys.length > 0 ? derived.requiredKeys : undefined;
					const shapeLabel = `${shape}${requiredKeys ? ` with keys [${requiredKeys.join(", ")}]` : ""}`;

					try {
						const params = resolveParams(meta?.params ?? { limit: 1 }, setupData);
						const res = await instance[method](params);
						assertShape(ns, method, res, shape, openApiSchema, requiredKeys);
					} catch (err) {
						handleHttpError(ns, method, shapeLabel, openApiSchema, err);
					}
				});
			}
		});
	}
});

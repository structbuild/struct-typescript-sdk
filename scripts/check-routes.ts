import { readFile } from "node:fs/promises";
import { join } from "node:path";

const NAMESPACES_DIR = join(import.meta.dirname, "../src/namespaces");
const TYPES_FILE = join(import.meta.dirname, "../src/types/index.ts");
const WS_TYPES_FILE = join(import.meta.dirname, "../src/types/ws.ts");
const WS_ALERTS_FILE = join(import.meta.dirname, "../src/ws-alerts.ts");

interface SpecConfig {
	specPath: string;
	jsonSpecPath: string;
	venuePrefix: string | null;
	namespaceFiles: string[];
	schemaAccessor: string;
}

const specs: SpecConfig[] = [
	{
		specPath: join(import.meta.dirname, "../src/generated/polymarket.ts"),
		jsonSpecPath: join(import.meta.dirname, "../openapi/polymarket.json"),
		venuePrefix: "/polymarket",
		namespaceFiles: ["assets.ts", "holders.ts", "events.ts", "markets.ts", "series.ts", "trader.ts", "bonds.ts", "search.ts", "tags.ts", "orderBook.ts", "analytics.ts"],
		schemaAccessor: "Schemas",
	},
	{
		specPath: join(import.meta.dirname, "../src/generated/webhooks.ts"),
		jsonSpecPath: join(import.meta.dirname, "../openapi/webhooks.json"),
		venuePrefix: null,
		namespaceFiles: ["webhooks.ts"],
		schemaAccessor: "WebhookSchemas",
	},
];

function normalizeRoute(route: string): string {
	return route.replace(/\$\{encodeURIComponent\([^)]+\)\}/g, "{param}").replace(/\$\{[^}]+\}/g, "{param}");
}

interface SpecRoute {
	path: string;
	methods: string[];
}

async function getSpecRoutes(config: SpecConfig): Promise<Map<string, SpecRoute>> {
	const content = await readFile(config.specPath, "utf-8");
	const routes = new Map<string, SpecRoute>();
	const prefix = config.venuePrefix ?? "";
	const escapedPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	const pathRegex = new RegExp(`^\\s+"(${escapedPrefix}\\/[^"]+)":\\s*\\{`, "gm");
	const methodRegex = /^\s+(get|post|put|patch|delete):\s*operations/gm;

	let pathMatch: RegExpExecArray | null;
	while ((pathMatch = pathRegex.exec(content)) !== null) {
		const rawPath = pathMatch[1];
		const normalized = rawPath.replace(prefix, "").replace(/\{[^}]+\}/g, "{param}");

		const blockStart = pathMatch.index;
		const blockSlice = content.slice(blockStart, blockStart + 1000);
		const methods: string[] = [];
		let methodMatch: RegExpExecArray | null;
		methodRegex.lastIndex = 0;
		while ((methodMatch = methodRegex.exec(blockSlice)) !== null) {
			methods.push(methodMatch[1]);
		}

		routes.set(normalized, { path: rawPath, methods });
	}
	return routes;
}

interface SdkRoute {
	file: string;
	method: string;
	httpMethod: string;
	route: string;
	normalized: string;
}

async function getSdkRoutes(namespaceFiles: string[]): Promise<SdkRoute[]> {
	const routes: SdkRoute[] = [];

	for (const file of namespaceFiles) {
		const content = await readFile(join(NAMESPACES_DIR, file), "utf-8");
		const venueRegex = /async\s+(\w+)\([\s\S]*?(?:return|await)\s+this\.(get|post|put|patch|delete)\b[^(]*\([^,]*,\s*(`[^`]+`|"[^"]+"|'[^']+')/g;
		let match: RegExpExecArray | null;
		while ((match = venueRegex.exec(content)) !== null) {
			const raw = match[3].slice(1, -1);
			routes.push({
				file,
				method: match[1],
				httpMethod: match[2],
				route: raw,
				normalized: normalizeRoute(raw),
			});
		}
		const directRegex = /async\s+(\w+)\([\s\S]*?return\s+this\.http\.(get|post|put|patch|delete)\b[^(]*\(\s*(`[^`]+`|"[^"]+"|'[^']+')/g;
		while ((match = directRegex.exec(content)) !== null) {
			const raw = match[3].slice(1, -1);
			routes.push({
				file,
				method: match[1],
				httpMethod: match[2],
				route: raw,
				normalized: normalizeRoute(raw),
			});
		}
	}
	return routes;
}

async function getSpecSchemas(jsonSpecPath: string): Promise<string[]> {
	const spec = JSON.parse(await readFile(jsonSpecPath, "utf-8"));
	return Object.keys(spec.components?.schemas ?? {});
}

async function getExportedSchemas(typesContent: string): Promise<Set<string>> {
	const exported = new Set<string>();
	for (const m of typesContent.matchAll(/(?:\w+)?Schemas\["(\w+)"\]/g)) exported.add(m[1]);
	for (const m of typesContent.matchAll(/components\["schemas"\]\["(\w+)"\]/g)) exported.add(m[1]);
	for (const m of typesContent.matchAll(/export type (\w+)\s*=/g)) exported.add(m[1]);
	for (const m of typesContent.matchAll(/export interface (\w+)/g)) exported.add(m[1]);
	return exported;
}

async function getWsSpecRooms(jsonSpecPath: string): Promise<string[]> {
	const spec = JSON.parse(await readFile(jsonSpecPath, "utf-8"));
	return Object.keys(spec.channels ?? {});
}

async function getWsSpecRoomAddresses(jsonSpecPath: string): Promise<string[]> {
	const spec = JSON.parse(await readFile(jsonSpecPath, "utf-8"));
	const channels = spec.channels ?? {};
	const rooms = new Set<string>();
	for (const [key, def] of Object.entries(channels) as [string, { address?: string }][]) {
		rooms.add(def.address ?? key);
	}
	return [...rooms];
}

function extractInterfaceKeys(content: string, interfaceName: string): Set<string> {
	const keys = new Set<string>();
	const re = new RegExp(`interface\\s+${interfaceName}\\s*\\{([\\s\\S]*?)\\n\\}`);
	const match = content.match(re);
	if (!match) return keys;
	const body = match[1];
	const keyRegex = /^\s*(\w+)\s*:/gm;
	let km: RegExpExecArray | null;
	while ((km = keyRegex.exec(body)) !== null) {
		keys.add(km[1]);
	}
	return keys;
}

async function getSdkStreamingRooms(): Promise<Set<string>> {
	const content = await readFile(WS_TYPES_FILE, "utf-8");
	return extractInterfaceKeys(content, "WsSubscriptionMap");
}

async function getSdkAlertEvents(): Promise<Set<string>> {
	try {
		const alertsContent = await readFile(WS_ALERTS_FILE, "utf-8");
		if (!/class\s+StructAlertsWebSocket\b/.test(alertsContent)) return new Set();
	} catch {
		return new Set();
	}
	const generated = await readFile(join(import.meta.dirname, "../src/generated/ws-alerts.ts"), "utf-8");
	return extractInterfaceKeys(generated, "WsAlertSubscribeMap");
}

let hasErrors = false;

const typesContent = await readFile(TYPES_FILE, "utf-8");
const wsTypesContent = await readFile(join(import.meta.dirname, "../src/types/ws.ts"), "utf-8");
const wsGeneratedContent = await readFile(join(import.meta.dirname, "../src/generated/ws.ts"), "utf-8");
const wsAlertsGeneratedContent = await readFile(join(import.meta.dirname, "../src/generated/ws-alerts.ts"), "utf-8");
const combinedTypesContent = [typesContent, wsTypesContent, wsGeneratedContent, wsAlertsGeneratedContent].join("\n");
const exportedSchemas = await getExportedSchemas(combinedTypesContent);

for (const config of specs) {
	const specName = config.venuePrefix ?? "platform";
	const specRoutes = await getSpecRoutes(config);
	const sdkRoutes = await getSdkRoutes(config.namespaceFiles);

	const sdkNormalized = new Set(sdkRoutes.map((r) => r.normalized));

	const phantomRoutes = sdkRoutes.filter((r) => !specRoutes.has(r.normalized));
	const missingRoutes = [...specRoutes.entries()]
		.filter(([normalized]) => !sdkNormalized.has(normalized))
		.sort(([a], [b]) => a.localeCompare(b));

	if (phantomRoutes.length > 0) {
		hasErrors = true;
		console.error(`\x1b[31m✗ [${specName}] Phantom routes (SDK routes not in OpenAPI spec):\x1b[0m\n`);
		for (const r of phantomRoutes) {
			console.error(`  ${r.file} → ${r.method}() → ${r.httpMethod.toUpperCase()} ${r.route}`);
		}
		console.error();
	}

	if (missingRoutes.length > 0) {
		const prefix = config.venuePrefix ?? "";
		console.warn(`\x1b[33m⚠ [${specName}] Unimplemented routes (OpenAPI spec routes missing from SDK):\x1b[0m\n`);
		for (const [, spec] of missingRoutes) {
			const methods = spec.methods.map((m) => m.toUpperCase()).join(", ");
			console.warn(`  ${methods} ${spec.path.replace(prefix, "")}`);
		}
		console.warn();
	}

	if (phantomRoutes.length === 0 && missingRoutes.length === 0) {
		console.log(`\x1b[32m✓ [${specName}] All SDK routes match the OpenAPI spec.\x1b[0m`);
	} else if (phantomRoutes.length === 0) {
		console.log(`\x1b[32m✓ [${specName}] No phantom routes found.\x1b[0m`);
	}

	const specSchemas = await getSpecSchemas(config.jsonSpecPath);
	const missingSchemas = specSchemas.filter((s) => !exportedSchemas.has(s));

	if (missingSchemas.length > 0) {
		hasErrors = true;
		console.error(`\x1b[31m✗ [${specName}] Missing schema exports in src/types/index.ts:\x1b[0m\n`);
		for (const schema of missingSchemas) {
			console.error(`  ${config.schemaAccessor}["${schema}"]`);
		}
		console.error();
	} else {
		console.log(`\x1b[32m✓ [${specName}] All schemas exported.\x1b[0m`);
	}
}

const wsJsonPath = join(import.meta.dirname, "../openapi/ws.json");
const wsAlertsJsonPath = join(import.meta.dirname, "../openapi/ws-alerts.json");

interface WsCheckConfig {
	label: string;
	specRooms: string[];
	sdkRooms: Set<string>;
}

const streamingSpecRooms = await getWsSpecRoomAddresses(wsJsonPath);
const alertsSpecChannels = await getWsSpecRooms(wsAlertsJsonPath);
const alertsSpecEvents = alertsSpecChannels
	.filter((c) => c.startsWith("ws_alerts."))
	.map((c) => c.slice("ws_alerts.".length));

const wsChecks: WsCheckConfig[] = [
	{ label: "ws", specRooms: streamingSpecRooms, sdkRooms: await getSdkStreamingRooms() },
	{ label: "ws-alerts", specRooms: alertsSpecEvents, sdkRooms: await getSdkAlertEvents() },
];

for (const check of wsChecks) {
	const phantom = [...check.sdkRooms].filter((r) => !check.specRooms.includes(r));
	const missing = check.specRooms.filter((r) => !check.sdkRooms.has(r));

	if (phantom.length > 0) {
		hasErrors = true;
		console.error(`\x1b[31m✗ [${check.label}] Phantom rooms (SDK rooms not in WS OpenAPI spec):\x1b[0m\n`);
		for (const r of phantom) console.error(`  ${r}`);
		console.error();
	}

	if (missing.length > 0) {
		hasErrors = true;
		console.error(`\x1b[31m✗ [${check.label}] Unimplemented rooms (WS OpenAPI spec rooms missing from SDK):\x1b[0m\n`);
		for (const r of missing) console.error(`  ${r}`);
		console.error();
	}

	if (phantom.length === 0 && missing.length === 0) {
		console.log(`\x1b[32m✓ [${check.label}] All SDK rooms match the WS OpenAPI spec.\x1b[0m`);
	}
}

const wsJsonPaths = [wsJsonPath, wsAlertsJsonPath];
const wsSpecSchemasList = (await Promise.all(wsJsonPaths.map(getSpecSchemas))).flat();
const wsSpecSchemas = [...new Set(wsSpecSchemasList)];
const missingWsSchemas = wsSpecSchemas.filter((s) => !exportedSchemas.has(s));

if (missingWsSchemas.length > 0) {
	hasErrors = true;
	console.error(`\x1b[31m✗ [ws] Missing schema exports:\x1b[0m\n`);
	for (const schema of missingWsSchemas) {
		console.error(`  WsSchemas["${schema}"]`);
	}
	console.error();
} else {
	console.log(`\x1b[32m✓ [ws] All WS schemas exported.\x1b[0m`);
}

const specSourcePath = join(import.meta.dirname, "../openapi/.spec-source.json");
try {
	const specSource = JSON.parse(await readFile(specSourcePath, "utf-8"));
	if (specSource.env === "staging") {
		console.warn(`\n\x1b[33m⚠ Specs were fetched from staging-api.struct.to. Run 'bun run prep' before merging.\x1b[0m\n`);
	}
} catch {}

process.exit(hasErrors ? 1 : 0);

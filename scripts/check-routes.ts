import { readFile } from "node:fs/promises";
import { join } from "node:path";

const NAMESPACES_DIR = join(import.meta.dirname, "../src/namespaces");

interface SpecConfig {
	specPath: string;
	venuePrefix: string | null;
	namespaceFiles: string[];
}

const specs: SpecConfig[] = [
	{
		specPath: join(import.meta.dirname, "../src/generated/polymarket.ts"),
		venuePrefix: "/polymarket",
		namespaceFiles: ["assets.ts", "holders.ts", "events.ts", "markets.ts", "series.ts", "trader.ts", "bonds.ts", "search.ts", "tags.ts"],
	},
	{
		specPath: join(import.meta.dirname, "../src/generated/webhooks.ts"),
		venuePrefix: null,
		namespaceFiles: ["webhooks.ts"],
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
		const venueRegex = /async\s+(\w+)\([\s\S]*?return\s+this\.(get|post|put|patch|delete)\b[^(]*\([^,]*,\s*(`[^`]+`|"[^"]+"|'[^']+')/g;
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

let hasErrors = false;

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
}

process.exit(hasErrors ? 1 : 0);

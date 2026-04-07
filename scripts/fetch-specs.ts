import { writeFile } from "node:fs/promises";
import { join } from "node:path";

type Env = "production" | "staging";

const HOSTS: Record<Env, string> = {
	production: "https://api.struct.to",
	staging: "https://staging-api.struct.to",
};

const SPECS = [
	{ name: "polymarket", path: "/api-docs/openapi.json", output: "openapi/polymarket.json" },
	{ name: "webhooks", path: "/webhookopenapi.json", output: "openapi/webhooks.json" },
	{ name: "ws", path: "/asyncapi.json", output: "openapi/ws.json" },
] as const;

const raw = (Bun.env.STRUCT_ENV ?? "production").toLowerCase();
if (raw !== "production" && raw !== "staging") {
	console.error(`Invalid STRUCT_ENV: "${raw}". Must be "production" or "staging".`);
	process.exit(1);
}
const env = raw as Env;
const host = HOSTS[env];

const root = join(import.meta.dirname, "..");

let failed = false;
for (const spec of SPECS) {
	const url = `${host}${spec.path}`;
	try {
		const res = await fetch(url, {
			headers: { "Accept-Encoding": "gzip, deflate, br" },
		});
		if (!res.ok) {
			console.error(`✗ ${spec.name}: HTTP ${res.status} from ${url}`);
			failed = true;
			continue;
		}
		const body = await res.text();
		JSON.parse(body);
		await writeFile(join(root, spec.output), body);
		console.log(`✓ ${spec.name}`);
	} catch (err) {
		console.error(`✗ ${spec.name}: ${err instanceof Error ? err.message : err}`);
		failed = true;
	}
}

if (failed) {
	process.exit(1);
}

await writeFile(
	join(root, "openapi/.spec-source.json"),
	JSON.stringify({ env, fetchedAt: new Date().toISOString() }, null, 2) + "\n",
);

console.log(`\nFetched all specs from ${env} (${host})`);

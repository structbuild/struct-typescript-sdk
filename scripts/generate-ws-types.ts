import openapiTS, { astToString } from "openapi-typescript";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const asyncapiPath = join(import.meta.dirname, "../openapi/ws.json");
const outputPath = join(import.meta.dirname, "../src/generated/ws.ts");

const asyncapi = JSON.parse(await readFile(asyncapiPath, "utf-8"));

const ast = await openapiTS({
	openapi: "3.1.0",
	info: asyncapi.info,
	paths: {},
	components: { schemas: asyncapi.components.schemas },
});

await writeFile(outputPath, astToString(ast));
console.log("✓ Generated WS types from AsyncAPI spec");

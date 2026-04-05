import openapiTS, { astToString } from "openapi-typescript";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const asyncapiPath = join(import.meta.dirname, "../openapi/ws.json");
const outputPath = join(import.meta.dirname, "../src/generated/ws.ts");

const asyncapi = JSON.parse(await readFile(asyncapiPath, "utf-8"));
const schemas = asyncapi.components.schemas;

for (const schema of Object.values(schemas) as Array<Record<string, unknown>>) {
	const required = new Set((schema.required as string[]) ?? []);
	const properties = schema.properties as Record<string, Record<string, unknown>> | undefined;
	if (!properties) continue;
	for (const [propName, prop] of Object.entries(properties)) {
		if ("default" in prop && !required.has(propName)) {
			delete prop.default;
		}
	}
}

const ALERT_DISCRIMINATED_SCHEMAS = [
	"WsAlertSubscribeMessage",
	"WsAlertUnsubscribeMessage",
	"WsAlertEventPayload",
] as const;

for (const parentName of ALERT_DISCRIMINATED_SCHEMAS) {
	const parent = schemas[parentName];
	if (!parent?.oneOf || !parent?.discriminator) continue;

	const mapping: Record<string, string> = {};
	for (const variant of parent.oneOf) {
		const ref = variant.$ref as string | undefined;
		if (!ref) continue;
		const schemaName = ref.split("/").pop()!;
		const variantSchema = schemas[schemaName];

		let eventValue: string | undefined;
		const allOf = variantSchema?.allOf as Array<Record<string, unknown>> | undefined;
		if (allOf) {
			for (const part of allOf) {
				const props = part.properties as Record<string, { enum?: string[] }> | undefined;
				eventValue ??= props?.event?.enum?.[0];
			}
		}
		eventValue ??= variantSchema?.properties?.event?.enum?.[0];

		if (eventValue) {
			mapping[eventValue] = ref;
		}
	}

	parent.discriminator.mapping = mapping;
}

const ast = await openapiTS({
	openapi: "3.1.0",
	info: asyncapi.info,
	paths: {},
	components: { schemas },
});

let output = astToString(ast);

const eventNames: string[] = [];
const subscribeEntries: string[] = [];
const eventDataEntries: string[] = [];

const subscribeMapping = schemas.WsAlertSubscribeMessage?.discriminator?.mapping as Record<string, string> | undefined;
const eventMapping = schemas.WsAlertEventPayload?.discriminator?.mapping as Record<string, string> | undefined;

if (subscribeMapping) {
	for (const [eventName, ref] of Object.entries(subscribeMapping)) {
		const schemaName = ref.split("/").pop()!;
		subscribeEntries.push(`\t${eventName}: components["schemas"]["${schemaName}"];`);
	}
}

if (eventMapping) {
	for (const [eventName, ref] of Object.entries(eventMapping)) {
		const schemaName = ref.split("/").pop()!;
		eventNames.push(eventName);

		const eventSchema = schemas[schemaName];
		const dataRef = eventSchema?.properties?.data?.$ref as string | undefined;
		const dataSchemaName = dataRef?.split("/").pop();
		if (dataSchemaName) {
			eventDataEntries.push(`\t${eventName}: components["schemas"]["${dataSchemaName}"];`);
		}
	}
}

if (subscribeEntries.length > 0) {
	output += `\nexport interface WsAlertSubscribeMap {\n${subscribeEntries.join("\n")}\n}\n`;
	output += `\nexport interface WsAlertEventDataMap {\n${eventDataEntries.join("\n")}\n}\n`;
	output += `\nexport type WsAlertEventName = keyof WsAlertSubscribeMap;\n`;
}

await writeFile(outputPath, output);
console.log("✓ Generated WS types from AsyncAPI spec");

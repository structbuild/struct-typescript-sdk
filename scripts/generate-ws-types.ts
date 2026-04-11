import openapiTS, { astToString } from "openapi-typescript";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");

interface SpecConfig {
	name: string;
	inputPath: string;
	outputPath: string;
	withAlertDiscriminators?: boolean;
}

const SPECS: SpecConfig[] = [
	{
		name: "ws",
		inputPath: join(root, "openapi/ws.json"),
		outputPath: join(root, "src/generated/ws.ts"),
	},
	{
		name: "ws-alerts",
		inputPath: join(root, "openapi/ws-alerts.json"),
		outputPath: join(root, "src/generated/ws-alerts.ts"),
		withAlertDiscriminators: true,
	},
];

const ALERT_DISCRIMINATED_SCHEMAS = [
	"WsAlertSubscribeMessage",
	"WsAlertUnsubscribeMessage",
	"WsAlertEventPayload",
] as const;

function stripOptionalDefaults(schemas: Record<string, Record<string, unknown>>): void {
	for (const schema of Object.values(schemas)) {
		const required = new Set((schema.required as string[]) ?? []);
		const properties = schema.properties as Record<string, Record<string, unknown>> | undefined;
		if (!properties) continue;
		for (const [propName, prop] of Object.entries(properties)) {
			if ("default" in prop && !required.has(propName)) {
				delete prop.default;
			}
		}
	}
}

function buildAlertDiscriminatorMappings(schemas: Record<string, Record<string, unknown>>): void {
	for (const parentName of ALERT_DISCRIMINATED_SCHEMAS) {
		const parent = schemas[parentName] as
			| { oneOf?: Array<{ $ref?: string }>; discriminator?: unknown }
			| undefined;
		if (!parent?.oneOf || parent.discriminator === undefined) continue;

		const propertyName =
			typeof parent.discriminator === "string"
				? parent.discriminator
				: (parent.discriminator as { propertyName?: string }).propertyName ?? "event";

		const mapping: Record<string, string> = {};
		for (const variant of parent.oneOf) {
			const ref = variant.$ref;
			if (!ref) continue;
			const schemaName = ref.split("/").pop()!;
			const variantSchema = schemas[schemaName];

			let eventValue: string | undefined;
			const allOf = variantSchema?.allOf as Array<Record<string, unknown>> | undefined;
			if (allOf) {
				for (const part of allOf) {
					const props = part.properties as Record<string, { enum?: string[] }> | undefined;
					eventValue ??= props?.[propertyName]?.enum?.[0];
				}
			}
			const props = variantSchema?.properties as Record<string, { enum?: string[] }> | undefined;
			eventValue ??= props?.[propertyName]?.enum?.[0];

			if (eventValue) {
				mapping[eventValue] = ref;
			}
		}

		(parent as Record<string, unknown>).discriminator = { propertyName, mapping };
	}
}

function buildAlertMapOutput(schemas: Record<string, Record<string, unknown>>): string {
	const subscribeEntries: string[] = [];
	const eventDataEntries: string[] = [];

	const subscribeMapping = (schemas.WsAlertSubscribeMessage as { discriminator?: { mapping?: Record<string, string> } } | undefined)
		?.discriminator?.mapping;
	const eventMapping = (schemas.WsAlertEventPayload as { discriminator?: { mapping?: Record<string, string> } } | undefined)
		?.discriminator?.mapping;

	if (subscribeMapping) {
		for (const [eventName, ref] of Object.entries(subscribeMapping)) {
			const schemaName = ref.split("/").pop()!;
			subscribeEntries.push(`\t${eventName}: components["schemas"]["${schemaName}"];`);
		}
	}

	if (eventMapping) {
		for (const [eventName, ref] of Object.entries(eventMapping)) {
			const schemaName = ref.split("/").pop()!;
			const eventSchema = schemas[schemaName] as { properties?: { data?: { $ref?: string } } } | undefined;
			const dataRef = eventSchema?.properties?.data?.$ref;
			const dataSchemaName = dataRef?.split("/").pop();
			if (dataSchemaName) {
				eventDataEntries.push(`\t${eventName}: components["schemas"]["${dataSchemaName}"];`);
			}
		}
	}

	if (subscribeEntries.length === 0) return "";

	return (
		`\nexport interface WsAlertSubscribeMap {\n${subscribeEntries.join("\n")}\n}\n` +
		`\nexport interface WsAlertEventDataMap {\n${eventDataEntries.join("\n")}\n}\n` +
		`\nexport type WsAlertEventName = keyof WsAlertSubscribeMap;\n`
	);
}

async function generateSpec(spec: SpecConfig): Promise<void> {
	const asyncapi = JSON.parse(await readFile(spec.inputPath, "utf-8"));
	const schemas = asyncapi.components.schemas as Record<string, Record<string, unknown>>;

	stripOptionalDefaults(schemas);

	if (spec.withAlertDiscriminators) {
		buildAlertDiscriminatorMappings(schemas);
	}

	const ast = await openapiTS({
		openapi: "3.1.0",
		info: asyncapi.info,
		paths: {},
		components: { schemas },
	});

	let output = astToString(ast);

	if (spec.withAlertDiscriminators) {
		output += buildAlertMapOutput(schemas);
	}

	await writeFile(spec.outputPath, output);
	console.log(`✓ Generated ${spec.name} types`);
}

for (const spec of SPECS) {
	await generateSpec(spec);
}

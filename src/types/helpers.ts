import type { components, operations } from "../generated/polymarket.js";

export type Schemas = components["schemas"];

export type OperationQuery<K extends keyof operations> =
	operations[K] extends { parameters: { query?: infer Q } }
		? NonNullable<Q>
		: never;

export type OperationPath<K extends keyof operations> =
	operations[K] extends { parameters: { path: infer P } }
		? P
		: never;

export type OperationResponse<K extends keyof operations> =
	operations[K] extends {
		responses: { 200: { content: { "application/json": infer R } } };
	}
		? R
		: never;

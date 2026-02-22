import type { components, operations } from "../generated/polymarket.js";

export type Schemas = components["schemas"];

export type OperationQueryOf<Ops, K extends keyof Ops> =
	Ops[K] extends { parameters: { query?: infer Q } }
		? NonNullable<Q>
		: never;

export type OperationPathOf<Ops, K extends keyof Ops> =
	Ops[K] extends { parameters: { path: infer P } }
		? P
		: never;

export type OperationResponseOf<Ops, K extends keyof Ops> =
	Ops[K] extends {
		responses: { 200: { content: { "application/json": infer R } } };
	}
		? R
		: Ops[K] extends {
				responses: { 201: { content: { "application/json": infer R } } };
			}
			? R
			: never;

export type OperationRequestBodyOf<Ops, K extends keyof Ops> =
	Ops[K] extends {
		requestBody: { content: { "application/json": infer B } };
	}
		? B
		: never;

export type OperationQuery<K extends keyof operations> = OperationQueryOf<operations, K>;
export type OperationPath<K extends keyof operations> = OperationPathOf<operations, K>;
export type OperationResponse<K extends keyof operations> = OperationResponseOf<operations, K>;

import type { components, operations } from "../generated/webhooks.js";
import type { OperationQueryOf, OperationPathOf, OperationResponseOf, OperationRequestBodyOf } from "./helpers.js";

export type WebhookSchemas = components["schemas"];

export type WebhookOperationQuery<K extends keyof operations> = OperationQueryOf<operations, K>;
export type WebhookOperationPath<K extends keyof operations> = OperationPathOf<operations, K>;
export type WebhookOperationResponse<K extends keyof operations> = OperationResponseOf<operations, K>;
export type WebhookOperationRequestBody<K extends keyof operations> = OperationRequestBodyOf<operations, K>;

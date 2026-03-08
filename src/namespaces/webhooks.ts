import { PlatformNamespace } from "./base.js";
import type { HttpResponse } from "../types/http.js";
import type {
	WebhookResponse,
	WebhookListResponseBody,
	WebhookTestResponseBody,
	RotateSecretResponse,
	ListEventsResponse,
	ListWebhooksParams,
	GetWebhookParams,
	CreateWebhookParams,
	UpdateWebhookParams,
	DeleteWebhookParams,
	DeleteWebhookResponse,
	TestWebhookParams,
	RotateSecretParams,
} from "../types/index.js";

export class WebhooksNamespace extends PlatformNamespace {
	async list(params?: ListWebhooksParams): Promise<HttpResponse<WebhookListResponseBody>> {
		return this.http.get<WebhookListResponseBody>("/webhooks", { params: { ...params } });
	}

	async create(body: CreateWebhookParams): Promise<HttpResponse<WebhookResponse>> {
		return this.http.post<WebhookResponse>("/webhooks", body);
	}

	async getWebhook(params: GetWebhookParams): Promise<HttpResponse<WebhookResponse>> {
		return this.http.get<WebhookResponse>(`/webhooks/${encodeURIComponent(params.webhookId)}`);
	}

	async update(params: UpdateWebhookParams): Promise<HttpResponse<WebhookResponse>> {
		const { webhookId, ...body } = params;
		return this.http.put<WebhookResponse>(`/webhooks/${encodeURIComponent(webhookId)}`, body);
	}

	async deleteWebhook(params: DeleteWebhookParams): Promise<HttpResponse<DeleteWebhookResponse>> {
		return this.http.delete<DeleteWebhookResponse>(`/webhooks/${encodeURIComponent(params.webhookId)}`);
	}

	async test(params: TestWebhookParams): Promise<HttpResponse<WebhookTestResponseBody>> {
		return this.http.post<WebhookTestResponseBody>(`/webhooks/${encodeURIComponent(params.webhookId)}/test`);
	}

	async rotateSecret(params: RotateSecretParams): Promise<HttpResponse<RotateSecretResponse>> {
		return this.http.post<RotateSecretResponse>(`/webhooks/${encodeURIComponent(params.webhookId)}/rotate-secret`);
	}

	async listEvents(): Promise<HttpResponse<ListEventsResponse>> {
		return this.http.get<ListEventsResponse>("/webhooks/events");
	}
}

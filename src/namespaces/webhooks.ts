import { PlatformNamespace } from "./base.js";
import type { HttpResponse } from "../types/http.js";
import type {
	WebhookResponse,
	WebhookListResponseBody,
	WebhookTestResponseBody,
	ListWebhooksParams,
	GetWebhookParams,
	CreateWebhookParams,
	UpdateWebhookParams,
	DeleteWebhookParams,
	TestWebhookParams,
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

	async deleteWebhook(params: DeleteWebhookParams): Promise<HttpResponse<void>> {
		return this.http.delete<void>(`/webhooks/${encodeURIComponent(params.webhookId)}`);
	}

	async test(params: TestWebhookParams): Promise<HttpResponse<WebhookTestResponseBody>> {
		return this.http.post<WebhookTestResponseBody>(`/webhooks/${encodeURIComponent(params.webhookId)}/test`);
	}
}

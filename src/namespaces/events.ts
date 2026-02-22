import { Namespace } from "./base.js";
import type { HttpResponse } from "../types/http.js";
import type { Venue } from "../types/common.js";
import type {
	Event,
	EventMetricsResponse,
	GetEventParams,
	GetEventBySlugParams,
	GetEventsParams,
	GetEventMetricsParams,
} from "../types/index.js";

export class EventsNamespace extends Namespace {
	async getEvent(params: GetEventParams, venue?: Venue): Promise<HttpResponse<Event>> {
		const { id, ...query } = params;
		return this.get<Event>(venue, `/events/${encodeURIComponent(id)}`, { params: query });
	}

	async getEventBySlug(params: GetEventBySlugParams, venue?: Venue): Promise<HttpResponse<Event>> {
		const { slug, ...query } = params;
		return this.get<Event>(venue, `/events/slug/${encodeURIComponent(slug)}`, { params: query });
	}

	async getEvents(params?: GetEventsParams, venue?: Venue): Promise<HttpResponse<Event[]>> {
		return this.get<Event[]>(venue, "/events", { params: { ...params } });
	}

	async getEventMetrics(params: GetEventMetricsParams, venue?: Venue): Promise<HttpResponse<EventMetricsResponse>> {
		return this.get<EventMetricsResponse>(venue, "/events/metrics", { params: { ...params } });
	}
}

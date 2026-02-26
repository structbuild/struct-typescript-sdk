import { Namespace } from "./base.js";
import type { HttpResponse } from "../types/http.js";
import type { Venue } from "../types/common.js";
import type { Event, EventMarketChartOutcome, EventMetricsResponse, GetEventsParams, GetEventChartParams, GetEventMetricsParams } from "../types/index.js";

export class EventsNamespace extends Namespace {
	async getEvents(params?: GetEventsParams, venue?: Venue): Promise<HttpResponse<Event[]>> {
		return this.get<Event[]>(venue, "/events", { params: { ...params } });
	}

	async getEventChart(params: GetEventChartParams, venue?: Venue): Promise<HttpResponse<EventMarketChartOutcome[]>> {
		return this.get<EventMarketChartOutcome[]>(venue, "/events/chart", { params: { ...params } });
	}

	async getEventMetrics(params: GetEventMetricsParams, venue?: Venue): Promise<HttpResponse<EventMetricsResponse>> {
		return this.get<EventMetricsResponse>(venue, "/events/metrics", { params: { ...params } });
	}
}

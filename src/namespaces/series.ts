import { Namespace } from "./base.js";
import type { HttpResponse } from "../types/http.js";
import type { Venue } from "../types/common.js";
import type { Event, Series, GetSeriesListParams, GetSeriesOutcomesParams, GetSeriesEventsParams } from "../types/index.js";

export class SeriesNamespace extends Namespace {
	async getSeriesList(params?: GetSeriesListParams, venue?: Venue): Promise<HttpResponse<Series[]>> {
		return this.get<Series[]>(venue, "/series", { params: { ...params } });
	}

	async getSeriesOutcomes(params: GetSeriesOutcomesParams, venue?: Venue): Promise<HttpResponse<Record<string, string>>> {
		return this.get<Record<string, string>>(venue, "/series/outcomes", { params: { ...params } });
	}

	async getSeriesEvents(params: GetSeriesEventsParams, venue?: Venue): Promise<HttpResponse<Event[]>> {
		const { identifier, ...query } = params;
		return this.get<Event[]>(venue, `/series/${encodeURIComponent(identifier)}/events`, { params: { ...query } });
	}
}

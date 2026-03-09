import { Namespace } from "./base.js";
import type { HttpResponse } from "../types/http.js";
import type { Venue } from "../types/common.js";
import type { Series, GetSeriesListParams, GetSeriesOutcomesParams } from "../types/index.js";

export class SeriesNamespace extends Namespace {
	async getSeriesList(params?: GetSeriesListParams, venue?: Venue): Promise<HttpResponse<Series[]>> {
		return this.get<Series[]>(venue, "/series", { params: { ...params } });
	}

	async getSeriesOutcomes(params: GetSeriesOutcomesParams, venue?: Venue): Promise<HttpResponse<Record<string, string>>> {
		return this.get<Record<string, string>>(venue, "/series/outcomes", { params: { ...params } });
	}
}

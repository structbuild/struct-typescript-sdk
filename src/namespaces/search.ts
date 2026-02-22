import { Namespace } from "./base.js";
import type { HttpResponse } from "../types/http.js";
import type { Venue } from "../types/common.js";
import type { SearchResponse, GetSearchParams } from "../types/index.js";

export class SearchNamespace extends Namespace {
	async search(params: GetSearchParams, venue?: Venue): Promise<HttpResponse<SearchResponse>> {
		return this.get<SearchResponse>(venue, "/search", { params: { ...params } });
	}
}

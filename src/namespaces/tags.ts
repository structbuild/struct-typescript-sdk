import { Namespace, encodePathParam } from "./base.js";
import type { HttpResponse } from "../types/http.js";
import type { Venue } from "../types/common.js";
import type {
	Tag,
	GetTagsParams,
	GetTagParams,
	GetCategoryTopTradersV3Params,
	CategoryEntry,
} from "../types/index.js";

export class TagsNamespace extends Namespace {
	async getTags(params?: GetTagsParams, venue?: Venue): Promise<HttpResponse<Tag[]>> {
		return this.get<Tag[]>(venue, "/tags", { params: { ...params } });
	}

	async getTag(params: GetTagParams, venue?: Venue): Promise<HttpResponse<Tag>> {
		return this.get<Tag>(venue, `/tags/${encodePathParam(params.identifier)}`);
	}

	async getCategoryTopTradersV3(params?: GetCategoryTopTradersV3Params, venue?: Venue): Promise<HttpResponse<CategoryEntry[]>> {
		return this.get<CategoryEntry[]>(venue, "/tags/top-traders-v3", { params: { ...params } });
	}
}

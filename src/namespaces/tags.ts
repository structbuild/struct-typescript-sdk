import { Namespace } from "./base.js";
import type { HttpResponse } from "../types/http.js";
import type { Venue } from "../types/common.js";
import type {
	Tag,
	GetTagsParams,
	GetTagParams,
} from "../types/index.js";

export class TagsNamespace extends Namespace {
	async getTags(params?: GetTagsParams, venue?: Venue): Promise<HttpResponse<Tag[]>> {
		return this.get<Tag[]>(venue, "/tags", { params: { ...params } });
	}

	async getTag(params: GetTagParams, venue?: Venue): Promise<HttpResponse<Tag>> {
		return this.get<Tag>(venue, `/tags/${encodeURIComponent(params.identifier)}`);
	}
}

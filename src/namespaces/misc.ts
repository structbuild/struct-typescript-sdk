import { Namespace } from "./base.js";
import type { HttpResponse } from "../types/http.js";
import type { Venue } from "../types/common.js";
import type { CountsResponse } from "../types/index.js";

export class MiscNamespace extends Namespace {
	async getCounts(venue?: Venue): Promise<HttpResponse<CountsResponse>> {
		return this.get<CountsResponse>(venue, "/counts");
	}
}

import { Namespace } from "./base.js";
import type { HttpResponse } from "../types/http.js";
import type { Venue } from "../types/common.js";
import type { BondMarket, GetBondsParams } from "../types/index.js";

export class BondsNamespace extends Namespace {
	async getBonds(params?: GetBondsParams, venue?: Venue): Promise<HttpResponse<BondMarket[]>> {
		return this.get<BondMarket[]>(venue, "/market/bonds", { params: { ...params } });
	}
}

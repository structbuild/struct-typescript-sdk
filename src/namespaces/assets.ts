import { Namespace } from "./base.js";
import type { HttpResponse } from "../types/http.js";
import type { Venue } from "../types/common.js";
import type {
	AssetPriceHistoryRow,
	GetAssetHistoryParams,
} from "../types/index.js";

export class AssetsNamespace extends Namespace {
	async getAssetHistory(params: GetAssetHistoryParams, venue?: Venue): Promise<HttpResponse<AssetPriceHistoryRow[]>> {
		return this.get<AssetPriceHistoryRow[]>(venue, "/asset-history", { params: { ...params } });
	}
}

import { Namespace } from "./base.js";
import type { HttpResponse } from "../types/http.js";
import type { Venue } from "../types/common.js";
import type {
	MarketHoldersResponse,
	MarketHoldersV3Response,
	PositionHoldersResponse,
	PositionHoldersV3Response,
	HolderHistoryCandle,
	GetMarketHoldersParams,
	GetMarketHoldersV3Params,
	GetPositionHoldersParams,
	GetPositionHoldersV3Params,
	GetMarketHoldersHistoryParams,
	GetPositionHoldersHistoryParams,
} from "../types/index.js";

export class HoldersNamespace extends Namespace {
	async getMarketHolders(params: GetMarketHoldersParams, venue?: Venue): Promise<HttpResponse<MarketHoldersResponse>> {
		return this.get<MarketHoldersResponse>(venue, "/holders/markets", { params: { ...params } });
	}

	async getMarketHoldersV3(params: GetMarketHoldersV3Params, venue?: Venue): Promise<HttpResponse<MarketHoldersV3Response>> {
		return this.get<MarketHoldersV3Response>(venue, "/holders/markets_v3", { params: { ...params } });
	}

async getPositionHolders(params: GetPositionHoldersParams, venue?: Venue): Promise<HttpResponse<PositionHoldersResponse>> {
		const { positionId, ...query } = params;
		return this.get<PositionHoldersResponse>(venue, `/holders/positions/${encodeURIComponent(positionId)}`, { params: query });
	}

	async getPositionHoldersV3(params: GetPositionHoldersV3Params, venue?: Venue): Promise<HttpResponse<PositionHoldersV3Response>> {
		const { positionId, ...query } = params;
		return this.get<PositionHoldersV3Response>(venue, `/holders/positions_v3/${encodeURIComponent(positionId)}`, { params: query });
	}

	async getMarketHoldersHistory(params: GetMarketHoldersHistoryParams, venue?: Venue): Promise<HttpResponse<HolderHistoryCandle[]>> {
		return this.get<HolderHistoryCandle[]>(venue, "/holders/markets/history", { params: { ...params } });
	}

async getPositionHoldersHistory(params: GetPositionHoldersHistoryParams, venue?: Venue): Promise<HttpResponse<HolderHistoryCandle[]>> {
		const { positionId, ...query } = params;
		return this.get<HolderHistoryCandle[]>(venue, `/holders/positions/${encodeURIComponent(positionId)}/history`, { params: query });
	}
}

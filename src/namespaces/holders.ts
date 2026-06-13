import { Namespace } from "./base.js";
import type { HttpResponse } from "../types/http.js";
import type { Venue } from "../types/common.js";
import type {
	MarketHoldersResponse,
	PositionHoldersResponse,
	HolderCountHistoryCandle,
	PositionHolderHistoryCandle,
	GetMarketHoldersParams,
	GetPositionHoldersParams,
	GetMarketHoldersHistoryParams,
	GetPositionHoldersHistoryParams,
	GetEventHoldersHistoryParams,
} from "../types/index.js";

export class HoldersNamespace extends Namespace {
	async getMarketHolders(params: GetMarketHoldersParams, venue?: Venue): Promise<HttpResponse<MarketHoldersResponse>> {
		return this.get<MarketHoldersResponse>(venue, "/holders/markets", { params: { ...params } });
	}

	async getPositionHolders(params: GetPositionHoldersParams, venue?: Venue): Promise<HttpResponse<PositionHoldersResponse>> {
		const { positionId, ...query } = params;
		return this.get<PositionHoldersResponse>(venue, `/holders/positions/${encodeURIComponent(positionId)}`, { params: query });
	}

	async getMarketHoldersHistory(params: GetMarketHoldersHistoryParams, venue?: Venue): Promise<HttpResponse<HolderCountHistoryCandle[]>> {
		return this.get<HolderCountHistoryCandle[]>(venue, "/holders/markets/history", { params: { ...params } });
	}

	async getPositionHoldersHistory(params: GetPositionHoldersHistoryParams, venue?: Venue): Promise<HttpResponse<PositionHolderHistoryCandle[]>> {
		const { positionId, ...query } = params;
		return this.get<PositionHolderHistoryCandle[]>(venue, `/holders/positions/${encodeURIComponent(positionId)}/history`, { params: query });
	}

	async getEventHoldersHistory(params: GetEventHoldersHistoryParams, venue?: Venue): Promise<HttpResponse<HolderCountHistoryCandle[]>> {
		const { event_slug, ...query } = params;
		return this.get<HolderCountHistoryCandle[]>(venue, `/holders/events/${encodeURIComponent(event_slug)}/history`, { params: query });
	}
}

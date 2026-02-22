import { Namespace } from "./base.js";
import type { HttpResponse } from "../types/http.js";
import type { Venue } from "../types/common.js";
import type {
	MarketHoldersResponse,
	EventHoldersResponse,
	PositionHoldersResponse,
	HolderHistoryCandle,
	GetMarketHoldersParams,
	GetEventHoldersParams,
	GetPositionHoldersParams,
	GetMarketHoldersHistoryParams,
	GetEventHoldersHistoryParams,
	GetPositionHoldersHistoryParams,
} from "../types/index.js";

export class HoldersNamespace extends Namespace {
	async getMarketHolders(params: GetMarketHoldersParams, venue?: Venue): Promise<HttpResponse<MarketHoldersResponse>> {
		const { conditionId, ...query } = params;
		return this.get<MarketHoldersResponse>(venue, `/holders/markets/${encodeURIComponent(conditionId)}`, { params: query });
	}

	async getEventHolders(params: GetEventHoldersParams, venue?: Venue): Promise<HttpResponse<EventHoldersResponse>> {
		const { eventSlug, ...query } = params;
		return this.get<EventHoldersResponse>(venue, `/holders/events/${encodeURIComponent(eventSlug)}`, { params: query });
	}

	async getPositionHolders(params: GetPositionHoldersParams, venue?: Venue): Promise<HttpResponse<PositionHoldersResponse>> {
		const { positionId, ...query } = params;
		return this.get<PositionHoldersResponse>(venue, `/holders/positions/${encodeURIComponent(positionId)}`, { params: query });
	}

	async getMarketHoldersHistory(params: GetMarketHoldersHistoryParams, venue?: Venue): Promise<HttpResponse<HolderHistoryCandle[]>> {
		const { conditionId, ...query } = params;
		return this.get<HolderHistoryCandle[]>(venue, `/holders/markets/${encodeURIComponent(conditionId)}/history`, { params: query });
	}

	async getEventHoldersHistory(params: GetEventHoldersHistoryParams, venue?: Venue): Promise<HttpResponse<HolderHistoryCandle[]>> {
		const { eventSlug, ...query } = params;
		return this.get<HolderHistoryCandle[]>(venue, `/holders/events/${encodeURIComponent(eventSlug)}/history`, { params: query });
	}

	async getPositionHoldersHistory(params: GetPositionHoldersHistoryParams, venue?: Venue): Promise<HttpResponse<HolderHistoryCandle[]>> {
		const { positionId, ...query } = params;
		return this.get<HolderHistoryCandle[]>(venue, `/holders/positions/${encodeURIComponent(positionId)}/history`, { params: query });
	}
}

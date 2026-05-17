import { Namespace } from "./base.js";
import type { HttpResponse } from "../types/http.js";
import type { Venue } from "../types/common.js";
import type {
	MarketHoldersResponse,
	MarketHoldersV3Response,
	PositionHoldersResponse,
	PositionHoldersV3Response,
	HolderHistoryCandle,
	HolderCountHistoryV3Candle,
	PositionHolderHistoryV3Candle,
	GetMarketHoldersParams,
	GetMarketHoldersV3Params,
	GetPositionHoldersParams,
	GetPositionHoldersV3Params,
	GetMarketHoldersHistoryParams,
	GetPositionHoldersHistoryParams,
	GetEventHoldersHistoryV3Params,
	GetMarketHoldersHistoryV3Params,
	GetPositionHoldersHistoryV3Params,
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

	async getEventHoldersHistoryV3(params: GetEventHoldersHistoryV3Params, venue?: Venue): Promise<HttpResponse<HolderCountHistoryV3Candle[]>> {
		const { event_slug, ...query } = params;
		return this.get<HolderCountHistoryV3Candle[]>(venue, `/holders/events_v3/${encodeURIComponent(event_slug)}/history`, { params: query });
	}

	async getMarketHoldersHistoryV3(params: GetMarketHoldersHistoryV3Params, venue?: Venue): Promise<HttpResponse<HolderCountHistoryV3Candle[]>> {
		return this.get<HolderCountHistoryV3Candle[]>(venue, "/holders/markets_v3/history", { params: { ...params } });
	}

	async getPositionHoldersHistoryV3(params: GetPositionHoldersHistoryV3Params, venue?: Venue): Promise<HttpResponse<PositionHolderHistoryV3Candle[]>> {
		const { position_id, ...query } = params;
		return this.get<PositionHolderHistoryV3Candle[]>(venue, `/holders/positions_v3/${encodeURIComponent(position_id)}/history`, { params: query });
	}
}

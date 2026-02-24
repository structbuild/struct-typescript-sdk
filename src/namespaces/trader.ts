import { Namespace } from "./base.js";
import type { HttpResponse } from "../types/http.js";
import type { Venue } from "../types/common.js";
import type {
	Portfolio,
	PositionsResponse,
	Trade,
	UserProfile,
	TraderVolumeChartResponse,
	GlobalPnlTrader,
	TraderPositionPnlEntry,
	TraderMarketPnlEntry,
	TraderEventPnlEntry,
	PnlListResponse,
	PnlCandlesResponse,
	GetPortfolioParams,
	GetPortfolioPositionsParams,
	GetTraderTradesParams,
	GetTraderProfileParams,
	GetTraderProfilesBatchParams,
	GetTraderVolumeChartParams,
	GetTraderPnlParams,
	GetTraderPnlBreakdownParams,
	GetTraderPnlCandlesParams,
	GetGlobalPnlParams,
} from "../types/index.js";

export class TraderNamespace extends Namespace {
	async getPortfolio(params: GetPortfolioParams, venue?: Venue): Promise<HttpResponse<Portfolio>> {
		const { address, ...query } = params;
		return this.get<Portfolio>(venue, `/trader/portfolio/${encodeURIComponent(address)}`, { params: query });
	}

	async getPortfolioPositions(params: GetPortfolioPositionsParams, venue?: Venue): Promise<HttpResponse<PositionsResponse>> {
		const { address, ...query } = params;
		return this.get<PositionsResponse>(venue, `/trader/positions/${encodeURIComponent(address)}`, { params: query });
	}

	async getTraderTrades(params: GetTraderTradesParams, venue?: Venue): Promise<HttpResponse<Trade[]>> {
		const { address, ...query } = params;
		return this.get<Trade[]>(venue, `/trader/trades/${encodeURIComponent(address)}`, { params: query });
	}

	async getTraderProfile(params: GetTraderProfileParams, venue?: Venue): Promise<HttpResponse<UserProfile>> {
		return this.get<UserProfile>(venue, `/trader/profile/${encodeURIComponent(params.address)}`);
	}

	async getTraderProfilesBatch(params: GetTraderProfilesBatchParams, venue?: Venue): Promise<HttpResponse<UserProfile[]>> {
		return this.get<UserProfile[]>(venue, "/trader/profiles/batch", { params: { ...params } });
	}

	async getTraderVolumeChart(params: GetTraderVolumeChartParams, venue?: Venue): Promise<HttpResponse<TraderVolumeChartResponse>> {
		const { address, ...query } = params;
		return this.get<TraderVolumeChartResponse>(venue, `/trader/volume-chart/${encodeURIComponent(address)}`, { params: query });
	}

	async getTraderPnl(params: GetTraderPnlParams, venue?: Venue): Promise<HttpResponse<GlobalPnlTrader>> {
		const { address, ...query } = params;
		return this.get<GlobalPnlTrader>(venue, `/trader/pnl/${encodeURIComponent(address)}`, { params: query });
	}

	async getTraderPositionPnl(params: GetTraderPnlBreakdownParams, venue?: Venue): Promise<HttpResponse<PnlListResponse<TraderPositionPnlEntry>>> {
		const { address, ...query } = params;
		return this.get<PnlListResponse<TraderPositionPnlEntry>>(venue, `/trader/positions/${encodeURIComponent(address)}`, { params: query });
	}

	async getTraderMarketPnl(params: GetTraderPnlBreakdownParams, venue?: Venue): Promise<HttpResponse<PnlListResponse<TraderMarketPnlEntry>>> {
		const { address, ...query } = params;
		return this.get<PnlListResponse<TraderMarketPnlEntry>>(venue, `/trader/pnl/${encodeURIComponent(address)}/markets`, { params: query });
	}

	async getTraderEventPnl(params: GetTraderPnlBreakdownParams, venue?: Venue): Promise<HttpResponse<PnlListResponse<TraderEventPnlEntry>>> {
		const { address, ...query } = params;
		return this.get<PnlListResponse<TraderEventPnlEntry>>(venue, `/trader/pnl/${encodeURIComponent(address)}/events`, { params: query });
	}

	async getTraderPnlCandles(params: GetTraderPnlCandlesParams, venue?: Venue): Promise<HttpResponse<PnlCandlesResponse>> {
		const { address, ...query } = params;
		return this.get<PnlCandlesResponse>(venue, `/trader/pnl/${encodeURIComponent(address)}/candles`, { params: query });
	}

	async getGlobalPnl(params?: GetGlobalPnlParams, venue?: Venue): Promise<HttpResponse<GlobalPnlTrader[]>> {
		return this.get<GlobalPnlTrader[]>(venue, "/trader/global_pnl", { params: { ...params } });
	}
}

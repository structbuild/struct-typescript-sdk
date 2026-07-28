import { Namespace } from "./base.js";
import type { HttpResponse } from "../types/http.js";
import type { Venue } from "../types/common.js";
import type {
	Trade,
	UserProfile,
	TraderVolumeDataPoint,
	PnlCandleEntry,
	PnlCandlestickBar,
	GetTraderTradesParams,
	GetTraderProfileParams,
	GetTraderProfilesBatchParams,
	GetTraderPnlBatchParams,
	BatchPnlResponse,
	GetTraderVolumeChartParams,
	GetTraderPnlParams,
	GetTraderPnlBreakdownParams,
	GetTraderPnlCalendarParams,
	GetTraderPnlCandlesParams,
	GetTraderCategoryPnlCandlesParams,
	GetGlobalPnlParams,
	GetTraderPositionPnlParams,
	GetTraderPnlChangesParams,
	GetTraderPnlPeriodsParams,
	GetTraderPnlRiskParams,
	GetTraderCategoryPnlParams,
	GetTopTradesMarketsParams,
	GetTraderComboPnlParams,
	GetTraderCombosPnlParams,
	ComboPnlResponse,
	GetTraderPnlExitsParams,
	PnlExitMarker,
	PnlChangesResponse,
	PnlPeriodsResponse,
	PnlRiskResponse,
	TraderPnl,
	MarketPnl,
	CategoryPnl,
	PositionPnl,
} from "../types/index.js";

export class TraderNamespace extends Namespace {
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

	async getTraderPnlBatch(params: GetTraderPnlBatchParams, venue?: Venue): Promise<HttpResponse<BatchPnlResponse>> {
		return this.post<BatchPnlResponse>(venue, "/trader/pnl/batch", params);
	}

	async getTraderVolumeChart(params: GetTraderVolumeChartParams, venue?: Venue): Promise<HttpResponse<TraderVolumeDataPoint[]>> {
		const { address, ...query } = params;
		return this.get<TraderVolumeDataPoint[]>(venue, `/trader/volume-chart/${encodeURIComponent(address)}`, { params: query });
	}

	async getTraderPnl(params: GetTraderPnlParams, venue?: Venue): Promise<HttpResponse<TraderPnl>> {
		const { address, ...query } = params;
		return this.get<TraderPnl>(venue, `/trader/pnl/${encodeURIComponent(address)}`, { params: query });
	}

	async getTraderMarketPnl(params: GetTraderPnlBreakdownParams, venue?: Venue): Promise<HttpResponse<MarketPnl[]>> {
		const { address, ...query } = params;
		return this.get<MarketPnl[]>(venue, `/trader/pnl/${encodeURIComponent(address)}/markets`, { params: query });
	}

	async getTraderPnlCalendar(params: GetTraderPnlCalendarParams, venue?: Venue): Promise<HttpResponse<PnlCandleEntry[]>> {
		const { address, ...query } = params;
		return this.get<PnlCandleEntry[]>(venue, `/trader/pnl/${encodeURIComponent(address)}/calendar`, { params: query });
	}

	async getTraderPnlCandles(params: GetTraderPnlCandlesParams, venue?: Venue): Promise<HttpResponse<PnlCandlestickBar[]>> {
		const { address, ...query } = params;
		return this.get<PnlCandlestickBar[]>(venue, `/trader/pnl/${encodeURIComponent(address)}/candles`, { params: query });
	}

	async getTraderCategoryPnlCandles(params: GetTraderCategoryPnlCandlesParams, venue?: Venue): Promise<HttpResponse<PnlCandlestickBar[]>> {
		const { address, ...query } = params;
		return this.get<PnlCandlestickBar[]>(venue, `/trader/pnl/${encodeURIComponent(address)}/category-candles`, { params: query });
	}

	async getTraderOutcomePnl(params: GetTraderPositionPnlParams, venue?: Venue): Promise<HttpResponse<PositionPnl[]>> {
		const { address, ...query } = params;
		return this.get<PositionPnl[]>(venue, `/trader/pnl/${encodeURIComponent(address)}/positions`, { params: query });
	}

	async getGlobalPnl(params?: GetGlobalPnlParams, venue?: Venue): Promise<HttpResponse<TraderPnl[]>> {
		return this.get<TraderPnl[]>(venue, "/trader/global_pnl", { params: { ...params } });
	}

	async getTraderPnlChanges(params: GetTraderPnlChangesParams, venue?: Venue): Promise<HttpResponse<PnlChangesResponse>> {
		return this.get<PnlChangesResponse>(venue, `/trader/pnl/${encodeURIComponent(params.address)}/changes`);
	}

	async getTraderPnlPeriods(params: GetTraderPnlPeriodsParams, venue?: Venue): Promise<HttpResponse<PnlPeriodsResponse>> {
		const { address, ...query } = params;
		return this.get<PnlPeriodsResponse>(venue, `/trader/pnl/${encodeURIComponent(address)}/periods`, { params: query });
	}

	async getTraderPnlRisk(params: GetTraderPnlRiskParams, venue?: Venue): Promise<HttpResponse<PnlRiskResponse>> {
		const { address, ...query } = params;
		return this.get<PnlRiskResponse>(venue, `/trader/pnl/${encodeURIComponent(address)}/risk`, { params: query });
	}

	async getTraderCategoryPnl(params: GetTraderCategoryPnlParams, venue?: Venue): Promise<HttpResponse<CategoryPnl[]>> {
		const { address, ...query } = params;
		return this.get<CategoryPnl[]>(venue, `/trader/pnl/${encodeURIComponent(address)}/categories`, { params: query });
	}

	async getTraderPnlExits(params: GetTraderPnlExitsParams, venue?: Venue): Promise<HttpResponse<PnlExitMarker[]>> {
		const { address, ...query } = params;
		return this.get<PnlExitMarker[]>(venue, `/trader/pnl/${encodeURIComponent(address)}/exits`, { params: query });
	}

	async getTopTradesMarkets(params?: GetTopTradesMarketsParams, venue?: Venue): Promise<HttpResponse<MarketPnl[]>> {
		return this.get<MarketPnl[]>(venue, "/trader/top_trades_markets", { params: { ...params } });
	}

	async getTraderComboPnl(params: GetTraderComboPnlParams, venue?: Venue): Promise<HttpResponse<ComboPnlResponse>> {
		const { address, ...query } = params;
		return this.get<ComboPnlResponse>(venue, `/trader/pnl/${encodeURIComponent(address)}/combo`, { params: query });
	}

	async getTraderCombosPnl(params: GetTraderCombosPnlParams, venue?: Venue): Promise<HttpResponse<ComboPnlResponse[]>> {
		const { address, ...query } = params;
		return this.get<ComboPnlResponse[]>(venue, `/trader/pnl/${encodeURIComponent(address)}/combos`, { params: query });
	}
}

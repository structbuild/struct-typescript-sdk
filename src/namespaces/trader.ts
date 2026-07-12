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
	GetTraderPnlExitsParams,
	PnlExitMarker,
	PnlChangesResponse,
	PnlPeriodsResponse,
	PnlRiskResponse,
	V31TraderPnl,
	V31MarketPnl,
	V31CategoryPnl,
	V31PositionPnl,
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
		return this.post<BatchPnlResponse>(venue, "/trader/pnl/v3_1/batch", params);
	}

	async getTraderVolumeChart(params: GetTraderVolumeChartParams, venue?: Venue): Promise<HttpResponse<TraderVolumeDataPoint[]>> {
		const { address, ...query } = params;
		return this.get<TraderVolumeDataPoint[]>(venue, `/trader/volume-chart/${encodeURIComponent(address)}`, { params: query });
	}

	async getTraderPnl(params: GetTraderPnlParams, venue?: Venue): Promise<HttpResponse<V31TraderPnl>> {
		const { address, ...query } = params;
		return this.get<V31TraderPnl>(venue, `/trader/pnl/v3_1/${encodeURIComponent(address)}`, { params: query });
	}

	async getTraderMarketPnl(params: GetTraderPnlBreakdownParams, venue?: Venue): Promise<HttpResponse<V31MarketPnl[]>> {
		const { address, ...query } = params;
		return this.get<V31MarketPnl[]>(venue, `/trader/pnl/v3_1/${encodeURIComponent(address)}/markets`, { params: query });
	}

	async getTraderPnlCalendar(params: GetTraderPnlCalendarParams, venue?: Venue): Promise<HttpResponse<PnlCandleEntry[]>> {
		const { address, ...query } = params;
		return this.get<PnlCandleEntry[]>(venue, `/trader/pnl/${encodeURIComponent(address)}/calendar`, { params: query });
	}

	async getTraderPnlCandles(params: GetTraderPnlCandlesParams, venue?: Venue): Promise<HttpResponse<PnlCandlestickBar[]>> {
		const { address, ...query } = params;
		return this.get<PnlCandlestickBar[]>(venue, `/trader/pnl/v3_1/${encodeURIComponent(address)}/candles`, { params: query });
	}

	async getTraderCategoryPnlCandles(params: GetTraderCategoryPnlCandlesParams, venue?: Venue): Promise<HttpResponse<PnlCandlestickBar[]>> {
		const { address, ...query } = params;
		return this.get<PnlCandlestickBar[]>(venue, `/trader/pnl/v3_1/${encodeURIComponent(address)}/category-candles`, { params: query });
	}

	async getTraderOutcomePnl(params: GetTraderPositionPnlParams, venue?: Venue): Promise<HttpResponse<V31PositionPnl[]>> {
		const { address, ...query } = params;
		return this.get<V31PositionPnl[]>(venue, `/trader/pnl/v3_1/${encodeURIComponent(address)}/positions`, { params: query });
	}

	async getGlobalPnl(params?: GetGlobalPnlParams, venue?: Venue): Promise<HttpResponse<V31TraderPnl[]>> {
		return this.get<V31TraderPnl[]>(venue, "/trader/pnl/v3_1/global", { params: { ...params } });
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

	async getTraderCategoryPnl(params: GetTraderCategoryPnlParams, venue?: Venue): Promise<HttpResponse<V31CategoryPnl[]>> {
		const { address, ...query } = params;
		return this.get<V31CategoryPnl[]>(venue, `/trader/pnl/v3_1/${encodeURIComponent(address)}/categories`, { params: query });
	}

	async getTraderPnlExits(params: GetTraderPnlExitsParams, venue?: Venue): Promise<HttpResponse<PnlExitMarker[]>> {
		const { address, ...query } = params;
		return this.get<PnlExitMarker[]>(venue, `/trader/pnl/v3_1/${encodeURIComponent(address)}/exits`, { params: query });
	}

	async getTopTradesMarkets(params?: GetTopTradesMarketsParams, venue?: Venue): Promise<HttpResponse<V31MarketPnl[]>> {
		return this.get<V31MarketPnl[]>(venue, "/trader/pnl/v3_1/top-trades/markets", { params: { ...params } });
	}
}

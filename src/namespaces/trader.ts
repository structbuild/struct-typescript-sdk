import { Namespace } from "./base.js";
import type { HttpResponse } from "../types/http.js";
import type { Venue } from "../types/common.js";
import type {
	Trade,
	UserProfile,
	TraderVolumeDataPoint,
	GlobalPnlTrader,
	GlobalEntry,
	MarketEntry,
	CategoryEntry,
	PositionEntry,
	PnlCandleEntry,
	PnlCandlestickBar,
	PnlChangesResponse,
	PnlExitMarker,
	PnlPeriodsResponse,
	PnlRiskResponse,
	GetTraderTradesParams,
	GetTraderProfileParams,
	GetTraderProfilesBatchParams,
	GetTraderVolumeChartParams,
	GetTraderPnlParams,
	GetTraderPnlBreakdownParams,
	GetTraderCategoryPnlParams,
	GetTraderPnlChangesParams,
	GetTraderPnlExitsParams,
	GetTraderPnlPeriodsParams,
	GetTraderPnlRiskParams,
	GetTraderPnlCalendarParams,
	GetTraderPnlCandlesParams,
	GetTopTradesMarketsParams,
	GetGlobalPnlParams,
	GetTraderPositionPnlParams,
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

	async getTraderVolumeChart(params: GetTraderVolumeChartParams, venue?: Venue): Promise<HttpResponse<TraderVolumeDataPoint[]>> {
		const { address, ...query } = params;
		return this.get<TraderVolumeDataPoint[]>(venue, `/trader/volume-chart/${encodeURIComponent(address)}`, { params: query });
	}

	async getTraderPnl(params: GetTraderPnlParams, venue?: Venue): Promise<HttpResponse<GlobalEntry>> {
		const { address, ...query } = params;
		return this.get<GlobalEntry>(venue, `/trader/pnl/${encodeURIComponent(address)}`, { params: query });
	}

	async getTraderMarketPnl(params: GetTraderPnlBreakdownParams, venue?: Venue): Promise<HttpResponse<MarketEntry[]>> {
		const { address, ...query } = params;
		return this.get<MarketEntry[]>(venue, `/trader/pnl/${encodeURIComponent(address)}/markets`, { params: query });
	}

	async getTraderCategoryPnl(params: GetTraderCategoryPnlParams, venue?: Venue): Promise<HttpResponse<CategoryEntry[]>> {
		const { address, ...query } = params;
		return this.get<CategoryEntry[]>(venue, `/trader/pnl/${encodeURIComponent(address)}/categories`, { params: query });
	}

	async getTraderPnlChanges(params: GetTraderPnlChangesParams, venue?: Venue): Promise<HttpResponse<PnlChangesResponse>> {
		const { address, ...query } = params;
		return this.get<PnlChangesResponse>(venue, `/trader/pnl/${encodeURIComponent(address)}/changes`, { params: query });
	}

	async getTraderPnlExits(params: GetTraderPnlExitsParams, venue?: Venue): Promise<HttpResponse<PnlExitMarker[]>> {
		const { address, ...query } = params;
		return this.get<PnlExitMarker[]>(venue, `/trader/pnl/${encodeURIComponent(address)}/exits`, { params: query });
	}

	async getTraderPnlPeriods(params: GetTraderPnlPeriodsParams, venue?: Venue): Promise<HttpResponse<PnlPeriodsResponse>> {
		const { address, ...query } = params;
		return this.get<PnlPeriodsResponse>(venue, `/trader/pnl/${encodeURIComponent(address)}/periods`, { params: query });
	}

	async getTraderPnlRisk(params: GetTraderPnlRiskParams, venue?: Venue): Promise<HttpResponse<PnlRiskResponse>> {
		const { address, ...query } = params;
		return this.get<PnlRiskResponse>(venue, `/trader/pnl/${encodeURIComponent(address)}/risk`, { params: query });
	}

	async getTraderPnlCalendar(params: GetTraderPnlCalendarParams, venue?: Venue): Promise<HttpResponse<PnlCandleEntry[]>> {
		const { address, ...query } = params;
		return this.get<PnlCandleEntry[]>(venue, `/trader/pnl/${encodeURIComponent(address)}/calendar`, { params: query });
	}

	async getTraderPnlCandles(params: GetTraderPnlCandlesParams, venue?: Venue): Promise<HttpResponse<PnlCandlestickBar[]>> {
		const { address, ...query } = params;
		return this.get<PnlCandlestickBar[]>(venue, `/trader/pnl/${encodeURIComponent(address)}/candles`, { params: query });
	}

	async getTraderOutcomePnl(params: GetTraderPositionPnlParams, venue?: Venue): Promise<HttpResponse<PositionEntry[]>> {
		const { address, ...query } = params;
		return this.get<PositionEntry[]>(venue, `/trader/pnl/${encodeURIComponent(address)}/positions`, { params: query });
	}

	async getTopTradesMarkets(params?: GetTopTradesMarketsParams, venue?: Venue): Promise<HttpResponse<MarketEntry[]>> {
		return this.get<MarketEntry[]>(venue, "/trader/top_trades_markets", { params: { ...params } });
	}

	async getGlobalPnl(params?: GetGlobalPnlParams, venue?: Venue): Promise<HttpResponse<GlobalPnlTrader[]>> {
		return this.get<GlobalPnlTrader[]>(venue, "/trader/global_pnl", { params: { ...params } });
	}
}

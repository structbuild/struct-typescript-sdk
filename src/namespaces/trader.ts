import { Namespace } from "./base.js";
import type { HttpResponse } from "../types/http.js";
import type { Venue } from "../types/common.js";
import type {
	Trade,
	UserProfile,
	TraderVolumeDataPoint,
	GlobalPnlTrader,
	TraderPnlSummary,
	TraderMarketPnlEntry,
	TraderEventPnlEntry,
	PnlCandleEntry,
	GetTraderTradesParams,
	GetTraderProfileParams,
	GetTraderProfilesBatchParams,
	GetTraderVolumeChartParams,
	GetTraderPnlParams,
	GetTraderPnlBreakdownParams,
	GetTraderPnlCalendarParams,
	GetTraderPnlCandlesParams,
	GetGlobalPnlParams,
	GetTraderPositionPnlParams,
	TraderOutcomePnlEntry,
	GetLeaderboardParams,
	LeaderboardEntry,
	GetTraderPnlV3Params,
	GetTraderPnlV3CandlesParams,
	GetTraderPnlV3ChangesParams,
	GetTraderPnlV3PeriodsParams,
	GetTraderPnlV3RiskParams,
	GetTraderMarketPnlV3Params,
	GetTraderEventPnlV3Params,
	GetTraderCategoryPnlV3Params,
	GetTraderPositionPnlV3Params,
	GetGlobalPnlV3Params,
	GetTopTradesMarketsV3Params,
	GetTraderWhitelistV3Params,
	PnlV3CandlestickBar,
	PnlV3ChangesResponse,
	PnlV3PeriodsResponse,
	PnlV3RiskResponse,
	GlobalEntry,
	MarketEntry,
	EventEntry,
	CategoryEntry,
	PositionEntry,
	WhitelistedTradersResponse,
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

	async getTraderPnl(params: GetTraderPnlParams, venue?: Venue): Promise<HttpResponse<TraderPnlSummary>> {
		const { address, ...query } = params;
		return this.get<TraderPnlSummary>(venue, `/trader/pnl/${encodeURIComponent(address)}`, { params: query });
	}

	async getTraderMarketPnl(params: GetTraderPnlBreakdownParams, venue?: Venue): Promise<HttpResponse<TraderMarketPnlEntry[]>> {
		const { address, ...query } = params;
		return this.get<TraderMarketPnlEntry[]>(venue, `/trader/pnl/${encodeURIComponent(address)}/markets`, { params: query });
	}

	async getTraderEventPnl(params: GetTraderPnlBreakdownParams, venue?: Venue): Promise<HttpResponse<TraderEventPnlEntry[]>> {
		const { address, ...query } = params;
		return this.get<TraderEventPnlEntry[]>(venue, `/trader/pnl/${encodeURIComponent(address)}/events`, { params: query });
	}

	async getTraderPnlCalendar(params: GetTraderPnlCalendarParams, venue?: Venue): Promise<HttpResponse<PnlCandleEntry[]>> {
		const { address, ...query } = params;
		return this.get<PnlCandleEntry[]>(venue, `/trader/pnl/${encodeURIComponent(address)}/calendar`, { params: query });
	}

	async getTraderPnlCandles(params: GetTraderPnlCandlesParams, venue?: Venue): Promise<HttpResponse<PnlCandleEntry[]>> {
		const { address, ...query } = params;
		return this.get<PnlCandleEntry[]>(venue, `/trader/pnl/${encodeURIComponent(address)}/candles`, { params: query });
	}

	async getTraderOutcomePnl(params: GetTraderPositionPnlParams, venue?: Venue): Promise<HttpResponse<TraderOutcomePnlEntry[]>> {
		const { address, ...query } = params;
		return this.get<TraderOutcomePnlEntry[]>(venue, `/trader/pnl/${encodeURIComponent(address)}/positions`, { params: query });
	}

	async getGlobalPnl(params?: GetGlobalPnlParams, venue?: Venue): Promise<HttpResponse<GlobalPnlTrader[]>> {
		return this.get<GlobalPnlTrader[]>(venue, "/trader/global_pnl", { params: { ...params } });
	}

	async getLeaderboard(params?: GetLeaderboardParams, venue?: Venue): Promise<HttpResponse<LeaderboardEntry[]>> {
		return this.get<LeaderboardEntry[]>(venue, "/trader/leaderboard", { params: { ...params } });
	}

	async getTraderPnlV3(params: GetTraderPnlV3Params, venue?: Venue): Promise<HttpResponse<GlobalEntry>> {
		const { address, ...query } = params;
		return this.get<GlobalEntry>(venue, `/trader/pnl_v3/${encodeURIComponent(address)}`, { params: query });
	}

	async getTraderPnlV3Candles(params: GetTraderPnlV3CandlesParams, venue?: Venue): Promise<HttpResponse<PnlV3CandlestickBar[]>> {
		const { address, ...query } = params;
		return this.get<PnlV3CandlestickBar[]>(venue, `/trader/pnl_v3/${encodeURIComponent(address)}/candles`, { params: query });
	}

	async getTraderPnlV3Changes(params: GetTraderPnlV3ChangesParams, venue?: Venue): Promise<HttpResponse<PnlV3ChangesResponse>> {
		return this.get<PnlV3ChangesResponse>(venue, `/trader/pnl_v3/${encodeURIComponent(params.address)}/changes`);
	}

	async getTraderPnlV3Periods(params: GetTraderPnlV3PeriodsParams, venue?: Venue): Promise<HttpResponse<PnlV3PeriodsResponse>> {
		const { address, ...query } = params;
		return this.get<PnlV3PeriodsResponse>(venue, `/trader/pnl_v3/${encodeURIComponent(address)}/periods`, { params: query });
	}

	async getTraderPnlV3Risk(params: GetTraderPnlV3RiskParams, venue?: Venue): Promise<HttpResponse<PnlV3RiskResponse>> {
		const { address, ...query } = params;
		return this.get<PnlV3RiskResponse>(venue, `/trader/pnl_v3/${encodeURIComponent(address)}/risk`, { params: query });
	}

	async getTraderMarketPnlV3(params: GetTraderMarketPnlV3Params, venue?: Venue): Promise<HttpResponse<MarketEntry[]>> {
		const { address, ...query } = params;
		return this.get<MarketEntry[]>(venue, `/trader/pnl_v3/${encodeURIComponent(address)}/markets`, { params: query });
	}

	async getTraderEventPnlV3(params: GetTraderEventPnlV3Params, venue?: Venue): Promise<HttpResponse<EventEntry[]>> {
		const { address, ...query } = params;
		return this.get<EventEntry[]>(venue, `/trader/pnl_v3/${encodeURIComponent(address)}/events`, { params: query });
	}

	async getTraderCategoryPnlV3(params: GetTraderCategoryPnlV3Params, venue?: Venue): Promise<HttpResponse<CategoryEntry[]>> {
		const { address, ...query } = params;
		return this.get<CategoryEntry[]>(venue, `/trader/pnl_v3/${encodeURIComponent(address)}/categories`, { params: query });
	}

	async getTraderPositionPnlV3(params: GetTraderPositionPnlV3Params, venue?: Venue): Promise<HttpResponse<PositionEntry[]>> {
		const { address, ...query } = params;
		return this.get<PositionEntry[]>(venue, `/trader/pnl_v3/${encodeURIComponent(address)}/positions`, { params: query });
	}

	async getGlobalPnlV3(params?: GetGlobalPnlV3Params, venue?: Venue): Promise<HttpResponse<GlobalEntry[]>> {
		return this.get<GlobalEntry[]>(venue, "/trader/global_pnl_v3", { params: { ...params } });
	}

	async getTopTradesMarketsV3(params?: GetTopTradesMarketsV3Params, venue?: Venue): Promise<HttpResponse<MarketEntry[]>> {
		return this.get<MarketEntry[]>(venue, "/trader/top_trades_markets_v3", { params: { ...params } });
	}

	async getTraderWhitelistV3(_params?: GetTraderWhitelistV3Params, venue?: Venue): Promise<HttpResponse<WhitelistedTradersResponse>> {
		return this.get<WhitelistedTradersResponse>(venue, "/trader/whitelist_v3");
	}
}

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
}

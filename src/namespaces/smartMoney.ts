import { Namespace } from "./base.js";
import type { HttpResponse } from "../types/http.js";
import type { Venue } from "../types/common.js";
import type {
	SmartMoneyTraderLifetimeRow,
	SmartMoneyMarketLifetimeRow,
	SmartMoneyReasonCodesResponse,
	SmartMoneyDailyRow,
	SmartMoneyFumbledEventRow,
	SmartMoneyReentryEventRow,
	GetSmartMoneyLeaderboardParams,
	GetSmartMoneyMarketSummaryParams,
	GetSmartMoneyTraderSummaryParams,
	GetSmartMoneyTraderDailyParams,
	GetSmartMoneyTraderFumbledParams,
	GetSmartMoneyTraderReentriesParams,
} from "../types/index.js";

export class SmartMoneyNamespace extends Namespace {
	async getLeaderboard(params?: GetSmartMoneyLeaderboardParams, venue?: Venue): Promise<HttpResponse<SmartMoneyTraderLifetimeRow[]>> {
		return this.get<SmartMoneyTraderLifetimeRow[]>(venue, "/smart-money", { params: { ...params } });
	}

	async getMarketSummary(params: GetSmartMoneyMarketSummaryParams, venue?: Venue): Promise<HttpResponse<SmartMoneyMarketLifetimeRow | null>> {
		return this.get<SmartMoneyMarketLifetimeRow | null>(venue, `/smart-money/markets/${encodeURIComponent(params.conditionId)}`);
	}

	async getReasonCodes(venue?: Venue): Promise<HttpResponse<SmartMoneyReasonCodesResponse>> {
		return this.get<SmartMoneyReasonCodesResponse>(venue, "/smart-money/reason-codes");
	}

	async getTraderSummary(params: GetSmartMoneyTraderSummaryParams, venue?: Venue): Promise<HttpResponse<SmartMoneyTraderLifetimeRow | null>> {
		return this.get<SmartMoneyTraderLifetimeRow | null>(venue, `/smart-money/traders/${encodeURIComponent(params.address)}`);
	}

	async getTraderDaily(params: GetSmartMoneyTraderDailyParams, venue?: Venue): Promise<HttpResponse<SmartMoneyDailyRow[]>> {
		const { address, ...query } = params;
		return this.get<SmartMoneyDailyRow[]>(venue, `/smart-money/traders/${encodeURIComponent(address)}/daily`, { params: query });
	}

	async getTraderFumbled(params: GetSmartMoneyTraderFumbledParams, venue?: Venue): Promise<HttpResponse<SmartMoneyFumbledEventRow[]>> {
		const { address, ...query } = params;
		return this.get<SmartMoneyFumbledEventRow[]>(venue, `/smart-money/traders/${encodeURIComponent(address)}/fumbled`, { params: query });
	}

	async getTraderReentries(params: GetSmartMoneyTraderReentriesParams, venue?: Venue): Promise<HttpResponse<SmartMoneyReentryEventRow[]>> {
		const { address, ...query } = params;
		return this.get<SmartMoneyReentryEventRow[]>(venue, `/smart-money/traders/${encodeURIComponent(address)}/reentries`, { params: query });
	}
}

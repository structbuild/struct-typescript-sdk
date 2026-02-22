import { Namespace } from "./base.js";
import type { HttpResponse } from "../types/http.js";
import type { Venue } from "../types/common.js";
import type {
	TraderScore,
	SmartMoneyEntry,
	InsiderEntry,
	BotEntry,
	GetTraderScoreParams,
	LeaderboardParams,
} from "../types/index.js";

export class ScoringNamespace extends Namespace {
	async getTraderScore(params: GetTraderScoreParams, venue?: Venue): Promise<HttpResponse<TraderScore>> {
		return this.get<TraderScore>(venue, `/scoring/trader/${encodeURIComponent(params.address)}`);
	}

	async getSmartMoneyLeaderboard(params?: LeaderboardParams, venue?: Venue): Promise<HttpResponse<SmartMoneyEntry[]>> {
		return this.get<SmartMoneyEntry[]>(venue, "/scoring/leaderboard/smart-money", { params: { ...params } });
	}

	async getInsiderLeaderboard(params?: LeaderboardParams, venue?: Venue): Promise<HttpResponse<InsiderEntry[]>> {
		return this.get<InsiderEntry[]>(venue, "/scoring/leaderboard/insiders", { params: { ...params } });
	}

	async getBots(params?: LeaderboardParams, venue?: Venue): Promise<HttpResponse<BotEntry[]>> {
		return this.get<BotEntry[]>(venue, "/scoring/bots", { params: { ...params } });
	}
}

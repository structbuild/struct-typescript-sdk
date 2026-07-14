import { Namespace } from "./base.js";
import type { HttpResponse } from "../types/http.js";
import type { Venue } from "../types/common.js";
import type {
	ComboMarket,
	ComboLegsResponse,
	ComboCandlestickBar,
	ComboCandlesticksResponse,
	ComboLegCandlestickBar,
	ComboMetricsResponse,
	ComboGlobalAnalyticsCountsResponse,
	ComboGlobalAnalyticsChanges,
	ComboGlobalAnalyticsDeltaBucketRow,
	ComboGlobalAnalyticsBucketRow,
	GetComboMarketsParams,
	GetComboLegsParams,
	GetComboCandlestickParams,
	GetComboCandlesticksParams,
	GetComboLegCandlestickParams,
	GetComboMetricsParams,
	GetComboAnalyticsChangesParams,
	GetComboAnalyticsDeltasParams,
	GetComboAnalyticsTimeseriesParams,
} from "../types/index.js";

export class CombosNamespace extends Namespace {
	async getMarkets(params?: GetComboMarketsParams, venue?: Venue): Promise<HttpResponse<ComboMarket[]>> {
		return this.get<ComboMarket[]>(venue, "/combos", { params: { ...params } });
	}

	async getLegs(params?: GetComboLegsParams, venue?: Venue): Promise<HttpResponse<ComboLegsResponse>> {
		return this.get<ComboLegsResponse>(venue, "/combos/legs", { params: { ...params } });
	}

	async getCandlestick(params: GetComboCandlestickParams, venue?: Venue): Promise<HttpResponse<ComboCandlestickBar[]>> {
		return this.get<ComboCandlestickBar[]>(venue, "/combos/candlestick", { params: { ...params } });
	}

	async getCandlesticks(params: GetComboCandlesticksParams, venue?: Venue): Promise<HttpResponse<ComboCandlesticksResponse>> {
		return this.get<ComboCandlesticksResponse>(venue, "/combos/candlesticks", { params: { ...params } });
	}

	async getLegCandlestick(params: GetComboLegCandlestickParams, venue?: Venue): Promise<HttpResponse<ComboLegCandlestickBar[]>> {
		return this.get<ComboLegCandlestickBar[]>(venue, "/combos/legs/candlestick", { params: { ...params } });
	}

	async getMetrics(params: GetComboMetricsParams, venue?: Venue): Promise<HttpResponse<ComboMetricsResponse>> {
		return this.get<ComboMetricsResponse>(venue, "/combos/metrics", { params: { ...params } });
	}

	async getAnalyticsCounts(venue?: Venue): Promise<HttpResponse<ComboGlobalAnalyticsCountsResponse>> {
		return this.get<ComboGlobalAnalyticsCountsResponse>(venue, "/combos/analytics/counts");
	}

	async getAnalyticsChanges(params?: GetComboAnalyticsChangesParams, venue?: Venue): Promise<HttpResponse<ComboGlobalAnalyticsChanges>> {
		return this.get<ComboGlobalAnalyticsChanges>(venue, "/combos/analytics/changes", { params: { ...params } });
	}

	async getAnalyticsDeltas(params?: GetComboAnalyticsDeltasParams, venue?: Venue): Promise<HttpResponse<ComboGlobalAnalyticsDeltaBucketRow[]>> {
		return this.get<ComboGlobalAnalyticsDeltaBucketRow[]>(venue, "/combos/analytics/deltas", { params: { ...params } });
	}

	async getAnalyticsTimeseries(params?: GetComboAnalyticsTimeseriesParams, venue?: Venue): Promise<HttpResponse<ComboGlobalAnalyticsBucketRow[]>> {
		return this.get<ComboGlobalAnalyticsBucketRow[]>(venue, "/combos/analytics/timeseries", { params: { ...params } });
	}
}

import { Namespace } from "./base.js";
import type { HttpResponse } from "../types/http.js";
import type { Venue } from "../types/common.js";
import type {
	GlobalCountsResponse,
	MetricPctChange,
	TimeBucketRow,
	GetGlobalAnalyticsCandlesParams,
	GetGlobalAnalyticsChangesParams,
	GetGlobalAnalyticsTimeseriesParams,
	GetEventAnalyticsCandlesParams,
	GetEventAnalyticsChangesParams,
	GetEventAnalyticsTimeseriesParams,
	GetMarketAnalyticsCandlesParams,
	GetMarketAnalyticsChangesParams,
	GetMarketAnalyticsTimeseriesParams,
	GetTagAnalyticsCandlesParams,
	GetTagAnalyticsChangesParams,
	GetTagAnalyticsTimeseriesParams,
	GetTraderAnalyticsCandlesParams,
	GetTraderAnalyticsChangesParams,
	GetTraderAnalyticsTimeseriesParams,
} from "../types/index.js";

export class AnalyticsNamespace extends Namespace {
	async getCounts(venue?: Venue): Promise<HttpResponse<GlobalCountsResponse>> {
		return this.get<GlobalCountsResponse>(venue, "/analytics/counts");
	}

	async getCandles(params?: GetGlobalAnalyticsCandlesParams, venue?: Venue): Promise<HttpResponse<TimeBucketRow[]>> {
		return this.get<TimeBucketRow[]>(venue, "/analytics/candles", { params: { ...params } });
	}

	async getChanges(params: GetGlobalAnalyticsChangesParams, venue?: Venue): Promise<HttpResponse<MetricPctChange>> {
		return this.get<MetricPctChange>(venue, "/analytics/changes", { params: { ...params } });
	}

	async getTimeseries(params?: GetGlobalAnalyticsTimeseriesParams, venue?: Venue): Promise<HttpResponse<TimeBucketRow[]>> {
		return this.get<TimeBucketRow[]>(venue, "/analytics/timeseries", { params: { ...params } });
	}

	async getEventCandles(params: GetEventAnalyticsCandlesParams, venue?: Venue): Promise<HttpResponse<TimeBucketRow[]>> {
		const { event_slug, ...query } = params;
		return this.get<TimeBucketRow[]>(venue, `/events/${encodeURIComponent(event_slug)}/analytics/candles`, { params: query });
	}

	async getEventChanges(params: GetEventAnalyticsChangesParams, venue?: Venue): Promise<HttpResponse<MetricPctChange>> {
		const { event_slug, ...query } = params;
		return this.get<MetricPctChange>(venue, `/events/${encodeURIComponent(event_slug)}/analytics/changes`, { params: query });
	}

	async getEventTimeseries(params: GetEventAnalyticsTimeseriesParams, venue?: Venue): Promise<HttpResponse<TimeBucketRow[]>> {
		const { event_slug, ...query } = params;
		return this.get<TimeBucketRow[]>(venue, `/events/${encodeURIComponent(event_slug)}/analytics/timeseries`, { params: query });
	}

	async getMarketCandles(params: GetMarketAnalyticsCandlesParams, venue?: Venue): Promise<HttpResponse<TimeBucketRow[]>> {
		const { condition_id, ...query } = params;
		return this.get<TimeBucketRow[]>(venue, `/market/${encodeURIComponent(condition_id)}/analytics/candles`, { params: query });
	}

	async getMarketChanges(params: GetMarketAnalyticsChangesParams, venue?: Venue): Promise<HttpResponse<MetricPctChange>> {
		const { condition_id, ...query } = params;
		return this.get<MetricPctChange>(venue, `/market/${encodeURIComponent(condition_id)}/analytics/changes`, { params: query });
	}

	async getMarketTimeseries(params: GetMarketAnalyticsTimeseriesParams, venue?: Venue): Promise<HttpResponse<TimeBucketRow[]>> {
		const { condition_id, ...query } = params;
		return this.get<TimeBucketRow[]>(venue, `/market/${encodeURIComponent(condition_id)}/analytics/timeseries`, { params: query });
	}

	async getTagCandles(params: GetTagAnalyticsCandlesParams, venue?: Venue): Promise<HttpResponse<TimeBucketRow[]>> {
		const { tag, ...query } = params;
		return this.get<TimeBucketRow[]>(venue, `/tags/${encodeURIComponent(tag)}/analytics/candles`, { params: query });
	}

	async getTagChanges(params: GetTagAnalyticsChangesParams, venue?: Venue): Promise<HttpResponse<MetricPctChange>> {
		const { tag, ...query } = params;
		return this.get<MetricPctChange>(venue, `/tags/${encodeURIComponent(tag)}/analytics/changes`, { params: query });
	}

	async getTagTimeseries(params: GetTagAnalyticsTimeseriesParams, venue?: Venue): Promise<HttpResponse<TimeBucketRow[]>> {
		const { tag, ...query } = params;
		return this.get<TimeBucketRow[]>(venue, `/tags/${encodeURIComponent(tag)}/analytics/timeseries`, { params: query });
	}

	async getTraderCandles(params: GetTraderAnalyticsCandlesParams, venue?: Venue): Promise<HttpResponse<TimeBucketRow[]>> {
		const { address, ...query } = params;
		return this.get<TimeBucketRow[]>(venue, `/trader/${encodeURIComponent(address)}/analytics/candles`, { params: query });
	}

	async getTraderChanges(params: GetTraderAnalyticsChangesParams, venue?: Venue): Promise<HttpResponse<MetricPctChange>> {
		const { address, ...query } = params;
		return this.get<MetricPctChange>(venue, `/trader/${encodeURIComponent(address)}/analytics/changes`, { params: query });
	}

	async getTraderTimeseries(params: GetTraderAnalyticsTimeseriesParams, venue?: Venue): Promise<HttpResponse<TimeBucketRow[]>> {
		const { address, ...query } = params;
		return this.get<TimeBucketRow[]>(venue, `/trader/${encodeURIComponent(address)}/analytics/timeseries`, { params: query });
	}
}

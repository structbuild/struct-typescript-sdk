import { Namespace } from "./base.js";
import type { HttpResponse } from "../types/http.js";
import type { Venue } from "../types/common.js";
import type {
	GlobalCountsResponse,
	MetricPctChange,
	TimeBucketRow,
	GetGlobalAnalyticsDeltasParams,
	GetGlobalAnalyticsChangesParams,
	GetGlobalAnalyticsTimeseriesParams,
	GetEventAnalyticsDeltasParams,
	GetEventAnalyticsChangesParams,
	GetEventAnalyticsTimeseriesParams,
	GetMarketAnalyticsDeltasParams,
	GetMarketAnalyticsChangesParams,
	GetMarketAnalyticsTimeseriesParams,
	GetTagAnalyticsDeltasParams,
	GetTagAnalyticsChangesParams,
	GetTagAnalyticsTimeseriesParams,
	GetTraderAnalyticsDeltasParams,
	GetTraderAnalyticsChangesParams,
	GetTraderAnalyticsTimeseriesParams,
} from "../types/index.js";

export class AnalyticsNamespace extends Namespace {
	async getCounts(venue?: Venue): Promise<HttpResponse<GlobalCountsResponse>> {
		return this.get<GlobalCountsResponse>(venue, "/analytics/counts");
	}

	async getDeltas(params?: GetGlobalAnalyticsDeltasParams, venue?: Venue): Promise<HttpResponse<TimeBucketRow[]>> {
		return this.get<TimeBucketRow[]>(venue, "/analytics/deltas", { params: { ...params } });
	}

	async getChanges(params: GetGlobalAnalyticsChangesParams, venue?: Venue): Promise<HttpResponse<MetricPctChange>> {
		return this.get<MetricPctChange>(venue, "/analytics/changes", { params: { ...params } });
	}

	async getTimeseries(params?: GetGlobalAnalyticsTimeseriesParams, venue?: Venue): Promise<HttpResponse<TimeBucketRow[]>> {
		return this.get<TimeBucketRow[]>(venue, "/analytics/timeseries", { params: { ...params } });
	}

	async getEventDeltas(params: GetEventAnalyticsDeltasParams, venue?: Venue): Promise<HttpResponse<TimeBucketRow[]>> {
		const { event_slug, ...query } = params;
		return this.get<TimeBucketRow[]>(venue, `/events/${encodeURIComponent(event_slug)}/analytics/deltas`, { params: query });
	}

	async getEventChanges(params: GetEventAnalyticsChangesParams, venue?: Venue): Promise<HttpResponse<MetricPctChange>> {
		const { event_slug, ...query } = params;
		return this.get<MetricPctChange>(venue, `/events/${encodeURIComponent(event_slug)}/analytics/changes`, { params: query });
	}

	async getEventTimeseries(params: GetEventAnalyticsTimeseriesParams, venue?: Venue): Promise<HttpResponse<TimeBucketRow[]>> {
		const { event_slug, ...query } = params;
		return this.get<TimeBucketRow[]>(venue, `/events/${encodeURIComponent(event_slug)}/analytics/timeseries`, { params: query });
	}

	async getMarketDeltas(params: GetMarketAnalyticsDeltasParams, venue?: Venue): Promise<HttpResponse<TimeBucketRow[]>> {
		const { condition_id, ...query } = params;
		return this.get<TimeBucketRow[]>(venue, `/market/${encodeURIComponent(condition_id)}/analytics/deltas`, { params: query });
	}

	async getMarketChanges(params: GetMarketAnalyticsChangesParams, venue?: Venue): Promise<HttpResponse<MetricPctChange>> {
		const { condition_id, ...query } = params;
		return this.get<MetricPctChange>(venue, `/market/${encodeURIComponent(condition_id)}/analytics/changes`, { params: query });
	}

	async getMarketTimeseries(params: GetMarketAnalyticsTimeseriesParams, venue?: Venue): Promise<HttpResponse<TimeBucketRow[]>> {
		const { condition_id, ...query } = params;
		return this.get<TimeBucketRow[]>(venue, `/market/${encodeURIComponent(condition_id)}/analytics/timeseries`, { params: query });
	}

	async getTagDeltas(params: GetTagAnalyticsDeltasParams, venue?: Venue): Promise<HttpResponse<TimeBucketRow[]>> {
		const { tag, ...query } = params;
		return this.get<TimeBucketRow[]>(venue, `/tags/${encodeURIComponent(tag)}/analytics/deltas`, { params: query });
	}

	async getTagChanges(params: GetTagAnalyticsChangesParams, venue?: Venue): Promise<HttpResponse<MetricPctChange>> {
		const { tag, ...query } = params;
		return this.get<MetricPctChange>(venue, `/tags/${encodeURIComponent(tag)}/analytics/changes`, { params: query });
	}

	async getTagTimeseries(params: GetTagAnalyticsTimeseriesParams, venue?: Venue): Promise<HttpResponse<TimeBucketRow[]>> {
		const { tag, ...query } = params;
		return this.get<TimeBucketRow[]>(venue, `/tags/${encodeURIComponent(tag)}/analytics/timeseries`, { params: query });
	}

	async getTraderDeltas(params: GetTraderAnalyticsDeltasParams, venue?: Venue): Promise<HttpResponse<TimeBucketRow[]>> {
		const { address, ...query } = params;
		return this.get<TimeBucketRow[]>(venue, `/trader/${encodeURIComponent(address)}/analytics/deltas`, { params: query });
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

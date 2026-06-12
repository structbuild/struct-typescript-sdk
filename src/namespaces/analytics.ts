import { Namespace } from "./base.js";
import type { HttpResponse } from "../types/http.js";
import type { Venue } from "../types/common.js";
import type {
	AnalyticsGlobalCountsResponse,
	AnalyticsMetricPctChange,
	AnalyticsTimeBucketRow,
	TraderAnalyticsDeltaTimeBucketRow,
	TraderAnalyticsMetricPctChange,
	TraderAnalyticsTimeBucketRow,
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
	async getCounts(venue?: Venue): Promise<HttpResponse<AnalyticsGlobalCountsResponse>> {
		return this.get<AnalyticsGlobalCountsResponse>(venue, "/analytics/counts");
	}

	async getDeltas(params?: GetGlobalAnalyticsDeltasParams, venue?: Venue): Promise<HttpResponse<AnalyticsTimeBucketRow[]>> {
		return this.get<AnalyticsTimeBucketRow[]>(venue, "/analytics/deltas", { params: { ...params } });
	}

	async getChanges(params: GetGlobalAnalyticsChangesParams, venue?: Venue): Promise<HttpResponse<AnalyticsMetricPctChange>> {
		return this.get<AnalyticsMetricPctChange>(venue, "/analytics/changes", { params: { ...params } });
	}

	async getTimeseries(params?: GetGlobalAnalyticsTimeseriesParams, venue?: Venue): Promise<HttpResponse<AnalyticsTimeBucketRow[]>> {
		return this.get<AnalyticsTimeBucketRow[]>(venue, "/analytics/timeseries", { params: { ...params } });
	}

	async getEventDeltas(params: GetEventAnalyticsDeltasParams, venue?: Venue): Promise<HttpResponse<AnalyticsTimeBucketRow[]>> {
		const { event_slug, ...query } = params;
		return this.get<AnalyticsTimeBucketRow[]>(venue, `/events/${encodeURIComponent(event_slug)}/analytics/deltas`, { params: query });
	}

	async getEventChanges(params: GetEventAnalyticsChangesParams, venue?: Venue): Promise<HttpResponse<AnalyticsMetricPctChange>> {
		const { event_slug, ...query } = params;
		return this.get<AnalyticsMetricPctChange>(venue, `/events/${encodeURIComponent(event_slug)}/analytics/changes`, { params: query });
	}

	async getEventTimeseries(params: GetEventAnalyticsTimeseriesParams, venue?: Venue): Promise<HttpResponse<AnalyticsTimeBucketRow[]>> {
		const { event_slug, ...query } = params;
		return this.get<AnalyticsTimeBucketRow[]>(venue, `/events/${encodeURIComponent(event_slug)}/analytics/timeseries`, { params: query });
	}

	async getMarketDeltas(params: GetMarketAnalyticsDeltasParams, venue?: Venue): Promise<HttpResponse<AnalyticsTimeBucketRow[]>> {
		const { condition_id, ...query } = params;
		return this.get<AnalyticsTimeBucketRow[]>(venue, `/market/${encodeURIComponent(condition_id)}/analytics/deltas`, { params: query });
	}

	async getMarketChanges(params: GetMarketAnalyticsChangesParams, venue?: Venue): Promise<HttpResponse<AnalyticsMetricPctChange>> {
		const { condition_id, ...query } = params;
		return this.get<AnalyticsMetricPctChange>(venue, `/market/${encodeURIComponent(condition_id)}/analytics/changes`, { params: query });
	}

	async getMarketTimeseries(params: GetMarketAnalyticsTimeseriesParams, venue?: Venue): Promise<HttpResponse<AnalyticsTimeBucketRow[]>> {
		const { condition_id, ...query } = params;
		return this.get<AnalyticsTimeBucketRow[]>(venue, `/market/${encodeURIComponent(condition_id)}/analytics/timeseries`, { params: query });
	}

	async getTagDeltas(params: GetTagAnalyticsDeltasParams, venue?: Venue): Promise<HttpResponse<AnalyticsTimeBucketRow[]>> {
		const { tag, ...query } = params;
		return this.get<AnalyticsTimeBucketRow[]>(venue, `/tags/${encodeURIComponent(tag)}/analytics/deltas`, { params: query });
	}

	async getTagChanges(params: GetTagAnalyticsChangesParams, venue?: Venue): Promise<HttpResponse<AnalyticsMetricPctChange>> {
		const { tag, ...query } = params;
		return this.get<AnalyticsMetricPctChange>(venue, `/tags/${encodeURIComponent(tag)}/analytics/changes`, { params: query });
	}

	async getTagTimeseries(params: GetTagAnalyticsTimeseriesParams, venue?: Venue): Promise<HttpResponse<AnalyticsTimeBucketRow[]>> {
		const { tag, ...query } = params;
		return this.get<AnalyticsTimeBucketRow[]>(venue, `/tags/${encodeURIComponent(tag)}/analytics/timeseries`, { params: query });
	}

	async getTraderDeltas(params: GetTraderAnalyticsDeltasParams, venue?: Venue): Promise<HttpResponse<TraderAnalyticsDeltaTimeBucketRow[]>> {
		const { address, ...query } = params;
		return this.get<TraderAnalyticsDeltaTimeBucketRow[]>(venue, `/trader/${encodeURIComponent(address)}/analytics/deltas`, { params: query });
	}

	async getTraderChanges(params: GetTraderAnalyticsChangesParams, venue?: Venue): Promise<HttpResponse<TraderAnalyticsMetricPctChange>> {
		const { address, ...query } = params;
		return this.get<TraderAnalyticsMetricPctChange>(venue, `/trader/${encodeURIComponent(address)}/analytics/changes`, { params: query });
	}

	async getTraderTimeseries(params: GetTraderAnalyticsTimeseriesParams, venue?: Venue): Promise<HttpResponse<TraderAnalyticsTimeBucketRow[]>> {
		const { address, ...query } = params;
		return this.get<TraderAnalyticsTimeBucketRow[]>(venue, `/trader/${encodeURIComponent(address)}/analytics/timeseries`, { params: query });
	}
}

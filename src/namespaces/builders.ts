import { Namespace, encodePathParam } from "./base.js";
import type { HttpResponse } from "../types/http.js";
import type { Venue } from "../types/common.js";
import type {
	BuilderLatestRow,
	BuilderGlobalLatestRow,
	BuilderPctChange,
	GlobalPctChange,
	BuilderTimeBucketRow,
	BuilderTagRow,
	TagBuilderRow,
	BuilderFeeRate,
	BuilderFeeRateHistoryEntry,
	CohortRetentionRow,
	CompositionEntry,
	ConcentrationResponse,
	GlobalBuilderTagRow,
	TopTraderRow,
	GetBuildersParams,
	GetBuilderCompositionParams,
	GetGlobalBuilderTagsParams,
	GetBuilderParams,
	GetBuilderAnalyticsChangesParams,
	GetBuilderAnalyticsDeltasParams,
	GetBuilderAnalyticsTimeseriesParams,
	GetBuilderConcentrationParams,
	GetBuilderFeesParams,
	GetBuilderFeesHistoryParams,
	GetBuilderRetentionParams,
	GetBuilderTagsParams,
	GetBuilderTopTradersParams,
	GetBuilderGlobalParams,
	GetBuilderGlobalChangesParams,
	GetBuilderGlobalDeltasParams,
	GetBuilderGlobalTimeseriesParams,
	GetTagBuildersParams,
} from "../types/index.js";

export class BuildersNamespace extends Namespace {
	async getBuilders(params?: GetBuildersParams, venue?: Venue): Promise<HttpResponse<BuilderLatestRow[]>> {
		return this.get<BuilderLatestRow[]>(venue, "/builders", { params: { ...params } });
	}

	async getComposition(params?: GetBuilderCompositionParams, venue?: Venue): Promise<HttpResponse<CompositionEntry[]>> {
		return this.get<CompositionEntry[]>(venue, "/builders/composition", { params: { ...params } });
	}

	async getBuilder(params: GetBuilderParams, venue?: Venue): Promise<HttpResponse<BuilderLatestRow>> {
		const { builder_code, ...query } = params;
		return this.get<BuilderLatestRow>(venue, `/builders/${encodePathParam(builder_code)}`, { params: query });
	}

	async getBuilderChanges(params: GetBuilderAnalyticsChangesParams, venue?: Venue): Promise<HttpResponse<BuilderPctChange>> {
		const { builder_code, ...query } = params;
		return this.get<BuilderPctChange>(venue, `/builders/${encodePathParam(builder_code)}/analytics/changes`, { params: query });
	}

	async getBuilderDeltas(params: GetBuilderAnalyticsDeltasParams, venue?: Venue): Promise<HttpResponse<BuilderTimeBucketRow[]>> {
		const { builder_code, ...query } = params;
		return this.get<BuilderTimeBucketRow[]>(venue, `/builders/${encodePathParam(builder_code)}/analytics/deltas`, { params: query });
	}

	async getBuilderTimeseries(params: GetBuilderAnalyticsTimeseriesParams, venue?: Venue): Promise<HttpResponse<BuilderTimeBucketRow[]>> {
		const { builder_code, ...query } = params;
		return this.get<BuilderTimeBucketRow[]>(venue, `/builders/${encodePathParam(builder_code)}/analytics/timeseries`, { params: query });
	}

	async getBuilderConcentration(params: GetBuilderConcentrationParams, venue?: Venue): Promise<HttpResponse<ConcentrationResponse>> {
		const { builder_code, ...query } = params;
		return this.get<ConcentrationResponse>(venue, `/builders/${encodePathParam(builder_code)}/concentration`, { params: query });
	}

	async getBuilderFees(params: GetBuilderFeesParams, venue?: Venue): Promise<HttpResponse<BuilderFeeRate>> {
		return this.get<BuilderFeeRate>(venue, `/builders/${encodePathParam(params.builder_code)}/fees`);
	}

	async getBuilderFeesHistory(params: GetBuilderFeesHistoryParams, venue?: Venue): Promise<HttpResponse<BuilderFeeRateHistoryEntry[]>> {
		const { builder_code, ...query } = params;
		return this.get<BuilderFeeRateHistoryEntry[]>(venue, `/builders/${encodePathParam(builder_code)}/fees/history`, { params: query });
	}

	async getBuilderRetention(params: GetBuilderRetentionParams, venue?: Venue): Promise<HttpResponse<CohortRetentionRow[]>> {
		const { builder_code, ...query } = params;
		return this.get<CohortRetentionRow[]>(venue, `/builders/${encodePathParam(builder_code)}/retention`, { params: query });
	}

	async getBuilderTags(params: GetBuilderTagsParams, venue?: Venue): Promise<HttpResponse<BuilderTagRow[]>> {
		const { builder_code, ...query } = params;
		return this.get<BuilderTagRow[]>(venue, `/builders/${encodePathParam(builder_code)}/tags`, { params: query });
	}

	async getBuilderTopTraders(params: GetBuilderTopTradersParams, venue?: Venue): Promise<HttpResponse<TopTraderRow[]>> {
		const { builder_code, ...query } = params;
		return this.get<TopTraderRow[]>(venue, `/builders/${encodePathParam(builder_code)}/top-traders`, { params: query });
	}

	async getGlobal(params?: GetBuilderGlobalParams, venue?: Venue): Promise<HttpResponse<BuilderGlobalLatestRow>> {
		return this.get<BuilderGlobalLatestRow>(venue, "/builders/global", { params: { ...params } });
	}

	async getGlobalChanges(params?: GetBuilderGlobalChangesParams, venue?: Venue): Promise<HttpResponse<GlobalPctChange>> {
		return this.get<GlobalPctChange>(venue, "/builders/global/analytics/changes", { params: { ...params } });
	}

	async getGlobalDeltas(params?: GetBuilderGlobalDeltasParams, venue?: Venue): Promise<HttpResponse<BuilderTimeBucketRow[]>> {
		return this.get<BuilderTimeBucketRow[]>(venue, "/builders/global/analytics/deltas", { params: { ...params } });
	}

	async getGlobalTimeseries(params?: GetBuilderGlobalTimeseriesParams, venue?: Venue): Promise<HttpResponse<BuilderTimeBucketRow[]>> {
		return this.get<BuilderTimeBucketRow[]>(venue, "/builders/global/analytics/timeseries", { params: { ...params } });
	}

	async getGlobalTags(params?: GetGlobalBuilderTagsParams, venue?: Venue): Promise<HttpResponse<GlobalBuilderTagRow[]>> {
		return this.get<GlobalBuilderTagRow[]>(venue, "/builders/global/tags", { params: { ...params } });
	}

	async getTagBuilders(params: GetTagBuildersParams, venue?: Venue): Promise<HttpResponse<TagBuilderRow[]>> {
		const { tag, ...query } = params;
		return this.get<TagBuilderRow[]>(venue, `/builders/tags/${encodePathParam(tag)}`, { params: query });
	}
}

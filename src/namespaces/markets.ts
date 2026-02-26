import { Namespace } from "./base.js";
import type { HttpResponse } from "../types/http.js";
import type { Venue } from "../types/common.js";
import type {
	MarketMetadata,
	ConditionMetricsResponse,
	PositionMetricsResponse,
	PositionVolumeChartResponse,
	PositionChartOutcome,
	MarketVolumeChartResponse,
	Trade,
	CandlestickResponse,
	GetMarketsParams,
	GetMarketMetricsParams,
	GetMarketChartParams,
	GetTradesParams,
	GetCandlestickParams,
	GetPositionCandlestickParams,
	GetPositionMetricsParams,
	GetPositionVolumeChartParams,
	GetMarketVolumeChartParams,
} from "../types/index.js";

export class MarketsNamespace extends Namespace {
	async getMarkets(params?: GetMarketsParams, venue?: Venue): Promise<HttpResponse<MarketMetadata[]>> {
		return this.get<MarketMetadata[]>(venue, "/market", { params: { ...params } });
	}

	async getMarketChart(params: GetMarketChartParams, venue?: Venue): Promise<HttpResponse<PositionChartOutcome[]>> {
		return this.get<PositionChartOutcome[]>(venue, "/market/chart", { params: { ...params } });
	}

	async getMarketMetrics(params: GetMarketMetricsParams, venue?: Venue): Promise<HttpResponse<ConditionMetricsResponse>> {
		return this.get<ConditionMetricsResponse>(venue, "/market/metrics", { params: { ...params } });
	}

	async getTrades(params?: GetTradesParams, venue?: Venue): Promise<HttpResponse<Trade[]>> {
		return this.get<Trade[]>(venue, "/market/trades", { params: { ...params } });
	}

	async getCandlestick(params: GetCandlestickParams, venue?: Venue): Promise<HttpResponse<CandlestickResponse>> {
		return this.get<CandlestickResponse>(venue, "/market/candlestick", { params: { ...params } });
	}

	async getPositionCandlestick(params: GetPositionCandlestickParams, venue?: Venue): Promise<HttpResponse<CandlestickResponse>> {
		return this.get<CandlestickResponse>(venue, "/market/position/candlestick", { params: { ...params } });
	}

	async getPositionMetrics(params: GetPositionMetricsParams, venue?: Venue): Promise<HttpResponse<PositionMetricsResponse>> {
		return this.get<PositionMetricsResponse>(venue, "/market/position/metrics", { params: { ...params } });
	}

	async getPositionVolumeChart(params: GetPositionVolumeChartParams, venue?: Venue): Promise<HttpResponse<PositionVolumeChartResponse>> {
		return this.get<PositionVolumeChartResponse>(venue, "/market/position/volume-chart", { params: { ...params } });
	}

	async getMarketVolumeChart(params: GetMarketVolumeChartParams, venue?: Venue): Promise<HttpResponse<MarketVolumeChartResponse>> {
		return this.get<MarketVolumeChartResponse>(venue, "/market/volume-chart", { params: { ...params } });
	}
}

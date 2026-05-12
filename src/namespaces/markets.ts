import { Namespace } from "./base.js";
import type { HttpResponse } from "../types/http.js";
import type { Venue } from "../types/common.js";
import type {
	MarketResponse,
	ConditionMetricsResponse,
	PositionMetricsResponse,
	PositionVolumeDataPoint,
	PositionChartOutcome,
	MarketVolumeDataPoint,
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
	GetMarketParams,
	GetMarketBySlugParams,
	GetPriceJumpsParams,
	PriceJump,
	GetOracleEventsParams,
	GetMarketTopTradersParams,
	GetPositionTopTradersParams,
	GetMarketTopTradersV3Params,
	GetPositionTopTradersV3Params,
	MarketEntry,
	PositionEntry,
	TopTraderMarketEntry,
	TopTraderPositionEntry,
	TradeEvent,
} from "../types/index.js";

export class MarketsNamespace extends Namespace {
	async getMarkets(params?: GetMarketsParams, venue?: Venue): Promise<HttpResponse<MarketResponse[]>> {
		return this.get<MarketResponse[]>(venue, "/market", { params: { ...params } });
	}

	async getMarket(params: GetMarketParams, venue?: Venue): Promise<HttpResponse<MarketResponse>> {
		const { conditionId, ...query } = params;
		const res = await this.get<MarketResponse[]>(venue, `/market/${encodeURIComponent(conditionId)}`, { params: { ...query } });
		return { ...res, data: res.data[0]! };
	}

	async getMarketBySlug(params: GetMarketBySlugParams, venue?: Venue): Promise<HttpResponse<MarketResponse>> {
		const { marketSlug, ...query } = params;
		const res = await this.get<MarketResponse[]>(venue, `/market/slug/${encodeURIComponent(marketSlug)}`, { params: { ...query } });
		return { ...res, data: res.data[0]! };
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

	async getPositionVolumeChart(params: GetPositionVolumeChartParams, venue?: Venue): Promise<HttpResponse<PositionVolumeDataPoint[]>> {
		return this.get<PositionVolumeDataPoint[]>(venue, "/market/position/volume-chart", { params: { ...params } });
	}

	async getMarketVolumeChart(params: GetMarketVolumeChartParams, venue?: Venue): Promise<HttpResponse<MarketVolumeDataPoint[]>> {
		return this.get<MarketVolumeDataPoint[]>(venue, "/market/volume-chart", { params: { ...params } });
	}

	async getPriceJumps(params?: GetPriceJumpsParams, venue?: Venue): Promise<HttpResponse<PriceJump[]>> {
		return this.get<PriceJump[]>(venue, "/market/price-jumps", { params: { ...params } });
	}

	async getOracleEvents(params?: GetOracleEventsParams, venue?: Venue): Promise<HttpResponse<TradeEvent[]>> {
		return this.get<TradeEvent[]>(venue, "/market/oracle-events", { params: { ...params } });
	}

	async getMarketTopTraders(params?: GetMarketTopTradersParams, venue?: Venue): Promise<HttpResponse<TopTraderMarketEntry[]>> {
		return this.get<TopTraderMarketEntry[]>(venue, "/market/top-traders", { params: { ...params } });
	}

	async getPositionTopTraders(params: GetPositionTopTradersParams, venue?: Venue): Promise<HttpResponse<TopTraderPositionEntry[]>> {
		return this.get<TopTraderPositionEntry[]>(venue, "/market/position/top-traders", { params: { ...params } });
	}

	async getMarketTopTradersV3(params?: GetMarketTopTradersV3Params, venue?: Venue): Promise<HttpResponse<MarketEntry[]>> {
		return this.get<MarketEntry[]>(venue, "/market/top-traders-v3", { params: { ...params } });
	}

	async getPositionTopTradersV3(params: GetPositionTopTradersV3Params, venue?: Venue): Promise<HttpResponse<PositionEntry[]>> {
		return this.get<PositionEntry[]>(venue, "/market/position/top-traders-v3", { params: { ...params } });
	}
}

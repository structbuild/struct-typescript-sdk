import { Namespace } from "./base.js";
import type { HttpResponse } from "../types/http.js";
import type { Venue } from "../types/common.js";
import type {
	GetOrderBookParams,
	GetOrderBookHistoryParams,
	GetMarketOrderBookParams,
	GetSpreadHistoryParams,
} from "../types/index.js";

export class OrderBookNamespace extends Namespace {
	async getOrderBook(params: GetOrderBookParams, venue?: Venue): Promise<HttpResponse<unknown>> {
		return this.get<unknown>(venue, "/order-book", { params: { ...params } });
	}

	async getOrderBookHistory(params?: GetOrderBookHistoryParams, venue?: Venue): Promise<HttpResponse<unknown>> {
		return this.get<unknown>(venue, "/order-book/history", { params: { ...params } });
	}

	async getMarketOrderBook(params?: GetMarketOrderBookParams, venue?: Venue): Promise<HttpResponse<unknown>> {
		return this.get<unknown>(venue, "/order-book/market", { params: { ...params } });
	}

	async getSpreadHistory(params?: GetSpreadHistoryParams, venue?: Venue): Promise<HttpResponse<unknown>> {
		return this.get<unknown>(venue, "/order-book/spread", { params: { ...params } });
	}
}

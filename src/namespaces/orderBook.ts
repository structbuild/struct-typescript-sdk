import { Namespace } from "./base.js";
import type { HttpResponse } from "../types/http.js";
import type { Venue } from "../types/common.js";
import type {
	GetOrderBookParams,
	GetOrderBookHistoryParams,
	GetMarketOrderBookParams,
	GetSpreadHistoryParams,
	OperationResponse,
} from "../types/index.js";

type GetOrderBookResponse = OperationResponse<"get_order_book">;
type GetOrderBookHistoryResponse = OperationResponse<"get_order_book_history">;
type GetMarketOrderBookResponse = OperationResponse<"get_market_order_book">;
type GetSpreadHistoryResponse = OperationResponse<"get_spread_history">;

export class OrderBookNamespace extends Namespace {
	async getOrderBook(params: GetOrderBookParams, venue?: Venue): Promise<HttpResponse<GetOrderBookResponse>> {
		return this.get<GetOrderBookResponse>(venue, "/order-book", { params: { ...params } });
	}

	async getOrderBookHistory(params?: GetOrderBookHistoryParams, venue?: Venue): Promise<HttpResponse<GetOrderBookHistoryResponse>> {
		return this.get<GetOrderBookHistoryResponse>(venue, "/order-book/history", { params: { ...params } });
	}

	async getMarketOrderBook(params?: GetMarketOrderBookParams, venue?: Venue): Promise<HttpResponse<GetMarketOrderBookResponse>> {
		return this.get<GetMarketOrderBookResponse>(venue, "/order-book/market", { params: { ...params } });
	}

	async getSpreadHistory(params?: GetSpreadHistoryParams, venue?: Venue): Promise<HttpResponse<GetSpreadHistoryResponse>> {
		return this.get<GetSpreadHistoryResponse>(venue, "/order-book/spread", { params: { ...params } });
	}
}

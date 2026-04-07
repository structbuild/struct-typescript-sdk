import type { Address } from "./common.js";
import type { RetryConfig } from "./http.js";

export type ConnectionState = "disconnected" | "connecting" | "connected" | "reconnecting";

export interface StructWebSocketConfig {
	apiKey: string;
	jwt?: string;
	baseUrl?: string;
	reconnect?: RetryConfig;
}

export interface PredictionTrade {
	id: string;
	hash: string;
	chain_id: number;
	block: number;
	confirmed_at: number;
	log_index: number;
	block_index?: number;
	order_hash?: string;
	trader: Address;
	taker: Address;
	side: number;
	condition_id: string | null;
	position_id: string;
	outcome: string | null;
	outcome_index: number | null;
	question: string | null;
	slug: string | null;
	event_slug?: string | null;
	usd_amount: string;
	shares_amount: string;
	price: number;
	probability: number | null;
	fee?: string;
	exchange?: number;
	trade_type?: number;
}

export interface EnrichedPredictionTrade {
	id: string;
	hash: string;
	block: number;
	confirmed_at: number;
	trader: Address;
	side: number;
	position_id: string;
	condition_id: string | null;
	outcome: string | null;
	outcome_index: number | null;
	question: string;
	slug: string;
	event_slug: string;
	image_url: string | null;
	market_id: string | null;
	title: string | null;
	usd_amount: string;
	shares_amount: string;
	price: number;
	probability: number | null;
	smart_money_score: number;
	insider_score: number;
	categories: string[];
}

export interface PredictionMarketMetadata {
	slug: string | null;
	question: string | null;
	outcome: string | null;
	outcome_index?: number | null;
	image_url?: string | null;
}

export interface PredictionWalletTrackingAlert {
	is_buy: boolean;
	trader: Address;
	condition_id: string | null;
	position_id: string;
	usd_amount: string;
	shares_amount: string;
	price: number;
	probability: number | null;
	metadata: PredictionMarketMetadata | null;
	confirmed_at: number;
}

export interface WebSocketEventMap {
	market_trade: PredictionTrade;
	whale_trade: EnrichedPredictionTrade;
	smart_money_trade: EnrichedPredictionTrade;
	insider_trade: EnrichedPredictionTrade;
	wallet_tracking_alert: PredictionWalletTrackingAlert;
	conditions_tracking_alert: PredictionTrade;
	connected: void;
	disconnected: { code: number; reason: string };
	reconnecting: { attempt: number };
	error: Error;
}

export interface WebSocketMessage {
	type: string;
	room_id?: string;
	action?: string;
	message?: Record<string, unknown>;
	wallet_addresses?: string[];
	condition_ids?: string[];
}

export interface WebSocketServerMessage {
	type: string;
	data?: unknown;
	room_id?: string;
	message?: string;
}

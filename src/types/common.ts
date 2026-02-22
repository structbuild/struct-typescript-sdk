export type Address = string;

export type Venue = "polymarket";

export interface PaginationParams {
	limit?: number;
	pagination_key?: string;
}

export interface SortParams {
	sort_by?: string;
	ascending?: boolean;
}

import { describe, expect, test } from "bun:test";
import { paginate } from "../src/paginate.js";
import type { HttpResponse } from "../src/types/http.js";
import type { PaginationParams } from "../src/types/common.js";

function makeFetcher(pages: unknown[][]) {
	let callIndex = 0;
	return async (_params: PaginationParams): Promise<HttpResponse<unknown[]>> => {
		const data = pages[callIndex] ?? [];
		const hasMore = callIndex < pages.length - 1 && data.length > 0;
		callIndex++;
		return {
			data,
			message: null,
			success: true,
			pagination: {
				has_more: hasMore,
				pagination_key: hasMore ? callIndex : null,
			},
		};
	};
}

describe("paginate", () => {
	test("yields all items across multiple pages", async () => {
		const fetcher = makeFetcher([[1, 2, 3], [4, 5, 6], [7]]);
		const results: unknown[] = [];
		for await (const item of paginate(fetcher, {}, 3)) {
			results.push(item);
		}
		expect(results).toEqual([1, 2, 3, 4, 5, 6, 7]);
	});

	test("stops when page is smaller than pageSize", async () => {
		const fetcher = makeFetcher([[1, 2]]);
		const results: unknown[] = [];
		for await (const item of paginate(fetcher, {}, 5)) {
			results.push(item);
		}
		expect(results).toEqual([1, 2]);
	});

	test("handles empty first page", async () => {
		const fetcher = makeFetcher([[]]);
		const results: unknown[] = [];
		for await (const item of paginate(fetcher, {}, 10)) {
			results.push(item);
		}
		expect(results).toEqual([]);
	});

	test("passes params to fetcher", async () => {
		const calls: Record<string, any>[] = [];
		const fetcher = async (params: PaginationParams): Promise<HttpResponse<unknown[]>> => {
			calls.push({ ...params });
			return { data: [], message: null, success: true, pagination: { has_more: false, pagination_key: null } };
		};
		const gen = paginate(fetcher, { limit: 5 } as PaginationParams, 10);
		await gen.next();
		expect(calls.length).toBe(1);
		expect(calls[0]!.limit).toBe(10);
		expect(calls[0]!.pagination_key).toBeUndefined();
	});
});

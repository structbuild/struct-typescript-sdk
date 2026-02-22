import type { PaginationParams } from "./types/common.js";
import type { HttpResponse } from "./types/http.js";

const DEFAULT_PAGE_SIZE = 100;

export async function* paginate<T, P extends PaginationParams>(
	fetcher: (params: P) => Promise<HttpResponse<T[]>>,
	params: P,
	pageSize: number = DEFAULT_PAGE_SIZE,
): AsyncGenerator<T> {
	let offset = 0;

	while (true) {
		const response = await fetcher({ ...params, limit: pageSize, offset } as P);

		for (const item of response.data) {
			yield item;
		}

		if (response.data.length < pageSize) {
			break;
		}

		offset += pageSize;
	}
}

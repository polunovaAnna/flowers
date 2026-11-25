import { useMemo, useState } from "react";
import { PAGE_SIZE } from "../constants";

export function usePagination(items, pageSize = PAGE_SIZE) {
	const [state, setState] = useState({ page: 1, items, pageSize });
	const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

	if (state.items !== items || state.pageSize !== pageSize) {
		setState({ page: 1, items, pageSize });
	}

	const page = state.page;

	const setPage = (nextPage) =>
		setState((prev) => ({
			...prev,
			page: Math.min(Math.max(1, nextPage), totalPages),
		}));

	const pageItems = useMemo(
		() => items.slice((page - 1) * pageSize, page * pageSize),
		[items, page, pageSize],
	);

	return { page, setPage, totalPages, pageItems };
}

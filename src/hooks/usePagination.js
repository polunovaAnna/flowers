import { useMemo, useState } from "react";

export function usePagination(items, pageSize = 10) {
	const [state, setState] = useState({ page: 1, items, pageSize });
	const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

	if (state.items !== items || state.pageSize !== pageSize) {
		setState({ page: 1, items, pageSize });
	}

	const page = state.page;

	const setPage = (nextPage) =>
		setState((prev) => ({ ...prev, page: nextPage }));

	const pageItems = useMemo(
		() => items.slice((page - 1) * pageSize, page * pageSize),
		[items, page, pageSize],
	);

	return { page, setPage, totalPages, pageItems };
}

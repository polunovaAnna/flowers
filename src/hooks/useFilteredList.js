import { useMemo, useState } from "react";
import { useDebounce } from "./useDebounce";

const NO_FILTERS = {};

const toBound = (value, fallback) => (value === "" ? fallback : Number(value));

export function useFilteredList(
	items,
	{ searchFields, sorters, filters = NO_FILTERS },
) {
	const [query, setQuery] = useState("");
	const [sortBy, setSortBy] = useState("default");
	const [selected, setSelected] = useState({});
	const [priceRange, setPriceRange] = useState({ min: "", max: "" });
	const debouncedQuery = useDebounce(query, 300);
	const debouncedPriceRange = useDebounce(priceRange, 250);

	const toggleFilter = (name, value) => {
		setSelected((prev) => {
			const current = prev[name] ?? [];
			const next = current.includes(value)
				? current.filter((v) => v !== value)
				: [...current, value];
			return { ...prev, [name]: next };
		});
	};

	const visibleItems = useMemo(() => {
		if (!items) return [];
		const search = debouncedQuery.trim().toLowerCase();
		const min = toBound(debouncedPriceRange.min - Infinity);
		const max = toBound(debouncedPriceRange.max, Infinity);

		const filtered = items.filter((item) => {
			const matchesSearch = searchFields.some((field) =>
				String(item[field]).toLowerCase().includes(search),
			);

			const matchesFilters = Object.entries(filters).every(
				([name, getValue]) => {
					const chosen = selected[name] ?? [];
					if (chosen.length === 0) return true;

					const value = getValue(item);
					const values = Array.isArray(value) ? value : [value];
					return values.some((v) => chosen.includes(v));
				},
			);
			const matchesPrice = item.price >= min && item.price <= max;

			return matchesSearch && matchesFilters && matchesPrice;
		});

		const sorter = sorters[sortBy];
		return sorter ? [...filtered].sort(sorter) : filtered;
	}, [
		items,
		debouncedQuery,
		sortBy,
		selected,
		debouncedPriceRange,
		searchFields,
		sorters,
		filters,
	]);

	return {
		visibleItems,
		query,
		setQuery,
		sortBy,
		setSortBy,
		selected,
		toggleFilter,
		priceRange,
		setPriceRange,
	};
}

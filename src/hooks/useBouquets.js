import { useMemo } from "react";
import { fetchFlowers } from "../api/flowersApi";
import { fetchBouquets, fetchWrappers } from "../api/bouquetsApi";
import { calcPrice } from "../utils/calcPrice";
import { useFetch } from "./useFetch";

const loadAll = () =>
	Promise.all([fetchBouquets(), fetchFlowers(), fetchWrappers()]);

export function useBouquets() {
	const { data, error, isLoading } = useFetch(loadAll);

	const bouquets = useMemo(() => {
		if (!data) return null;
		const [rawBouquets, flowers, wrappers] = data;

		return rawBouquets.map((bouquet) => {
			const { total } = calcPrice({
				items: bouquet.items,
				wrapperId: bouquet.wrapperId,
				flowers,
				wrappers,
			});

			const composition = bouquet.items
				.map(({ flowerId, quantity }) => {
					const flower = flowers.find((f) => f.id === flowerId);
					return flower ? { flower, quantity } : null;
				})
				.filter(Boolean);

			const wrapper = wrappers.find((w) => w.id === bouquet.wrapperId) ?? null;

			return { ...bouquet, price: total, composition, wrapper };
		});
	}, [data]);

	return { bouquets, error, isLoading };
}

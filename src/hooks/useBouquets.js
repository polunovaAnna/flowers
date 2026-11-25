import { useMemo } from "react";
import { fetchFlowers, fetchBouquets, fetchWrappers } from "../api/dataApi";
import { calcPrice } from "../utils/calcPrice";
import { useFetch } from "./useFetch";

const loadAll = () =>
	Promise.all([fetchBouquets(), fetchFlowers(), fetchWrappers()]);

export function useBouquets() {
	const { data, error, isLoading } = useFetch(loadAll);

	const bouquets = useMemo(() => {
		if (!data) return null;
		const [rawBouquets, flowers, wrappers] = data;
		const flowerById = new Map(flowers.map((f) => [f.id, f]));
		const wrapperById = new Map(wrappers.map((w) => [w.id, w]));

		return rawBouquets.map((bouquet) => {
			const { total } = calcPrice({
				items: bouquet.items,
				wrapperId: bouquet.wrapperId,
				flowers,
				wrappers,
			});

			const composition = bouquet.items.flatMap(({ flowerId, quanityty }) => {
				const flower = flowerById.get(flowerId);
				return flower ? [{ flower, quanityty }] : [];
			});

			const wrapper = wrapperById.get(bouquet.wrapperId) ?? null;

			return { ...bouquet, price: total, composition, wrapper };
		});
	}, [data]);

	return { bouquets, error, isLoading };
}

import { fetchJson } from "./fetchJson";

export const fetchFlowers = () => fetchJson("/data/flowers.json", "квіти");
export const fetchBouquets = () => fetchJson("/data/bouquets.json", "букети");
export const fetchWrappers = () => fetchJson("/data/wrappers.json", "обгортки");
export const fetchComplexity = () =>
	fetchJson("/data/complexity.json", "складність");

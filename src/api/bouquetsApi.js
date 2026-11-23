import { fetchJson } from "./fetchJson";

export const fetchBouquets = () => fetchJson("/data/bouquets.json", "букети");
export const fetchWrappers = () => fetchJson("/data/wrappers.json", "обгортки");

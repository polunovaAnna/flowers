import { fetchJson } from "./fetchJson";

export const fetchFlowers = () => fetchJson("/data/flowers.json", "квіти");

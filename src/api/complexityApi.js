import { fetchJson } from "./fetchJson";

export const fetchComplexity = () =>
	fetchJson("/data/complexity.json", "складність");

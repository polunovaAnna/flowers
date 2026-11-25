import { fetchFlowers, fetchWrappers, fetchComplexity } from "../api/dataApi";
import { useFetch } from "./useFetch";

const loadAll = () =>
	Promise.all([fetchFlowers(), fetchWrappers(), fetchComplexity()]);

export function useConstructorData() {
	const { data, error, isLoading } = useFetch(loadAll);
	const [flowers, wrappers, complexityLevels] = data ?? [];
	return { flowers, wrappers, complexityLevels, error, isLoading };
}

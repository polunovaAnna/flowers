import { useEffect, useState } from "react";

export function useFetch(loader) {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let isCancelled = false;

		loader()
			.then((result) => {
				if (!isCancelled) setData(result);
			})
			.catch((err) => {
				if (!isCancelled) setError(err);
			})
			.finally(() => {
				if (!isCancelled) setIsLoading(false);
			});

		return () => {
			isCancelled = true;
		};
	}, [loader]);

	return { data, error, isLoading };
}

export function getComplexityId(levels = [], totalCount) {
	let best = null;

	for (const level of levels) {
		const fits = level.minFlowers <= totalCount;
		if (fits && (!best || level.minFlowers > best.minFlowers)) {
			best = level;
		}
	}

	return best?.id ?? null;
}

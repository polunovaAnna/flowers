export function stepWrapper(wrappers, currentId, direction) {
	const ids = wrappers.map((w) => w.id);
	const index = ids.indexOf(currentId);
	return ids[(index + direction + ids.length) % ids.length];
}

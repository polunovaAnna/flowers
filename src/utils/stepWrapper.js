export function stepWrapper(wrappers, currentId, direction) {
	const options = [null, ...wrappers.map((w) => w.id)];
	const index = options.indexOf(currentId);
	const next = (index + direction + options.length) % options.length;
	return options[next];
}

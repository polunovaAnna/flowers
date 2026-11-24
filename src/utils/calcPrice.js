export function calcPrice({
	items,
	wrapperId,
	complexityId,
	flowers,
	wrappers,
	complexityLevels = [],
}) {
	const flowerLines = items
		.map(({ flowerId, quantity }) => {
			const flower = flowers.find((f) => f.id === flowerId);
			if (!flower || quantity <= 0) return null;
			return {
				key: flowerId,
				name: flower.name,
				quantity,
				amount: flower.price * quantity,
			};
		})
		.filter(Boolean);

	const wrapper = wrappers.find((w) => w.id === wrapperId);
	const level = complexityLevels.find((c) => c.id === complexityId);

	const flowersTotal = flowerLines.reduce((sum, line) => sum + line.amount, 0);
	const wrapperPrice = wrapper?.price ?? 0;
	const complexityFee = level?.fee ?? 0;

	return {
		flowerLines,
		flowersTotal,
		wrapper: wrapper && { name: wrapper.name, amount: wrapperPrice },
		complexity: level && { name: level.name, amount: complexityFee },
		total: flowersTotal + wrapperPrice + complexityFee,
	};
}

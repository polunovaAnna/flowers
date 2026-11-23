export function calcPrice({
	items,
	wrapperId,
	flowers,
	wrappers,
	complexity = 0,
}) {
	const lines = items
		.map(({ flowerId, quantity }) => {
			const flower = flowers.find((f) => f.id === flowerId);
			if (!flower || quantity <= 0) return null;
			return {
				flowerId,
				name: flower.name,
				quantity,
				amount: flower.price * quantity,
			};
		})
		.filter(Boolean);

	const flowersTotal = lines.reduce((sum, lines) => sum + lines.amount, 0);
	const wrapper = wrappers.find((w) => w.id === wrapperId);
	const wrapperPrice = wrapper ? wrapper.price : 0;

	return {
		lines,
		flowersTotal,
		wrapperPrice,
		complexity,
		total: flowersTotal + wrapperPrice + complexity,
	};
}

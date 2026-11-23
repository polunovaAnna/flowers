export function calcPrice({
	items,
	wrapperId,
	flowers,
	wrappers,
	complexity = 0,
}) {
	const flowersTotal = items.reduce((sum, { flowerId, quantity }) => {
		const flower = flowers.find((f) => f.id === flowerId);
		return sum + (flower ? flower.price * quantity : 0);
	}, 0);

	const wrapper = wrappers.find((w) => w.id === wrapperId);
	const wrapperPrice = wrapper ? wrapper.price : 0;

	return {
		flowersTotal,
		wrapperPrice,
		complexity,
		total: flowersTotal + wrapperPrice + complexity,
	};
}

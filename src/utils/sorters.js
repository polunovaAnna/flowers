export const PRICE_NAME_SORTERS = {
	"name-asc": (a, b) => a.name.localeCompare(b.name, "uk"),
	"name-desc": (a, b) => b.name.localeCompare(a.name, "uk"),
	"price-asc": (a, b) => a.price - b.price,
	"price-desc": (a, b) => b.price - a.price,
};

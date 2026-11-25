export const PRICE_NAME_SORTERS = {
	"name-asc": (a, b) => a.name.localeCompare(b.name, "uk"),
	"name-desc": (a, b) => b.name.localeCompare(a.name, "uk"),
	"price-asc": (a, b) => a.price - b.price,
	"price-desc": (a, b) => b.price - a.price,
};

export const SORT_OPTIONS = [
	{ value: "default", label: "За замовчуванням" },
	{ value: "name-asc", label: "А–Я" },
	{ value: "name-desc", label: "Я–А" },
	{ value: "price-asc", label: "Спочатку дешевші" },
	{ value: "price-desc", label: "Спочатку дорожчі" },
];

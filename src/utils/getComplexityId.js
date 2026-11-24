export function getComplexityId(totalCount) {
	if (totalCount > 10) return "rich";
	if (totalCount > 5) return "medium";
	return "simple";
}

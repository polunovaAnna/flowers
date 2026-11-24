export function fanAngle(index, count, spread = 80) {
	if (count <= 1) return 0;
	return -spread / 2 + (spread / (count - 1)) * index;
}

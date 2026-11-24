import { useCallback } from "react";
import { SCROLL_AREA_SELECTOR } from "../constants";

export function useScrollToTop() {
	return useCallback(() => {
		const reduceMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		document
			.querySelector(SCROLL_AREA_SELECTOR)
			?.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
	}, []);
}

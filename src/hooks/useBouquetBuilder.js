import { useMemo, useReducer } from "react";
import { MAX_FLOWERS, DEFAULT_WRAPPER_ID } from "../constants";

const initialState = {
	stems: [],
	wrapperId: DEFAULT_WRAPPER_ID,
};

function reducer(state, action) {
	switch (action.type) {
		case "ADD_FLOWER": {
			if (state.stems.length >= MAX_FLOWERS) return state;
			return {
				...state,
				stems: [...state.stems, action.flowerId],
			};
		}
		case "REMOVE_FLOWER": {
			const index = state.stems.lastIndexOf(action.flowerId);
			if (index === -1) return state;
			return {
				...state,
				stems: state.stems.filter((_, i) => i !== index),
			};
		}
		case "SET_WRAPPER":
			return { ...state, wrapperId: action.wrapperId };
		case "CLEAR":
			return initialState;
		default:
			return state;
	}
}

export function useBouquetBuilder() {
	const [state, dispatch] = useReducer(reducer, initialState);

	const items = useMemo(() => {
		const counts = {};
		state.stems.forEach((id) => {
			counts[id] = (counts[id] ?? 0) + 1;
		});
		return Object.entries(counts).map(([flowerId, quantity]) => ({
			flowerId,
			quantity,
		}));
	}, [state.stems]);

	const totalCount = state.stems.length;

	return {
		items,
		totalCount,
		stems: state.stems,
		wrapperId: state.wrapperId,
		addFlower: (flowerId) => dispatch({ type: "ADD_FLOWER", flowerId }),
		removeFlower: (flowerId) => dispatch({ type: "REMOVE_FLOWER", flowerId }),
		setWrapper: (wrapperId) => dispatch({ type: "SET_WRAPPER", wrapperId }),
		clear: () => dispatch({ type: "CLEAR" }),
	};
}

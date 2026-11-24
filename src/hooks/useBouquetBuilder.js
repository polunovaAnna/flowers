import { useMemo, useReducer } from "react";
import { MAX_FLOWERS, DEFAULT_WRAPPER_ID } from "../constants";

const initialState = {
	quantities: {},
	wrapperId: DEFAULT_WRAPPER_ID,
};

function reducer(state, action) {
	switch (action.type) {
		case "ADD_FLOWER": {
			const total = Object.values(state.quantities).reduce((a, b) => a + b, 0);
			if (total >= MAX_FLOWERS) return state;
			const current = state.quantities[action.flowerId] ?? 0;
			return {
				...state,
				quantities: {
					...state.quantities,
					[action.flowerId]: current + 1,
				},
			};
		}
		case "REMOVE_FLOWER": {
			const current = state.quantities[action.flowerId] ?? 0;
			const quantities = { ...state.quantities };
			if (current <= 1) {
				delete quantities[action.flowerId];
			} else {
				quantities[action.flowerId] = current - 1;
			}
			return { ...state, quantities };
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

	const items = useMemo(
		() =>
			Object.entries(state.quantities).map(([flowerId, quantity]) => ({
				flowerId,
				quantity,
			})),
		[state.quantities],
	);

	const totalCount = useMemo(
		() => items.reduce((sum, item) => sum + item.quantity, 0),
		[items],
	);

	return {
		items,
		totalCount,
		wrapperId: state.wrapperId,
		addFlower: (flowerId) => dispatch({ type: "ADD_FLOWER", flowerId }),
		removeFlower: (flowerId) => dispatch({ type: "REMOVE_FLOWER", flowerId }),
		setWrapper: (wrapperId) => dispatch({ type: "SET_WRAPPER", wrapperId }),
		clear: () => dispatch({ type: "CLEAR" }),
	};
}

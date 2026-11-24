import { useMemo, useReducer } from "react";
import { MAX_FLOWERS } from "../constants";

const initialState = {
	quantities: {},
	wrapperId: null,
	complexityId: "simple",
};

function reducer(state, action) {
	switch (action.type) {
		case "ADD_FLOWER": {
			const total = Object.values(state.quantities).reduce((a, b) => a + b, 0);
			if (total >= MAX_FLOWERS) return state;
			const current = state.quantites[action.flowerId] ?? 0;
			return {
				...state,
				quantites: {
					...state.quantities,
					[action.flowerId]: current + 1,
				},
			};
		}
		case "REMOVE_FLOWER": {
			const current = state.quantites[action.flowerId] ?? 0;
			const quantities = { ...state.quantites };
			if (current <= 1) {
				delete quantities[action.flowerId];
			} else {
				quantities[action.flowerId] = current - 1;
			}
			return { ...state, quantities };
		}
		case "SET_WRAPPER":
			return { ...state, wrapperId: action.wrapperId };
		case "SET_COMPLEXITY":
			return { ...state, complexityId: action.complexityId };
		case "CLEAR":
			return initialState;
		default:
			return state;
	}
}

export function useBouquet() {
	const [state, dispatch] = useReducer(reducer, initialState);

	const items = useMemo(
		() =>
			Object.entries(state.quantites).map(([flowerId, quantity]) => ({
				flowerId,
				quantity,
			})),
		[state.quantites],
	);

	const totalCount = useMemo(
		() => items.reduce((sum, item) => sum + item.quantity, 0),
		[items],
	);

	return {
		items,
		totalCount,
		wrapperId: state.wrapperId,
		complexityId: state.complexityId,
		addFlower: (flowerId) => dispatch({ type: "ADD_FLOWER", flowerId }),
		removeFlower: (flowerId) => dispatch({ type: "REMOVE_FLOWER", flowerId }),
		setWrapper: (wrapperId) => dispatch({ type: "SET_WRAPPER", wrapperId }),
		setComplexity: (complexityId) =>
			dispatch({ type: "SET_COMPLEXITY", complexityId }),
		clear: () => dispatch({ type: "CLEAR" }),
	};
}

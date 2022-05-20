import { Action } from "$types";

type ReducerObject<State, StateAction extends Action<string, any>> = {
	[TypeName in StateAction["type"]]: (
		state: State,
		action: Extract<StateAction, { type: TypeName }>,
	) => State;
};

const objectReducer =
	<State, StateAction extends Action<string, any>>(
		reducerObject: ReducerObject<State, StateAction>,
	) =>
	<ActionType extends StateAction["type"]>(
		state: State,
		action: Extract<StateAction, { type: ActionType }>,
	): State => {
		const reductionFunction = reducerObject[action.type];
		return reductionFunction(state, action);
	};

export default objectReducer;

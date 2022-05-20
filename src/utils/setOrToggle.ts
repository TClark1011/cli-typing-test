const _setOrToggle =
	(specificStateToUse?: boolean) => (currentState: boolean) =>
		specificStateToUse ?? !currentState;

export default _setOrToggle;

const roundNumber = (number: number, decimalPoints: number) => {
	const factor = Math.max(10 ** decimalPoints, 1);

	return Math.round(number * factor) / factor;
};

export const _roundTo = (decimalPoints: number) => (number: number) =>
	roundNumber(number, decimalPoints);

export default roundNumber;

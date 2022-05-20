const roundNumber = (number: number, decimalPoints: number) => {
	const factor = Math.max(10 ** decimalPoints, 1);

	return Math.round(number * factor) / factor;
};

export default roundNumber;

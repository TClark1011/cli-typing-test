import { _roundTo } from "$utils/roundNumber";
import { _subtractFrom } from "$utils/subtractFrom";
import { flow, N, S } from "@mobily/ts-belt";

const printPercentage = flow(
	N.multiply(100),
	_roundTo(2),
	String,
	S.concat("%"),
);

export default printPercentage;

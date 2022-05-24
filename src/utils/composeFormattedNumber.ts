import { _roundTo } from "$utils";
import { pipe, S } from "@mobily/ts-belt";

const composeFormattedNumber = (
	number: number,
	decimalPlaces: number,
): string =>
	pipe(
		number,
		_roundTo(decimalPlaces),
		String,
		S.split("."),
		([beforeDecimal, afterDecimal]) =>
			`${beforeDecimal}.${(afterDecimal ?? "").padEnd(2, "0")}`,
	);

export const _composeFormattedNumber =
	(decimalPlaces: number) =>
	(number: number): string =>
		composeFormattedNumber(number, decimalPlaces);

export default composeFormattedNumber;

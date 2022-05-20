import { Array } from "$types";
import { F } from "@mobily/ts-belt";

const isOneOf = <Elem>(val: Elem, arr: Array<Elem>): boolean =>
	arr.some(F.equals(val));

export default isOneOf;

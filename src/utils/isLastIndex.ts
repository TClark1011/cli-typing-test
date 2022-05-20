import { Array } from "$types";

const isLastIndex = (arr: Array<any>, index: number) =>
	index === arr.length - 1;

export default isLastIndex;

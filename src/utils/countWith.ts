import { Array } from "$types";

const countWith = <T>(arr: Array<T>, predicate: (p: T) => boolean) =>
	arr.filter(predicate).length;

export const _countWith =
	<T>(predicate: (p: T) => boolean) =>
	(arr: Array<T>) =>
		countWith(arr, predicate);

export default countWith;

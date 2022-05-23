import { Array, Predicate } from "$types";
import { countWith } from "$utils";

const percentageOfItemsWhere = <T>(arr: Array<T>, predicate: Predicate<T>) => {
	const itemsThatMatch = countWith(arr, predicate);
	const percentage = itemsThatMatch / arr.length;

	return percentage;
};

export const _percentageOfItemsWhere =
	<T>(predicate: Predicate<T>) =>
	(arr: Array<T>) =>
		percentageOfItemsWhere(arr, predicate);

export default percentageOfItemsWhere;

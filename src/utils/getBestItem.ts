import { Array } from "$types";

const getBestItem = <Elem>(
	items: Array<Elem>,
	scoreDeriver: (item: Elem) => number,
): Elem =>
	items.reduce(
		(bestItem, item) =>
			scoreDeriver(item) > scoreDeriver(bestItem) ? item : bestItem,
		items[0],
	);

export const _getBestItem =
	<Elem>(scoreDeriver: (item: Elem) => number) =>
	(items: Array<Elem>): Elem =>
		getBestItem(items, scoreDeriver);

export default getBestItem;

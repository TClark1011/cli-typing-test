import { Array, WordProgress, WordProgressStatus } from "$types";
import { A, D } from "@mobily/ts-belt";

const updateWordStatus = (
	words: Array<WordProgress>,
	index: number,
	newStatus: WordProgressStatus,
): Array<WordProgress> => A.updateAt(words, index, D.set("status", newStatus));

export default updateWordStatus;

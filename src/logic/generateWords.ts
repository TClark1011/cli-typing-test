import { flags } from "$cli";
import { WordProgress } from "$types";
import { getRandom } from "$utils";
import { A, flow, N, pipe, S } from "@mobily/ts-belt";
import { wordList } from "random-words";

const isLongerThan = (length: number) => flow(S.length, N.gt(length));

const getRandomWord = () => {
	const maxLength =
		flags.maxWordLength > 0 ? flags.maxWordLength : Number.MAX_VALUE;

	const suitableWords = A.reject(wordList, isLongerThan(maxLength));

	return getRandom(suitableWords);
};

const generateWordItem = (): WordProgress => ({
	word: getRandomWord(),
	status: "neutral",
});

const generateWords = () => A.makeWithIndex(flags.words, generateWordItem);

export default generateWords;

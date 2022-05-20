import { WordProgress } from "$types";
import { A, flow, O, pipe } from "@mobily/ts-belt";
import randomWords from "random-words";

const getRandomWord = flow(() => randomWords(1), A.head, O.getExn);

const generateWordItem = (): WordProgress => ({
	word: getRandomWord(),
	status: "neutral",
});

const generateWords = A.makeWithIndex(generateWordItem);

export default generateWords;

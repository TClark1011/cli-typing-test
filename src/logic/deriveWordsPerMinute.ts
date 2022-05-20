import { Array, WordProgress } from "$types";
import { roundNumber } from "$utils";

const deriveWordsPerMinute = (
	words: Array<WordProgress>,
	timeElapsed: number,
) => {
	const seconds = timeElapsed / 1000;
	const minutes = seconds / 60;

	const correctWords = words.filter(({ status }) => status === "correct");
	const wpm = correctWords.length / minutes;

	return roundNumber(wpm, 2);
};

export default deriveWordsPerMinute;

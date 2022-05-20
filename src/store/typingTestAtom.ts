import { generateWords, updateWordStatus } from "$logic";
import { Action, TestStatus, WordProgress } from "$types";
import { objectReducer } from "$utils";
import { D } from "@mobily/ts-belt";
import { atomWithReducer } from "jotai/utils";

export type TypingTestAction =
	| Action<"gotoNextWord">
	| Action<"updateInput", string>
	| Action<"generateNewWords">
	| Action<"updateTimePassed", number>;

export type TypingTestStateProps = {
	input: string;
	activeWordIndex: number;
	words: readonly WordProgress[];
	timePassed: number;
	testStatus: TestStatus;
};

/* ------------ Selectors ----------- */
export const selectActiveWord = (state: TypingTestStateProps): string =>
	state.words[state.activeWordIndex].word ?? new Error("Active word not found");

/* ------------- Atom ------------ */

const typingTestAtom = atomWithReducer<TypingTestStateProps, TypingTestAction>(
	{
		input: "",
		activeWordIndex: 0,
		words: [],
		timePassed: 0,
		testStatus: "running",
	},
	objectReducer<TypingTestStateProps, TypingTestAction>({
		gotoNextWord: (state) => {
			const activeWord = selectActiveWord(state);
			const newStatus = state.input === activeWord ? "correct" : "incorrect";
			const updatedWords = updateWordStatus(
				state.words,
				state.activeWordIndex,
				newStatus,
			);
			const allWordsAreCompleted = updatedWords.every(
				({ status }) => status !== "neutral",
			);

			return {
				...state,
				activeWordIndex: state.activeWordIndex + 1,
				input: "",
				words: updateWordStatus(state.words, state.activeWordIndex, newStatus),
				testStatus: allWordsAreCompleted ? "completed" : "running",
			};
		},
		updateInput: (state, action) => D.set(state, "input", action.payload),
		generateNewWords: (state) => ({
			...state,
			words: generateWords(5),
		}),
		updateTimePassed: (state, action) => ({
			...state,
			timePassed: action.payload,
		}),
	}),
);

export default typingTestAtom;

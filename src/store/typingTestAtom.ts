import { generateWords, updateWordStatus } from "$logic";
import {
	Action,
	Array,
	deriveTimerValue,
	generateTimer,
	TestStatus,
	Timer,
	WordProgress,
} from "$types";
import { objectReducer } from "$utils";
import { D, S } from "@mobily/ts-belt";
import { atomWithReducer } from "jotai/utils";

export type TypingTestAction =
	| Action<"gotoNextWord">
	| Action<"updateInput", string>
	| Action<"reset">;

export type TypingTestStateProps = {
	input: string;
	activeWordIndex: number;
	words: Array<WordProgress>;
	testStatus: TestStatus;
	timer: Timer;
};

const getInitialValue = (): TypingTestStateProps => ({
	input: "",
	activeWordIndex: 0,
	words: generateWords(),
	testStatus: "running",
	timer: generateTimer(),
});

const mergeTypingTest = D.merge<TypingTestStateProps, Partial<TypingTestStateProps>>;

/* ------------ Selectors ----------- */
type TypingTestSelector<Returns> = (p:TypingTestStateProps) => Returns;

export const selectActiveWord:TypingTestSelector<string> = (state) =>
	state.words[state.activeWordIndex].word ?? new Error("Active word not found");

export const selectTimerValue: TypingTestSelector<number> = ({ timer }) =>
	deriveTimerValue(timer);


/* ------------- Atom ------------ */

const typingTestAtom = atomWithReducer<TypingTestStateProps, TypingTestAction>(
	getInitialValue(),
	objectReducer<TypingTestStateProps, TypingTestAction>({
		gotoNextWord: (state) => {
			const activeWord = selectActiveWord(state);
			const newStatus =
				S.trimEnd(state.input) === activeWord ? "correct" : "incorrect";
			const updatedWords = updateWordStatus(
				state.words,
				state.activeWordIndex,
				newStatus,
			);
			const allWordsAreCompleted = updatedWords.every(
				({ status }) => status !== "neutral",
			);

			return mergeTypingTest(state, {
				activeWordIndex: state.activeWordIndex + 1,
				input: "",
				words: updateWordStatus(state.words, state.activeWordIndex, newStatus),
				testStatus: allWordsAreCompleted ? "completed" : "running",
			});
		},
		updateInput: (state, action) => D.set(state, "input", action.payload),
		reset: getInitialValue,
	}),
);

export default typingTestAtom;

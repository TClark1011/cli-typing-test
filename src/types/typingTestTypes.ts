import { Key } from "ink";

export type WordProgressStatus = "incorrect" | "correct" | "neutral";

export type WordProgress = {
	word: string;
	status: WordProgressStatus;
};

export type TestStatus = "running" | "paused" | "completed";

export type UserInput = {
	input: string;
	key: Key;
};

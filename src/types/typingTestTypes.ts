export type WordProgressStatus = "incorrect" | "correct" | "neutral";

export type WordProgress = {
	word: string;
	status: WordProgressStatus;
};

export type TestStatus = "running" | "paused" | "completed";

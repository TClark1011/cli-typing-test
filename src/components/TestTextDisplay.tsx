import { typingTestAtom } from "$store";
import { WordProgressStatus } from "$types";
import { conditionalProps, isLastIndex } from "$utils";
import { D } from "@mobily/ts-belt";
import { Box, Text, TextProps } from "ink";
import { selectAtom, useAtomValue } from "jotai/utils";
import { useCallback } from "react";

export type TestTextDisplayProps = {
	words: string[];
	activeIndex: number;
};

const testTextStateAtom = selectAtom(
	typingTestAtom,
	D.selectKeys(["words", "activeWordIndex"]),
);

const getWordBackgroundColor = (
	wordStatus: WordProgressStatus,
	wordIndex: number,
	activeWordIndex: number,
) => {
	if (wordIndex === activeWordIndex) return "blue";
	switch (wordStatus) {
		case "correct":
			return "green";
		case "incorrect":
			return "red";
		default:
			return "";
	}
};

const TestTextDisplay = () => {
	const { words, activeWordIndex } = useAtomValue(testTextStateAtom);
	return (
		<Text>
			{words.map(({ word, status }, index) => (
				<Text key={`${word}${index}`}>
					<Text
						backgroundColor={getWordBackgroundColor(
							status,
							index,
							activeWordIndex,
						)}
						bold={index === activeWordIndex}
					>
						{word}
					</Text>
					{!isLastIndex(words, index) && <Text> </Text>}
				</Text>
			))}
		</Text>
	);
};

export default TestTextDisplay;

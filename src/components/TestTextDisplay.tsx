import { Box, Text, TextProps } from "ink";
import { useCallback } from "react";
import conditionalProps from "../utils/conditionalProps";

export type TestTextDisplayProps = {
	words: string[];
	activeIndex: number;
};

const isLastIndex = (arr: any[], index: number) => index === arr.length - 1;

const TestTextDisplay = ({ words, activeIndex }: TestTextDisplayProps) => {
	return (
		<Box>
			{words.map((word, index) => (
				<Text key={index}>
					<Text
						{...conditionalProps<TextProps>(index === activeIndex, {
							backgroundColor: "blue",
						})}
					>
						{word}
					</Text>
					{!isLastIndex(words, index) && <Text> </Text>}
				</Text>
			))}
		</Box>
	);
};

export default TestTextDisplay;

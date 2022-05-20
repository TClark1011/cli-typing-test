import { useInputState } from "$hooks";
import { typingTestAtom } from "$store";
import { D } from "@mobily/ts-belt";
import { Box, Text } from "ink";
import { useAtomValue, useSetAtom } from "jotai";
import { selectAtom } from "jotai/utils";
import { useEffect } from "react";

const typingInputAtom = selectAtom(typingTestAtom, D.getUnsafe("input"));

const TypingInput: React.FC = () => {
	const inputValue = useAtomValue(typingInputAtom);
	const dispatch = useSetAtom(typingTestAtom);

	const { value: userInputText, lastInput, clear } = useInputState();

	useEffect(() => {
		if (lastInput?.input === " ") {
			clear();
			dispatch({
				type: "gotoNextWord",
			});
		} else {
			dispatch({
				type: "updateInput",
				payload: userInputText,
			});
		}
	}, [lastInput, userInputText]);

	return (
		<Box
			borderColor="white"
			borderStyle="single"
			paddingX={2}
			justifyContent="center"
			flexGrow={1}
		>
			<Text>{inputValue || " "}</Text>
		</Box>
	);
};

export default TypingInput;

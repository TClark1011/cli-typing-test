import { useInputState } from "$hooks";
import { typingTestAtom } from "$store";
import { D } from "@mobily/ts-belt";
import { Box, Text } from "ink";
import TextInput from "ink-text-input";
import { useAtomValue, useSetAtom } from "jotai";
import { selectAtom } from "jotai/utils";
import { useEffect } from "react";

const typingInputAtom = selectAtom(typingTestAtom, D.getUnsafe("input"));

const TypingInput: React.FC = () => {
	const input = useAtomValue(typingInputAtom);
	const dispatch = useSetAtom(typingTestAtom);

	const setInput = (input: string) =>
		dispatch({
			type: "updateInput",
			payload: input,
		});

	const onSubmit = () =>
		dispatch({
			type: "gotoNextWord",
		});

	useEffect(() => {
		if (input.endsWith(" ")) {
			onSubmit();
		}
	}, [input]);

	return (
		<Box
			borderColor="white"
			borderStyle="single"
			paddingX={2}
			justifyContent="center"
			flexGrow={1}
		>
			<TextInput value={input} onSubmit={onSubmit} onChange={setInput} />
		</Box>
	);
};

export default TypingInput;

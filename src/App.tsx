import { Box, Text } from "ink";
import useInputState from "./hooks/useInputState";
import randomWords from "random-words";
import TestTextDisplay from "./components/TestTextDisplay";
import { useEffect, useState } from "react";
import { N } from "@mobily/ts-belt";

const testTextWords = randomWords(15);

const App: React.FC = () => {
	const { value: inputValue, lastInput, clear } = useInputState();
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		if (lastInput?.input === " ") {
			clear();
			setActiveIndex(N.succ);
		}
	}, [lastInput]);
	return (
		<Box flexDirection="column">
			<TestTextDisplay words={testTextWords} activeIndex={activeIndex} />
			<Box
				borderColor="white"
				borderStyle="single"
				paddingX={2}
				justifyContent="center"
			>
				<Text>{inputValue || " "}</Text>
			</Box>
		</Box>
	);
};

export default App;

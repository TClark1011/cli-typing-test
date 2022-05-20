import { typingTestAtom } from "$store";
import { roundNumber } from "$utils";
import { D, N } from "@mobily/ts-belt";
import { Box, Text } from "ink";
import { selectAtom, useAtomValue } from "jotai/utils";

const timerAtom = selectAtom(typingTestAtom, D.getUnsafe("timePassed"));
const TestTimer: React.FC = () => {
	const timePassed = useAtomValue(timerAtom);

	return (
		<Box paddingX={1} borderColor="white" width={10} borderStyle="single">
			<Text>{roundNumber(timePassed / 1000, 2)}</Text>
		</Box>
	);
};

export default TestTimer;

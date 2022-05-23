import { getTimerSeconds } from "$logic";
import deriveWordsPerMinute from "$logic/deriveWordsPerMinute";
import { typingTestAtom } from "$store";
import { getSeconds, roundNumber, _roundTo } from "$utils";
import { D, flow, N, pipe } from "@mobily/ts-belt";
import { Box, Text } from "ink";
import { useAtom } from "jotai";
import { selectAtom, useAtomValue } from "jotai/utils";

const timerAtom = selectAtom(
	typingTestAtom,
	flow(D.getUnsafe("timePassed"), getTimerSeconds),
);

const TestTimer: React.FC = () => {
	const timer = useAtomValue(timerAtom);

	return (
		<Box paddingX={1} borderColor="white" borderStyle="single" minWidth={10}>
			<Text>{timer}</Text>
		</Box>
	);
};

export default TestTimer;

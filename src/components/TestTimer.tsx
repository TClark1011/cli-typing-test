import { useValueWithIntervalUpdates } from "$hooks";
import { getTimerSeconds } from "$logic";
import deriveWordsPerMinute from "$logic/deriveWordsPerMinute";
import { typingTestAtom } from "$store";
import { deriveTimerValue } from "$types";
import {
	getSeconds,
	roundNumber,
	_composeFormattedNumber,
	_roundTo,
} from "$utils";
import { D, flow, N, pipe } from "@mobily/ts-belt";
import { Box, Text } from "ink";
import { useAtom } from "jotai";
import { selectAtom, useAtomValue } from "jotai/utils";

const timerAtom = selectAtom(
	typingTestAtom,
	D.selectKeys(["timer", "testStatus"]),
);

const TestTimer: React.FC = () => {
	const { timer, testStatus } = useAtomValue(timerAtom);
	const timerValue = useValueWithIntervalUpdates(
		() =>
			pipe(
				timer,
				deriveTimerValue,
				getTimerSeconds,
				_composeFormattedNumber(2),
			),
		89,
		testStatus === "running",
	);

	return (
		<Box paddingX={1} borderColor="white" borderStyle="single" minWidth={10}>
			<Text>{timerValue}</Text>
		</Box>
	);
};

export default TestTimer;

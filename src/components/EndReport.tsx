import deriveWordsPerMinute from "$logic/deriveWordsPerMinute";
import { typingTestAtom, TypingTestStateProps } from "$store";
import { WordProgress } from "$types";
import { roundNumber, _getBestItem, _roundTo } from "$utils";
import { A, D, F, flow, pipe, S } from "@mobily/ts-belt";
import { Box, Text, TextProps } from "ink";
import { useAtomValue } from "jotai/utils";

type ReportMetric = {
	label: string;
	getter: (p: TypingTestStateProps) => number | string;
};

const isWordMarkedAsCorrect: (p: WordProgress) => boolean = flow(
	D.getUnsafe("status"),
	F.equals("incorrect"),
);

const metrics: ReportMetric[] = [
	{
		label: "Time Elapsed",
		getter: ({ timePassed }) => `${roundNumber(timePassed / 1000, 2)}s`,
	},
	{
		label: "Words Typed",
		getter: ({ words }) => words.length,
	},
	{
		label: "Mistakes Made",
		getter: ({ words }) => words.filter(isWordMarkedAsCorrect).length,
	},
	{
		label: "WPM",
		getter: ({ words, timePassed }) => deriveWordsPerMinute(words, timePassed),
	},
];

const getMetricLabelLength: (p: ReportMetric) => number = flow(
	D.getUnsafe("label"),
	S.length,
);

const longestMetricLabel = pipe(
	metrics,
	_getBestItem(getMetricLabelLength),
	getMetricLabelLength,
);

const EndReport: React.FC = () => {
	const state = useAtomValue(typingTestAtom);

	return (
		<Box borderStyle="double" borderColor="blue" justifyContent="center">
			<Box flexDirection="column">
				<Box justifyContent="center">
					<Text>You completed the test!</Text>
				</Box>
				{metrics.map(({ label, getter }) => (
					<Box key={label}>
						<Box width={longestMetricLabel + 6}>
							<Text> - {label}:</Text>
						</Box>
						<Text bold>{getter(state)}</Text>
					</Box>
				))}
			</Box>
		</Box>
	);
};

export default EndReport;

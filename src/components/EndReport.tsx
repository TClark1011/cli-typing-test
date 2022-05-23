import { deriveWordsPerMinute } from "$logic";
import { typingTestAtom, TypingTestStateProps } from "$store";
import { WordProgress } from "$types";
import {
	getSeconds,
	printPercentage,
	roundNumber,
	_countWith,
	_getBestItem,
	_percentageOfItemsWhere,
	_roundTo,
	_subtractFrom,
} from "$utils";
import { A, B, D, F, flow, N, pipe, S } from "@mobily/ts-belt";
import { Box, Text, TextProps } from "ink";
import { useAtomValue } from "jotai/utils";

type ReportMetric = {
	label: string;
	getter: (p: TypingTestStateProps) => number | string;
};

const isWordMarkedAsIncorrect: (p: WordProgress) => boolean = flow(
	D.getUnsafe("status"),
	F.equals("incorrect"),
);

const isWordMarkedAsCorrect = flow(isWordMarkedAsIncorrect, B.not);

const metrics: ReportMetric[] = [
	{
		label: "Time Elapsed",
		getter: flow(
			D.getUnsafe("timePassed"),
			getSeconds,
			_roundTo(2),
			String,
			S.concat("s"),
		),
	},
	{
		label: "Words Typed",
		getter: flow(D.getUnsafe("words"), A.length),
	},
	{
		label: "Mistakes Made",
		getter: flow(D.getUnsafe("words"), _countWith(isWordMarkedAsIncorrect)),
	},
	{
		label: "Accuracy",
		getter: ({ words }) =>
			pipe(
				words,
				_percentageOfItemsWhere(isWordMarkedAsCorrect),
				printPercentage,
			),
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

const longestMetricLabel: number = pipe(
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

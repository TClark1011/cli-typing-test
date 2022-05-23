import { useExitApp } from "$hooks";
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
import { Box, BoxProps, Text, TextProps, useInput } from "ink";
import { useAtom } from "jotai";
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

type PostTestActionProps = {
	letter: string;
	description: string;
};

const PostTestAction: React.FC<PostTestActionProps> = ({
	letter,
	description,
}) => (
	<Box borderColor="white" borderStyle="single" paddingX={1}>
		<Text>
			{letter} - {description}
		</Text>
	</Box>
);

const EndReport: React.FC = () => {
	const exitApp = useExitApp();
	const [state, dispatch] = useAtom(typingTestAtom);

	useInput((input) => {
		switch (input) {
			case "r":
				return dispatch({ type: "reset" });
			case "q":
				return exitApp();
		}
	});

	return (
		<Box flexDirection="column">
			<Box
				borderStyle="double"
				borderColor="blue"
				justifyContent="center"
				flexDirection="column"
				alignItems="center"
			>
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
				<Box width="100%" justifyContent="center">
					<Box paddingRight={2}>
						<PostTestAction letter="q" description="quit" />
					</Box>
					<PostTestAction letter="r" description="restart" />
				</Box>
			</Box>
		</Box>
	);
};

export default EndReport;

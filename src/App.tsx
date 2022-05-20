import { Box } from "ink";
import { TestTextDisplay, TestTimer, TypingInput } from "$components";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useMount } from "ahooks";
import { useTestTimer } from "$logic";
import { typingTestAtom } from "$store";
import EndReport from "$components/EndReport";
import { selectAtom } from "jotai/utils";

const testIsCompletedAtom = selectAtom(
	typingTestAtom,
	(state) => state.testStatus === "completed",
);

const App: React.FC = () => {
	const dispatch = useSetAtom(typingTestAtom);
	const testIsCompleted = useAtomValue(testIsCompletedAtom);

	useTestTimer();
	useMount(() => {
		dispatch({
			type: "generateNewWords",
		});
	});

	return (
		<Box flexDirection="column" width={60}>
			{!testIsCompleted && (
				<>
					<TestTextDisplay />
					<Box>
						<Box paddingRight={1} flexGrow={1} flexShrink={1}>
							<TypingInput />
						</Box>
						<TestTimer />
					</Box>
				</>
			)}
			{testIsCompleted && <EndReport />}
		</Box>
	);
};

export default App;

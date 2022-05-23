import { Box } from "ink";
import {
	EndReport,
	TestTextDisplay,
	TestTimer,
	TypingInput,
} from "$components";
import { useAtomValue } from "jotai";
import { useTestTimer } from "$logic";
import { typingTestAtom } from "$store";
import { selectAtom } from "jotai/utils";

const testIsCompletedAtom = selectAtom(
	typingTestAtom,
	(state) => state.testStatus === "completed",
);

const App: React.FC = () => {
	const testIsCompleted = useAtomValue(testIsCompletedAtom);

	useTestTimer();

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

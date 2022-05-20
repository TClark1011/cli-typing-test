import { Box } from "ink";
import { TestTextDisplay, TestTimer, TypingInput } from "$components";
import { useSetAtom } from "jotai";
import { useMount } from "ahooks";
import { useTestTimer } from "$logic";
import { typingTestAtom } from "$store";

const App: React.FC = () => {
	const dispatch = useSetAtom(typingTestAtom);

	useTestTimer();
	useMount(() => {
		dispatch({
			type: "generateNewWords",
		});
	});

	return (
		<Box flexDirection="column" width={60}>
			<TestTextDisplay />
			<Box>
				<Box paddingRight={1} flexGrow={1} flexShrink={1}>
					<TypingInput />
				</Box>
				<TestTimer />
			</Box>
		</Box>
	);
};

export default App;

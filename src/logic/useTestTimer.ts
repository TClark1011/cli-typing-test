import { useTimer } from "$hooks";
import { typingTestAtom } from "$store";
import { TestStatus } from "$types";
import { isOneOf } from "$utils";
import { useUpdateEffect } from "ahooks";
import { useAtomValue, useSetAtom } from "jotai";

const useTestTimer = () => {
	const { timePassed, toggle } = useTimer();
	const { testStatus } = useAtomValue(typingTestAtom);
	const dispatch = useSetAtom(typingTestAtom);
	useUpdateEffect(() => {
		dispatch({
			type: "updateTimePassed",
			payload: timePassed,
		});
	}, [timePassed]);
	useUpdateEffect(() => {
		if (isOneOf<TestStatus>(testStatus, ["completed", "paused"])) {
			toggle(false);
		} else {
			toggle(true);
		}
	}, [testStatus]);
};

export default useTestTimer;

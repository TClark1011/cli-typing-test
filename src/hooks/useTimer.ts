import { _setOrToggle } from "$utils";
import { B, flow, N } from "@mobily/ts-belt";
import { update } from "@mobily/ts-belt/dist/types/Dict";
import { useInterval, useUpdateEffect } from "ahooks";
import { useEffect, useRef, useState } from "react";

const invertIfDefined = (val?: boolean) => (val === undefined ? val : !val);

const useTimer = (startEnabled = true, updateInterval = 100) => {
	const startedAtRef = useRef(Date.now());
	const [timePassed, setTimePassed] = useState(0);
	const [isPaused, setIsPaused] = useState(!startEnabled);

	const pausedAtRef = useRef(Date.now());
	const timeSpentPausedRef = useRef(0);

	useEffect(() => {
		if (isPaused) {
			pausedAtRef.current = Date.now();
		} else {
			timeSpentPausedRef.current += Date.now() - pausedAtRef.current;
		}
	}, [isPaused]);

	useInterval(() => {
		if (!isPaused) {
			setTimePassed(
				(current) =>
					// current - (startedAtRef.current + timeSpentPausedRef.current),
					Date.now() - (startedAtRef.current + timeSpentPausedRef.current),
			);
		}
	}, updateInterval);

	useUpdateEffect(() => {
		if (timePassed === 0) {
			// Whenever the timer gets reset, reset additional state
			startedAtRef.current = Date.now();
			timeSpentPausedRef.current = 0;
		}
	}, [timePassed]);

	return {
		timePassed,
		reset: () => setTimePassed(0),
		toggle: flow(invertIfDefined, _setOrToggle, setIsPaused) as (
			p?: boolean,
		) => any,
		isPaused,
	};
};

export default useTimer;

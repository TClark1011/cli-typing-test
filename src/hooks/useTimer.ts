import { _setOrToggle } from "$utils";
import { flow } from "@mobily/ts-belt";
import { useInterval } from "ahooks";
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
				Date.now() - (startedAtRef.current + timeSpentPausedRef.current),
			);
		}
	}, updateInterval);

	return {
		timePassed,
		reset: () => {
			setTimePassed(0);
			startedAtRef.current = Date.now();
			timeSpentPausedRef.current = 0;
		},
		toggle: flow(invertIfDefined, _setOrToggle, setIsPaused) as (
			p?: boolean,
		) => any,
		isPaused,
	};
};

export default useTimer;

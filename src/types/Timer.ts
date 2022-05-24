import { B, D, F, flow, N, O } from "@mobily/ts-belt";

export {};

type Updater<T> = (p: T) => T;
type Generator<T, Params extends any[] = []> = (...params: Params) => T;

type Timer = {
	startedAt: number;
	timeSpentPaused: number;
	paused: boolean;
	pausedAt: number;
};

export default Timer;

export const generateTimer: Generator<Timer, [boolean?]> = (
	startPaused = false,
) => ({
	pausedAt: 0,
	timeSpentPaused: 0,
	paused: startPaused,
	startedAt: Date.now(),
});

/* ---------------------------------- */
/*          Method Functions          */
/* ---------------------------------- */

/* ----------- Derivations ---------- */
export const deriveIsPaused: (p: Timer) => boolean = D.getUnsafe("paused");

export const deriveTimerValue = (timer: Timer): number =>
	Date.now() - timer.startedAt - timer.timeSpentPaused;

/* ---- Updater Internal Helpers ---- */

//# These 2 functions are only used by `updateTimerPauseStats`
// This function must only be run immediately after the timer
// is unpaused. Running it at any other time will result in
// incorrect values, making the timer inaccurate.
const updateTimerTimeSpentPaused: Updater<Timer> = (timer) =>
	D.updateUnsafe(timer, "timeSpentPaused", N.add(Date.now() - timer.pausedAt));
// This function must only be run immediately after the timer
// is paused.
const setTimerPausedAtToNow: Updater<Timer> = D.update("pausedAt", Date.now);

// This is used to update relevant stats after the
// a timer is paused or resumed. Only used in
// `toggleTimerPaused` and `setTimerPaused`
const updateTimerPauseStats: Updater<Timer> = (timer) =>
	F.ifElse(
		timer,
		deriveIsPaused,
		setTimerPausedAtToNow,
		updateTimerTimeSpentPaused,
	);

/* ------------ Updaters ------------ */
export const toggleTimerPaused: Updater<Timer> = flow(
	D.updateUnsafe("paused", B.not),
	updateTimerPauseStats,
);

export const setTimerPaused = flow(
	(timer: Timer, pauseStatus: boolean) => ({
		...timer,
		paused: pauseStatus,
	}),
	updateTimerPauseStats,
);

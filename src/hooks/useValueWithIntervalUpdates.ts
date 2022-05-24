import { useInterval } from "ahooks";
import { useState } from "react";

const useValueWithIntervalUpdates = <T>(
	getter: () => T,
	updateInterval: number,
	enabled = true,
) => {
	const [value, setValue] = useState(getter());

	useInterval(() => {
		if (enabled) {
			setValue(getter());
		}
	}, updateInterval);

	return value;
};

export default useValueWithIntervalUpdates;

import { getSeconds, _roundTo } from "$utils";
import { flow } from "@mobily/ts-belt";

const getTimerSeconds = flow(getSeconds, _roundTo(2));

export default getTimerSeconds;

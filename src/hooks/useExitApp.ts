import { D, flow } from "@mobily/ts-belt";
import { useApp } from "ink";

const useExitApp = flow(useApp, D.getUnsafe("exit"));

export default useExitApp;

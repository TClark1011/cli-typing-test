import cliHelper from "$lib/cliHelper";
import { render } from "ink";
import { StrictMode } from "react";
import App from "./App";
import { cli } from "$logic"; // required for CLI logic to be executed on start

render(
	<StrictMode>
		<App />
	</StrictMode>,
);

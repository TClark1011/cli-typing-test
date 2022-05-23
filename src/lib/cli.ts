import { DEFAULT_NUMBER_OF_WORDS } from "$constants";
import cliHelper from "$cli-helper";

const cli = cliHelper("Helper Message", {
	flags: {
		words: {
			type: "number",
			default: DEFAULT_NUMBER_OF_WORDS,
			alias: "w",
		},
		maxWordLength: {
			type: "number",
			default: 0,
			alias: "m",
		},
	},
});

export const { flags } = cli;

export default cli;

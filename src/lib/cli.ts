import { DEFAULT_NUMBER_OF_WORDS } from "$constants";
import cliHelper from "$cli-helper";
import chalk from "chalk";

const paramText = chalk.blueBright;
const header = chalk.bold;

const cli = cliHelper(
	`
 ${header("Usage")}

 ${paramText("-w --words")}      number of words in the test (default: 60)
 ${paramText(
		"-m --maxLength",
 )}  maximum length of a word, use 0 for no limit (default: 0)
`,
	{
		flags: {
			words: {
				type: "number",
				default: DEFAULT_NUMBER_OF_WORDS,
				alias: "w",
			},
			maxLength: {
				type: "number",
				default: 0,
				alias: "m",
			},
		},
	},
);

export const { flags } = cli;

export default cli;

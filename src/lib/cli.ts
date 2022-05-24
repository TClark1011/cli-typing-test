import {
	DEFAULT_NUMBER_OF_WORDS,
	APP_RUN_COMMAND,
	APP_NAME,
	APP_DESCRIPTION,
} from "$constants";
import cliHelper from "$cli-helper";
import chalk from "chalk";
import { A, flow, pipe, S } from "@mobily/ts-belt";
import gradient from "gradient-string";

const paramText = chalk.cyan;
const header = chalk.bold;
const defaultValue = chalk.gray;

const spaceOutCharacters = flow(S.split(""), A.join(" "));
const styleTitle = flow(gradient.pastel, chalk.bold);

const TITLE = pipe(APP_NAME, S.toUpperCase, spaceOutCharacters, styleTitle);

const cli = cliHelper(
	`${APP_DESCRIPTION}

${header("Usage")}

${paramText(APP_RUN_COMMAND)}          start typing test

${header("Parameters")}

${paramText("-w --words")}      number of words in the test ${defaultValue(
		"(default: 60)",
	)}
${paramText(
	"-m --maxLength",
)}  maximum length of a word, use 0 for no limit ${defaultValue("(default: 0)")}
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
		description: TITLE,
	},
);

export const { flags } = cli;

export default cli;

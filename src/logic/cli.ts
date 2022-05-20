import cliHelper from "$lib/cliHelper";

const cli = cliHelper("Helper Message", {
	flags: {
		words: {
			type: "number",
			default: 5,
			alias: "w",
		},
	},
});

export const { flags } = cli;

export default cli;

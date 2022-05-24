import * as z from "zod";
import PACKAGE_JSON from "../../package.json";

export const DEFAULT_NUMBER_OF_WORDS = z
	.preprocess(Number, z.number())
	.parse(process.env.DEFAULT_NUMBER_OF_WORDS);

export const APP_RUN_COMMAND = Object.keys(PACKAGE_JSON.bin)[0];
export const APP_NAME = PACKAGE_JSON.name;
export const APP_DESCRIPTION = PACKAGE_JSON.description;

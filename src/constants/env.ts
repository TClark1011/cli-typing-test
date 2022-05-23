import * as z from "zod";

export const DEFAULT_NUMBER_OF_WORDS = z
	.preprocess(Number, z.number())
	.parse(process.env.DEFAULT_NUMBER_OF_WORDS);
// export const DEFAULT_NUMBER_OF_WORDS = 15;

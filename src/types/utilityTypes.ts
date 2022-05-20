import { Key } from "ink";

export type UserInput = {
	input: string;
	key: Key;
};

export type Array<Elem> = Elem[] | readonly Elem[];

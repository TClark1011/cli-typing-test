import { Array } from "$types";

const getRandom = <Elem>(array: Array<Elem>): Elem => {
	const index = Math.floor(Math.random() * array.length);
	return array[index];
};

export default getRandom;

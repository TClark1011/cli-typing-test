import { Merge } from "type-fest";

export type Action<Type extends string, Payload = void> = Merge<
	{
		type: Type;
	},
	Payload extends void
		? {}
		: {
				payload: Payload;
		  }
>;

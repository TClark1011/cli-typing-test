import { UserInput } from "$types";
import { S } from "@mobily/ts-belt";
import { Key, useInput } from "ink";
import { useCallback, useState } from "react";

const keyIsBackspace = (key: Key) => key.backspace || key.delete;

const removeLastCharacter = (value: string) =>
	S.slice(value, 0, value.length - 1);

const useInputState = (initialValue = "") => {
	const [value, setValue] = useState(initialValue);
	const [lastInput, setLastInput] = useState<UserInput | undefined>(undefined);

	useInput((input, key) => {
		setLastInput({ key, input });
		if (!!input && !key.meta) {
			setValue(S.concat(input));
		} else if (keyIsBackspace(key)) {
			setValue(removeLastCharacter);
		}
	});

	const clear = useCallback(() => {
		setValue("");
		setLastInput(undefined);
	}, []);

	return {
		value,
		setValue,
		clear,
		lastInput,
	};
};

export default useInputState;

import { createElement } from "./createElement";
import { useState } from "./state";

export function Button() {
	const [num, setNumber] = useState(0);

	return createElement(
		"button",
		{ onClick: () => setNumber((prev: number) => prev + 1) },
		num,
	);
}

import { createElement } from "./createElement.js";
import { useState } from "./state.js";
export function Button() {
	const [num, setNumber] = useState(0);
	return createElement(
		"button",
		{ onClick: () => setNumber((prev) => prev + 1) },
		num,
	);
}

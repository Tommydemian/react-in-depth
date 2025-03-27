import { Button } from "./Button.js";
import { createElement } from "./createElement.js";
export function App() {
	return createElement(
		"section",
		{ class: "container" },
		createElement("div", {}, createElement("p", { text: "Hello!" }), Button()),
	);
}

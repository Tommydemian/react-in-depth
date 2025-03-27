import { Button } from "./Button";
import { createElement } from "./createElement";
export function App() {
	return createElement(
		"section",
		{ class: "container" },
		createElement("div", {}, createElement("p", { text: "Hello!" }), Button()),
	);
}

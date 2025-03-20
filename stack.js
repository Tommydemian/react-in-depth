import { createElement } from "./createElement.js";
const app = createElement(
	"section",
	{ "aria-label": "main-section" },
	createElement(
		"div",
		{ class: ".container" },
		createElement(
			"p",
			{ text: "let's make Aviren React" },
			"Aviren is the future ",
		),
	),
);
export const stack = [];
stack.push(app);

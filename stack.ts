import { createElement } from "./createElement";
import type { VirtualNode } from "./types";

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

export const stack: (VirtualNode | Text)[] = [];
stack.push(app);

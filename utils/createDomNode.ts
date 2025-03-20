import type { CustomTagName } from "../types";
export function createDomNode(tagName: CustomTagName): HTMLElement | Text {
	return tagName === "TEXT_ELEMENT"
		? document.createTextNode("")
		: document.createElement(tagName);
}

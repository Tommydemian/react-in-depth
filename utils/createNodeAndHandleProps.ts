import { createDomNode } from "./createDomNode";
import type { VirtualNode } from "../types";

export function createNodeAndHandleProps(
	parent: HTMLElement,
	stack: VirtualNode[],
) {
	for (const vNode of stack) {
		const nodeHTMLEL = createDomNode(vNode.tagName);
		// handle PROPS
		if (vNode.props != null) {
			for (const [key, value] of Object.entries(vNode.props)) {
				if (typeof value === "function") {
					if (key.toLocaleLowerCase().startsWith("on")) {
						// "i.e onClick"
						const eventName = (
							key.substring(2) as keyof HTMLElementEventMap
						).toLocaleLowerCase();
						// warn: event not finded in el => console.warn()
						if (!(key.toLocaleLowerCase().trim() in nodeHTMLEL)) {
							console.warn(
								"event handler must start with 'on' and be followed by a valid event name",
							);
						}
						nodeHTMLEL.addEventListener(eventName, value as EventListener);
					}
				} else if (nodeHTMLEL instanceof HTMLElement) {
					nodeHTMLEL.setAttribute(key.toLocaleLowerCase(), String(value));
				}
			}
		}
	}
}

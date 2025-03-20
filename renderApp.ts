import { createDomNode } from "./utils/createDomNode";
import type { VirtualNode } from "./types";
export function renderApp<T>(
	rootContainer: HTMLElement | null,
	stack: (VirtualNode | Text)[],
) {
	// create DOM node
	for (const vNode of stack) {
		if ("tagName" in vNode) {
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
			} // close Props addition
			// CHILDREN
			if ("children" in vNode) {
				// biome-ignore lint/complexity/noForEach: <explanation>
				vNode.children.forEach((child) => {
					if (typeof child !== "object") {
						const textEl = document.createTextNode(String(child));
						textEl.nodeValue = String(child);
						nodeHTMLEL.appendChild(textEl);
					} else {
						renderApp(
							nodeHTMLEL as HTMLElement,
							child.children as VirtualNode[],
						);
					}
				});
			} // close children management

			if (rootContainer) {
				rootContainer.appendChild(nodeHTMLEL);
			}
		} else {
			const textEl = document.createTextNode(String(vNode));
			rootContainer?.append(textEl);
		}
	}
}

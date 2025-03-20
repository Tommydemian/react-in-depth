import { createElement } from "./createElement";
import type { CustomTagName, Child } from "./types";
export function renderEl<T>(
	tagName: CustomTagName,
	props: Record<string, T>,
	placeToRender: HTMLElement | null,
	...children: Child[]
) {
	// virtual Node creation
	const virtualNode = createElement(tagName, props, ...children);

	// TAGNAME
	const nodeEl =
		virtualNode.tagName === "TEXT_ELEMENT"
			? document.createTextNode("")
			: document.createElement(virtualNode.tagName);

	// PROPS
	if (nodeEl instanceof HTMLElement) {
		if (virtualNode.props != null) {
			const keys = Object.keys(virtualNode.props);

			// biome-ignore lint/complexity/noForEach: <explanation>
			keys.forEach((k) => {
				if (typeof virtualNode.props[k] === "function") {
					if (k.toLocaleLowerCase().startsWith("on")) {
						const eventName = (
							k.substring(2) as keyof HTMLElementEventMap
						).toLocaleLowerCase();
						if (!(k.toLocaleLowerCase().trim() in nodeEl)) {
							console.warn(
								"event handler must start with 'on' and be followed by a valid event name",
							);
						}
						nodeEl.addEventListener(
							eventName,
							virtualNode.props[k] as EventListener,
						);
					}
				} else {
					nodeEl.setAttribute(k, String(virtualNode.props[k]));
				}
			});
		}
	}

	// CHILDREN
	virtualNode.children.map((child) => {
		if (typeof child !== "object") {
			const textEl = document.createTextNode(String(child));
			textEl.nodeValue = String(child);
			nodeEl.appendChild(textEl);
		} else {
			renderEl(
				child.tagName,
				child.props,
				nodeEl as HTMLElement,
				...child.children,
			);
		}
	});

	if (placeToRender) {
		placeToRender.appendChild(nodeEl);
	}
}

type CustomTagName = "TEXT_ELEMENT" | keyof HTMLElementTagNameMap;

// VirtualNode describe lo que llamas "descriptor" (tagName, props, children)
interface VirtualNode {
	tagName: CustomTagName;
	props: Record<string, unknown>;
	children: Children; // donde Children es el tipo que definimos más abajo
}

// Child puede ser un texto (string o number) o bien un VirtualNode
type Child = string | number | VirtualNode;

// Children puede ser un solo Child o un array de Child
type Children = Child[];

document.addEventListener("DOMContentLoaded", () => {
	const mainSection = document.getElementById("main-section");

	function createElement<T>(
		tagName: CustomTagName,
		props: Record<string, T>,
		children: Children,
	) {
		return {
			tagName,
			props,
			children,
		};
	}

	function renderEl<T>(
		tagName: CustomTagName,
		props: Record<string, T>,
		placeToRender: HTMLElement | null,
		...children: Children
	) {
		// virtual Node creation
		const el = createElement(tagName, props, children);

		// TAGNAME
		const nodeEl =
			el.tagName === "TEXT_ELEMENT"
				? document.createTextNode("")
				: document.createElement(el.tagName);

		// PROPS
		if (nodeEl instanceof HTMLElement) {
			const keys = Object.keys(el.props);

			for (let i = 0; i < keys.length; i++) {
				nodeEl.setAttribute(keys[i], String(props[keys[i]]));
			}
		}

		// CHILDREN
		el.children.map((val) => {
			if (typeof val !== "object") {
				const textEl = document.createTextNode(String(val));
				nodeEl.appendChild(textEl);
			} else {
				renderEl(
					val.tagName,
					val.props,
					nodeEl as HTMLElement,
					...val.children,
				);
			}
		});

		if (placeToRender) {
			placeToRender.appendChild(nodeEl);
		}
	}

	const container = document.querySelector("body");
	console.log(container);
	renderEl("h1", { title: "people", maxNum: 2 }, mainSection, "hello");
});

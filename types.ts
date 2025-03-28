export type CustomTagName = "TEXT_ELEMENT" | keyof HTMLElementTagNameMap;

// VirtualNode describe lo que llamas "descriptor" (tagName, props, children)
export type VirtualNode = {
	tagName: CustomTagName;
	props: Record<string, unknown>;
	children: Child[]; // donde Children es el tipo que definimos más abajo
};

export type Child = string | number | VirtualNode;

export type ManageStack = "populate" | "empty";

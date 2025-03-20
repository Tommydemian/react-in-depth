import type { CustomTagName, Child } from "./types";

export function createElement<T>(
	tagName: CustomTagName,
	props: Record<string, T>,
	...children: Child[]
) {
	return {
		tagName,
		props,
		children,
	};
}

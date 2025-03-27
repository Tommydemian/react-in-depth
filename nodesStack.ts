import { App } from "./App";
import type { VirtualNode, ManageStack } from "./types";

export const nodesStack: (VirtualNode | Text)[] = [];

export function manageStack(
	operation: ManageStack,
	stack: (VirtualNode | Text)[] = nodesStack,
) {
	if (operation === "populate") {
		stack.push(App());
		console.log("populate", App());
	} else {
		stack.length = 0;
	}
}

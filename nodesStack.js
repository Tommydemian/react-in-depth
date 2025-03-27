import { App } from "./App.js";
export const nodesStack = [];
export function manageStack(operation, stack = nodesStack) {
	if (operation === "populate") {
		stack.push(App()); // populate stack
	} else {
		stack.length = 0;
	}
}

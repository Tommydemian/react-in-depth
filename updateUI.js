import { manageStack } from "./nodesStack.js";
import { renderApp } from "./renderApp.js";
import { subscribe } from "./event-bus/onStateChange.js";

export function updateUI(root) {
	console.log("re-rendering UI...");
	manageStack("populate");
	renderApp(root);
}
subscribe("setter-fired", () => {
	manageStack("empty");
	updateUI();
});

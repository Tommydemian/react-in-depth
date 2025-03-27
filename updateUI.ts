import { manageStack } from "./nodesStack";
import { renderApp } from "./renderApp";
import { subscribe } from "./event-bus/onStateChange";
export function updateUI(root?: HTMLElement) {
	manageStack("populate");
	renderApp(root);
}

// NEW WAY => event-bus
subscribe("setter-fired", () => {
	manageStack("empty");
	updateUI();
});

import { stack } from "./stack.js";
import { renderApp } from "./renderApp.js";

document.addEventListener("DOMContentLoaded", () => {
	const root = document.getElementById("root");
	renderApp(root, stack);
});

import { updateUI } from "./updateUI.js";

document.addEventListener("DOMContentLoaded", () => {
	const root = document.getElementById("root");
	updateUI(root as HTMLElement);
});

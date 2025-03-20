import { createElement } from "./createElement.js";
import { renderEl } from "./renderEl.js";
document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    const mainSection = document.getElementById("main-section");
    renderEl("h1", { title: "people", maxNum: 2 }, root, "hello");
    // Ejemplo de uso de createElement, si quieres componerlo antes:
    const sectionNode = createElement("section", {}, "Texto de ejemplo en un section.", createElement("p", {}, "Párrafo dentro del section."));
    // Luego lo invocas así:
    renderEl("article", { title: "people know about them" }, root, // Aquí asumes que `mainSection` es tu contenedor en el DOM
    "Texto suelto directamente en article", createElement("div", {}, "Contenido dentro de un div"), createElement("h1", {}, "Un título H1"), createElement("button", { onClick: () => console.log("clicked") }, "log to the console"), createElement("ul", {}, createElement("li", {}, "Elemento 1"), createElement("li", {}, "Elemento 2")));
});

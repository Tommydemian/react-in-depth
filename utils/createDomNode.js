export function createDomNode(tagName) {
    return tagName === "TEXT_ELEMENT"
        ? document.createTextNode("")
        : document.createElement(tagName);
}

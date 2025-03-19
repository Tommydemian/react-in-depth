var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
document.addEventListener("DOMContentLoaded", function () {
    var mainSection = document.getElementById("main-section");
    function createElement(tagName, props, children) {
        return {
            tagName: tagName,
            props: props,
            children: children,
        };
    }
    function renderEl(tagName, props, placeToRender) {
        var children = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            children[_i - 3] = arguments[_i];
        }
        // virtual Node creation
        var el = createElement(tagName, props, children);
        // TAGNAME
        var nodeEl = el.tagName === "TEXT_ELEMENT"
            ? document.createTextNode("")
            : document.createElement(el.tagName);
        // PROPS
        if (nodeEl instanceof HTMLElement) {
            var keys = Object.keys(el.props);
            for (var i = 0; i < keys.length; i++) {
                nodeEl.setAttribute(keys[i], String(props[keys[i]]));
            }
        }
        // CHILDREN
        el.children.map(function (val) {
            if (typeof val !== "object") {
                var textEl = document.createTextNode(String(val));
                nodeEl.appendChild(textEl);
            }
            else {
                renderEl.apply(void 0, __spreadArray([val.tagName,
                    val.props,
                    nodeEl], val.children, false));
            }
        });
        if (placeToRender) {
            placeToRender.appendChild(nodeEl);
        }
    }
    var container = document.querySelector("body");
    console.log(container);
    renderEl("h1", { title: "people", maxNum: 2 }, mainSection, "hello");
});

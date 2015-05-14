import mojo from "./mojo.js";


if (typeof define === "function" && define.amd) {
    define(() => mojo);
} else if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = mojo;
} else {
    window.mojo = mojo;
}

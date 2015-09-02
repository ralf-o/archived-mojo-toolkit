import mojo from "./mojo.js";

if (typeof define === "function" && define.amd) {
    define(() => mojo);
} else if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = mojo;
}

if (typeof window === 'object' && window) {
    window.mojo = mojo;
}

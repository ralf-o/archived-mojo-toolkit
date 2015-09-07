import Arrays from "./module/Arrays";
import Objects from "./module/Objects";
import Strings from "./module/Strings";
import Stream from "./module/Stream";

let module = {
    Arrays: Arrays,
    Objects: Objects,
    Stream: Stream,
    Strings: Strings
};

export default module;

export {
    Arrays,
    Objects,
    Stream,
    Strings
}

if (typeof define === 'function' && define.amd) {
    define(() => module);
}

if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = module;
}

if (typeof window === 'object' && window) {
    if (!window.mojo) {
        window.mojo = module;
    }
}


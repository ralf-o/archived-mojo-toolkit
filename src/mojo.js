import Objects from './module/Objects';
import Strings from './module/Strings';
import Arrays from './module/Arrays';
import Seq from './module/Seq';

const module = { Objects, Strings, Arrays, Seq };

export default module;

if (typeof define === 'function' && define.amd) {
    define(() => module);
}

if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = module;
}

if (typeof window === 'object' && window) {
    window.mojo = module;
}

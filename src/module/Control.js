'use strict';

import Seq from './Seq';

export default class Control {
    constructor() {
        throw 'Class <Control> is not instantiable';
    }

    static toString() {
        return '<class Control>';
    }

    /**
     * Some kind of Haskell's "do-notation" for monads provided for JavaScript using "ECMAScript 20015" generators.
     * Works even in non-determinism context (for example: list monads => Seqs).
     *
     * @todo I do not think this is really a good idea ... it's better to use "flatMap", "map" and "of" in case
     *       you want to go a monadic way.
     */
    static doMonad(action) {
        if (typeof action !== 'function') {
            throw new TypeError("[Control.doMonad] First argument 'action' must be generator function");
        }


        const doRec = function(value, values) {
            var ret;

            const generator = action();

            values.forEach(v => generator.next(v));

            const result = generator.next(value);

            if (result.done) {
                ret = result.value;
            } else {
                ret = result.value.flatMap(v => doRec(v, values.concat(value)));
            }

            return ret;
        };

        return doRec(null, []);
    }
}
'use strict';

/**
 * Class as representation of a lazy sequences
 *
 * @class  Stream
 * @module util
 */
export default class Stream {
    /**
     * @constructor
     * @class Stream
     * @param {function} generator The generator responsible for the iteration
     */
    constructor(generator) {
        this._generator = generator;
    }

    [Symbol.iterator]() {
        const iter = this._generator();
        var ret;

        if (iter && typeof iter.next === 'function') {
            ret = iter;
        } else if (iter && typeof iter.generate === 'function' && typeof iter.close === 'function') {
            const {generate, close} = iter;

            ret = function* () {
                try {
                    let values = generate();

                    while (values instanceof Array && values.length > 0) {
                        yield* values;
                        values = generate();
                    }
                } finally {
                    close();
                }
            }();
        } else if (typeof iter === 'function') {
            return function* () {
                let values = iter();

                while (values instanceof Array && values.length > 0) {
                    yield* values;
                    values = iter();
                }
            }();
        } else {
            throw new TypeError();
        }

        return ret;
    }

    /**
     * Maps each value of the stream
     *
     * @method map
     * @param {function} f Mapping function
     * @return {Stream} Stream of the mapped values
     */
    map(f) {
        return new Stream(function* () {
            let index = 0;

            for (let x of this) {
                yield f(x, index++);
            }
        }.bind(this));
    }

    filter(pred) {
        return new Stream(function* () {
            let index = 0;

            for (let x of this) {
                if (pred(x, index++)) {
                    yield x;
                }
            }
        }.bind(this));
    }

    takeWhile(pred)  {
        return new Stream(function* () {
            let index = 0;

            for (let x of this) {
                if (pred(x, index++)) {
                    yield x;
                } else {
                    break;
                }
            }
        }.bind(this));
    }

    skipWhile(pred)  {
        return new Stream(function* () {
            let index = 0,
                alreadyStarted = false;

            for (let x of this) {
                if (alreadyStarted || pred(x, index++)) {
                    yield x;
                    alreadyStarted = true
                }
            }
        }.bind(this));
    }

    take(n) {
        return this.takeWhile((x, index) => index < n);
    }

    reduce(f, seed) {
        const dummy = {};
        var ret = dummy;

        this.forEach((value, index) => {
            if (index == 0) {
                if (seed === undefined) {
                    ret = value;
                } else {
                    ret = f(seed, value, 0);
                }
            } else {
                ret = f(ret, value);
            }
        });

        if (ret === dummy) {
            if (seed !== undefined) {
                ret = seed;
            } else {
                new TypeError();
            }
        }

        return ret;
    }

    count() {
        return this.reduce((count, value) => count + 1, 0);
    }

    forEach(action) {
        let idx = 0;

        for (let item of this) {
            action(item, idx++)
        }
    }

    toArray() {
        return this.reduce((arr, value) => {
            arr.push(value);
            return arr;
        }, []);
    }

    static of(...items) {
        return Stream.from(items);
    }

    static from(items) {
        if (items === null) {
            return Seq.of();
        } else if (items instanceof Stream) {
            return items;
        } else if (items instanceof Array) {
            return new Stream(() => items.slice()[Symbol.iterator]());
        } if (items && typeof items[Symbol.iterator] === 'function') {
            return new Stream(() => items[Symbol.iterator]());
        } else  if (items && items["cljs$core$ISeqable$_seq$arity$1"] && typeof cljs === 'object') {
            let seq = cljs.core.seq(items);

            return new Stream(function* () {
                while (!cljs.core.empty_QMARK_(seq)) {
                    yield cljs.core.first(seq);
                    seq = cljs.core.rest(seq);
                }
            });
        } else if (false && items && typeof cljs === 'object' && cljs.core.sequential_QMARK_(items)) {
            let seq = cljs.core.seq(items);

            return new Stream(function* () {
                while (!cljs.core.empty_QMARK_(seq)) {
                    yield cljs.core.first(seq);
                    seq = cljs.core.rest(seq);
                }
            });
        } else {
            throw new TypeError("Not sequentiable: " + items);
        }
    }

    static iterate(initialValues, f) {
        const initVals = initialValues.slice();

        return new Stream(function* () {
            const values = initVals.slice();

            while (true) {
                values.push(f(...values));
                yield values.shift();
            }
        });
    }

    static repeat(value, n = Infinity) {
        return Stream.iterate([value], value => value).take(n);
    }

    /**
     * Creates a stream of numeric values from a start value (including) to
     * an end value (excluding).
     *
     * @example
     *     Seq.range(1, 10) // 1, 2, 3, 4, 5, 6, 7, 8, 9
     *
     * @method range
     * @param {Number} start Start value
     * @param {Number} end End value
     * @return {Stream} Stream of iterated values
     */
    static range(start, end, step = 1) {
        return Stream.iterate([start], value => value += step)
                .takeWhile(n => n < end);
    }
}

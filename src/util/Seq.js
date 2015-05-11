'use strict';

export default class Seq {
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

    map(f) {
        return new Seq(function* () {
            let index = 0;

            for (let x of this) {
                yield f(x, index++);
            }
        }.bind(this));
    }

    filter(pred) {
        return new Seq(function* () {
            let index = 0;

            for (let x of this) {
                if (pred(x, index++)) {
                    yield x;
                }
            }
        }.bind(this));
    }

    takeWhile(pred)  {
        return new Seq(function* () {
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
        return new Seq(function* () {
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

    count() {
        let ret = 0;

        this.forEach(_ => ++ret);

        return ret;
    }

    forEach(action) {
        let idx = 0;

        for (let item of this) {
            action(item, idx++)
        }
    }

    toArray() {
        let ret = [];

        this.forEach(x => ret.push(x));

        return ret;
    }

    static of(...items) {
        const length = items == null ? 0 : items.length;

        return new Seq(function* () {
           for (let x of items) {
                yield x;
            };
        });
    }

    static range(start, end) {
        return new Seq(function* () {
           for (let n = start; n < end; ++n) {
               yield n;
           }
        });
    }
};

'use strict';

import Objects from './Objects';
import Seq from './Seq';

export default class Reader extends Seq {
    constructor(data) {
        if (data === null || typeof data !== 'object') {
            throw new TypeError("[Reader.constructor] First argument 'data' must be an object");
        }

        super(() => this.getEntries().map(entry => entry.value)[Symbol.iterator]());

        this.__data = data;

        this.__isKeyed = this._data instanceof Array
                ? false
                : (typeof Map === 'function' && this.__data instanceof Map
                        || typeof WeakMap === 'function' && this.__data instanceof WeakMap
                        || typeof Immutable === 'object' && Immutable && this.__data instanceof Immutable.KeyedCollection
                        || typeof cljs === 'object' && cljs && cljs.assiciative_QMARK_
                                && cljs.asspciative_QMARK_(this.__data));
    }

    isAssociative() {
        return this.__isKeyed;
    }

    isSequential() {
        return !this.__isKeyed;
    }

    get(key) {
        return Reader.normalize(Objects.get(this.__data, key));
    }

    getIn(keyPath) {
        return Reader.normalize(Objects.getIn(this.__data, keyPath));
    }

    getKeys() {
        return this.getEntries().map(entry => entry.key);
    }

    getEntries() {
        const
            arr = [], // we are lazy here
            keys = Array.isArray(this.__data)
                    ? Seq.range(0, this.__data.length)
                    : Object.getOwnPropertyNames(this.__data);

        for (let key of keys) {
            arr.push({key: key, value: Reader.normalize(this.__data[key])});
        }

        return Seq.from(arr);
    }

    toString() {
        return '<instance of Reader>';
    }

    static toString() {
        return '<class Reader>';
    }

    static normalize(obj) {
        var ret;

        if (obj === null || obj instanceof Reader || typeof obj !== 'object') {
            ret = obj;
        } else {
            ret = new Reader(obj)
        }

        return ret;
    }
}

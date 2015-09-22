'use strict';

//import Seq from './Seq';

/*
class Reader {
    constructor(data) {
        if (data === null || typeof data !== 'object') {
            throw new TypeError("[Reader.constructor] First argument 'data' must be an object");
        }

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

    getValues() {
        return this.getEntires().map(entry =>entry.value);
    }

    getEntries() {
        // TODO
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
*/
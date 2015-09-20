'use strict';

import Seq from './Seq';

/**
 * Utility class with static helper functions to be used with any value - mainly objects.
 */
export default class Objects {
    /**
     * Will throw exception if someone tries to instantiate this utility class.
     *
     * @ignore
     */
    construct() {
        throw '[Objects] Class is not instantiable';
    }

    /**
     * Will return a proper string representation for debugging purposes.
     *
     * @ignore
     */
    static toString() {
        return '<utility class Objects>';
    }

    /**
     * Checks for being something else than undefined or null.
     *
     * @param {any} obj
     *    The value to be checked
     *
     * @return {boolean}
     *    false if obj is null or undefined, otherwise true
     *
     * @example
     *    Objects.isSomething(undefined)  // false
     *    Objects.isSomething(null)       // false
     *    Objects.isSomething(0)          // true
     *    Objects.isSomething(false)      // true
     *    Objects.isSomething('')         // true
     *    Objects.isSomething({})         // true
     *    Objects.isSomething(42)         // true
     *    Objects.isSomething({x: 42})    // true
     */
    static isSomething(obj) {
        return obj !== null && obj !== undefined;
    }

    /**
     * Checks for being undefined or null.
     *
     * @param {any} obj
     *    The value to be checked
     *
     * @return {boolean}
     *    true if obj is null or undefined, otherwise false
     *
     * @example
     *    Objects.isNothing(undefined)  // true
     *    Objects.isNothing(null)       // true
     *    Objects.isNothing(0)          // false
     *    Objects.isNothing(false)      // false
     *    Objects.isNothing('')         // false
     *    Objects.isNothing({})         // false
     *    Objects.isNothing(42)          // false
     *    Objects.isNothing({x: 42})    // false
     */
    static isNothing(obj) {
        return obj === null || obj === undefined;
    }

    /**
     * Converts a value to a string by using the toString method.
     *
     * @param {any} obj
     *    The value to be converted
     *
     * @return {string}
     *    The string representation of the value
     *
     * @example
     *    Objects.asString(undefined)         // ''
     *    Objects.asString(null)              // ''
     *    Objects.asString(42)                // '42'
     *    Objects.asString(true)              // 'true'
     *    Objects.asString(false)             // 'false'
     *    Objects.asString({toString: 'abc'}) // 'abc'
     *    Objects.asString('  some text  ')   // '  some text  '
     */
    static asString(obj) {
        var ret;

        if (obj === undefined || obj === null) {
            ret = '';
        } else if (typeof obj === 'string') {
            ret = obj;
        } else {
            ret = obj.toString();

            if (typeof ret !== 'string') {
                // Normally in this case the JavaScript engine should return undefined.
                // Nevertheless, to play save, we handle all cases here.
                if (ret === undefined || ret === null) {
                    ret = '';
                } else {
                    ret = '' + ret;
                }
            }
        }

        return ret;
    }

    /**
     * Reads the value referred by a certain key of an associative object.
     * Currently supported are plain old JavaScript objects,
     * ECMAScript 2015 Maps and WeakMaps and collections from
     * Immutable.js and ClojureScript.
     *
     * @param {any} obj
     *    The key-value collection
     *
     * @param {any} key
     *    The key of the value (Immutable and ClojureScript allow complex keys)
     *
     * @param {any} [defaultValue=undefined]
     *    The default value if the key-value collection does not contain the
     *    given key
     *
     * @return {any}
     *    Returns the
     *
     * @example
     *    Objects.get(null, 'myKey')                            // undefined
     *    Objects.get(null, 'myKey', 42)                        // 42
     *    Objects.get({myKey: 100}, 'myKey', 42)                // 100
     *    Objects.get({x: 100}, 'myKey', 42)                    // 42
     *    Objects.get([7, 42], 1)                               // 42
     *    Objects.get(Immutable.Map({myKey: 100}), 'myKey', 42) // 100
     */
    // TODO: Handling of ClojureScript objects not really nice (still working)
    static get(obj, key, defaultValue = undefined) {
        var ret = undefined;

        if (obj !== null && obj !== undefined) {
            if (typeof Immutable === 'object' && Immutable && obj instanceof Immutable.Collection) {
                ret = obj.get(key)
            } else if (obj.meta !== undefined
                    && typeof cljs === 'object'
                    && cljs
                    && (cljs.core.map_QMARK_(obj) || cljs.core.coll_QMARK_(obj))) {
                if (typeof key === 'string') {
                    ret = cljs.core.get(obj, cljs.core.keyword(path), undefined);
                }

                if (ret === undefined) {
                    ret = cljs.core.get(obj, key, undefined);
                }
            } else {
                ret = obj[key];
            }
        }

        if (ret === undefined) {
            ret = defaultValue;
        }

        return ret;
    }

    /**
     * Reads the value referred by a certain key of an associative object.
     * Currently supported are plain old JavaScript objects, collections
     * from Immutable.js and collections from ClojureScript.
     *
     * @param {any} obj
     *    The key-value collection
     *
     * @param {any} keyPath
     *    The key path of the value (Immutable and ClojureScript allow complex keys).
     *    Key path should be an array or something other seqable.
     *
     * @param {any} [defaultValue=undefined]
     *    The default value if the key-value collection does not contain the
     *    given key
     *
     * @return {any}
     *    Returns the
     *
     * @example
     *    const obj = {key1: {key2: 42}}
     *    Objects.get(null, ['key1', 'key2'])                   // undefined
     *    Objects.get(null, ['key1', 'key2'], 100)              // 100
     *    Objects.get(obj, ['key1', 'key2'], 100)               // 42
     */
    static getIn(obj, keyPath, defaultValue = undefined) {
        var ret = obj,
            isRealKeyPath = false;

        Seq.from(keyPath).forEach(key => {
            ret = Objects.get(ret, key);
            isRealKeyPath = true;
        });

        if (!isRealKeyPath || ret === undefined) {
            ret = defaultValue;
        }

        return ret;
    }

    /**
     * Converts an object to its plain old JavaScript representation.
     * The purpose of this method is to convert Immutable and ClojureScript
     * collections to their plain JavaScript pendant.
     * If already a plain JavaScript object then it will be returned as is.
     *
     * @param {any} obj
     *    The object to be converted
     *
     * @return {any}
     *    The plain old JavaScript object
     *
     * @example
     *    Objects.toJS(undefined)              // undefined
     *    Objects.toJS(null)                   // null
     *    Objects.toJS(42)                     // 42
     *    Objects.toJS('text')                 // 'text'
     *    Objects.toJS([1, 2, 3])              // [1, 2, 3]
     *    Objects.toJS({x: 42})                // {x: 42}
     *    Object.toJS(Immutable.Map({x: 42}))  // {x: 42}
     */
    // TODO: Handling of ClojureScript objects not really nice (still working)
    static toJS(obj) {
        var ret = obj;

        if (obj) {
            if (typeof obj.__toJS === 'function') {
                ret = obj.__toJS();
            } else if (obj.meta && typeof cljs === 'object' && cljs) {
                ret = cljs.core.clj__GT_js(obj);
            }
        }

        return ret;
    }
}

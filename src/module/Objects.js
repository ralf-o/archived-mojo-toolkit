'use strict';

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

    static isSomething(obj) {
        return obj !== null && obj !== undefined;
    }

    static isNothing(obj) {
        return obj === null || obj === undefined;
    }

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

    // TODO: Handling of ClojureScript objects not really nice (still working)
    static get(obj, path, defaultValue = undefined) {
        var ret = undefined;

        if (obj !== null && obj !== undefined) {

            if (path instanceof Array) {
                ret = obj;

                for (let token of path) {
                    ret = Objects.get(ret, token);

                    if (ret === undefined) {
                        break;
                    }
                }
            } else {
                let pathType = typeof path;

                if (path === null || path === undefined) {
                    path = '';
                } else if (pathType !== 'number' && pathType !== 'string') {
                    path = path.toString();
                }

                if (obj._root !== undefined && typeof obj.get === 'function') {
                    ret = obj.get(path)
                } else if (obj.meta !== undefined && typeof cljs === 'object' && cljs && (cljs.core.map_QMARK_(obj) || cljs.core.coll_QMARK_(obj))) {
                    if (typeof path === 'string') {
                        ret = cljs.core.get(obj, cljs.core.keyword(path), undefined);
                    }

                    if (ret === undefined) {
                        ret = cljs.core.get(obj, path, undefined);
                    }
                } else {
                    ret = obj[path];
                }
                }
        }

        if (ret === undefined) {
            ret = defaultValue;
        }

        return ret;
    }

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

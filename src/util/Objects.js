'use strict';

export default class Objects {
    static get(obj, path) {
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

        return ret;
    }

    static toJS(obj) {
        var ret = obj;

        if (obj !== null && obj !== undefined) {
            if (obj.__toJS) {
                ret = obj.__toJS();
            } else if (obj.meta && typeof cljs === 'object') {
                ret = cljs.core.clj__GT_js(obj);
            }
        }

        return ret;
    }
}
'use strict';

import Objects from './Objects';

export default class Strings {
    static trim(text) {
        return Objects.asString(text).trim();
    }

    static trimToNull(text) {
        let ret = Strings.trim(text);

        if (ret.length === 0) {
            ret = null;
        }

        return ret;
    }
}
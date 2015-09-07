'use strict';

export default class Arrays {
    static selectValue(arr, value, defaultValue) {
        return arr instanceof Array && arr.indexOf(value) >= 0
                ? value
                : defaultValue;
    }
}
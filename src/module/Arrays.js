'use strict';

/**
 * Utility class with static helper functions to be used with arrays.
 */
export default class Arrays {
    /**
     * @param  {array} arr
     *     The array that may contain the value
     *
     * @param  {any} value
     *     The value to be selected
     *
     * @param  {any} [defaultValue=undefined]
     *     The default value to be returned
     *     in case that the array does not
     *     contain the value in question
     *
     * @return {any}
     *     In case the array contains the value in question
     *     then that value will be returned, otherwise the
     *     default value.
     *     In case that the first argument is not an array
     *     then the default value will be returned.
     */
    static selectValue(arr, value, defaultValue = undefined) {
        return arr instanceof Array && arr.indexOf(value) >= 0
                ? value
                : defaultValue;
    }
}
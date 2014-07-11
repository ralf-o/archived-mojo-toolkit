/*global mojo */

(function () {
    'use strict';

    var base = mojo.base;

    base.Exception = function (message, cause) {
        this._message = message === undefined || message === null
                ? null
                : message.toString();

        this._cause = cause === undefined ? null : cause;
    };

    base.Exception.prototype.getMessage = function () {
        return this._message;
    };

    base.Exception.prototype.getCause = function () {
        return this._cause;
    };
}());

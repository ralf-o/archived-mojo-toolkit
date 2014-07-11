/*global mojo */

(function () {
    'use strict';

    var base = mojo.base;

    base.IllegalArgumentException = function (msg, cause) {
        base.Exception.call(this, msg, cause);
    };

    base.IllegalArgumentException.prototype = new base.Exception();
}());

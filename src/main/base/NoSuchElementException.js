/* global mojo */

(function () {
    'use strict';

    var base = mojo.base;

    base.NoSuchElementException = function () {
    };

    base.NoSuchElementException.prototype = new base.Exception();
}());

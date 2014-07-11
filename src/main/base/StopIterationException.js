/* global mojo */

(function () {
    'use strict';

    var base = mojo.base;

    base.StopIterationException = function () {
    };

    base.StopIterationException.prototype = new base.Exception();
}());

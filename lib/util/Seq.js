"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Seq = (function () {
    function Seq(generator) {
        _classCallCheck(this, Seq);

        this[Symbol.iterator] = generator;
    }

    _createClass(Seq, [{
        key: "map",
        value: function map(f) {
            return new Seq(regeneratorRuntime.mark(function callee$2$0() {
                var counter, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, x;

                return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                        case 0:
                            counter = 0;
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            context$3$0.prev = 4;
                            _iterator = this[Symbol.iterator]();

                        case 6:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                context$3$0.next = 13;
                                break;
                            }

                            x = _step.value;
                            context$3$0.next = 10;
                            return f(x, counter++);

                        case 10:
                            _iteratorNormalCompletion = true;
                            context$3$0.next = 6;
                            break;

                        case 13:
                            context$3$0.next = 19;
                            break;

                        case 15:
                            context$3$0.prev = 15;
                            context$3$0.t0 = context$3$0["catch"](4);
                            _didIteratorError = true;
                            _iteratorError = context$3$0.t0;

                        case 19:
                            context$3$0.prev = 19;
                            context$3$0.prev = 20;

                            if (!_iteratorNormalCompletion && _iterator["return"]) {
                                _iterator["return"]();
                            }

                        case 22:
                            context$3$0.prev = 22;

                            if (!_didIteratorError) {
                                context$3$0.next = 25;
                                break;
                            }

                            throw _iteratorError;

                        case 25:
                            return context$3$0.finish(22);

                        case 26:
                            return context$3$0.finish(19);

                        case 27:
                        case "end":
                            return context$3$0.stop();
                    }
                }, callee$2$0, this, [[4, 15, 19, 27], [20,, 22, 26]]);
            }).bind(this));
        }
    }, {
        key: "filter",
        value: (function (_filter) {
            function filter(_x) {
                return _filter.apply(this, arguments);
            }

            filter.toString = function () {
                return _filter.toString();
            };

            return filter;
        })(function (pred) {
            return new Seq(regeneratorRuntime.mark(function callee$2$0() {
                var counter, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, x;

                return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                        case 0:
                            counter = 0;
                            _iteratorNormalCompletion2 = true;
                            _didIteratorError2 = false;
                            _iteratorError2 = undefined;
                            context$3$0.prev = 4;
                            _iterator2 = me[Symbol.iterator]();

                        case 6:
                            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                                context$3$0.next = 14;
                                break;
                            }

                            x = _step2.value;

                            if (!filter(pred, idx)) {
                                context$3$0.next = 11;
                                break;
                            }

                            context$3$0.next = 11;
                            return f(x, counter++);

                        case 11:
                            _iteratorNormalCompletion2 = true;
                            context$3$0.next = 6;
                            break;

                        case 14:
                            context$3$0.next = 20;
                            break;

                        case 16:
                            context$3$0.prev = 16;
                            context$3$0.t1 = context$3$0["catch"](4);
                            _didIteratorError2 = true;
                            _iteratorError2 = context$3$0.t1;

                        case 20:
                            context$3$0.prev = 20;
                            context$3$0.prev = 21;

                            if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                                _iterator2["return"]();
                            }

                        case 23:
                            context$3$0.prev = 23;

                            if (!_didIteratorError2) {
                                context$3$0.next = 26;
                                break;
                            }

                            throw _iteratorError2;

                        case 26:
                            return context$3$0.finish(23);

                        case 27:
                            return context$3$0.finish(20);

                        case 28:
                        case "end":
                            return context$3$0.stop();
                    }
                }, callee$2$0, this, [[4, 16, 20, 28], [21,, 23, 27]]);
            }).bind(this));
        })
    }, {
        key: "takeWhile",
        value: function takeWhile(pred) {
            return new Seq(regeneratorRuntime.mark(function callee$2$0() {
                var index, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, x;

                return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                        case 0:
                            index = 0;
                            _iteratorNormalCompletion3 = true;
                            _didIteratorError3 = false;
                            _iteratorError3 = undefined;
                            context$3$0.prev = 4;
                            _iterator3 = this[Symbol.iterator]();

                        case 6:
                            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                                context$3$0.next = 17;
                                break;
                            }

                            x = _step3.value;

                            if (!pred(x, index++)) {
                                context$3$0.next = 13;
                                break;
                            }

                            context$3$0.next = 11;
                            return x;

                        case 11:
                            context$3$0.next = 14;
                            break;

                        case 13:
                            return context$3$0.abrupt("break", 17);

                        case 14:
                            _iteratorNormalCompletion3 = true;
                            context$3$0.next = 6;
                            break;

                        case 17:
                            context$3$0.next = 23;
                            break;

                        case 19:
                            context$3$0.prev = 19;
                            context$3$0.t2 = context$3$0["catch"](4);
                            _didIteratorError3 = true;
                            _iteratorError3 = context$3$0.t2;

                        case 23:
                            context$3$0.prev = 23;
                            context$3$0.prev = 24;

                            if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
                                _iterator3["return"]();
                            }

                        case 26:
                            context$3$0.prev = 26;

                            if (!_didIteratorError3) {
                                context$3$0.next = 29;
                                break;
                            }

                            throw _iteratorError3;

                        case 29:
                            return context$3$0.finish(26);

                        case 30:
                            return context$3$0.finish(23);

                        case 31:
                        case "end":
                            return context$3$0.stop();
                    }
                }, callee$2$0, this, [[4, 19, 23, 31], [24,, 26, 30]]);
            }).bind(this));
        }
    }, {
        key: "take",
        value: function take(n) {
            return this.takeWhile(function (x, index) {
                return index < n;
            });
        }
    }, {
        key: "count",
        value: function count() {
            var ret = 0;

            this.forEach(function (_) {
                return ++ret;
            });

            return ret;
        }
    }, {
        key: "forEach",
        value: function forEach(action) {
            var idx = 0;

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var item = _step4.value;

                    action(item, idx++);
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4["return"]) {
                        _iterator4["return"]();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }
        }
    }, {
        key: "toArray",
        value: function toArray() {
            var ret = [];

            this.forEach(function (x) {
                return ret.push(x);
            });

            return ret;
        }
    }], [{
        key: "of",
        value: function of() {
            for (var _len = arguments.length, items = Array(_len), _key = 0; _key < _len; _key++) {
                items[_key] = arguments[_key];
            }

            var length = items == null ? 0 : items.length;

            return new Seq(regeneratorRuntime.mark(function callee$2$0() {
                var _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, x;

                return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                        case 0:
                            _iteratorNormalCompletion5 = true;
                            _didIteratorError5 = false;
                            _iteratorError5 = undefined;
                            context$3$0.prev = 3;
                            _iterator5 = items[Symbol.iterator]();

                        case 5:
                            if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
                                context$3$0.next = 12;
                                break;
                            }

                            x = _step5.value;
                            context$3$0.next = 9;
                            return x;

                        case 9:
                            _iteratorNormalCompletion5 = true;
                            context$3$0.next = 5;
                            break;

                        case 12:
                            context$3$0.next = 18;
                            break;

                        case 14:
                            context$3$0.prev = 14;
                            context$3$0.t3 = context$3$0["catch"](3);
                            _didIteratorError5 = true;
                            _iteratorError5 = context$3$0.t3;

                        case 18:
                            context$3$0.prev = 18;
                            context$3$0.prev = 19;

                            if (!_iteratorNormalCompletion5 && _iterator5["return"]) {
                                _iterator5["return"]();
                            }

                        case 21:
                            context$3$0.prev = 21;

                            if (!_didIteratorError5) {
                                context$3$0.next = 24;
                                break;
                            }

                            throw _iteratorError5;

                        case 24:
                            return context$3$0.finish(21);

                        case 25:
                            return context$3$0.finish(18);

                        case 26:
                            ;

                        case 27:
                        case "end":
                            return context$3$0.stop();
                    }
                }, callee$2$0, this, [[3, 14, 18, 26], [19,, 21, 25]]);
            }));
        }
    }, {
        key: "range",
        value: function range(start, end) {
            return new Seq(regeneratorRuntime.mark(function callee$2$0() {
                var n;
                return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                        case 0:
                            n = start;

                        case 1:
                            if (!(n < end)) {
                                context$3$0.next = 7;
                                break;
                            }

                            context$3$0.next = 4;
                            return n;

                        case 4:
                            ++n;
                            context$3$0.next = 1;
                            break;

                        case 7:
                        case "end":
                            return context$3$0.stop();
                    }
                }, callee$2$0, this);
            }));
        }
    }]);

    return Seq;
})();

exports["default"] = Seq;
;
module.exports = exports["default"];
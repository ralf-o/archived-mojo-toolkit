(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global, factory) {if (typeof define === "function" && define.amd) {define(["exports", "module", "./reactive/Behavior.js", "babel-runtime/helpers/interop-require", "./reactive/Processor.js", "./reactive/Publisher.js", "./reactive/Subscriber.js", "./reactive/Subscription.js", "./util/Stream.js"], factory);} else if (typeof exports !== "undefined" && typeof module !== "undefined") {factory(exports, module, require("./reactive/Behavior.js"), require("babel-runtime/helpers/interop-require"), require("./reactive/Processor.js"), require("./reactive/Publisher.js"), require("./reactive/Subscriber.js"), require("./reactive/Subscription.js"), require("./util/Stream.js"));} else {var mod = { exports: {} };factory(mod.exports, mod, global.Behavior, global._interopRequire, global.
        Processor, global.
        Publisher, global.
        Subscriber, global.
        Subscription, global.
        Stream);global.mojo = mod.exports;}})(this, function (exports, module, _reactiveBehaviorJs, _babelRuntimeHelpersInteropRequire, _reactiveProcessorJs, _reactivePublisherJs, _reactiveSubscriberJs, _reactiveSubscriptionJs, _utilStreamJs) {"use strict";var _Behavior = _babelRuntimeHelpersInteropRequire["default"](_reactiveBehaviorJs);var _Processor = _babelRuntimeHelpersInteropRequire["default"](_reactiveProcessorJs);var _Publisher = _babelRuntimeHelpersInteropRequire["default"](_reactivePublisherJs);var _Subscriber = _babelRuntimeHelpersInteropRequire["default"](_reactiveSubscriberJs);var _Subscription = _babelRuntimeHelpersInteropRequire["default"](_reactiveSubscriptionJs);var _Stream = _babelRuntimeHelpersInteropRequire["default"](_utilStreamJs);

    window.mojo = { 
        util: { 
            Stream: _Stream }, 

        reactive: { 
            Beahvior: _Behavior, 
            Processor: _Processor, 
            Publisher: _Publisher, Publisher: _Publisher, 
            Subscriber: _Subscriber, 
            Subscription: _Subscription } };module.exports = 



    window.mojo;});
},{"./reactive/Behavior.js":2,"./reactive/Processor.js":3,"./reactive/Publisher.js":4,"./reactive/Subscriber.js":5,"./reactive/Subscription.js":6,"./util/Stream.js":7,"babel-runtime/helpers/interop-require":21}],2:[function(require,module,exports){
(function (global, factory) {if (typeof define === "function" && define.amd) {define(["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/get", "babel-runtime/helpers/class-call-check", "./Publisher.js", "babel-runtime/helpers/interop-require"], factory);} else if (typeof exports !== "undefined" && typeof module !== "undefined") {factory(exports, module, require("babel-runtime/helpers/inherits"), require("babel-runtime/helpers/get"), require("babel-runtime/helpers/class-call-check"), require("./Publisher.js"), require("babel-runtime/helpers/interop-require"));} else {var mod = { exports: {} };factory(mod.exports, mod, global._inherits, global._get, global._classCallCheck, global.Publisher, global._interopRequire);global.Behavior = mod.exports;}})(this, function (exports, module, _babelRuntimeHelpersInherits, _babelRuntimeHelpersGet, _babelRuntimeHelpersClassCallCheck, _PublisherJs, _babelRuntimeHelpersInteropRequire) {"use strict";var _Publisher2 = _babelRuntimeHelpersInteropRequire["default"](_PublisherJs);var 

    Behavior = (function (_Publisher) {
        function Behavior(initialValueSupplier, onSubscribe) {_babelRuntimeHelpersClassCallCheck["default"](this, Behavior);
            _babelRuntimeHelpersGet["default"](Object.getPrototypeOf(Behavior.prototype), "constructor", this).call(this, function (subscriber) {
                subscriber.onNext(initialValueSupplier());
                return onSubscribe(subscriber);});}_babelRuntimeHelpersInherits["default"](Behavior, _Publisher);return Behavior;})(_Publisher2);module.exports = Behavior;});
},{"./Publisher.js":4,"babel-runtime/helpers/class-call-check":17,"babel-runtime/helpers/get":19,"babel-runtime/helpers/inherits":20,"babel-runtime/helpers/interop-require":21}],3:[function(require,module,exports){
(function (global, factory) {if (typeof define === "function" && define.amd) {define(["exports", "module", "babel-runtime/helpers/inherits", "babel-runtime/helpers/get", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "babel-runtime/core-js/map", "babel-runtime/core-js/get-iterator", "./Publisher.js", "babel-runtime/helpers/interop-require"], factory);} else if (typeof exports !== "undefined" && typeof module !== "undefined") {factory(exports, module, require("babel-runtime/helpers/inherits"), require("babel-runtime/helpers/get"), require("babel-runtime/helpers/create-class"), require("babel-runtime/helpers/class-call-check"), require("babel-runtime/core-js/map"), require("babel-runtime/core-js/get-iterator"), require("./Publisher.js"), require("babel-runtime/helpers/interop-require"));} else {var mod = { exports: {} };factory(mod.exports, mod, global._inherits, global._get, global._createClass, global._classCallCheck, global._Map, global._getIterator, global.Publisher, global._interopRequire);global.Processor = mod.exports;}})(this, function (exports, module, _babelRuntimeHelpersInherits, _babelRuntimeHelpersGet, _babelRuntimeHelpersCreateClass, _babelRuntimeHelpersClassCallCheck, _babelRuntimeCoreJsMap, _babelRuntimeCoreJsGetIterator, _PublisherJs, _babelRuntimeHelpersInteropRequire) {"use strict";var _Publisher2 = _babelRuntimeHelpersInteropRequire["default"](_PublisherJs);var 

    Processor = (function (_Publisher) {
        function Processor(onSubscribe) {var _this = this;_babelRuntimeHelpersClassCallCheck["default"](this, Processor);
            _babelRuntimeHelpersGet["default"](Object.getPrototypeOf(Processor.prototype), "constructor", this).call(this, function (subscriber) {
                if (_this._subscriptionMap.has(subscriber)) {
                    throw "A subscriber must not subscribe mutliple times";}


                var subscription = onSubscribe(subscriber);

                _this.subscriptionMap.set(subscriber, new Subscription(
                function () {subscription.close();_this.subscriptionMap.remove(subscriber);}, 
                function (n) {return subscription.request(n);}));});



            this._subscriptionMap = new _babelRuntimeCoreJsMap["default"]();}_babelRuntimeHelpersInherits["default"](Processor, _Publisher);_babelRuntimeHelpersCreateClass["default"](Processor, [{ key: "onNext", value: 


            function onNext(value) {var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {
                    for (var _iterator = _babelRuntimeCoreJsGetIterator["default"](this._subscriptionMap.keys()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var subscriber = _step.value;
                        subscriber.onNext(value);}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator["return"]) {_iterator["return"]();}} finally {if (_didIteratorError) {throw _iteratorError;}}}} }, { key: "onComplete", value: 



            function onComplete() {var _iteratorNormalCompletion2 = true;var _didIteratorError2 = false;var _iteratorError2 = undefined;try {
                    for (var _iterator2 = _babelRuntimeCoreJsGetIterator["default"](this._subscriptionMap.keys()), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {var subscriber = _step2.value;
                        subscriber.onComplete();}} catch (err) {_didIteratorError2 = true;_iteratorError2 = err;} finally {try {if (!_iteratorNormalCompletion2 && _iterator2["return"]) {_iterator2["return"]();}} finally {if (_didIteratorError2) {throw _iteratorError2;}}}} }, { key: "onError", value: 



            function onError(error) {var _iteratorNormalCompletion3 = true;var _didIteratorError3 = false;var _iteratorError3 = undefined;try {
                    for (var _iterator3 = _babelRuntimeCoreJsGetIterator["default"](this._subscriptionMap.keys()), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {var subscriber = _step3.value;
                        subscriber.onError(error);}} catch (err) {_didIteratorError3 = true;_iteratorError3 = err;} finally {try {if (!_iteratorNormalCompletion3 && _iterator3["return"]) {_iterator3["return"]();}} finally {if (_didIteratorError3) {throw _iteratorError3;}}}} }, { key: "toPublisher", value: 



            function toPublisher() {var _this2 = this;
                return new _Publisher2(function (subscriber) {return _this2.subscribe(subscriber);});} }]);return Processor;})(_Publisher2);module.exports = Processor;});
},{"./Publisher.js":4,"babel-runtime/core-js/get-iterator":9,"babel-runtime/core-js/map":10,"babel-runtime/helpers/class-call-check":17,"babel-runtime/helpers/create-class":18,"babel-runtime/helpers/get":19,"babel-runtime/helpers/inherits":20,"babel-runtime/helpers/interop-require":21}],4:[function(require,module,exports){
(function (global, factory) {if (typeof define === "function" && define.amd) {define(["exports", "module", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check", "babel-runtime/helpers/to-consumable-array", "babel-runtime/core-js/promise", "./Subscriber", "babel-runtime/helpers/interop-require", "./Subscription"], factory);} else if (typeof exports !== "undefined" && typeof module !== "undefined") {factory(exports, module, require("babel-runtime/helpers/create-class"), require("babel-runtime/helpers/class-call-check"), require("babel-runtime/helpers/to-consumable-array"), require("babel-runtime/core-js/promise"), require("./Subscriber"), require("babel-runtime/helpers/interop-require"), require("./Subscription"));} else {var mod = { exports: {} };factory(mod.exports, mod, global._createClass, global._classCallCheck, global._toConsumableArray, global._Promise, global.Subscriber, global._interopRequire, global.
        Subscription);global.Publisher = mod.exports;}})(this, function (exports, module, _babelRuntimeHelpersCreateClass, _babelRuntimeHelpersClassCallCheck, _babelRuntimeHelpersToConsumableArray, _babelRuntimeCoreJsPromise, _Subscriber, _babelRuntimeHelpersInteropRequire, _Subscription) {"use strict";var _Subscriber2 = _babelRuntimeHelpersInteropRequire["default"](_Subscriber);var _Subscription2 = _babelRuntimeHelpersInteropRequire["default"](_Subscription);

    /**
     * Class representing a reactive event stream.
     *
     * @class  Publisher
     * @module reactive
     */var 
    Publisher = (function () {
        /**
         * @constructor
         * @this {Publisher}
         */
        function Publisher(onSubscribe) {_babelRuntimeHelpersClassCallCheck["default"](this, Publisher);
            this._onSubscribe = onSubscribe;}_babelRuntimeHelpersCreateClass["default"](Publisher, [{ key: "subscribe", value: 


            function subscribe(subscriber) {
                var realSubscriber = _Subscriber2.from(subscriber), 
                subscription = this._onSubscribe(realSubscriber);

                realSubscriber.onSubscribe(subscription);
                return subscription;} }, { key: "map", value: 


            function map(f) {var _this = this;
                return new Publisher(function (subscriber) {
                    var index = 0;

                    return _this._onSubscribe({ 
                        onNext: function onNext(value) {return subscriber.onNext(f(value, index++));}, 
                        onComplete: function onComplete() {return subscriber.onComplete();}, 
                        onError: function onError(error) {return subscriber.onError(error);} });});} }, { key: "filter", value: 




            function filter(pred) {var _this2 = this;
                return new Publisher(function (subscriber) {
                    var index = 0;

                    return _this2._onSubscribe({ 
                        onNext: function onNext(value) {
                            var idx = index++;

                            if (pred(value, idx)) {
                                subscriber.onNext(value);}}, 


                        onComplete: function onComplete() {return subscriber.onComplete();}, 
                        onError: function onError(error) {return subscriber.onError(error);}, 
                        onSubscribe: function onSubscribe(subscription) {return subscriber.onSubscribe(subscription);} });});} }, { key: "reject", value: 




            function reject(pred) {
                return this.filter(function (x, index) {return !pred(x, index);});} }, { key: "takeWhile", value: 


            function takeWhile(pred) {var _this3 = this;
                return new Publisher(function (subscriber) {
                    var ret;
                    var index = 0;

                    ret = _this3._onSubscribe({ 
                        onNext: function onNext(value) {
                            if (!pred(value, index++)) {
                                subscriber.onComplete();
                                ret.close();} else 
                            {
                                subscriber.onNext(value);}}, 


                        onComplete: function onComplete() {return subscriber.onComplete();}, 
                        onError: function onError(error) {return subscriber.onError(error);}, 
                        onSubscribe: function onSubscribe(subscription) {return subscriber.onSubscribe(subscription);} });


                    return ret;});} }, { key: "take", value: 



            function take(n) {
                return this.takeWhile(function (value, index) {return index < n;});} }, { key: "forEach", value: 


            function forEach(subscriber) {
                this.subscribe(subscriber).
                request(Infinity);} }, { key: "toArray", value: 


            function toArray() {var _this4 = this;
                return new _babelRuntimeCoreJsPromise["default"](function (resolve, reject) {
                    var arr = [];

                    _this4.forEach({ 
                        onNext: function onNext(value) {arr.push(value);}, 
                        onComplete: function onComplete() {return resolve(arr);}, 
                        onError: function onError(error) {arr.length = 0;reject(error);} });});} }], [{ key: "of", value: 




            function of() {for (var _len = arguments.length, items = Array(_len), _key = 0; _key < _len; _key++) {items[_key] = arguments[_key];}
                var values = items.slice();
                return this.range(0, values.length).map(function (n) {return values[n];});} }, { key: "from", value: 


            function from(items) {
                var ret;

                if (items instanceof Array) {
                    ret = Publisher.of.apply(Publisher, _babelRuntimeHelpersToConsumableArray["default"](items));} else 
                {
                    throw new TypeError();}


                return ret;} }, { key: "iterate", value: 


            function iterate(startValues, f) {
                return new Publisher(function (subscriber) {
                    var isCompleted = false, 
                    values = startValues.slice();

                    var subscription = new _Subscription2(
                    function () {
                        isCompleted = true;
                        subscriber.onComplete();
                        subscription.close();}, 

                    function (n) {
                        if (!isCompleted) {(function () {
                                var callback = function callback() {
                                    if (!isCompleted) {
                                        values.push(f.apply(undefined, _babelRuntimeHelpersToConsumableArray["default"](values)));
                                        subscriber.onNext(values.shift());

                                        setTimeout(callback);}};



                                callback();})();}});




                    return subscription;});} }, { key: "range", value: 



            function range(start, end) {
                return this.iterate([start], function (n) {return n + 1;}).takeWhile(function (n) {return n < end;});} }]);return Publisher;})();module.exports = Publisher;});
},{"./Subscriber":5,"./Subscription":6,"babel-runtime/core-js/promise":14,"babel-runtime/helpers/class-call-check":17,"babel-runtime/helpers/create-class":18,"babel-runtime/helpers/interop-require":21,"babel-runtime/helpers/to-consumable-array":22}],5:[function(require,module,exports){
(function (global, factory) {if (typeof define === 'function' && define.amd) {define(['exports', 'module', 'babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', './Subscription', 'babel-runtime/helpers/interop-require'], factory);} else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {factory(exports, module, require('babel-runtime/helpers/create-class'), require('babel-runtime/helpers/class-call-check'), require('./Subscription'), require('babel-runtime/helpers/interop-require'));} else {var mod = { exports: {} };factory(mod.exports, mod, global._createClass, global._classCallCheck, global.Subscription, global._interopRequire);global.Subscriber = mod.exports;}})(this, function (exports, module, _babelRuntimeHelpersCreateClass, _babelRuntimeHelpersClassCallCheck, _Subscription, _babelRuntimeHelpersInteropRequire) {'use strict';var _Subscription2 = _babelRuntimeHelpersInteropRequire['default'](_Subscription);

    /**
     * Class representing a listener for events send by a Publisher.
     *
     * @class  Subscriber
     * @module reactive
     */var 
    Subscriber = (function () {
        function Subscriber(onNext, onComplete, onError, onSubscribe) {_babelRuntimeHelpersClassCallCheck['default'](this, Subscriber);
            this._onNext = typeof onNext === 'function' ? 
            onNext : 
            function () {};

            this._onComplete = typeof onComplete === 'function' ? 
            onComplete : 
            function () {};

            this._onError = typeof onError === 'function' ? 
            onError : 
            function (error) {throw error;};

            this._onSubscribe = typeof onSubscribe === 'function' ? 
            onSubscribe : 
            function () {};}_babelRuntimeHelpersCreateClass['default'](Subscriber, [{ key: 'onNext', value: 


            function onNext(value) {
                this._onNext(value);} }, { key: 'onComplete', value: 


            function onComplete() {
                this._onComplete();} }, { key: 'onError', value: 


            function onError(error) {
                this._onError(error);} }, { key: 'onSubscribe', value: 


            function onSubscribe(subscription) {
                this._onSubscribe(subscription);} }], [{ key: 'from', value: 


            function from(subscriber) {
                var ret;

                if (typeof subscriber === 'function') {
                    ret = new Subscriber(subscriber, null, null);} else 
                if (subscriber != null && typeof subscriber === 'object') {
                    ret = new Subscriber(subscriber.onNext, subscriber.onComplete, subscriber.onError);} else 
                {
                    throw TypeError('[Subscriber.from] Not a valid subscriber');}


                return ret;} }]);return Subscriber;})();module.exports = Subscriber;});
},{"./Subscription":6,"babel-runtime/helpers/class-call-check":17,"babel-runtime/helpers/create-class":18,"babel-runtime/helpers/interop-require":21}],6:[function(require,module,exports){
(function (global, factory) {if (typeof define === "function" && define.amd) {define(["exports", "module", "babel-runtime/helpers/create-class", "babel-runtime/helpers/class-call-check"], factory);} else if (typeof exports !== "undefined" && typeof module !== "undefined") {factory(exports, module, require("babel-runtime/helpers/create-class"), require("babel-runtime/helpers/class-call-check"));} else {var mod = { exports: {} };factory(mod.exports, mod, global._createClass, global._classCallCheck);global.Subscription = mod.exports;}})(this, function (exports, module, _babelRuntimeHelpersCreateClass, _babelRuntimeHelpersClassCallCheck) {"use strict";var Subscription = (function () {
        function Subscription(onClose, onRequest) {_babelRuntimeHelpersClassCallCheck["default"](this, Subscription);
            this._onClose = onClose;
            this._onRequest = onRequest;}_babelRuntimeHelpersCreateClass["default"](Subscription, [{ key: "close", value: 


            function close() {
                this._onClose;} }, { key: "request", value: 


            function request(n) {
                this._onRequest(n);} }]);return Subscription;})();module.exports = Subscription;});
},{"babel-runtime/helpers/class-call-check":17,"babel-runtime/helpers/create-class":18}],7:[function(require,module,exports){
(function (global, factory) {if (typeof define === 'function' && define.amd) {define(['exports', 'module', 'babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', 'babel-runtime/helpers/to-consumable-array', 'babel-runtime/core-js/symbol/iterator', 'babel-runtime/core-js/get-iterator', 'babel-runtime/regenerator'], factory);} else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {factory(exports, module, require('babel-runtime/helpers/create-class'), require('babel-runtime/helpers/class-call-check'), require('babel-runtime/helpers/to-consumable-array'), require('babel-runtime/core-js/symbol/iterator'), require('babel-runtime/core-js/get-iterator'), require('babel-runtime/regenerator'));} else {var mod = { exports: {} };factory(mod.exports, mod, global._createClass, global._classCallCheck, global._toConsumableArray, global._Symbol$iterator, global._getIterator, global._regeneratorRuntime);global.Stream = mod.exports;}})(this, function (exports, module, _babelRuntimeHelpersCreateClass, _babelRuntimeHelpersClassCallCheck, _babelRuntimeHelpersToConsumableArray, _babelRuntimeCoreJsSymbolIterator, _babelRuntimeCoreJsGetIterator, _babelRuntimeRegenerator) {'use strict';

    /**
     * Class as representation of a lazy sequences
     *
     * @class  Stream
     * @module util
     */var 
    Stream = (function () {
        /**
         * @constructor
         * @class Stream
         * @param {function} generator The generator responsible for the iteration
         */
        function Stream(generator) {_babelRuntimeHelpersClassCallCheck['default'](this, Stream);
            this._generator = generator;}_babelRuntimeHelpersCreateClass['default'](Stream, [{ key: _babelRuntimeCoreJsSymbolIterator['default'], value: 


            function () {
                var iter = this._generator();
                var ret;

                if (iter && typeof iter.next === 'function') {
                    ret = iter;} else 
                if (iter && typeof iter.generate === 'function' && typeof iter.close === 'function') {(function () {var 
                        generate = iter.generate;var close = iter.close;

                        ret = _babelRuntimeRegenerator['default'].mark(function callee$3$0() {var 

                            values;return _babelRuntimeRegenerator['default'].wrap(function callee$3$0$(context$4$0) {while (1) switch (context$4$0.prev = context$4$0.next) {case 0:context$4$0.prev = 0;values = generate();case 2:if (!(

                                        values instanceof Array && values.length > 0)) {context$4$0.next = 7;break;}return context$4$0.delegateYield(
                                        values, 't0', 4);case 4:
                                        values = generate();context$4$0.next = 2;break;case 7:context$4$0.prev = 7;


                                        close();return context$4$0.finish(7);case 10:case 'end':return context$4$0.stop();}}, callee$3$0, this, [[0,, 7, 10]]);})();})();} else 


                if (typeof iter === 'function') {
                    return _babelRuntimeRegenerator['default'].mark(function callee$2$0() {var 
                        values;return _babelRuntimeRegenerator['default'].wrap(function callee$2$0$(context$3$0) {while (1) switch (context$3$0.prev = context$3$0.next) {case 0:values = iter();case 1:if (!(

                                    values instanceof Array && values.length > 0)) {context$3$0.next = 6;break;}return context$3$0.delegateYield(
                                    values, 't1', 3);case 3:
                                    values = iter();context$3$0.next = 1;break;case 6:case 'end':return context$3$0.stop();}}, callee$2$0, this);})();} else 


                {
                    throw new TypeError();}


                return ret;} }, { key: 'map', 


            /**
             * Maps each value of the stream
             *
             * @method map
             * @param {function} f Mapping function
             * @return {Stream} Stream of the mapped values
             */value: 
            function map(f) {
                return new Stream(_babelRuntimeRegenerator['default'].mark(function callee$2$0() {var 
                    index, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, 

                    x;return _babelRuntimeRegenerator['default'].wrap(function callee$2$0$(context$3$0) {while (1) switch (context$3$0.prev = context$3$0.next) {case 0:index = 0;_iteratorNormalCompletion = true;_didIteratorError = false;_iteratorError = undefined;context$3$0.prev = 4;_iterator = _babelRuntimeCoreJsGetIterator['default'](this);case 6:if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {context$3$0.next = 13;break;}x = _step.value;context$3$0.next = 10;return (
                                f(x, index++));case 10:_iteratorNormalCompletion = true;context$3$0.next = 6;break;case 13:context$3$0.next = 19;break;case 15:context$3$0.prev = 15;context$3$0.t2 = context$3$0['catch'](4);_didIteratorError = true;_iteratorError = context$3$0.t2;case 19:context$3$0.prev = 19;context$3$0.prev = 20;if (!_iteratorNormalCompletion && _iterator['return']) {_iterator['return']();}case 22:context$3$0.prev = 22;if (!_didIteratorError) {context$3$0.next = 25;break;}throw _iteratorError;case 25:return context$3$0.finish(22);case 26:return context$3$0.finish(19);case 27:case 'end':return context$3$0.stop();}}, callee$2$0, this, [[4, 15, 19, 27], [20,, 22, 26]]);}).

                bind(this));} }, { key: 'filter', value: 


            function filter(pred) {
                return new Stream(_babelRuntimeRegenerator['default'].mark(function callee$2$0() {var 
                    index, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, 

                    x;return _babelRuntimeRegenerator['default'].wrap(function callee$2$0$(context$3$0) {while (1) switch (context$3$0.prev = context$3$0.next) {case 0:index = 0;_iteratorNormalCompletion2 = true;_didIteratorError2 = false;_iteratorError2 = undefined;context$3$0.prev = 4;_iterator2 = _babelRuntimeCoreJsGetIterator['default'](this);case 6:if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {context$3$0.next = 14;break;}x = _step2.value;if (!
                                pred(x, index++)) {context$3$0.next = 11;break;}context$3$0.next = 11;return (
                                x);case 11:_iteratorNormalCompletion2 = true;context$3$0.next = 6;break;case 14:context$3$0.next = 20;break;case 16:context$3$0.prev = 16;context$3$0.t3 = context$3$0['catch'](4);_didIteratorError2 = true;_iteratorError2 = context$3$0.t3;case 20:context$3$0.prev = 20;context$3$0.prev = 21;if (!_iteratorNormalCompletion2 && _iterator2['return']) {_iterator2['return']();}case 23:context$3$0.prev = 23;if (!_didIteratorError2) {context$3$0.next = 26;break;}throw _iteratorError2;case 26:return context$3$0.finish(23);case 27:return context$3$0.finish(20);case 28:case 'end':return context$3$0.stop();}}, callee$2$0, this, [[4, 16, 20, 28], [21,, 23, 27]]);}).


                bind(this));} }, { key: 'takeWhile', value: 


            function takeWhile(pred) {
                return new Stream(_babelRuntimeRegenerator['default'].mark(function callee$2$0() {var 
                    index, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, 

                    x;return _babelRuntimeRegenerator['default'].wrap(function callee$2$0$(context$3$0) {while (1) switch (context$3$0.prev = context$3$0.next) {case 0:index = 0;_iteratorNormalCompletion3 = true;_didIteratorError3 = false;_iteratorError3 = undefined;context$3$0.prev = 4;_iterator3 = _babelRuntimeCoreJsGetIterator['default'](this);case 6:if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {context$3$0.next = 17;break;}x = _step3.value;if (!
                                pred(x, index++)) {context$3$0.next = 13;break;}context$3$0.next = 11;return (
                                x);case 11:context$3$0.next = 14;break;case 13:return context$3$0.abrupt('break', 17);case 14:_iteratorNormalCompletion3 = true;context$3$0.next = 6;break;case 17:context$3$0.next = 23;break;case 19:context$3$0.prev = 19;context$3$0.t4 = context$3$0['catch'](4);_didIteratorError3 = true;_iteratorError3 = context$3$0.t4;case 23:context$3$0.prev = 23;context$3$0.prev = 24;if (!_iteratorNormalCompletion3 && _iterator3['return']) {_iterator3['return']();}case 26:context$3$0.prev = 26;if (!_didIteratorError3) {context$3$0.next = 29;break;}throw _iteratorError3;case 29:return context$3$0.finish(26);case 30:return context$3$0.finish(23);case 31:case 'end':return context$3$0.stop();}}, callee$2$0, this, [[4, 19, 23, 31], [24,, 26, 30]]);}).




                bind(this));} }, { key: 'skipWhile', value: 


            function skipWhile(pred) {
                return new Stream(_babelRuntimeRegenerator['default'].mark(function callee$2$0() {var 
                    index, 
                    alreadyStarted, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, 

                    x;return _babelRuntimeRegenerator['default'].wrap(function callee$2$0$(context$3$0) {while (1) switch (context$3$0.prev = context$3$0.next) {case 0:index = 0, alreadyStarted = false;_iteratorNormalCompletion4 = true;_didIteratorError4 = false;_iteratorError4 = undefined;context$3$0.prev = 4;_iterator4 = _babelRuntimeCoreJsGetIterator['default'](this);case 6:if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {context$3$0.next = 15;break;}x = _step4.value;if (!(
                                alreadyStarted || pred(x, index++))) {context$3$0.next = 12;break;}context$3$0.next = 11;return (
                                x);case 11:
                                alreadyStarted = true;case 12:_iteratorNormalCompletion4 = true;context$3$0.next = 6;break;case 15:context$3$0.next = 21;break;case 17:context$3$0.prev = 17;context$3$0.t5 = context$3$0['catch'](4);_didIteratorError4 = true;_iteratorError4 = context$3$0.t5;case 21:context$3$0.prev = 21;context$3$0.prev = 22;if (!_iteratorNormalCompletion4 && _iterator4['return']) {_iterator4['return']();}case 24:context$3$0.prev = 24;if (!_didIteratorError4) {context$3$0.next = 27;break;}throw _iteratorError4;case 27:return context$3$0.finish(24);case 28:return context$3$0.finish(21);case 29:case 'end':return context$3$0.stop();}}, callee$2$0, this, [[4, 17, 21, 29], [22,, 24, 28]]);}).


                bind(this));} }, { key: 'take', value: 


            function take(n) {
                return this.takeWhile(function (x, index) {return index < n;});} }, { key: 'reduce', value: 


            function reduce(f, seed) {
                var dummy = {};
                var ret = dummy;

                this.forEach(function (value, index) {
                    if (index == 0) {
                        if (seed === undefined) {
                            ret = value;} else 
                        {
                            ret = f(seed, value, 0);}} else 

                    {
                        ret = f(ret, value);}});



                if (ret === dummy) {
                    if (seed !== undefined) {
                        ret = seed;} else 
                    {
                        new TypeError();}}



                return ret;} }, { key: 'count', value: 


            function count() {
                return this.reduce(function (count, value) {return count + 1;}, 0);} }, { key: 'forEach', value: 


            function forEach(action) {
                var idx = 0;var _iteratorNormalCompletion5 = true;var _didIteratorError5 = false;var _iteratorError5 = undefined;try {

                    for (var _iterator5 = _babelRuntimeCoreJsGetIterator['default'](this), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {var item = _step5.value;
                        action(item, idx++);}} catch (err) {_didIteratorError5 = true;_iteratorError5 = err;} finally {try {if (!_iteratorNormalCompletion5 && _iterator5['return']) {_iterator5['return']();}} finally {if (_didIteratorError5) {throw _iteratorError5;}}}} }, { key: 'toArray', value: 



            function toArray() {
                return this.reduce(function (arr, value) {
                    arr.push(value);
                    return arr;}, 
                []);} }], [{ key: 'of', value: 


            function of() {for (var _len = arguments.length, items = Array(_len), _key = 0; _key < _len; _key++) {items[_key] = arguments[_key];}
                return Stream.from(items);} }, { key: 'from', value: 


            function from(items) {
                if (!items || typeof items[_babelRuntimeCoreJsSymbolIterator['default']] !== 'function') {
                    throw new TypeError();} else 
                if (items instanceof Stream) {
                    return items;} else 
                if (items instanceof Array) {
                    return new Stream(function () {return _babelRuntimeCoreJsGetIterator['default'](items.slice());});} else 
                {
                    return new Stream(function () {return _babelRuntimeCoreJsGetIterator['default'](items);});}} }, { key: 'iterate', value: 



            function iterate(initialValues, f) {
                var initVals = initialValues.slice();

                return new Stream(_babelRuntimeRegenerator['default'].mark(function callee$2$0() {var 
                    values;return _babelRuntimeRegenerator['default'].wrap(function callee$2$0$(context$3$0) {while (1) switch (context$3$0.prev = context$3$0.next) {case 0:values = initVals.slice();case 1:if (!

                                true) {context$3$0.next = 7;break;}
                                values.push(f.apply(undefined, _babelRuntimeHelpersToConsumableArray['default'](values)));context$3$0.next = 5;return (
                                values.shift());case 5:context$3$0.next = 1;break;case 7:case 'end':return context$3$0.stop();}}, callee$2$0, this);}));} }, { key: 'repeat', value: 




            function repeat(value) {var n = arguments[1] === undefined ? Infinity : arguments[1];
                return Stream.iterate([value], function (value) {return value;}).take(n);} }, { key: 'range', 


            /**
             * Creates a stream of numeric values from a start value (including) to
             * an end value (excluding).
             *
             * @example
             *     Seq.range(1, 10) // 1, 2, 3, 4, 5, 6, 7, 8, 9
             *
             * @method range
             * @param {Number} start Start value
             * @param {Number} end End value
             * @return {Stream} Stream of iterated values
             */value: 
            function range(start, end) {var step = arguments[2] === undefined ? 1 : arguments[2];
                return Stream.iterate([start], function (value) {return value += step;}).
                takeWhile(function (n) {return n < end;});} }]);return Stream;})();module.exports = Stream;});
},{"babel-runtime/core-js/get-iterator":9,"babel-runtime/core-js/symbol/iterator":16,"babel-runtime/helpers/class-call-check":17,"babel-runtime/helpers/create-class":18,"babel-runtime/helpers/to-consumable-array":22,"babel-runtime/regenerator":68}],8:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/array/from"), __esModule: true };
},{"core-js/library/fn/array/from":23}],9:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":24}],10:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/map"), __esModule: true };
},{"core-js/library/fn/map":25}],11:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/create"), __esModule: true };
},{"core-js/library/fn/object/create":26}],12:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":27}],13:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/get-own-property-descriptor"), __esModule: true };
},{"core-js/library/fn/object/get-own-property-descriptor":28}],14:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/promise"), __esModule: true };
},{"core-js/library/fn/promise":29}],15:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":30}],16:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":31}],17:[function(require,module,exports){
"use strict";

exports["default"] = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

exports.__esModule = true;
},{}],18:[function(require,module,exports){
"use strict";

var _Object$defineProperty = require("babel-runtime/core-js/object/define-property")["default"];

exports["default"] = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;

      _Object$defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

exports.__esModule = true;
},{"babel-runtime/core-js/object/define-property":12}],19:[function(require,module,exports){
"use strict";

var _Object$getOwnPropertyDescriptor = require("babel-runtime/core-js/object/get-own-property-descriptor")["default"];

exports["default"] = function get(_x, _x2, _x3) {
  var _again = true;

  _function: while (_again) {
    desc = parent = getter = undefined;
    _again = false;
    var object = _x,
        property = _x2,
        receiver = _x3;

    var desc = _Object$getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        _x = parent;
        _x2 = property;
        _x3 = receiver;
        _again = true;
        continue _function;
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  }
};

exports.__esModule = true;
},{"babel-runtime/core-js/object/get-own-property-descriptor":13}],20:[function(require,module,exports){
"use strict";

var _Object$create = require("babel-runtime/core-js/object/create")["default"];

exports["default"] = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = _Object$create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) subClass.__proto__ = superClass;
};

exports.__esModule = true;
},{"babel-runtime/core-js/object/create":11}],21:[function(require,module,exports){
"use strict";

exports["default"] = function (obj) {
  return obj && obj.__esModule ? obj["default"] : obj;
};

exports.__esModule = true;
},{}],22:[function(require,module,exports){
"use strict";

var _Array$from = require("babel-runtime/core-js/array/from")["default"];

exports["default"] = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return _Array$from(arr);
  }
};

exports.__esModule = true;
},{"babel-runtime/core-js/array/from":8}],23:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/es6.array.from');
module.exports = require('../../modules/$').core.Array.from;
},{"../../modules/$":48,"../../modules/es6.array.from":58,"../../modules/es6.string.iterator":64}],24:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
require('../modules/core.iter-helpers');
module.exports = require('../modules/$').core.getIterator;
},{"../modules/$":48,"../modules/core.iter-helpers":57,"../modules/es6.string.iterator":64,"../modules/web.dom.iterable":67}],25:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.map');
require('../modules/es7.map.to-json');
module.exports = require('../modules/$').core.Map;
},{"../modules/$":48,"../modules/es6.map":60,"../modules/es6.object.to-string":62,"../modules/es6.string.iterator":64,"../modules/es7.map.to-json":66,"../modules/web.dom.iterable":67}],26:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function create(P, D){
  return $.create(P, D);
};
},{"../../modules/$":48}],27:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function defineProperty(it, key, desc){
  return $.setDesc(it, key, desc);
};
},{"../../modules/$":48}],28:[function(require,module,exports){
var $ = require('../../modules/$');
require('../../modules/es6.object.statics-accept-primitives');
module.exports = function getOwnPropertyDescriptor(it, key){
  return $.getDesc(it, key);
};
},{"../../modules/$":48,"../../modules/es6.object.statics-accept-primitives":61}],29:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.promise');
module.exports = require('../modules/$').core.Promise;
},{"../modules/$":48,"../modules/es6.object.to-string":62,"../modules/es6.promise":63,"../modules/es6.string.iterator":64,"../modules/web.dom.iterable":67}],30:[function(require,module,exports){
require('../../modules/es6.symbol');
module.exports = require('../../modules/$').core.Symbol;
},{"../../modules/$":48,"../../modules/es6.symbol":65}],31:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/$.wks')('iterator');
},{"../../modules/$.wks":56,"../../modules/es6.string.iterator":64,"../../modules/web.dom.iterable":67}],32:[function(require,module,exports){
var $ = require('./$');
function assert(condition, msg1, msg2){
  if(!condition)throw TypeError(msg2 ? msg1 + msg2 : msg1);
}
assert.def = $.assertDefined;
assert.fn = function(it){
  if(!$.isFunction(it))throw TypeError(it + ' is not a function!');
  return it;
};
assert.obj = function(it){
  if(!$.isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
assert.inst = function(it, Constructor, name){
  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
  return it;
};
module.exports = assert;
},{"./$":48}],33:[function(require,module,exports){
var $        = require('./$')
  , TAG      = require('./$.wks')('toStringTag')
  , toString = {}.toString;
function cof(it){
  return toString.call(it).slice(8, -1);
}
cof.classof = function(it){
  var O, T;
  return it == undefined ? it === undefined ? 'Undefined' : 'Null'
    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T : cof(O);
};
cof.set = function(it, tag, stat){
  if(it && !$.has(it = stat ? it : it.prototype, TAG))$.hide(it, TAG, tag);
};
module.exports = cof;
},{"./$":48,"./$.wks":56}],34:[function(require,module,exports){
'use strict';
var $        = require('./$')
  , ctx      = require('./$.ctx')
  , safe     = require('./$.uid').safe
  , assert   = require('./$.assert')
  , forOf    = require('./$.for-of')
  , step     = require('./$.iter').step
  , has      = $.has
  , set      = $.set
  , isObject = $.isObject
  , hide     = $.hide
  , isFrozen = Object.isFrozen || $.core.Object.isFrozen
  , ID       = safe('id')
  , O1       = safe('O1')
  , LAST     = safe('last')
  , FIRST    = safe('first')
  , ITER     = safe('iter')
  , SIZE     = $.DESC ? safe('size') : 'size'
  , id       = 0;

function fastKey(it, create){
  // return primitive with prefix
  if(!isObject(it))return (typeof it == 'string' ? 'S' : 'P') + it;
  // can't set id to frozen object
  if(isFrozen(it))return 'F';
  if(!has(it, ID)){
    // not necessary to add id
    if(!create)return 'E';
    // add missing object id
    hide(it, ID, ++id);
  // return object id with prefix
  } return 'O' + it[ID];
}

function getEntry(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index != 'F')return that[O1][index];
  // frozen object case
  for(entry = that[FIRST]; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
}

module.exports = {
  getConstructor: function(NAME, IS_MAP, ADDER){
    function C(){
      var that     = assert.inst(this, C, NAME)
        , iterable = arguments[0];
      set(that, O1, $.create(null));
      set(that, SIZE, 0);
      set(that, LAST, undefined);
      set(that, FIRST, undefined);
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    }
    $.mix(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that[O1], entry = that[FIRST]; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that[FIRST] = that[LAST] = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that[O1][entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that[FIRST] == entry)that[FIRST] = next;
          if(that[LAST] == entry)that[LAST] = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        var f = ctx(callbackfn, arguments[1], 3)
          , entry;
        while(entry = entry ? entry.n : this[FIRST]){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if($.DESC)$.setDesc(C.prototype, 'size', {
      get: function(){
        return assert.def(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that[LAST] = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that[LAST],          // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that[FIRST])that[FIRST] = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index != 'F')that[O1][index] = entry;
    } return that;
  },
  getEntry: getEntry,
  // add .keys, .values, .entries, [@@iterator]
  // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
  setIter: function(C, NAME, IS_MAP){
    require('./$.iter-define')(C, NAME, function(iterated, kind){
      set(this, ITER, {o: iterated, k: kind});
    }, function(){
      var iter  = this[ITER]
        , kind  = iter.k
        , entry = iter.l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!iter.o || !(iter.l = entry = entry ? entry.n : iter.o[FIRST])){
        // or finish the iteration
        iter.o = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);
  }
};
},{"./$":48,"./$.assert":32,"./$.ctx":37,"./$.for-of":41,"./$.iter":47,"./$.iter-define":45,"./$.uid":54}],35:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $def  = require('./$.def')
  , forOf = require('./$.for-of');
module.exports = function(NAME){
  $def($def.P, NAME, {
    toJSON: function toJSON(){
      var arr = [];
      forOf(this, false, arr.push, arr);
      return arr;
    }
  });
};
},{"./$.def":38,"./$.for-of":41}],36:[function(require,module,exports){
'use strict';
var $     = require('./$')
  , $def  = require('./$.def')
  , BUGGY = require('./$.iter').BUGGY
  , forOf = require('./$.for-of')
  , species = require('./$.species')
  , assertInstance = require('./$.assert').inst;

module.exports = function(NAME, methods, common, IS_MAP, IS_WEAK){
  var Base  = $.g[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  function fixMethod(KEY, CHAIN){
    var method = proto[KEY];
    if($.FW)proto[KEY] = function(a, b){
      var result = method.call(this, a === 0 ? 0 : a, b);
      return CHAIN ? this : result;
    };
  }
  if(!$.isFunction(C) || !(IS_WEAK || !BUGGY && proto.forEach && proto.entries)){
    // create collection constructor
    C = common.getConstructor(NAME, IS_MAP, ADDER);
    $.mix(C.prototype, methods);
  } else {
    var inst  = new C
      , chain = inst[ADDER](IS_WEAK ? {} : -0, 1)
      , buggyZero;
    // wrap for init collections from iterable
    if(!require('./$.iter-detect')(function(iter){ new C(iter); })){ // eslint-disable-line no-new
      C = function(){
        assertInstance(this, C, NAME);
        var that     = new Base
          , iterable = arguments[0];
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      };
      C.prototype = proto;
      if($.FW)proto.constructor = C;
    }
    IS_WEAK || inst.forEach(function(val, key){
      buggyZero = 1 / key === -Infinity;
    });
    // fix converting -0 key to +0
    if(buggyZero){
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    // + fix .add & .set for chaining
    if(buggyZero || chain !== inst)fixMethod(ADDER, true);
  }

  require('./$.cof').set(C, NAME);

  O[NAME] = C;
  $def($def.G + $def.W + $def.F * (C != Base), O);
  species(C);
  species($.core[NAME]); // for wrapper

  if(!IS_WEAK)common.setIter(C, NAME, IS_MAP);

  return C;
};
},{"./$":48,"./$.assert":32,"./$.cof":33,"./$.def":38,"./$.for-of":41,"./$.iter":47,"./$.iter-detect":46,"./$.species":51}],37:[function(require,module,exports){
// Optional / simple context binding
var assertFunction = require('./$.assert').fn;
module.exports = function(fn, that, length){
  assertFunction(fn);
  if(~length && that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  } return function(/* ...args */){
      return fn.apply(that, arguments);
    };
};
},{"./$.assert":32}],38:[function(require,module,exports){
var $          = require('./$')
  , global     = $.g
  , core       = $.core
  , isFunction = $.isFunction;
function ctx(fn, that){
  return function(){
    return fn.apply(that, arguments);
  };
}
// type bitmap
$def.F = 1;  // forced
$def.G = 2;  // global
$def.S = 4;  // static
$def.P = 8;  // proto
$def.B = 16; // bind
$def.W = 32; // wrap
function $def(type, name, source){
  var key, own, out, exp
    , isGlobal = type & $def.G
    , target   = isGlobal ? global : type & $def.S
        ? global[name] : (global[name] || {}).prototype
    , exports  = isGlobal ? core : core[name] || (core[name] = {});
  if(isGlobal)source = name;
  for(key in source){
    // contains in native
    own = !(type & $def.F) && target && key in target;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    if(isGlobal && !isFunction(target[key]))exp = source[key];
    // bind timers to global for call from export context
    else if(type & $def.B && own)exp = ctx(out, global);
    // wrap global constructors for prevent change them in library
    else if(type & $def.W && target[key] == out)!function(C){
      exp = function(param){
        return this instanceof C ? new C(param) : C(param);
      };
      exp.prototype = C.prototype;
    }(out);
    else exp = type & $def.P && isFunction(out) ? ctx(Function.call, out) : out;
    // export
    $.hide(exports, key, exp);
  }
}
module.exports = $def;
},{"./$":48}],39:[function(require,module,exports){
var $        = require('./$')
  , document = $.g.document
  , isObject = $.isObject
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./$":48}],40:[function(require,module,exports){
var $ = require('./$');
module.exports = function(it){
  var keys       = $.getKeys(it)
    , getDesc    = $.getDesc
    , getSymbols = $.getSymbols;
  if(getSymbols)$.each.call(getSymbols(it), function(key){
    if(getDesc(it, key).enumerable)keys.push(key);
  });
  return keys;
};
},{"./$":48}],41:[function(require,module,exports){
var ctx  = require('./$.ctx')
  , get  = require('./$.iter').get
  , call = require('./$.iter-call');
module.exports = function(iterable, entries, fn, that){
  var iterator = get(iterable)
    , f        = ctx(fn, that, entries ? 2 : 1)
    , step;
  while(!(step = iterator.next()).done){
    if(call(iterator, f, step.value, entries) === false){
      return call.close(iterator);
    }
  }
};
},{"./$.ctx":37,"./$.iter":47,"./$.iter-call":44}],42:[function(require,module,exports){
module.exports = function($){
  $.FW   = false;
  $.path = $.core;
  return $;
};
},{}],43:[function(require,module,exports){
// Fast apply
// http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
    case 5: return un ? fn(args[0], args[1], args[2], args[3], args[4])
                      : fn.call(that, args[0], args[1], args[2], args[3], args[4]);
  } return              fn.apply(that, args);
};
},{}],44:[function(require,module,exports){
var assertObject = require('./$.assert').obj;
function close(iterator){
  var ret = iterator['return'];
  if(ret !== undefined)assertObject(ret.call(iterator));
}
function call(iterator, fn, value, entries){
  try {
    return entries ? fn(assertObject(value)[0], value[1]) : fn(value);
  } catch(e){
    close(iterator);
    throw e;
  }
}
call.close = close;
module.exports = call;
},{"./$.assert":32}],45:[function(require,module,exports){
var $def            = require('./$.def')
  , $               = require('./$')
  , cof             = require('./$.cof')
  , $iter           = require('./$.iter')
  , SYMBOL_ITERATOR = require('./$.wks')('iterator')
  , FF_ITERATOR     = '@@iterator'
  , KEYS            = 'keys'
  , VALUES          = 'values'
  , Iterators       = $iter.Iterators;
module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
  $iter.create(Constructor, NAME, next);
  function createMethod(kind){
    function $$(that){
      return new Constructor(that, kind);
    }
    switch(kind){
      case KEYS: return function keys(){ return $$(this); };
      case VALUES: return function values(){ return $$(this); };
    } return function entries(){ return $$(this); };
  }
  var TAG      = NAME + ' Iterator'
    , proto    = Base.prototype
    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , _default = _native || createMethod(DEFAULT)
    , methods, key;
  // Fix native
  if(_native){
    var IteratorPrototype = $.getProto(_default.call(new Base));
    // Set @@toStringTag to native iterators
    cof.set(IteratorPrototype, TAG, true);
    // FF fix
    if($.FW && $.has(proto, FF_ITERATOR))$iter.set(IteratorPrototype, $.that);
  }
  // Define iterator
  if($.FW)$iter.set(proto, _default);
  // Plug for library
  Iterators[NAME] = _default;
  Iterators[TAG]  = $.that;
  if(DEFAULT){
    methods = {
      keys:    IS_SET            ? _default : createMethod(KEYS),
      values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
      entries: DEFAULT != VALUES ? _default : createMethod('entries')
    };
    if(FORCE)for(key in methods){
      if(!(key in proto))$.hide(proto, key, methods[key]);
    } else $def($def.P + $def.F * $iter.BUGGY, NAME, methods);
  }
};
},{"./$":48,"./$.cof":33,"./$.def":38,"./$.iter":47,"./$.wks":56}],46:[function(require,module,exports){
var SYMBOL_ITERATOR = require('./$.wks')('iterator')
  , SAFE_CLOSING    = false;
try {
  var riter = [7][SYMBOL_ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }
module.exports = function(exec){
  if(!SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[SYMBOL_ITERATOR]();
    iter.next = function(){ safe = true; };
    arr[SYMBOL_ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./$.wks":56}],47:[function(require,module,exports){
'use strict';
var $                 = require('./$')
  , cof               = require('./$.cof')
  , assertObject      = require('./$.assert').obj
  , SYMBOL_ITERATOR   = require('./$.wks')('iterator')
  , FF_ITERATOR       = '@@iterator'
  , Iterators         = {}
  , IteratorPrototype = {};
// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
setIterator(IteratorPrototype, $.that);
function setIterator(O, value){
  $.hide(O, SYMBOL_ITERATOR, value);
  // Add iterator for FF iterator protocol
  if(FF_ITERATOR in [])$.hide(O, FF_ITERATOR, value);
}

module.exports = {
  // Safari has buggy iterators w/o `next`
  BUGGY: 'keys' in [] && !('next' in [].keys()),
  Iterators: Iterators,
  step: function(done, value){
    return {value: value, done: !!done};
  },
  is: function(it){
    var O      = Object(it)
      , Symbol = $.g.Symbol
      , SYM    = Symbol && Symbol.iterator || FF_ITERATOR;
    return SYM in O || SYMBOL_ITERATOR in O || $.has(Iterators, cof.classof(O));
  },
  get: function(it){
    var Symbol  = $.g.Symbol
      , ext     = it[Symbol && Symbol.iterator || FF_ITERATOR]
      , getIter = ext || it[SYMBOL_ITERATOR] || Iterators[cof.classof(it)];
    return assertObject(getIter.call(it));
  },
  set: setIterator,
  create: function(Constructor, NAME, next, proto){
    Constructor.prototype = $.create(proto || IteratorPrototype, {next: $.desc(1, next)});
    cof.set(Constructor, NAME + ' Iterator');
  }
};
},{"./$":48,"./$.assert":32,"./$.cof":33,"./$.wks":56}],48:[function(require,module,exports){
'use strict';
var global = typeof self != 'undefined' ? self : Function('return this')()
  , core   = {}
  , defineProperty = Object.defineProperty
  , hasOwnProperty = {}.hasOwnProperty
  , ceil  = Math.ceil
  , floor = Math.floor
  , max   = Math.max
  , min   = Math.min;
// The engine works fine with descriptors? Thank's IE8 for his funny defineProperty.
var DESC = !!function(){
  try {
    return defineProperty({}, 'a', {get: function(){ return 2; }}).a == 2;
  } catch(e){ /* empty */ }
}();
var hide = createDefiner(1);
// 7.1.4 ToInteger
function toInteger(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
}
function desc(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
}
function simpleSet(object, key, value){
  object[key] = value;
  return object;
}
function createDefiner(bitmap){
  return DESC ? function(object, key, value){
    return $.setDesc(object, key, desc(bitmap, value));
  } : simpleSet;
}

function isObject(it){
  return it !== null && (typeof it == 'object' || typeof it == 'function');
}
function isFunction(it){
  return typeof it == 'function';
}
function assertDefined(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
}

var $ = module.exports = require('./$.fw')({
  g: global,
  core: core,
  html: global.document && document.documentElement,
  // http://jsperf.com/core-js-isobject
  isObject:   isObject,
  isFunction: isFunction,
  it: function(it){
    return it;
  },
  that: function(){
    return this;
  },
  // 7.1.4 ToInteger
  toInteger: toInteger,
  // 7.1.15 ToLength
  toLength: function(it){
    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
  },
  toIndex: function(index, length){
    index = toInteger(index);
    return index < 0 ? max(index + length, 0) : min(index, length);
  },
  has: function(it, key){
    return hasOwnProperty.call(it, key);
  },
  create:     Object.create,
  getProto:   Object.getPrototypeOf,
  DESC:       DESC,
  desc:       desc,
  getDesc:    Object.getOwnPropertyDescriptor,
  setDesc:    defineProperty,
  setDescs:   Object.defineProperties,
  getKeys:    Object.keys,
  getNames:   Object.getOwnPropertyNames,
  getSymbols: Object.getOwnPropertySymbols,
  assertDefined: assertDefined,
  // Dummy, fix for not array-like ES3 string in es5 module
  ES5Object: Object,
  toObject: function(it){
    return $.ES5Object(assertDefined(it));
  },
  hide: hide,
  def: createDefiner(0),
  set: global.Symbol ? simpleSet : hide,
  mix: function(target, src){
    for(var key in src)hide(target, key, src[key]);
    return target;
  },
  each: [].forEach
});
/* eslint-disable no-undef */
if(typeof __e != 'undefined')__e = core;
if(typeof __g != 'undefined')__g = global;
},{"./$.fw":42}],49:[function(require,module,exports){
var $ = require('./$');
module.exports = function(object, el){
  var O      = $.toObject(object)
    , keys   = $.getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"./$":48}],50:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var $      = require('./$')
  , assert = require('./$.assert');
function check(O, proto){
  assert.obj(O);
  assert(proto === null || $.isObject(proto), proto, ": can't set as prototype!");
}
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} // eslint-disable-line
    ? function(buggy, set){
        try {
          set = require('./$.ctx')(Function.call, $.getDesc(Object.prototype, '__proto__').set, 2);
          set({}, []);
        } catch(e){ buggy = true; }
        return function setPrototypeOf(O, proto){
          check(O, proto);
          if(buggy)O.__proto__ = proto;
          else set(O, proto);
          return O;
        };
      }()
    : undefined),
  check: check
};
},{"./$":48,"./$.assert":32,"./$.ctx":37}],51:[function(require,module,exports){
var $       = require('./$')
  , SPECIES = require('./$.wks')('species');
module.exports = function(C){
  if($.DESC && !(SPECIES in C))$.setDesc(C, SPECIES, {
    configurable: true,
    get: $.that
  });
};
},{"./$":48,"./$.wks":56}],52:[function(require,module,exports){
// true  -> String#at
// false -> String#codePointAt
var $ = require('./$');
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String($.assertDefined(that))
      , i = $.toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l
      || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
        ? TO_STRING ? s.charAt(i) : a
        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./$":48}],53:[function(require,module,exports){
'use strict';
var $      = require('./$')
  , ctx    = require('./$.ctx')
  , cof    = require('./$.cof')
  , invoke = require('./$.invoke')
  , cel    = require('./$.dom-create')
  , global             = $.g
  , isFunction         = $.isFunction
  , html               = $.html
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , postMessage        = global.postMessage
  , addEventListener   = global.addEventListener
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
function run(){
  var id = +this;
  if($.has(queue, id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
}
function listner(event){
  run.call(event.data);
}
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!isFunction(setTask) || !isFunction(clearTask)){
  setTask = function(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(isFunction(fn) ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(cof(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Modern browsers, skip implementation for WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is object
  } else if(addEventListener && isFunction(postMessage) && !global.importScripts){
    defer = function(id){
      postMessage(id, '*');
    };
    addEventListener('message', listner, false);
  // WebWorkers
  } else if(isFunction(MessageChannel)){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listner;
    defer = ctx(port.postMessage, port, 1);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"./$":48,"./$.cof":33,"./$.ctx":37,"./$.dom-create":39,"./$.invoke":43}],54:[function(require,module,exports){
var sid = 0;
function uid(key){
  return 'Symbol(' + key + ')_' + (++sid + Math.random()).toString(36);
}
uid.safe = require('./$').g.Symbol || uid;
module.exports = uid;
},{"./$":48}],55:[function(require,module,exports){
// 22.1.3.31 Array.prototype[@@unscopables]
var $           = require('./$')
  , UNSCOPABLES = require('./$.wks')('unscopables');
if($.FW && !(UNSCOPABLES in []))$.hide(Array.prototype, UNSCOPABLES, {});
module.exports = function(key){
  if($.FW)[][UNSCOPABLES][key] = true;
};
},{"./$":48,"./$.wks":56}],56:[function(require,module,exports){
var global = require('./$').g
  , store  = {};
module.exports = function(name){
  return store[name] || (store[name] =
    global.Symbol && global.Symbol[name] || require('./$.uid').safe('Symbol.' + name));
};
},{"./$":48,"./$.uid":54}],57:[function(require,module,exports){
var core  = require('./$').core
  , $iter = require('./$.iter');
core.isIterable  = $iter.is;
core.getIterator = $iter.get;
},{"./$":48,"./$.iter":47}],58:[function(require,module,exports){
var $     = require('./$')
  , ctx   = require('./$.ctx')
  , $def  = require('./$.def')
  , $iter = require('./$.iter')
  , call  = require('./$.iter-call');
$def($def.S + $def.F * !require('./$.iter-detect')(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = Object($.assertDefined(arrayLike))
      , mapfn   = arguments[1]
      , mapping = mapfn !== undefined
      , f       = mapping ? ctx(mapfn, arguments[2], 2) : undefined
      , index   = 0
      , length, result, step, iterator;
    if($iter.is(O)){
      iterator = $iter.get(O);
      // strange IE quirks mode bug -> use typeof instead of isFunction
      result   = new (typeof this == 'function' ? this : Array);
      for(; !(step = iterator.next()).done; index++){
        result[index] = mapping ? call(iterator, f, [step.value, index], true) : step.value;
      }
    } else {
      // strange IE quirks mode bug -> use typeof instead of isFunction
      result = new (typeof this == 'function' ? this : Array)(length = $.toLength(O.length));
      for(; length > index; index++){
        result[index] = mapping ? f(O[index], index) : O[index];
      }
    }
    result.length = index;
    return result;
  }
});
},{"./$":48,"./$.ctx":37,"./$.def":38,"./$.iter":47,"./$.iter-call":44,"./$.iter-detect":46}],59:[function(require,module,exports){
var $          = require('./$')
  , setUnscope = require('./$.unscope')
  , ITER       = require('./$.uid').safe('iter')
  , $iter      = require('./$.iter')
  , step       = $iter.step
  , Iterators  = $iter.Iterators;

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
require('./$.iter-define')(Array, 'Array', function(iterated, kind){
  $.set(this, ITER, {o: $.toObject(iterated), i: 0, k: kind});
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var iter  = this[ITER]
    , O     = iter.o
    , kind  = iter.k
    , index = iter.i++;
  if(!O || index >= O.length){
    iter.o = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

setUnscope('keys');
setUnscope('values');
setUnscope('entries');
},{"./$":48,"./$.iter":47,"./$.iter-define":45,"./$.uid":54,"./$.unscope":55}],60:[function(require,module,exports){
'use strict';
var strong = require('./$.collection-strong');

// 23.1 Map Objects
require('./$.collection')('Map', {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);
},{"./$.collection":36,"./$.collection-strong":34}],61:[function(require,module,exports){
var $        = require('./$')
  , $def     = require('./$.def')
  , isObject = $.isObject
  , toObject = $.toObject;
function wrapObjectMethod(METHOD, MODE){
  var fn  = ($.core.Object || {})[METHOD] || Object[METHOD]
    , f   = 0
    , o   = {};
  o[METHOD] = MODE == 1 ? function(it){
    return isObject(it) ? fn(it) : it;
  } : MODE == 2 ? function(it){
    return isObject(it) ? fn(it) : true;
  } : MODE == 3 ? function(it){
    return isObject(it) ? fn(it) : false;
  } : MODE == 4 ? function getOwnPropertyDescriptor(it, key){
    return fn(toObject(it), key);
  } : MODE == 5 ? function getPrototypeOf(it){
    return fn(Object($.assertDefined(it)));
  } : function(it){
    return fn(toObject(it));
  };
  try {
    fn('z');
  } catch(e){
    f = 1;
  }
  $def($def.S + $def.F * f, 'Object', o);
}
wrapObjectMethod('freeze', 1);
wrapObjectMethod('seal', 1);
wrapObjectMethod('preventExtensions', 1);
wrapObjectMethod('isFrozen', 2);
wrapObjectMethod('isSealed', 2);
wrapObjectMethod('isExtensible', 3);
wrapObjectMethod('getOwnPropertyDescriptor', 4);
wrapObjectMethod('getPrototypeOf', 5);
wrapObjectMethod('keys');
wrapObjectMethod('getOwnPropertyNames');
},{"./$":48,"./$.def":38}],62:[function(require,module,exports){
'use strict';
// 19.1.3.6 Object.prototype.toString()
var $   = require('./$')
  , cof = require('./$.cof')
  , src = String({}.toString)
  , tmp = {};
function toString(){
  return '[object ' + cof.classof(this) + ']';
}
// lodash uses String(Object.prototype.toString) in isNative
toString.toString = function(){
  return src;
};
tmp[require('./$.wks')('toStringTag')] = 'z';
if($.FW && cof(tmp) != 'z')$.hide(Object.prototype, 'toString', toString);
},{"./$":48,"./$.cof":33,"./$.wks":56}],63:[function(require,module,exports){
'use strict';
var $        = require('./$')
  , ctx      = require('./$.ctx')
  , cof      = require('./$.cof')
  , $def     = require('./$.def')
  , assert   = require('./$.assert')
  , forOf    = require('./$.for-of')
  , setProto = require('./$.set-proto').set
  , species  = require('./$.species')
  , SPECIES  = require('./$.wks')('species')
  , RECORD   = require('./$.uid').safe('record')
  , PROMISE  = 'Promise'
  , global   = $.g
  , process  = global.process
  , asap     = process && process.nextTick || require('./$.task').set
  , P        = global[PROMISE]
  , isFunction     = $.isFunction
  , isObject       = $.isObject
  , assertFunction = assert.fn
  , assertObject   = assert.obj;

var useNative = function(){
  var test, works = false;
  function P2(x){
    var self = new P(x);
    setProto(self, P2.prototype);
    return self;
  }
  try {
    works = isFunction(P) && isFunction(P.resolve) && P.resolve(test = new P(function(){})) == test;
    setProto(P2, P);
    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
    // actual Firefox has broken subclass support, test that
    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
      works = false;
    }
  } catch(e){ works = false; }
  return works;
}();

// helpers
function getConstructor(C){
  var S = assertObject(C)[SPECIES];
  return S != undefined ? S : C;
}
function isThenable(it){
  var then;
  if(isObject(it))then = it.then;
  return isFunction(then) ? then : false;
}
function notify(record){
  var chain = record.c;
  if(chain.length)asap(function(){
    var value = record.v
      , ok    = record.s == 1
      , i     = 0;
    function run(react){
      var cb = ok ? react.ok : react.fail
        , ret, then;
      try {
        if(cb){
          if(!ok)record.h = true;
          ret = cb === true ? value : cb(value);
          if(ret === react.P){
            react.rej(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(ret)){
            then.call(ret, react.res, react.rej);
          } else react.res(ret);
        } else react.rej(value);
      } catch(err){
        react.rej(err);
      }
    }
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    chain.length = 0;
  });
}
function isUnhandled(promise){
  var record = promise[RECORD]
    , chain  = record.a || record.c
    , i      = 0
    , react;
  if(record.h)return false;
  while(chain.length > i){
    react = chain[i++];
    if(react.fail || !isUnhandled(react.P))return false;
  } return true;
}
function $reject(value){
  var record = this
    , promise;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  record.v = value;
  record.s = 2;
  record.a = record.c.slice();
  setTimeout(function(){
    asap(function(){
      if(isUnhandled(promise = record.p)){
        if(cof(process) == 'process'){
          process.emit('unhandledRejection', value, promise);
        } else if(global.console && isFunction(console.error)){
          console.error('Unhandled promise rejection', value);
        }
      }
      record.a = undefined;
    });
  }, 1);
  notify(record);
}
function $resolve(value){
  var record = this
    , then, wrapper;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  try {
    if(then = isThenable(value)){
      wrapper = {r: record, d: false}; // wrap
      then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
    } else {
      record.v = value;
      record.s = 1;
      notify(record);
    }
  } catch(err){
    $reject.call(wrapper || {r: record, d: false}, err); // wrap
  }
}

// constructor polyfill
if(!useNative){
  // 25.4.3.1 Promise(executor)
  P = function Promise(executor){
    assertFunction(executor);
    var record = {
      p: assert.inst(this, P, PROMISE),       // <- promise
      c: [],                                  // <- awaiting reactions
      a: undefined,                           // <- checked in isUnhandled reactions
      s: 0,                                   // <- state
      d: false,                               // <- done
      v: undefined,                           // <- value
      h: false                                // <- handled rejection
    };
    $.hide(this, RECORD, record);
    try {
      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
    } catch(err){
      $reject.call(record, err);
    }
  };
  $.mix(P.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var S = assertObject(assertObject(this).constructor)[SPECIES];
      var react = {
        ok:   isFunction(onFulfilled) ? onFulfilled : true,
        fail: isFunction(onRejected)  ? onRejected  : false
      };
      var promise = react.P = new (S != undefined ? S : P)(function(res, rej){
        react.res = assertFunction(res);
        react.rej = assertFunction(rej);
      });
      var record = this[RECORD];
      record.c.push(react);
      if(record.a)record.a.push(react);
      record.s && notify(record);
      return promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
}

// export
$def($def.G + $def.W + $def.F * !useNative, {Promise: P});
cof.set(P, PROMISE);
species(P);
species($.core[PROMISE]); // for wrapper

// statics
$def($def.S + $def.F * !useNative, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    return new (getConstructor(this))(function(res, rej){
      rej(r);
    });
  },
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    return isObject(x) && RECORD in x && $.getProto(x) === this.prototype
      ? x : new (getConstructor(this))(function(res){
        res(x);
      });
  }
});
$def($def.S + $def.F * !(useNative && require('./$.iter-detect')(function(iter){
  P.all(iter)['catch'](function(){});
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C      = getConstructor(this)
      , values = [];
    return new C(function(res, rej){
      forOf(iterable, false, values.push, values);
      var remaining = values.length
        , results   = Array(remaining);
      if(remaining)$.each.call(values, function(promise, index){
        C.resolve(promise).then(function(value){
          results[index] = value;
          --remaining || res(results);
        }, rej);
      });
      else res(results);
    });
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C = getConstructor(this);
    return new C(function(res, rej){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(res, rej);
      });
    });
  }
});
},{"./$":48,"./$.assert":32,"./$.cof":33,"./$.ctx":37,"./$.def":38,"./$.for-of":41,"./$.iter-detect":46,"./$.set-proto":50,"./$.species":51,"./$.task":53,"./$.uid":54,"./$.wks":56}],64:[function(require,module,exports){
var set   = require('./$').set
  , $at   = require('./$.string-at')(true)
  , ITER  = require('./$.uid').safe('iter')
  , $iter = require('./$.iter')
  , step  = $iter.step;

// 21.1.3.27 String.prototype[@@iterator]()
require('./$.iter-define')(String, 'String', function(iterated){
  set(this, ITER, {o: String(iterated), i: 0});
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var iter  = this[ITER]
    , O     = iter.o
    , index = iter.i
    , point;
  if(index >= O.length)return step(1);
  point = $at(O, index);
  iter.i += point.length;
  return step(0, point);
});
},{"./$":48,"./$.iter":47,"./$.iter-define":45,"./$.string-at":52,"./$.uid":54}],65:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var $        = require('./$')
  , setTag   = require('./$.cof').set
  , uid      = require('./$.uid')
  , $def     = require('./$.def')
  , keyOf    = require('./$.keyof')
  , enumKeys = require('./$.enum-keys')
  , assertObject = require('./$.assert').obj
  , has      = $.has
  , $create  = $.create
  , getDesc  = $.getDesc
  , setDesc  = $.setDesc
  , desc     = $.desc
  , getNames = $.getNames
  , toObject = $.toObject
  , $Symbol  = $.g.Symbol
  , setter   = false
  , TAG      = uid('tag')
  , HIDDEN   = uid('hidden')
  , SymbolRegistry = {}
  , AllSymbols = {}
  , useNative = $.isFunction($Symbol);

function wrap(tag){
  var sym = AllSymbols[tag] = $.set($create($Symbol.prototype), TAG, tag);
  $.DESC && setter && setDesc(Object.prototype, tag, {
    configurable: true,
    set: function(value){
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setDesc(this, tag, desc(1, value));
    }
  });
  return sym;
}

function defineProperty(it, key, D){
  if(D && has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))setDesc(it, HIDDEN, desc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D.enumerable = false;
    }
  } return setDesc(it, key, D);
}
function defineProperties(it, P){
  assertObject(it);
  var keys = enumKeys(P = toObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)defineProperty(it, key = keys[i++], P[key]);
  return it;
}
function create(it, P){
  return P === undefined ? $create(it) : defineProperties($create(it), P);
}
function getOwnPropertyDescriptor(it, key){
  var D = getDesc(it = toObject(it), key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
}
function getOwnPropertyNames(it){
  var names  = getNames(toObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
  return result;
}
function getOwnPropertySymbols(it){
  var names  = getNames(toObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
  return result;
}

// 19.4.1.1 Symbol([description])
if(!useNative){
  $Symbol = function Symbol(description){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor');
    return wrap(uid(description));
  };
  $.hide($Symbol.prototype, 'toString', function(){
    return this[TAG];
  });

  $.create     = create;
  $.setDesc    = defineProperty;
  $.getDesc    = getOwnPropertyDescriptor;
  $.setDescs   = defineProperties;
  $.getNames   = getOwnPropertyNames;
  $.getSymbols = getOwnPropertySymbols;
}

var symbolStatics = {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    return keyOf(SymbolRegistry, key);
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
};
// 19.4.2.2 Symbol.hasInstance
// 19.4.2.3 Symbol.isConcatSpreadable
// 19.4.2.4 Symbol.iterator
// 19.4.2.6 Symbol.match
// 19.4.2.8 Symbol.replace
// 19.4.2.9 Symbol.search
// 19.4.2.10 Symbol.species
// 19.4.2.11 Symbol.split
// 19.4.2.12 Symbol.toPrimitive
// 19.4.2.13 Symbol.toStringTag
// 19.4.2.14 Symbol.unscopables
$.each.call((
    'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
    'species,split,toPrimitive,toStringTag,unscopables'
  ).split(','), function(it){
    var sym = require('./$.wks')(it);
    symbolStatics[it] = useNative ? sym : wrap(sym);
  }
);

setter = true;

$def($def.G + $def.W, {Symbol: $Symbol});

$def($def.S, 'Symbol', symbolStatics);

$def($def.S + $def.F * !useNative, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: getOwnPropertySymbols
});

// 19.4.3.5 Symbol.prototype[@@toStringTag]
setTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setTag($.g.JSON, 'JSON', true);
},{"./$":48,"./$.assert":32,"./$.cof":33,"./$.def":38,"./$.enum-keys":40,"./$.keyof":49,"./$.uid":54,"./$.wks":56}],66:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
require('./$.collection-to-json')('Map');
},{"./$.collection-to-json":35}],67:[function(require,module,exports){
require('./es6.array.iterator');
var $           = require('./$')
  , Iterators   = require('./$.iter').Iterators
  , ITERATOR    = require('./$.wks')('iterator')
  , ArrayValues = Iterators.Array
  , NodeList    = $.g.NodeList;
if($.FW && NodeList && !(ITERATOR in NodeList.prototype)){
  $.hide(NodeList.prototype, ITERATOR, ArrayValues);
}
Iterators.NodeList = ArrayValues;
},{"./$":48,"./$.iter":47,"./$.wks":56,"./es6.array.iterator":59}],68:[function(require,module,exports){
(function (global){
// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g =
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this;

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
delete g.regeneratorRuntime;

module.exports = require("./runtime");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  delete g.regeneratorRuntime;
}

module.exports = { "default": module.exports, __esModule: true };

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./runtime":69}],69:[function(require,module,exports){
(function (global){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

"use strict";

var _Symbol = require("babel-runtime/core-js/symbol")["default"];

var _Symbol$iterator = require("babel-runtime/core-js/symbol/iterator")["default"];

var _Object$create = require("babel-runtime/core-js/object/create")["default"];

var _Promise = require("babel-runtime/core-js/promise")["default"];

!(function (global) {
  "use strict";

  var hasOwn = Object.prototype.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var iteratorSymbol = typeof _Symbol === "function" && _Symbol$iterator || "@@iterator";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided, then outerFn.prototype instanceof Generator.
    var generator = _Object$create((outerFn || Generator).prototype);

    generator._invoke = makeInvokeMethod(innerFn, self || null, new Context(tryLocsList || []));

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = "GeneratorFunction";

  runtime.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction ||
    // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  runtime.mark = function (genFun) {
    genFun.__proto__ = GeneratorFunctionPrototype;
    genFun.prototype = _Object$create(Gp);
    return genFun;
  };

  runtime.async = function (innerFn, outerFn, self, tryLocsList) {
    return new _Promise(function (resolve, reject) {
      var generator = wrap(innerFn, outerFn, self, tryLocsList);
      var callNext = step.bind(generator, "next");
      var callThrow = step.bind(generator, "throw");

      function step(method, arg) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
          return;
        }

        var info = record.arg;
        if (info.done) {
          resolve(info.value);
        } else {
          _Promise.resolve(info.value).then(callNext, callThrow);
        }
      }

      callNext();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          if (method === "return" || method === "throw" && delegate.iterator[method] === undefined) {
            // A return or throw (when the delegate iterator has no throw
            // method) always terminates the yield* loop.
            context.delegate = null;

            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            var returnMethod = delegate.iterator["return"];
            if (returnMethod) {
              var record = tryCatch(returnMethod, delegate.iterator, arg);
              if (record.type === "throw") {
                // If the return method threw an exception, let that
                // exception prevail over the original return or throw.
                method = "throw";
                arg = record.arg;
                continue;
              }
            }

            if (method === "return") {
              // Continue with the outer return, now that the delegate
              // iterator has been terminated.
              continue;
            }
          }

          var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);

          if (record.type === "throw") {
            context.delegate = null;

            // Like returning generator.throw(uncaught), but without the
            // overhead of an extra function call.
            method = "throw";
            arg = record.arg;
            continue;
          }

          // Delegate generator ran and handled its own exceptions so
          // regardless of what the method was, we continue as if it is
          // "next" with an undefined arg.
          method = "next";
          arg = undefined;

          var info = record.arg;
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }

          context.delegate = null;
        }

        if (method === "next") {
          if (state === GenStateSuspendedYield) {
            context.sent = arg;
          } else {
            delete context.sent;
          }
        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }

          if (context.dispatchException(arg)) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            method = "next";
            arg = undefined;
          }
        } else if (method === "return") {
          context.abrupt("return", arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          var info = {
            value: record.arg,
            done: context.done
          };

          if (record.arg === ContinueSentinel) {
            if (context.delegate && method === "next") {
              // Deliberately forget the last sent value so that we don't
              // accidentally pass it on to the delegate.
              arg = undefined;
            }
          } else {
            return info;
          }
        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(arg) call above.
          method = "throw";
          arg = record.arg;
        }
      }
    };
  }

  function defineGeneratorMethod(method) {
    Gp[method] = function (arg) {
      return this._invoke(method, arg);
    };
  }
  defineGeneratorMethod("next");
  defineGeneratorMethod("throw");
  defineGeneratorMethod("return");

  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset();
  }

  runtime.keys = function (object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function reset() {
      this.prev = 0;
      this.next = 0;
      this.sent = undefined;
      this.done = false;
      this.delegate = null;

      this.tryEntries.forEach(resetTryEntry);

      // Pre-initialize at least 20 temporary variables to enable hidden
      // class optimizations for simple generators.
      for (var tempIndex = 0, tempName; hasOwn.call(this, tempName = "t" + tempIndex) || tempIndex < 20; ++tempIndex) {
        this[tempName] = null;
      }
    },

    stop: function stop() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.next = finallyEntry.finallyLoc;
      } else {
        this.complete(record);
      }

      return ContinueSentinel;
    },

    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          return this.complete(entry.completion, entry.afterLoc);
        }
      }
    },

    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      return ContinueSentinel;
    }
  };
})(
// Among the various tricks for obtaining a reference to the global
// object, this seems to be the most reliable technique that does not
// use indirect eval (which violates Content Security Policy).
typeof global === "object" ? global : typeof window === "object" ? window : typeof self === "object" ? self : undefined);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"babel-runtime/core-js/object/create":11,"babel-runtime/core-js/promise":14,"babel-runtime/core-js/symbol":15,"babel-runtime/core-js/symbol/iterator":16}]},{},[1,2,3,4,5,6,7]);

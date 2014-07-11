/*global mojo */

(function () {
    'use strict';

    var react = mojo.react;

    react.Behavior = function (initialValue, changeEvents) {
        var self = this,
            doOnSubscribe,
            doOnDeploy;

        this._value = initialValue;
        changeEvents = react.EventStream.from(changeEvents);

        doOnSubscribe = function (listener) {
            listener.onEvent(self._value);
        };

        doOnDeploy = function (listener) {
            changeEvents.subscribe(listener);
        };

        this._eventStream = new react.EventStream(doOnSubscribe, doOnDeploy);
    };

    react.subscribe = function (listener) {
        this._eventStream.subscribe(listener);
    };
    
    react.Behavior.isBehavorial = function (obj) {
        return obj instanceof react.Behavior;
    }
}());

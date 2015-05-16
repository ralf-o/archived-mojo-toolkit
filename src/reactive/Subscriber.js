import Subscription from "./Subscription";

/**
 * Class representing a listener for events send by a Publisher.
 *
 * @class  Subscriber
 * @module reactive
 */
export default class Subscriber {
    constructor(onNext, onComplete, onError, onSubscribe) {
        this._onNext = typeof onNext === 'function'
                ? onNext
                : () => {};

        this._onComplete = typeof onComplete === 'function'
                ? onComplete
                : () => {};

        this._onError = typeof onError === 'function'
                ? onError
                : error => { throw error; };

        this._onSubscribe = typeof onSubscribe === 'function'
                ? onSubscribe
                : () => {};
    }

    onNext(value) {
        this._onNext(value);
    }

    onComplete() {
        this._onComplete();
    }

    onError(error) {
        this._onError(error);
    }

    onSubscribe(subscription) {
        this._onSubscribe(subscription);
    }

    static from(subscriber) {
        var ret;

        if (typeof subscriber === 'function') {
            ret = new Subscriber(subscriber, null, null, null);
        } else if (typeof subscriber.onNext === 'function'
                && typeof subscriber.onComplete === 'function'
                && typeof subscriber.onError === 'function'
                && typeof subscriber.onSubscribe === 'function') {
            ret = subscriber;
        } else if (subscriber != null && typeof subscriber === 'object') {
            ret = new Subscriber(subscriber.onNext, subscriber.onComplete, subscriber.onError, subscriber.onSubscribe);
        } else {
            throw TypeError("[Subscriber.from] Not a valid subscriber");
        }

        return ret;
    }
}

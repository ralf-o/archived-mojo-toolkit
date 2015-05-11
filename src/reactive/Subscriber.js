import Subscription from "./Subscription";

export default class Subscriber {
    constructor(onNext, onComplete = null, onError = null, onSubscribe = null) {
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
            ret = new Subscriber(subscriber, null, null);
        } else if (subscriber != null && typeof subscriber === 'object') {
            ret = new Subscriber(subscriber.onNext, subscriber.onComplete, subscriber.onError);
        } else {
            throw "Not a valid subscriber";
        }

        return ret;
    }
}

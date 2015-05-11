export default class Subscriber {
    constructor(onNext, onComplete, onError) {
        this._onNext = typeof listener.onNext === 'function'
                ? listener.onNext
                : () => {};

        this._onComplete = listener.onComplete === 'function'
                ? listener.onComplete
                : () => {};

        this._onError = typeof listener.onError === 'function'
                ? listener.onError
                : error => { throw error; };

        this._onSubscribe = typeof listener.onSubscribe === 'function'
                ? listener.onSubscribe
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

    static from(subscriber) {
        var ret;

        if (typeof subscriber === 'function') {
            ret = new Subscriber(subscriber, null, null);
        } else if (subscriber != null && typeof subscriber === 'object') {
            ret = new Subscriber(subscriber.onNext, subscriber.onComplete, subscriber.onError);
        } else {
            throw "Not a valid listener";
        }
    }
}

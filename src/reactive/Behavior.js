
import Publisher from "./Publisher.js";
import Subscription from "./Subscription.js";

export default class Behavior extends Publisher {
    constructor(lazyHead, tail) {
        super(subscriber => {
            let isFirst = true,
                subscription = null,
                isClosed = false;

            let ret = new Subscription(
                () => {
                    if (subscription !== null) {
                        isClosed = true;
                        ret.close();
                    }
                },
                n => {
                    if (isClosed) {
                        return;
                    }

                    if (isFirst) {
                        isFirst = false;
                        subscriber.onNext(lazyHead());
                        --n;
                    }

                    if (!isClosed && n > 0) {
                        if (subscription === null) {
                            subscription = tail.subscribe(subscriber);
                        }

                        setTimeout(() => {
                            subscription.request(n);
                        }, 0);
                    }
                }
            );

            return ret;
        });

        this._lazyHead = lazyHead;
        this._tail = tail;
    }

    map(f) {
        return new Behavior(
            () => f(this.lazyHead(), 0),
            this._tail.map((value, index) => f(value, index + 1)));
    }

    tail() {
        return this._tail;
    }

    static just(value) {
        return new Behavior(() => value, Publisher.empty());
    }

    static combine(behaviors, f) {
        const lazyHead = () => {
            const arr = [];

            for (let behavior of behaviors) {
                arr.push(behavior._lazyHead());
            }

            return f.apply(null, arr);
        }

        const onSubscribe = subscriber => {
            var ret,
                numberOfRequestedValues = 0,
                numberOfActiveBehaviors = behaviors.length;

            const valueQueue = [],
                 values = [],
                 subscriptions = behaviors.map((behavior, index) => behavior._tail.subscribe({
                    onNext: value => {
                        if (values.length === 0) {
                            for (let behavior of behaviors) {
                                values.push(behavior._lazyHead());
                            }
                        }

                        values[index] = value;
                        let nextValue = f.apply(null, values);

                        if (numberOfRequestedValues === 0) {
                            valueQueue.push(nextValue);
                        } else {
                            subscriber.onNext(nextValue);

                            if (--numberOfRequestedValues > 0) {
                                subscriptions.forEach(subscription => subscription.request(1));
                            }
                        }
                    },
                    onComplete: () => {
                        if (--numberOfActiveBehaviors === 0) {
                            ret.close();
                            subscriber.onComplete();
                        }
                    },
                    onError: error => {
                        subscriber.onError(error);
                    },
                    onSubscribe: subscription => {
                        subscriber.onSubscribe(subscription);
                    }
                }));

            ret = new Subscription(
                () => subscriptions.forEach(subscription => subscription.close()),
                n => {
                    while (n > 0 && valueQueue.length > 0) {
                        let nextValue = valueQueue.shift();

                        setTimeout(() => subscriber.onNext(nextValue), 0);
                        --n;
                    }

                    if (n > 0) {
                        numberOfRequestedValues = n;
                        subscriptions.forEach(subscription => subscription.request(1));
                    }
                }
            );

            return ret;
        };

        return new Behavior(lazyHead, new Publisher(onSubscribe));
    }
}

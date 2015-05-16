import Subscriber from "./Subscriber";
import Subscription from "./Subscription";
import Stream from "../util/Stream";

/**
 * Class representing a reactive event stream.
 *
 * @class  Publisher
 * @module reactive
 */
export default class Publisher {
    /**
     * @constructor
     * @this {Publisher}
     */
    constructor(onSubscribe) {
        this._onSubscribe = onSubscribe;
    }

    subscribe(subscriber)  {
        const realSubscriber = Subscriber.from(subscriber),
              subscription = this._onSubscribe(realSubscriber);

        realSubscriber.onSubscribe(subscription);
        return subscription;
    }

    map(f) {
        return new Publisher(subscriber => {
           let index = 0;

           return this._onSubscribe({
               onNext: value => subscriber.onNext(f(value, index++)),
               onComplete: () => subscriber.onComplete(),
               onError: error =>subscriber.onError(error)
           });
        });
    }

    filter(pred) {
        return new Publisher(subscriber => {
           let index = 0;

           return this._onSubscribe({
               onNext: value => {
                   const idx = index++;

                   if (pred(value, idx)) {
                       subscriber.onNext(value);
                   }
               },
               onComplete: () => subscriber.onComplete(),
               onError: error =>subscriber.onError(error),
               onSubscribe: subscription => subscriber.onSubscribe(subscription)
           });
        });
    }

    reject(pred) {
        return this.filter((x, index) => !pred(x, index));
    }

    takeWhile(pred) {
        return new Publisher(subscriber => {
            var ret;
            let index = 0;

            ret = this._onSubscribe({
                onNext: value => {
                    if (!pred(value, index++)) {
                        subscriber.onComplete();
                        ret.close();
                    } else {
                        subscriber.onNext(value);
                    }
                },
                onComplete: () => subscriber.onComplete(),
                onError: error =>subscriber.onError(error),
                onSubscribe: subscription => subscriber.onSubscribe(subscription)
            });

            return ret;
        });
    }

    take(n) {
        return this.takeWhile((value, index) => index < n);
    }

    forEach(subscriber) {
        this.subscribe(subscriber)
            .request(Infinity);
    }

    asBehavior(initalValueSupplier = () => null) {
        return new Behavior(initialValueSupplier, this);
    }

    toArray() {
        return new Promise((resolve, reject) => {
            const arr = [];

             this.forEach({
                 onNext: value => { arr.push(value); },
                 onComplete: () => resolve(arr),
                 onError: error => { arr.length = 0; reject(error); }
             });
        })
    }

    static of(...items) {
        const values = items.slice();
        return this.range(0, values.length).map(n => values[n]);
    }

    static from(items) {
        if (typeof items === 'function') {
            return Publisher.from(new Stream(items));
        } else if (items && typeof items[Symbol.iterator] === 'function') {
            return new Publisher(subscriber => {
                let isClosed = false,
                    iterator = null;

                const ret = new Subscription(
                    () => {
                        if (iterator !== null) {
                            // TODO - how to close iterator???
                        }

                        isClosed = true;
                    },
                    n => {
                        let callback = () => {
                            if (!isClosed) {
                                if (iterator === null) {
                                    iterator = items[Symbol.iterator]();
                                }

                                let next = iterator.next();

                                if (!next.done || next.value !== undefined) {
                                    subscriber.onNext(next.value);
                                } else if (next.done) {
                                    subscriber.onComplete();

                                    ret.close();
                                }
                            }

                            if (--n > 0) {
                                setTimeout(callback, 0);
                            }
                        };

                        if (iterator === null) {
                            callback();
                        } else {
                            setTimeout(callback, 0);
                        }
                    }
                );

                return ret;
            });
        }

        throw new TypeError();
    }

    static empty() {
        return Publisher.of();
    }

    static iterate(startValues, f) {
        return new Publisher(subscriber => {
            let isCompleted = false,
                values = startValues.slice();

            const subscription = new Subscription(
                () => {
                    isCompleted = true;
                    subscriber.onComplete();
                    subscription.close();
                },
                n => {
                    if (n > 0 && !isCompleted) {
                        const callback = () => {
                            if (!isCompleted) {
                                values.push(f(...values));
                                let nextValue = values.shift();

                                setTimeout(() => {
                                    subscriber.onNext(nextValue);
                                    subscription.request(n - 1);
                                }, 0);
                            }
                        };

                        callback();
                    }
                }
            );

            return subscription;
        });
    }

    static range(start, end) {
        return this.iterate([start], n => n + 1).takeWhile(n => n < end);
    }

    static merge(...publishers) {
        return new Publisher(subscriber => {
            let numberOfRequestedValues = 0,
                numberOfActivePublishers = publishers.length,
                subscription;

            const valueQueue = [],
                subscriptions = publishers.map(publisher => publisher.subscribe({
                    onNext: value => {
                        if (numberOfRequestedValues === 0) {
                            valueQueue.push(value);
                        } else {
                            subscriber.onNext(value);

                            if (--numberOfRequestedValues > 0) {
                                subscriptions.forEach(subscription => subscription.request(1));
                            }
                        }
                    },
                    onComplete: () => {console.log(">>>>", numberOfActivePublishers)
                        if (--numberOfActivePublishers === 0) {
                            subscriber.onComplete();
                        }
                    },
                    onError: error => {
                        subscription.close();
                        subscriber.onError(error);
                    },
                    onSubscribe: subscription => {

                    }
                }));

                return new Subscription(
                    () => subscriptions.forEach(subscription => subscription.close()),
                    n => {
                        while (n > 0 && valueQueue.length > 0) {
                            let nextValue = valueQueue.shift();

                            setTimeout(() => subscriber.onNext(nextValue), 0);
                            --n;
                        }

                        if (n > 0) {
                            numberOfRequestedValues = n;
                            subscriptions.forEach(subscription => setTimeout(
                                () => subscription.request(1),0));
                        }
                    }
                );
        });
    }
}

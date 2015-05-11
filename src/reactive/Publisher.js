import Subscriber from "./Subscriber";
import Subscription from "./Subscription";

export default class Publisher {
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
        var ret;

        if (items instanceof Array) {
            ret = Publisher.of(...items);
        } else {
            throw new TypeError();
        }

        return ret;
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
                    if (!isCompleted) {
                        const callback = () => {
                            if (!isCompleted) {
                                values.push(f(...values));
                                subscriber.onNext(values.shift())

                                setTimeout(callback);
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
}

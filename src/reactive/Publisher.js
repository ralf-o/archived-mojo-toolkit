import Subscriber from "./Subscriber.js";

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

           this._onSubscribe({
               onNext: value => subscriber.onNext(f(value, index++)),
               onComplete: () => subscriber.onComplete(),
               onError: error =>subscriber.onError(error)
           });
        });
    }

    forEach(subscriber) {
        const subscription = this.subscribe(subscriber);

        subscription.request(Infinity);
    }

    static of(...items) {
        return new Publisher(subscriber => {
            let isCompleted = false,
                index = 0;

            return new Subscription(
                () => { isCompleted = true; subscriber.onComplete(); },
                n => {
                    if (!isCompleted) {
                        while (index < items.length) {
                            setTimeout(() => subscriber.onNext(items[index++]), 0);
                        }

                        if (index == items.length) {
                            isCompleted = true;
                            subscriber.onComplete();
                        }
                    }
                }
            );
        });
    }
}

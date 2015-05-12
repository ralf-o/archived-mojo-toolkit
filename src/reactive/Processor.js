import Publisher from "./Publisher.js";

export default class Processor extends Publisher {
    constructor(onSubscribe) {
        super(subscriber => {
            if (this._subscriptionMap.has(subscriber)) {
                throw "A subscriber must not subscribe mutliple times";
            }

            let subscription = onSubscribe(subscriber);

            this.subscriptionMap.set(subscriber, new Subscription(
                    () => { subscription.close(); this.subscriptionMap.remove(subscriber); },
                    n => subscription.request(n)));

        });

        this._subscriptionMap = new Map();
    }

    onNext(value) {
        for (let subscriber of this._subscriptionMap.keys()) {
            subscriber.onNext(value);
        }
    }

    onComplete() {
        for (let subscriber of this._subscriptionMap.keys()) {
            subscriber.onComplete();
        }
    }

    onError(error) {
        for (let subscriber of this._subscriptionMap.keys()) {
            subscriber.onError(error);
        }
    }

    toPublisher() {
        return new Publisher(subscriber => this.subscribe(subscriber));
    }
}

import Publisher from "./Publisher.js";

export default class Processor extends Publisher {
    constructor(onSubscribe = subscriber => Subscription.empty()) {
        super(subscriber => {
            if (this._subscriptionMap.has(subscriber)) {
                throw "A subscriber must not subscribe mutliple times";
            }

            const innerSubscription = onSubscribe(subscriber),
                  outerSubscription = new Subscription(
                    () => { subscription.close(); this.subscriptionMap.remove(subscriber); },
                    n => subscription.request(n));

            this.subscriptionMap.set(subscriber, outerSubscription);
            return outerSubscription;
        });

        this._lastValue = null;
        this._lastValueIsSet = false;
        this._subscriptionMap = new Map();
    }

    onNext(value) {
        this._lastValue = value;
        this._lastValueIsSet = false;

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

    asPublisher() {
        return new Publisher(subscriber => this.subscribe(subscriber));
    }

    asBehavior(initialValueSupplier = () => null) {
        const valueSupplier = () => this._lastValueIsSet
                ? this._lastValue
                : initialValueSupplier();

        return new Behavior(valueSupplier, this);
    }
}

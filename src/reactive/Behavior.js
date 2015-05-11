import Publisher from "./Publisher.js";

export default class Behavior extends Publisher {
    constructor(initialValueSupplier, onSubscribe) {
        super(subscriber => {
            subscriber.onNext(initialValueSupplier());
            return onSubscribe(subscriber);
        });
    }
}

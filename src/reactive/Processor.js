import Publisher from "./Publisher.js";

export default class Processor extends Publisher {
    construct(onSubscribe) {
        this._subscriptionMap = new Map();
        
        super(subscriber => {
            if (this._subscriptionMap.has(subscriber)) {
                throw "A subscriber must subscribe mutliple times";
            }
            
            let subscription = onSubscribe(subscriber);
            
            this.subscriptionMap.set(subscriber, new Subscription(
                    () => { subscription.close(); this.subscriptionMap.remove(subscriber); },
                    n => subscription.request(n));
                                     
        }.bind(this));
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
}
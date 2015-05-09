import Behavior from "./Behavior.js";
import Processor from "./Processor.js";


export default class BehaviorProcessor extends Behavior {
    constructor(initialValue) {
        this._value = initalValue;
        this._processor = new Processor();
        super(() => this.value, )
    }
    
    asBahavior() {
        let value = null;
        return new Behavior(() => value, this);
    }
    
    asProcessor() {
        return new Processor(subscriber => this.subscribe(subscriber));
    }
}
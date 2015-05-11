import Behavior from "./Behavior.js";
import Processor from "./Processor.js";


export default class BehaviorProcessor extends Behavior {
    constructor(initialValue) {
        super();
        this._value = initalValue;
        this._processor = new Processor();
    //    super(() => this.value, )
    // TODO
    }

    asBahavior() {
        let value = null;
        return new Behavior(() => value, this);
    }

    asProcessor() {
        return new Processor(subscriber => this.subscribe(subscriber));
    }
}

import Behavior from "./reactive/Behavior.js";
import Processor from "./reactive/Processor.js";
import Publisher from "./reactive/Publisher.js";
import Subscriber from "./reactive/Subscriber.js";
import Subscription from "./reactive/Subscription.js";
import Stream from "./util/Stream.js";

window.mojo = {
    util: {
        Stream: Stream
    },
    reactive: {
        Beahvior: Behavior,
        Processor: Processor,
        Publisher, Publisher,
        Subscriber: Subscriber,
        Subscription: Subscription
    }
};

export default window.mojo;

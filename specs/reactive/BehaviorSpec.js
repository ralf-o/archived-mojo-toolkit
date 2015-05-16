import chai from "chai";
import Publisher from "../../src/reactive/Publisher";
import Behavior from "../../src/reactive/Behavior";
import Stream from "../../src/util/Stream";

describe('Testing static factory methods of Behavior', () => {
    it('Should create behavior of single static item (method Behavior.just)', () =>
        Behavior.just(2)
                .toArray()
                .then(arr => chai.expect(arr).to.eql([2]))
    );

    it('Should combine multiple behaviors (method Behavior.combine)', () =>
        Behavior.combine(
                    [new Behavior(() => 1, Publisher.of(2, 3, 4, 5, 6)),
                    new Behavior(() => 10, Publisher.of(15, 17))],
                    (n, m) => n + m
                )
                .toArray()
                .then(arr => {console.log(arr); chai.expect(arr).to.eql([11, 12, 17, 18, 20, 21, 22, 23])})
    );
});

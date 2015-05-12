import chai from "chai";
import Publisher from "../../src/reactive/Publisher";

describe('Testing static factory methods of Publisher', () => {
    it('Should create Publisher of items (static method "Publisher.of")', () =>
        Publisher.of(2, 4, 7)
            .toArray()
            .then(arr => chai.expect(arr).to.eql([2, 4, 7]))
    );
});

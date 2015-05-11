import chai from "chai";
import Publisher from "../../src/reactive/Publisher";

describe('Testing Publihser', () => {
    it('Should bla bla bla', () =>
        Publisher.of(1, 10)
            .take(10)
            .toArray()
            .then(arr => console.log(arr))
    );
});

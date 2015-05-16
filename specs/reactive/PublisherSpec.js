import chai from "chai";
import Publisher from "../../src/reactive/Publisher";
import Stream from "../../src/util/Stream";

describe('Testing static factory methods of Publisher', () => {
    it('Should create empty Publisher (method Publisher.empty)', () =>
        Publisher.empty()
                .toArray()
                .then(arr => chai.expect(arr).to.eql([]))
    );

    it('Should create Publisher of items (method Publisher.of)', () =>
        Publisher.of(2, 4, 7)
                .toArray()
                .then(arr => chai.expect(arr).to.eql([2, 4, 7]))
    );

    it('Should create Publisher of array (method Publisher.from)', () =>
        Publisher.from([1, 2, 4, 9, 16])
                .toArray()
                .then(arr => chai.expect(arr).to.eql([1, 2, 4, 9, 16]))
    );

    it('Should create Publisher of generator (method Publisher.from)', () => {
        const generator = function* () {
            yield 1;
            yield 2;
            yield 4;
            yield 9;
            yield 16;
        };

        return Publisher.from([1, 2, 4, 9, 16])
                .toArray()
                .then(arr => chai.expect(arr).to.eql([1, 2, 4, 9, 16]));
    });

    it('Should create Publisher of stream (method Publisher.from)', () =>
        Publisher.from(Stream.of(1, 2, 4, 9, 16))
                .toArray()
                .then(arr => chai.expect(arr).to.eql([1, 2, 4, 9, 16]))
    );

    it('Should create publisher from iteration (method Publisher.iterate)', () =>
        Publisher.iterate([1, 1], (n, m) => n + m)
                .take(5)
                .toArray()
                .then(arr => chai.expect(arr).to.eql([1, 1, 2, 3, 5]))
    );

    it('Should create publisher of number range (method Publisher.range)', () =>
        Publisher.range(2, 5)
                .toArray()
                .then(arr => chai.expect(arr).to.eql([2, 3, 4]))
    );

    it('Should create publisher of empty number range (method Publisher.range)', () =>
        Publisher.range(0, 0)
                .toArray()
                .then(arr => chai.expect(arr).to.eql([]))
    );

    it('Should merge several publishers (method Publisher.merge)', () =>
        Publisher.merge(Publisher.of(1, 2, 3 ), Publisher.of(10, 11, 12, 13, 14))
                .toArray()
                .then(arr => chai.expect(arr).to.eql([1, 10, 2, 11, 3, 12, 13, 14]))
    );
});

describe('Testing non-static methods of Publisher', () => {
    it('Should be mappable (method "Publisher#map")', () =>
        Publisher.of(1, 2, 3, 4)
                .map(n => n * n)
                .toArray()
                .then(arr => chai.expect(arr).to.eql([1, 4, 9, 16]))
    );

    it('Should allow to filter of items (method Publisher#filter)', () =>
        Publisher.of(1, 2, 3, 4, 5)
                .filter(n => n % 2 !== 0)
                .toArray()
                .then(arr => chai.expect(arr).to.eql([1, 3, 5]))
    );

    it('Should allow to take a limited number of items (method Publisher#take)', () =>
        Publisher.of(1, 4, 9, 16, 25)
                .take(3)
                .toArray()
                .then(arr => chai.expect(arr).to.eql([1, 4, 9]))
    );
});

import chai from "chai";
import Stream from "../../src/util/Stream";

describe('Test constructor of Stream', () => {
    it('Should construct new Streamuences properly when using generators', () =>
        chai.expect(
            new Stream(function* () {
                yield 1;
                yield 2;
                yield 3;
            })
            .toArray())
            .to.eql([1, 2, 3])
    );

    it('Should construct new Streams properly when using normal methods (variant 1)', () => {

        const stream = new Stream(() => {
            let counter = 0;
            return () => counter < 5 ? [counter++] : [];
        });

        chai.expect(stream.toArray()).to.eql([0, 1, 2, 3, 4]);
    });

    it('Should construct new Streams properly when using normal methods (variant 2)', () => {
        let isClosed = false;

        const stream = new Stream(() => {
            let counter = 0;

            return {
                generate: () => counter < 5 ? [counter++] : [],
                close: () => isClosed = true
            };
        });

        chai.expect(stream.toArray()).to.eql([0, 1, 2, 3, 4]);
        chai.expect(isClosed).to.equal(true);
    });
});

describe('Test static factory methods', () => {
    it('Should convert array to stream properly', () =>
        chai.expect(
            Stream.from([2, 4, 6])
                .toArray())
                .to.eql([2, 4, 6])
    );
});

describe('Test method Stream#map', () => {
    it('Should map integer values to their square numbers properly', () =>
        chai.expect(
            Stream.of(1, 2, 3)
            .map(n => n * n)
            .toArray())
            .to.eql([1, 4, 9])
    );

    it('Should map empty Streamuences to empty Streamuences', () =>
        chai.expect(
            Stream.of()
            .map(n => n * 2)
            .toArray()
            .length)
            .to.equal(0)
    );
});

describe('Test method Stream#filter', () => {
    it('Should filter even numbers from Streamuence of numbers properly', () =>
        chai.expect(
            Stream.range(1, 9)
            .filter(n => n % 2 == 0)
            .toArray())
            .to.eql([2, 4, 6, 8])
    );
});

'use strict';

import {describe, it} from 'mocha';
import {expect} from 'chai';
import Stream from '../../src/module/Stream';

/**
 * @test {Stream}
 */
describe('Testing constructor of Stream', () => {
    it('should construct new Streams using generators', () =>
        expect(new Stream(function* () { yield 1; yield 2; yield 3; })
                .toArray())
                .to.eql([1, 2, 3])
    );

    it('should construct new Streams using normal methods (variant 1)', () => {
        const stream = new Stream(() => {
            let counter = 0;
            return () => counter < 5 ? [counter++] : [];
        });

        expect(stream.toArray()).to.eql([0, 1, 2, 3, 4]);
    });

    it('should construct new Streams using normal methods (variant 2)', () => {
        let isClosed = false;

        const stream = new Stream(() => {
            let counter = 0;

            return {
                generate: () => counter < 5 ? [counter++] : [],
                close: () => isClosed = true
            };
        });

        expect(stream.toArray()).to.eql([0, 1, 2, 3, 4]);
        expect(isClosed).to.equal(true);
    });
});

/**
 * @test {Stream.empty}
 */
describe('Testing static factory method Stream.empty', () => {
    it('should return an empty stream', () =>
        expect(Stream.empty().toArray())
                .to.eql([])
    );
});

/**
 * @test {Stream.of}
 */
describe('Testing static factory method Stream.of', () => {
    it('should create a stream from a some given items', () =>
        expect(Stream.of(2, 4, 6)
                .toArray())
                .to.eql([2, 4, 6])
    );

    it('should return an empty stream if no item is provided', () =>
        expect(Stream.of()
                .toArray())
                .to.eql([])
    );
});

/**
 * @test {Stream.empty}
 */
// TODO: Handling of ClojureScript "Seqable" objects not tested yet
describe('Testing static factory method Stream.from', () => {
    it('should create a stream from an iterable object (=> object[Symbol.iterator])', () =>
        expect(Stream.from([2, 4, 6])
                .toArray())
                .to.eql([2, 4, 6])
    );

    it('should return a stream of characters if a string is given as input', () =>
        expect(Stream.from('Hello').toArray())
                .to.eql(['H', 'e', 'l', 'l', 'o'])
    );

    it('should return the same stream if a stream is given as input', () => {
        const stream = Stream.of(2, 4, 6);

        expect(Stream.from(stream))
                .to.equal(stream);
    });

    it('should return an empty stream if the input is not streamable', () =>
        [undefined, null, true, false, {prop: 42}].forEach(value =>
                expect(Stream.from(value).count()).to.be.zero)
    );
});

/**
 * @test {Stream.concat}
 */
describe('Testing static method Stream.concat', () => {
    it ('should concatenate multiple streams', () =>
        expect(Stream.concat(Stream.of(1, 2, 3), Stream.of(44, 55, 66)).toArray())
                .to.eql([1, 2, 3, 44, 55, 66])
    );

    it ('should concatenate multiple streamables', () =>
        expect(Stream.concat([1, 2, 3], Stream.of(44, 55, 66)).toArray())
                .to.eql([1, 2, 3, 44, 55, 66])
    );

    it ('should concatenate empty streams to an empty stream', () =>
        expect(Stream.concat(Stream.empty(), Stream.from([])).toArray())
                .to.eql([])
    );

    it ('should concatenate empty streamables to an empty stream', () =>
        expect(Stream.concat([], Stream.from([])).toArray())
                .to.eql([])
    );
});

/**
 * @test {Stream.flatten}
 */
describe('Testing static method Stream.flatten', () => {
    it ('should flatten a stream of streams to a concatenated stream', () =>
        expect(Stream.flatten(Stream.of(Stream.of(1, 2, 3), Stream.of(44, 55, 66))).toArray())
                .to.eql([1, 2, 3, 44, 55, 66])
    );

    it ('should flatten a stream of streamables to a concatenated stream', () =>
        expect(Stream.flatten(Stream.of([1, 2, 3], [44, 55, 66])).toArray())
                .to.eql([1, 2, 3, 44, 55, 66])
    );

    it ('should flatten a streamable of streamables to a concatenated stream', () =>
        expect(Stream.flatten([[1, 2, 3], [44, 55, 66]]).toArray())
                .to.eql([1, 2, 3, 44, 55, 66])
    );

    it ('should flatten an empty stream to an empty stream', () =>
        expect(Stream.flatten(Stream.empty()).count())
                .to.eql(0)
    );

    it ('should fllatten an empty streamable to an empty stream', () =>
        expect(Stream.flatten([]).toArray())
                .to.eql([])
    );
})
/**
 * @test {Stream.iterate}
 */
describe('Testing static factory method Stream.iterate', () => {
    it('should build stream of natural numbers', () =>
        expect(Stream.iterate([1], (n) => n + 1)
                .take(5)
                .toArray())
                .to.eql([1, 2, 3, 4, 5])
    );

    it('should build stream of fibonacci numbers', () =>
        expect(Stream.iterate([1, 1], (n1, n2) => n1 + n2)
                .take(7)
                .toArray())
                .to.eql([1, 1, 2, 3, 5, 8, 13])
    );
});

/**
 * @test {Stream.repeat}
 */
describe('Testing static factory method Stream.repeat', () => {
    it('should generate a stream 4 zeros', () =>
        expect(Stream.repeat(0, 4)
                .toArray())
                .to.eql([0, 0, 0, 0])
    );
});

/**
 * @test {Stream.range}
 */
describe('Testing static factory method Stream.range', () => {
    it('should generate a stream of the first five natural numbers', () =>
        expect(Stream.range(1, 5)
                .toArray())
                .to.eql([1, 2, 3, 4])
    );

    it('should generate a stream of some succeeding even negative natural numbers', () =>
        expect(Stream.range(-2, -10, -2)
                .toArray())
                .to.eql([-2, -4, -6, -8])
    );

    it('should support infinite ranges of positive number', () =>
        expect(Stream.range(1)
                .take(2000)
                .count())
                .to.eql(2000)
    );

    it('should support infinite ranges of negative number', () =>
        expect(Stream.range(-1, -Infinity, -1)
                .take(2000)
                .count())
                .to.eql(2000)
    );
});

/**
 * @test {Stream.isStreamable}
 */
describe('Testing static method Stream.isStreamable', () => {
    it('should determine whether or not an object is streamable', () => {
        const f = Stream.isStreamable;

        expect([f(undefined), f(null), f(true), f(42), f([]), f([1, 2]), f('hello'), f(Stream.empty())])
                .to.eql([false, false, false, false, true, true, true, true]);
    });
});

/**
 * @test {Stream#map}
 */
describe('Testing method Stream#map', () => {
    it('should map integer values to their square numbers', () =>
        expect(Stream.of(1, 2, 3)
                .map(n => n * n)
                .toArray())
                .to.eql([1, 4, 9])
    );

    it('should map empty Streams to empty streams', () =>
        expect(Stream.of()
                .map(n => n * 2)
                .toArray()
                .length)
                .to.equal(0)
    );

    it('should map empty Streams to empty streams', () =>
        expect(Stream.empty()
                .map(n => n * 2)
                .toArray()
                .length)
                .to.equal(0)
    );

    it('should throw a TypeError if alleged function is not really a function', () =>
        expect(() => Stream.empty().map('invalid!!!'))
                .to.throw(TypeError)
    );
});

/**
 * @test {Stream#filter}
 */
describe('Testing method Stream#filter', () => {
    it('should filter even numbers from stream of numbers', () =>
        expect(Stream.range(1, 9)
                .filter(n => n % 2 == 0)
                .toArray())
                .to.eql([2, 4, 6, 8])
    );

    it('should map empty stream to empty stream', () =>
        expect(Stream.empty()
                .filter(n => n % 2 == 0)
                .toArray())
                .to.eql([])
    );

    it('should throw a TypeError if alleged function is not really a function', () =>
        expect(() => Stream.empty().filter('invalid!!!'))
                .to.throw(TypeError)
    );
});

/**
 * @test {Stream#flatMap}
 */
describe('Testing method Stream#flatMap', () => {
    it('should map stream to stream of streams and flatten the result afterwards', () =>
        expect(Stream.of(1, 2, 3)
                .flatMap(item => Stream.of([item, item * 10]))
                .toArray())
                .to.eql([[1, 10], [2, 20], [3, 30]])
    );

    it('should allow list comprehension with streams', () =>
        expect(Stream.of('A', 'B')
                .flatMap(a => Stream.of(1, 2, 3)
                                    .flatMap(b => Stream.of('' + a + b)))
                .toArray())
                .to.eql(['A1', 'A2', 'A3', 'B1', 'B2', 'B3'])
    );
});

/**
 * @test {Stream#takeWhile}
 */
describe('Testing method Stream#takeWhile', () => {
    it('should select the first 10 natural numbers', () =>
        expect(Stream.range(1, 20)
                .takeWhile(n => n <= 10)
                .toArray())
                .to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    );

    it('should return an empty stream if the first item is not matching the predicate yet', () =>
        expect(Stream.range(1, 5)
                .takeWhile(n => n > 10)
                .toArray())
                .to.eql([])
    );

    it('should map empty stream to empty stream', () =>
        expect(Stream.empty()
                .takeWhile(n => n < 10)
                .toArray())
                .to.eql([])
    );

    it('should throw a TypeError if alleged predicate is not really a function', () =>
        expect(() => Stream.empty().takeWhile('invalid!!!'))
                .to.throw(TypeError)
    );
});

/**
 * @test {Stream#skipWhile}
 */
describe('Testing method Stream#skipWhile', () => {
    it('should skip the first 10 natural numbers', () =>
        expect(Stream.range(1, 20)
                .skipWhile(n => n <= 10)
                .toArray())
                .to.eql([11, 12, 13, 14, 15, 16, 17, 18, 19])
    );

    it('should return an empty stream none of the item is not matching the predicate', () =>
        expect(Stream.range(1, 5)
                .skipWhile(n => n < 10)
                .toArray())
                .to.eql([])
    );

    it('should map empty stream to empty stream', () =>
        expect(Stream.empty()
                .skipWhile(n => n < 10)
                .toArray())
                .to.eql([])
    );

    it('should throw a TypeError if alleged predicate is not really a function', () =>
        expect(() => Stream.empty().skipWhile('invalid!!!'))
                .to.throw(TypeError)
    );
});

/**
 * @test {Stream#take}
 */
describe('Testing method Stream#take', () => {
    it('should return a stream the first 5 items of a stream of length 10', () =>
        expect(Stream.range(0, 10)
                .take(5)
                .toArray())
                .to.eql([0, 1, 2, 3, 4,])
    );

    it('should return an empty stream if the number of items to select is zero', () =>
        expect(Stream.range(0, 5)
                .take(0)
                .toArray())
                .to.eql([])
    );

    it('should return an empty stream if the number of items to select is negative', () =>
        expect(Stream.range(0, 5)
                .take(-10)
                .toArray())
                .to.eql([])
    );
});

/**
 * @test {Stream#skip}
 */
describe('Testing method Stream#skip', () => {
    it('should skip the first 5 items of a stream of length 10', () =>
        expect(Stream.range(0, 10)
                .skip(5)
                .toArray())
                .to.eql([5, 6, 7, 8, 9])
    );

    it('should return an equal stream if the number of items to skip is zero', () =>
        expect(Stream.range(0, 5)
                .skip(0)
                .toArray())
                .to.eql([0, 1, 2, 3, 4])
    );

    it('should return an empty stream if the number of  items to skip is negative', () =>
        expect(Stream.range(0, 5)
                .take(-10)
                .toArray())
                .to.eql([])
    );
});

/**
 * @test {Stream#reduce}
 */
describe('Testing method Stream#reduce', () => {
    it('should return the seed if applied on empty streams', () =>
        expect(Stream.empty()
                .reduce((a, b) => '' + a + b, 'seed'))
                .to.eql('seed')
    );

    it('should determine the sum of the first 5 natural numbers', () =>
        expect(Stream.range(1, 6)
                .reduce((a, b) => a + b, 0))
                .to.eql(15)
    );
});

/**
 * @test {Stream#count}
 */
describe('Testing method Stream#count', () => {
    it('should determine the length of an empty stream as zero', () =>
        expect(Stream.empty()
                .count())
                .to.eql(0)
    );

    it('should determine the length of a non-empty stream', () =>
        expect(Stream.range(0, 5)
                .count(5))
                .to.eql(5)
    );
});

/**
 * @test {Stream#forEach}
 */
describe('Testing method Stream#forEach', () => {
    it('should do nothing if applied on an empty stream', () =>
        expect(() => Stream.empty()
                .forEach(item => { throw 'error' }))
                .to.not.throw('error')
    );

    it('should run a given action on each element of an non-empty stream', () => {
        const result = [];

        Stream.range(0, 5)
                .forEach(item => result.push(item));

        expect(result).to.eql([0, 1, 2, 3, 4]);
    });
});

/**
 * @test {Stream#toArray}
 */
describe('Testing method Stream#toArray', () => {
    it('should convert an empty stream to an empty array', () =>
        expect(Stream.empty()
                .toArray())
                .to.eql([])
    );

    it('should convert a non-empty stream to a corresponding non-empty array', () =>
        expect(Stream.of(2, 4, 42)
                .toArray())
                .to.eql([2, 4, 42])
    );
});

/**
 * @test {Stream#force}
 */
describe('Testing method Stream#force', () => {
    it('should convert an empty stream to an empty stream', () =>
        expect(Stream.empty()
                .force()
                .toArray())
                .to.eql([])
    );

    it('should iterate and cache a given stream immediately', () => {
        let counter = 0;

        const stream = Stream.of(2, 4, 42)
                .map(item => { ++counter; return item; })
                .force();

        const counter1 = counter;

        // Try another force the make sure items have been cached before (= counter will not increase any longer)
        stream.force();

        const counter2 = counter;

        expect(counter1).to.eql(3)
                && expect(counter2).to.eql(3)
                && expect(stream.toArray()).to.eql([2, 4, 42]);
    });
});

'use strict';

import {describe, it} from 'mocha';
import {expect} from 'chai';
import Stream from '../../src/module/Stream';

describe('Testing constructor of Stream', () => {
    it('Should construct new Streams using generators', () =>
        expect(new Stream(function* () { yield 1; yield 2; yield 3; })
                .toArray())
                .to.eql([1, 2, 3])
    );

    it('Should construct new Streams using normal methods (variant 1)', () => {
        const stream = new Stream(() => {
            let counter = 0;
            return () => counter < 5 ? [counter++] : [];
        });

        expect(stream.toArray()).to.eql([0, 1, 2, 3, 4]);
    });

    it('Should construct new Streams using normal methods (variant 2)', () => {
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

describe('Testing static factory method Stream.empty', () => {
    it('Should return an empty stream', () =>
        expect(Stream.empty().toArray())
                .to.eql([])
    );
});

describe('Testing static factory method Stream.of', () => {
    it('Should create a stream from a some given items', () =>
        expect(Stream.of(2, 4, 6)
                .toArray())
                .to.eql([2, 4, 6])
    );

    it('Should return an empty stream if no item is provided', () =>
        expect(Stream.of()
                .toArray())
                .to.eql([])
    );
});

// TODO: Handling of ClojureScript "Seqable" objects not tested yet
describe('Testing static factory method Stream.from', () => {
    it('Should create a stream from an iterable object (=> object[Symbol.iterator])', () =>
        expect(Stream.from([2, 4, 6])
                .toArray())
                .to.eql([2, 4, 6])
    );

    it('Should return a stream of characters if a string is given as input', () =>
        expect(Stream.from('Hello').toArray())
                .to.eql(['H', 'e', 'l', 'l', 'o'])
    );

    it('Should return the same stream if a stream is given as input', () => {
        const stream = Stream.of(2, 4, 6);

        expect(Stream.from(stream))
                .to.equal(stream);
    });

    it('Should return an empty stream if the input is not streamable', () =>
        [undefined, null, true, false, {prop: 42}].forEach(value =>
                expect(Stream.from(value).count()).to.be.zero)
    );
});

describe('Testing static factory method Stream.iterate', () => {
    it('Should build stream of natural numbers', () =>
        expect(Stream.iterate([1], (n) => n + 1)
                .take(5)
                .toArray())
                .to.eql([1, 2, 3, 4, 5])
    );

    it('Should build stream of fibonacci numbers', () =>
        expect(Stream.iterate([1, 1], (n1, n2) => n1 + n2)
                .take(7)
                .toArray())
                .to.eql([1, 1, 2, 3, 5, 8, 13])
    );
});

describe('Testing static factory method Stream.repeat', () => {
    it('Should generate a stream 4 zeros', () =>
        expect(Stream.repeat(0, 4)
                .toArray())
                .to.eql([0, 0, 0, 0])
    );
});

describe('Testing static factory method Stream.range', () => {
    it('Should generate a stream of the first five natural numbers', () =>
        expect(Stream.range(1, 5)
                .toArray())
                .to.eql([1, 2, 3, 4])
    );

    it('Should generate a stream of some succeeding even negative natural numbers', () =>
        expect(Stream.range(-2, -10, -2)
                .toArray())
                .to.eql([-2, -4, -6, -8])
    );

    it('Should support infinite ranges of positive number', () =>
        expect(Stream.range(1)
                .take(2000)
                .count())
                .to.eql(2000)
    );

    it('Should support infinite ranges of negative number', () =>
        expect(Stream.range(-1, -Infinity, -1)
                .take(2000)
                .count())
                .to.eql(2000)
    );
});

describe('Testing static method Stream.isStreamable', () => {
    it('Should determine whether or not an object is streamable', () => {
        const f = Stream.isStreamable;

        expect([f(undefined), f(null), f(true), f(42), f([]), f([1, 2]), f('hello'), f(Stream.empty())])
                .to.eql([false, false, false, false, true, true, true, true]);
    });
});

describe('Testing method Stream.map', () => {
    it('Should map integer values to their square numbers', () =>
        expect(Stream.of(1, 2, 3)
                .map(n => n * n)
                .toArray())
                .to.eql([1, 4, 9])
    );

    it('Should map empty Streams to empty streams', () =>
        expect(Stream.of()
                .map(n => n * 2)
                .toArray()
                .length)
                .to.equal(0)
    );

    it('Should map empty Streams to empty streams', () =>
        expect(Stream.empty()
                .map(n => n * 2)
                .toArray()
                .length)
                .to.equal(0)
    );

    it('Should throw a TypeError if alleged function is not really a function', () =>
        expect(() => Stream.empty().map('invalid!!!'))
                .to.throw(TypeError)
    );
});

describe('Testing method Stream.filter', () => {
    it('Should filter even numbers from stream of numbers', () =>
        expect(Stream.range(1, 9)
                .filter(n => n % 2 == 0)
                .toArray())
                .to.eql([2, 4, 6, 8])
    );

    it('Should map empty stream to empty stream', () =>
        expect(Stream.empty()
                .filter(n => n % 2 == 0)
                .toArray())
                .to.eql([])
    );

    it('Should throw a TypeError if alleged function is not really a function', () =>
        expect(() => Stream.empty().filter('invalid!!!'))
                .to.throw(TypeError)
    );
});

describe('Testing method Stream.takeWhile', () => {
    it('Should select the first 10 natural numbers', () =>
        expect(Stream.range(1, 20)
                .takeWhile(n => n <= 10)
                .toArray())
                .to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    );

    it('Should return an empty stream if the first item is not matching the predicate yet', () =>
        expect(Stream.range(1, 5)
                .takeWhile(n => n > 10)
                .toArray())
                .to.eql([])
    );

    it('Should map empty stream to empty stream', () =>
        expect(Stream.empty()
                .takeWhile(n => n < 10)
                .toArray())
                .to.eql([])
    );

    it('Should throw a TypeError if alleged predicate is not really a function', () =>
        expect(() => Stream.empty().takeWhile('invalid!!!'))
                .to.throw(TypeError)
    );
});

describe('Testing method Stream.skipWhile', () => {
    it('Should skip the first 10 natural numbers', () =>
        expect(Stream.range(1, 20)
                .skipWhile(n => n <= 10)
                .toArray())
                .to.eql([11, 12, 13, 14, 15, 16, 17, 18, 19])
    );

    it('Should return an empty stream none of the item is not matching the predicate', () =>
        expect(Stream.range(1, 5)
                .skipWhile(n => n < 10)
                .toArray())
                .to.eql([])
    );

    it('Should map empty stream to empty stream', () =>
        expect(Stream.empty()
                .skipWhile(n => n < 10)
                .toArray())
                .to.eql([])
    );

    it('Should throw a TypeError if alleged predicate is not really a function', () =>
        expect(() => Stream.empty().skipWhile('invalid!!!'))
                .to.throw(TypeError)
    );
});

describe('Testing method Stream.take', () => {
    it('Should return a stream the first 5 items of a stream of length 10', () =>
        expect(Stream.range(0, 10)
                .take(5)
                .toArray())
                .to.eql([0, 1, 2, 3, 4,])
    );

    it('Should return an empty stream if the number of items to select is zero', () =>
        expect(Stream.range(0, 5)
                .take(0)
                .toArray())
                .to.eql([])
    );

    it('Should return an empty stream if the number of items to select is negative', () =>
        expect(Stream.range(0, 5)
                .take(-10)
                .toArray())
                .to.eql([])
    );
});

describe('Testing method Stream.skip', () => {
    it('Should skip the first 5 items of a stream of length 10', () =>
        expect(Stream.range(0, 10)
                .skip(5)
                .toArray())
                .to.eql([5, 6, 7, 8, 9])
    );

    it('Should return an equal stream if the number of items to skip is zero', () =>
        expect(Stream.range(0, 5)
                .skip(0)
                .toArray())
                .to.eql([0, 1, 2, 3, 4])
    );

    it('Should return an empty stream if the number of  items to skip is negative', () =>
        expect(Stream.range(0, 5)
                .take(-10)
                .toArray())
                .to.eql([])
    );
});

describe('Testing method Stream.reduce', () => {
    it('Should return the seed if applied on empty streams', () =>
        expect(Stream.empty()
                .reduce((a, b) => '' + a + b, 'seed'))
                .to.eql('seed')
    );

    it('Should determine the sum of the first 5 natural numbers', () =>
        expect(Stream.range(1, 6)
                .reduce((a, b) => a + b, 0))
                .to.eql(15)
    );
});

describe('Testing method Stream.count', () => {
    it('Should determine the length of an empty stream as zero', () =>
        expect(Stream.empty()
                .count())
                .to.eql(0)
    );

    it('Should determine the length of a non-empty stream', () =>
        expect(Stream.range(0, 5)
                .count(5))
                .to.eql(5)
    );
});

describe('Testing method Stream.forEach', () => {
    it('Should do nothing if applied on an empty stream', () =>
        expect(() => Stream.empty()
                .forEach(item => { throw 'error' }))
                .to.not.throw('error')
    );

    it('Should run a given action on each element of an non-empty stream', () => {
        const result = [];

        Stream.range(0, 5)
                .forEach(item => result.push(item));

        expect(result).to.eql([0, 1, 2, 3, 4]);
    });
});

describe('Testing method Stream.toArray', () => {
    it('Should convert an empty stream to an empty array', () =>
        expect(Stream.empty()
                .toArray())
                .to.eql([])
    );

    it('Should convert a non-empty stream to a corresponding non-empty array', () =>
        expect(Stream.of(2, 4, 42)
                .toArray())
                .to.eql([2, 4, 42])
    );
});

describe('Testing method Stream.force', () => {
    it('Should convert an empty stream to an empty stream', () =>
        expect(Stream.empty()
                .force()
                .toArray())
                .to.eql([])
    );

    it('Should iterate and cache a given stream immediately', () => {
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

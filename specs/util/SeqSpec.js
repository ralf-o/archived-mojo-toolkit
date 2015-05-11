"use strict";

var chai = require("chai"),
    Seq = require("../../src/util/Seq.js");

describe('Test constructor of Seq', () => {
    it('Should construct new sequences properly when using generators', () =>
        chai.expect(
            new Seq(function* () {
                yield 1;
                yield 2;
                yield 3;
            })
            .toArray())
            .to.eql([1, 2, 3])
    );

    it('Should construct new sequences properly when using normal methods', () =>
    {}
    );
});

describe('Test method Seq#map', () => {
    it('Should map integer values to their square numbers properly', () =>
        chai.expect(
            Seq.of(1, 2, 3)
            .map(n => n * n)
            .toArray())
            .to.eql([1, 4, 9])
    );

    it('Should map empty sequences to empty sequences', () =>
        chai.expect(
            Seq.of()
            .map(n => n * 2)
            .toArray()
            .length)
            .to.equal(0)
    );
});

describe('Test method Seq#filter', () => {
    it('Should filter even numbers from sequence of numbers properly', () =>
        chai.expect(
            Seq.range(1, 9)
            .filter(n => n % 2 == 0)
            .toArray())
            .to.eql([2, 4, 6, 8])
    );
});

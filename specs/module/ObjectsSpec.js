'use strict';

import {describe, it} from 'mocha';
import {expect} from 'chai';
import Objects from '../../src/module/Objects';

describe('Testing static function Objects.isSomething', () => {
    it('Should return false if the input is undefined', () =>
        expect(Objects.isSomething(undefined))
                .to.eql(false)
    );

    it('Should return false if the input is null', () =>
        expect(Objects.isSomething(null))
                .to.eql(false)
    );

    it('Should return true if the input is true', () =>
        expect(Objects.isSomething(true))
                .to.eql(true)
    );

    it('Should return true if the input is false', () =>
        expect(Objects.isSomething(false))
                .to.eql(true)
    );

    it('Should return true if the input is zero', () =>
        expect(Objects.isSomething(0))
                .to.eql(true)
    );

    it('Should return true if the input is a non-zero number', () =>
        expect(Objects.isSomething(42))
                .to.eql(true)
    );

    it('Should return true if the input is an empty string', () =>
        expect(Objects.isSomething(''))
                .to.eql(true)
    );

    it('Should return true if the input is a real object', () =>
        expect(Objects.isSomething({}))
                .to.eql(true)
    );
});

describe('Testing static function Objects.isNothing', () => {
    it('Should return true if the input is undefined', () =>
        expect(Objects.isNothing(undefined))
                .to.eql(true)
    );

    it('Should return true if the input is null', () =>
        expect(Objects.isNothing(null))
                .to.eql(true)
    );

    it('Should return false if the input is true', () =>
        expect(Objects.isNothing(true))
                .to.eql(false)
    );

    it('Should return false if the input is false', () =>
        expect(Objects.isNothing(false))
                .to.eql(false)
    );

    it('Should return false if the input is zero', () =>
        expect(Objects.isNothing(0))
                .to.eql(false)
    );

    it('Should return false if the input is a non-zero number', () =>
        expect(Objects.isNothing(42))
                .to.eql(false)
    );

    it('Should return false if the input is an empty string', () =>
        expect(Objects.isNothing(''))
                .to.eql(false)
    );

    it('Should return false if the input is a real object', () =>
        expect(Objects.isNothing({}))
                .to.eql(false)
    );
});


describe('Testing static function Objects.asString', () => {
    it('Should return an empty string if the input is undefined', () =>
        expect(Objects.asString(undefined))
                .to.eql('')
    );

    it('Should return an empty string if the input is null', () =>
        expect(Objects.asString(null))
                .to.eql('')
    );

    it('Should return an empty string if the input is an empty string', () =>
        expect(Objects.asString(''))
                .to.eql('')
    );

    it('Should return an equal string if the input is a non-empty string', () =>
        expect(Objects.asString('some-text'))
                .to.eql('some-text')
    );

    it('Should integer numbers to their corresponding string representations', () =>
        expect(Objects.asString(42))
                .to.eql('42')
    );

    it('Should floating-point numbers to their corresponding string representations', () =>
        expect(Objects.asString(42.420))
                .to.eql('42.42')
    );

    it('Should return the result of the toString method if the input is a real object', () =>
        expect(Objects.asString({toString: () => 'the-toString-result'}))
                .to.eql('the-toString-result')
    );

    it('Should return a string even if the toString method of the input objects itself does not return a string', () =>
        expect(Objects.asString({toString: () => undefined}))
                .to.eql('')
    );
});

// TODO: Test for ClojureScript objects is missing
describe('Testing static function Objects.get', () => {
    it('Should return the property of a given object if the corresponding property is given', () =>
        expect(Objects.get({someProp: 42}, 'someProp'))
                .to.eql(42)
    );

    it('Should return the property of a given object graph if the given path refers a given property', () => {
        const obj = {
                      prop1: {
                          prop2: {
                               prop3: [42]
                          }
                      }
                  };

        expect(Objects.get(obj, ['prop1']).prop2.prop3).to.eql([42])
                && expect(Objects.get(obj, ['prop1', 'prop2']).prop3).to.eql([42])
                && expect(Objects.get(obj, ['prop1', 'prop2', 'prop3'])).to.eql([42])
                && expect(Objects.get(obj, ['prop1', ['prop2', 'prop3']])).to.eql([42])
                && expect(Objects.get(obj, ['prop1', ['prop2', ['prop3']], 0])).to.eql(42);
    });
});

// TODO: Test for ClojureScript objects is missing
describe('Testing static function Objects.toJS', () => {
    it('Should return "normal" JavaScript scalars and values as is', () =>
        [undefined, null, true, false, 0, 42, -42, 'some-text', [1, 2, 3, 42], {prop: 42}].forEach(value =>
            expect(Objects.toJS(value)).to.eql(value))
    );

    it('Should use the __toJS method, if the input objects does provide such a method '
            + '(like for example Immutable.js collections do)', () =>
        expect(Objects.toJS({__toJS: () => ({prop: 42})}))
                .to.eql({prop: 42})
    );
});

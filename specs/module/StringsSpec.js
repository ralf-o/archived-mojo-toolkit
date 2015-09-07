'use strict';

import {describe, it} from 'mocha';
import {expect} from 'chai';
import Strings from '../../src/module/Strings';

describe('Testing static function Strings.trim', () => {
    it('Should trim a non-empty string correctly', () =>
        expect(Strings.trim('   some-text  '))
                .to.eql('some-text')
    );

    it('Should return an equal string if the input string does not have leading or trailing whitespace', () =>
        expect(Strings.trim('some-text'))
                .to.eql('some-text')
    );

    it('Should return an empty string if the input is undefined', () =>
        expect(Strings.trim(undefined))
                .to.eql('')
    );

    it('Should return an empty string if the input is an empty string', () =>
        expect(Strings.trim(''))
                .to.eql('')
    );

    it('Should return an empty string if the input is null', () =>
        expect(Strings.trim(null))
                .to.eql('')
    );

    it('Should return the result of the toString() method if a real object is provided as input', () =>
        expect(Strings.trim({toString: () => 'the-toString-result'}))
                .to.eql('the-toString-result')
    );
});

describe('Testing static function Strings.trimToNull', () => {
    it('Should trim a non-empty string with leading or trailing whitespace correctly', () =>
        expect(Strings.trimToNull('   some-text  '))
              .to.eql('some-text')
    );

    it('Should return an equal string if the input string does not have leading or trailing whitespace', () =>
        expect(Strings.trimToNull('some-text'))
                .to.eql('some-text')
    );

    it('Should return null if the input is undefined', () =>
        expect(Strings.trimToNull(undefined))
                .to.eql(null)
    );

    it('Should return null if the input is an empty string', () =>
        expect(Strings.trimToNull(''))
                .to.eql(null)
    );

    it('Should return null if the input is null', () =>
        expect(Strings.trimToNull(null))
                .to.eql(null)
    );

    it('Should return the result of the toString() method if a real object is provided as input', () =>
        expect(Strings.trimToNull({toString: () => 'the-toString-result'}))
                .to.eql('the-toString-result')
    );
});
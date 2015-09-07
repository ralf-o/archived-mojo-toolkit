'use strict';

import {describe, it} from 'mocha';
import {expect} from 'chai';
import Arrays from '../../src/module/Arrays';

describe('Testing static function Arrays.select', () => {
    it('Should select a given value from an array', () =>
        expect(Arrays.selectValue(['value1', 'value2', 'value3'], 'value2'))
                .to.eql('value2')
    );

    it('Should return undefined when tying to select an non-given value from an array', () =>
        expect(Arrays.selectValue(['value1', 'value2', 'value3'], 'value4'))
                .to.eql(undefined)
    );

    it('Should return a given default value when tying to select an non-given value from an array', () =>
        expect(Arrays.selectValue(['value1', 'value2', 'value3'], 'value4', 'the-default-value'))
                .to.eql('the-default-value')
    );
});
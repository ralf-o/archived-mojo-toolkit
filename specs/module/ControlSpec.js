'use strict';

import {describe, it} from 'mocha';
import {expect} from 'chai';
import Control from '../../src/module/Control';
import Stream from '../../src/module/Seq';

/**
 * @test {Control.doMonad}
 */
describe('Testing static function Control.doMonad', () => {
    it('should process a monadic generator function properly', () => {
        const stream = Control.doMonad(function* () {
            const a = yield Stream.of('A', 'B'),
                  b = yield Stream.of(1, 2, 3);

            return Stream.of('' + a + b);
        });

        expect(stream.toArray())
                .to.eql(['A1', 'A2', 'A3', 'B1', 'B2', 'B3']);
    });
});
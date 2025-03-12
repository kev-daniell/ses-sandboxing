import assert from 'assert';
import { describe, it } from 'node:test';
import { BTC } from '@ses/btc';
import { fooUsingDeps } from '../src/index.js';

describe('Harden Transitivity Tests', function () {
    it('1 degree of transitivity', function () {
        assert.throws(() => {
            fooUsingDeps('x');

            const b = new BTC();
            b.importantMethod();
        }, { message: "Cannot assign to read only property 'importantMethod' of object '[object Object]'"});
    });

    it('2 degrees of transitivity', function () {
        assert.throws(() => {
            fooUsingDeps('y');

            const b = new BTC();
            b.importantMethod();
        }, { message: "Cannot assign to read only property 'importantMethod' of object '[object Object]'"});
    });
    
    it('3 degrees of transitivity', function () {
        assert.throws(() => {
            fooUsingDeps('z');

            const b = new BTC();
            b.importantMethod();
        }, { message: "Cannot assign to read only property 'importantMethod' of object '[object Object]'"});
    });
});
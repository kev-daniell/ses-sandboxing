
import assert from 'assert';
import { test } from 'node:test';
import * as _ from '@ses/successful-attack';
import { BTC } from '@ses/btc';

test('should successfully attack BTC', () => {
    const b = new BTC();
    const result = b.importantMethod();
    assert.strictEqual(result, 'hijacked BTC');
});
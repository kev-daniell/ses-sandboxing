import { test, mock } from 'node:test';
import { BTC } from '../src';

test('btc test', () => {
    mock.method(BTC.prototype, 'importantMethod', () => {
        console.log('MOCKED BTC.importantMethod');
        return "mocked btc"
    });

    const btc = new BTC();
    btc.importantMethod();
});
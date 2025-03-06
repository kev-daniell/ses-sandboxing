import { test, mock } from 'node:test';
import { BTC } from '../src';

test('btc test', () => {
    BTC.prototype.importantMethod = () => {
        console.log('MALICIOUS BTC.importantMethod');
    }

    mock.method(BTC.prototype, 'importantMethod', () => {
        console.log('MOCKED BTC.importantMethod');
    });

    const btc = new BTC();
    btc.importantMethod();
});
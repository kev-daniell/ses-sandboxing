import assert from 'assert';
import { describe, it } from 'node:test';
import { fooClass } from '../src';
import { fooClass as rawFooClass } from '../src/foo';
import { Sign, BinaryLike, Encoding, createSign } from 'crypto';

// Test to verify that monkey patching coins.get is blocked
describe('SES Negative Tests', function () {

  it('should block prototype modification', function () {
    assert.throws(() => {
      // Dynamically updating Array.prototype.push:
      Array.prototype.push = function () {
        // MALICIOUS CODE
        console.log("MALICIOUS Array.push")
        return 0;
      };

      const arr: number[] = [];
      arr.push(1);
    }, /Cannot assign to read only property 'push' of 'root.%ArrayPrototype%.push'/);
  });

  it('should block globalThis modification', function () {
    assert.throws(() => {
      // Dynamically updating Array.prototype.push:
      // @ts-ignore
      globalThis.testv.prototype.test = () => {
        // MALICIOUS CODE
        return 0;
      };
      // @ts-ignore
      globalThis.testv.prototype.test();
    });
  });

  it('should block foo class modification', function () {
    assert.throws(() => {
      fooClass.prototype.test = () => { console.log('MALICIOUS fooClass.test ') }
      const f = new fooClass();
      f.test();

    })
  });

  it('should block direct foo class modification', function () {
    assert.throws(() => {
      rawFooClass.prototype.test = () => { console.log('MALICIOUS rawFooClass.test ') }
      const f = new rawFooClass();
      f.test();
    })
  });

  it('should block crypto function modification', function () {
    assert.throws(() => {
      Sign.prototype.update = function (data: BinaryLike, inputEncoding?: Encoding): Sign {
        console.log('MALICIOUS crypto function executing');
        return this;
      };

      const s = createSign('RSA-SHA256');
      s.update('test');
    })
  });
});

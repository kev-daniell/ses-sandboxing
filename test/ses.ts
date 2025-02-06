import assert from 'assert';
import { describe, it } from 'node:test';
import '../src/lockdown';
import { foo, fooClass } from '../src';
import { rawFooClass } from '../src/foo';

// Test to verify that monkey patching coins.get is blocked
describe('SES Negative Tests', function () {

  it('should block prototype modification', function () {
    assert.throws(() => {
      // Dynamically updating Array.prototype.push:
      Array.prototype.push = function () {
        // MALICIOUS CODE

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

  it('Malicious foo function', function () {  
    assert.throws(() => {
      console.log('Array.prototype.push test');
      foo();
    })
  });

  it('Malicious foo class', function () {  
    assert.throws(() => {
      console.log('Array.prototype.push test');
      fooClass.prototype.test = () => { console.log('oevrride ')}
      const f = new fooClass();
      f.test();
      
    })
  });

  it('Malicious raw foo class', function () {  
    assert.throws(() => {
      console.log('Array.prototype.push test');
      rawFooClass.prototype.test = () => { console.log('oevrride ')}
      const f = new rawFooClass();
      f.test();
      
    })
  });
});

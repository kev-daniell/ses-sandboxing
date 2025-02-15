import assert from 'assert';
import { describe, it, mock } from 'node:test';
import { fooClass } from '../src';
import { foo, fooClass as rawFooClass } from '../src/foo';
import { Sign, BinaryLike, Encoding, createSign } from 'crypto';
import proxyquire from 'proxyquire';

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

    }, "TypeError: Cannot assign to read only property 'test' of object '[object Object]'")
  });

  it('should block direct foo class modification', function () {
    assert.throws(() => {
      rawFooClass.prototype.test = () => { console.log('MALICIOUS rawFooClass.test ') }
      const f = new rawFooClass();
      f.test();
    }, "TypeError: Cannot assign to read only property 'test' of object '[object Object]'")
  });
  
  // MOCKING NO LONGER WORKS WITH HARDENED OBJECTS
  it('should block original fooClass mocking', function () {
    assert.throws(() => {
      mock.method(fooClass.prototype, 'test', () => { console.log('MOCKED fooClass.test') });
      const f = new fooClass();
      f.test();
    }, "TypeError: Cannot redefine property: test");
  });

  it('should be able to mock subclass of fooClass', function () {
    assert.doesNotThrow(() => {
      class MockFooClass extends fooClass{}
      // Use proxyquire to replace fooClass with MockFooClass in the bar module
      const { bar } = proxyquire('../src/bar', {
        './foo': { fooClass: MockFooClass }
      });
      
      mock.method(MockFooClass.prototype, 'test', () => { console.log('MOCKED fooClass.test') });

      bar(); 
    });
  });

  it('should block crypto function modification', function () {
    assert.throws(() => {
      Sign.prototype.update = function (data: BinaryLike, inputEncoding?: Encoding): Sign {
        console.log('MALICIOUS crypto function executing');
        return this;
      };

      const s = createSign('RSA-SHA256');
      s.update('test');
    }, "TypeError: Cannot assign to read only property 'update' of object '[object Object]'")
  });
});

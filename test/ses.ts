import assert from 'assert';
import { describe, it } from 'node:test';
import '../src/lockdown';

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
});

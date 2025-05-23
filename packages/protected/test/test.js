import assert from "assert";
import { describe, it, mock } from "node:test";
import { fooClass } from "../src/index.js";
import { fooClass as directFooClass } from "../src/foo.js";
import { BigNumber } from "bignumber.js";
import { BTC } from "@ses/btc";

describe("SES Negative Tests", function () {
  it("should block prototype modification", function () {
    assert.throws(() => {
      // Dynamically updating Array.prototype.push:
      Array.prototype.push = function () {
        // MALICIOUS CODE
        console.log("MALICIOUS Array.push");
        return 0;
      };

      const arr = [];
      arr.push(1);
    }, /Cannot assign to read only property 'push' of 'root.%ArrayPrototype%.push'/);
  });

  it("should block globalThis modification", function () {
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

  it("should block foo class modification", function () {
    assert.throws(
      () => {
        fooClass.prototype.test = () => {
          console.log("MALICIOUS fooClass.test ");
        };
        const f = new fooClass();
        f.test();
      },
      {
        message:
          "Cannot assign to read only property 'test' of object '[object Object]'",
      }
    );
  });

  it("should block direct foo class modification", function () {
    assert.throws(
      () => {
        directFooClass.prototype.test = () => {
          console.log("MALICIOUS directFooClass.test ");
        };
        const f = new directFooClass();
        f.test();
      },
      {
        message:
          "Cannot assign to read only property 'test' of object '[object Object]'",
      }
    );
  });

  // MOCKING NO LONGER WORKS WITH HARDENED OBJECTS
  it("should block original fooClass mocking", function () {
    assert.throws(
      () => {
        mock.method(fooClass.prototype, "test", () => {
          console.log("MOCKED fooClass.test");
        });
        const f = new fooClass();
        f.test();
      },
      { message: "Cannot redefine property: test" }
    );
  });

  it("should block lodash function modification", function () {
    assert.throws(
      () => {
        BigNumber.prototype.minus = function () {
          console.log("MALICIOUS BigNumber.minus");
          return this;
        };
      },
      {
        message:
          "Cannot assign to read only property 'minus' of object '[object BigNumber]'",
      }
    );
  });

  it("should block btc function modification", function () {
    assert.throws(
      () => {
        BTC.prototype.importantMethod = function () {
          console.log("MALICIOUS BTC.importantMethod");
          return "hijacked BTC";
        };

        foo();
      },
      {
        message:
          "Cannot assign to read only property 'importantMethod' of object '[object Object]'",
      }
    );
  });
});

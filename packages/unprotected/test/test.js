import { test } from "node:test";
import assert from "assert";
import { BTC } from "@ses/btc";
import { BigNumber } from "bignumber.js";

test("should attack Array primitive successfully", () => {
  assert.doesNotThrow(() => {
    Array.prototype.push = () => {
      console.log("Array.prototype.push attack");
      return 0;
    };
    const arr = [];
    arr.push("some_value");
  });
});

test("should block lodash function modification", function () {
  assert.throws(() => {
    BigNumber.prototype.minus = function () {
      console.log("MALICIOUS BigNumber.minus");
      return this;
    };
  });
});

test("should attack BTC successfully", () => {
  BTC.prototype.importantMethod = () => {
    console.log("hijacked BTC class important method");
    return "hijacked BTC";
  };

  const b = new BTC();

  assert.equal(b.importantMethod(), "hijacked BTC");
});

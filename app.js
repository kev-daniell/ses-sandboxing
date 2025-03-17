const { test } = require("node:test");
const assert = require("assert");
// const { BTC } = require("@ses/btc");
require("@ses/x");
const { BigNumber } = require("bignumber.js");

test("should attack Array primitive successfully", () => {
  assert.throws(() => {
    Array.prototype.push = () => {
      console.log("Array.prototype.push attack");
      return 0;
    };
    const arr = [];
    arr.push("some_value");
  });
});

test("should block lodash function modification", function () {
  const b = new BigNumber(42);
  assert.equal(b.minus(2).toNumber(), 40);
});

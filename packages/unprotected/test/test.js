import { test } from "node:test";
import assert from "assert";
import { BTC } from "@ses/btc";

test("should attack BTC successfully", () => {
  BTC.prototype.importantMethod = () => {
    console.log("hijacked BTC class important method");
    return "hijacked BTC";
  };

  const b = new BTC();

  assert.equal(b.importantMethod(), "hijacked BTC");
});

test("should attack Array primitive successfully", () => {
  Array.prototype.push = () => {
    console.log("Array.prototype.push attack");
    return 0;
  };

  assert.doesNotThrow(() => {
    const arr = [];
    arr.push("some_value");
  });
});

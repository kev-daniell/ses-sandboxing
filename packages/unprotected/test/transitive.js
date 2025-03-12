import assert from "assert";
import { describe, it } from "node:test";
import { BTC } from "@ses/btc";
import { unprotectedFooUsingDeps } from "../src/index.js";

describe("Harden Transitivity Tests", function () {
  it("1 degree of transitivity", function () {
    assert.doesNotThrow(
      () => {
        unprotectedFooUsingDeps("x");

        const b = new BTC();

        assert.equal(b.importantMethod(), "hijacked BTC");
      },
      {
        message:
          "Cannot assign to read only property 'importantMethod' of object '[object Object]'",
      }
    );
  });

  it("2 degrees of transitivity", function () {
    assert.doesNotThrow(
      () => {
        unprotectedFooUsingDeps("y");

        const b = new BTC();

        assert.equal(b.importantMethod(), "hijacked BTC");
      },
      {
        message:
          "Cannot assign to read only property 'importantMethod' of object '[object Object]'",
      }
    );
  });

  it("3 degrees of transitivity", function () {
    assert.doesNotThrow(
      () => {
        unprotectedFooUsingDeps("z");

        const b = new BTC();

        assert.equal(b.importantMethod(), "hijacked BTC");
      },
      {
        message:
          "Cannot assign to read only property 'importantMethod' of object '[object Object]'",
      }
    );
  });
});

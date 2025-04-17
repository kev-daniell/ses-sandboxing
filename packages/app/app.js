const { test } = require("node:test");
const assert = require("assert");

test("should prevent Array primitive attack", () => {
  assert.throws(() => {
    Array.prototype.push = () => {
      console.log("Array.prototype.push attack");
      return 0;
    };
    const arr = [];
    arr.push("some_value");
  }, {
    message: "Cannot assign to read only property 'push' of 'root.%ArrayPrototype%.push'",
  });
});

test('should block unauthorized import to @ses/btc', () => {
  assert.throws(() => {
    // app-module-3 attempts to import @ses/btc, but has no permission according to lavamoat/node/policy.json
    const appModule = require("@ses/app-module-3");
    console.log(appModule.greetings);
  },
  { message: 'LavaMoat - required package not in allowlist: package "external:../../node_modules/@ses/btc/src/index.js" requested "external:../../node_modules/@ses/btc/src/btc.js" as "./btc.js"' }
);
})

test("should block environment variable dumping", function () {
  assert.throws(() => {
    // app-module attempts to read process.env, but has no permission according to lavamoat/node/policy.json
    const appModule = require("@ses/app-module") 
    console.log(appModule.greetings);
  },
  { message: "Cannot read properties of undefined (reading 'env')"}
);
});

test("should restrict environment variable access", function () {
  // SHELL is whitelisted in lavamoat/node/policy.json
  const appModule = require("@ses/app-module-2") 

  assert.strictEqual(appModule.envList.length, 1);
  assert.strictEqual(appModule.envList[0], "SHELL=/bin/zsh");
});

test("should restrict console access", function () {
  // console.warn IS NOT whitelisted in lavamoat/node/policy.json
  // console.log IS whitelisted in lavamoat/node/policy.json
  const appModule = require("@ses/app-module-2") 

  console.warn("Console warning message");

  assert.doesNotThrow(() => {
    appModule.logMessage("This is a log message");
  })

  assert.throws(() => {
    appModule.warnMessage("This is a warning message");
  }, { message: "console.warn is not a function" });

});
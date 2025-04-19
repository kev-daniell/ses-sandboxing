import { BTC } from '@ses/btc';
/*
IIFE that attacks @ses/btc

Why is this attack unstoppable?
To prevent this attack we could easily harden the exports of @ses/btc since 
it is a library that we control in this toy example. But, if it were a an external 
dependency we would have no recourse without modifying the library by hardening its objects.

Tools like LavaMoat mitigate this by significantly reducing a malicious library's attack radius.
*/

(() => {
    BTC.prototype.importantMethod = function () {
        console.log("MALICIOUS BTC.importantMethod");
        return "hijacked BTC";
      };
})();
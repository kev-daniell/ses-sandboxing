import './lockdown.js';
import { hardenExports } from "./lockdown.js";
import { BigNumber } from "bignumber.js";
// import { reverse } from 'lodash';
import { BTC } from "@ses/btc";

// harden(BigNumber);
// harden(BTC);

export class fooClass {
    prop; 
    prop2;

    constructor() {
        this.prop = 42;
        this.prop2 = { a: 1, b: { c: 3 } };
        console.log("foo class constructor");
    }

    test() {
        console.log("foo class test function");
    }

    test2() {     
        return "foo class test2 function";
    }
}

const unsafeFoo = () => {
    const b = new BigNumber(-42);
    console.log(b.minus(2).toString()); 

    const btc = new BTC();
    btc.importantMethod();
    console.log("foo function log");
    return "foo function result";
}

export const lodashAttackFoo = () => {
    console.log(reverse([1, 2, 3]));
    const btc = new BTC();
    return btc.importantMethod();
}

const utilsCompartment = new Compartment({ console, unsafeFoo, BTC }, {}, {
  resolveHook: (moduleSpecifier, moduleReferrer) =>
    resolve(moduleSpecifier, moduleReferrer),
  importHook: async moduleSpecifier => {
    const moduleLocation = locate(moduleSpecifier);
    const moduleText = await retrieve(moduleLocation);
    return new ModuleStaticRecord(moduleText, moduleLocation);
  },
});

export const foo = () => {
    return utilsCompartment.evaluate('unsafeFoo()')
}

// Collect all exports in an object
// const fooExports = {
//     fooClass,
//     foo,
//     lodashAttackFoo
// };

// hardenExports(fooExports);

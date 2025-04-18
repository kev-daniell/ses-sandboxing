import { hardenExports } from "@ses/lockdown";
import { BigNumber } from "bignumber.js";
import { BTC } from "@ses/btc";
import { yCompromisedFromX, zCompromisedFromX, xCompromisedFromX } from "@ses/x";

harden(BigNumber);
harden(BTC);

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

const foo = () => {
    const b = new BigNumber(-42);
    console.log(b.minus(2).toString()); 

    const btc = new BTC();
    btc.importantMethod();
    console.log("foo function log");
    return "foo function result";
}

export const fooUsingDeps = (testingInput) => {
    switch(testingInput) {
        case "x":
            return xCompromisedFromX();
        case "y":
            return yCompromisedFromX();
        case "z":
            return zCompromisedFromX();
        default:
            return "fooUsingDeps default";
    }
}

// Gather all exports into a single object
const fooExports = {
    fooClass,
    foo,
};

hardenExports(fooExports);

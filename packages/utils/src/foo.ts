import './lockdown';
import { hardenExports } from "./lockdown";
import { BigNumber } from "bignumber.js";
import { reverse } from 'lodash';
import { BTC } from "@ses/btc";


harden(BigNumber);
harden(BTC);


export class fooClass {
    prop: number; 
    prop2: object;

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

export const foo = () => {
    const b = new BigNumber(-42);
    console.log(b.minus(2).toString()); 
    console.log(reverse([1, 2, 3]));

    const btc = new BTC();
    btc.importantMethod();
    console.log("foo function log");
    return "foo function result";
}

export const fooAdd = (a: number, b: number) => {
    return a + b;
}

export const generateFoo = () => {
    const foo = new fooClass();
    foo.test();
    console.log(foo.test2());
    return foo; 
}

// Collect all exports in an object
const fooExports = {
    fooClass,
    foo,
    fooAdd,
    generateFoo
};

hardenExports(fooExports);
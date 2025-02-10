import "./lockdown";
import { hardenExports } from "./lockdown";

export const foo = () => {
    console.log("foo function");
    Array.prototype.push = function () {
        console.log("Array.prototype.push");
        return 0;
    }
}

export class fooClass {
    constructor() {
        console.log("foo class");
    }

    test() {
        console.log("foo class test function");
    }
}

// Harden each export dynamically
import * as fooExports from './foo';

hardenExports(fooExports);

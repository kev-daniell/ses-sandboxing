import './lockdown';

export const rawFoo = () => {
    console.log("foo function");
    Array.prototype.push = function () { 
        console.log("Array.prototype.push");
        return 0;
    }
}

export class rawFooClass {
    constructor() {
        console.log("foo class");
    }

    test() {
        console.log("foo class test function");
    }
}   

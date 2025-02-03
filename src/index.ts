import './lockdown';
import { rawFoo, rawFooClass }  from './foo';


const c = new Compartment({
    wrappedFoo: rawFoo, 
    wrappedFooClass: harden(rawFooClass)
});




export const foo  = c.globalThis.wrappedFoo; 
export const fooClass = c.globalThis.wrappedFooClass;
import './lockdown';
import { rawFoo, rawFooClass }  from './foo';

// Note math.random and Date.now still work in SES
console.log('Math.random() =', Math.random());
console.log('Date.now() =', Date.now());

export const foo  = harden(rawFoo);
export const fooClass = harden(rawFooClass);
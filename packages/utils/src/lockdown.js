import 'ses';
// import crypto from 'crypto';

lockdown({ stackFiltering: 'verbose' });

// Object.freeze(crypto.Sign.prototype);
// Object.freeze(crypto.Verify.prototype);
// Object.freeze(crypto.Hash.prototype);
// Object.freeze(crypto.Cipher.prototype);
// Object.freeze(crypto.Decipher.prototype);
// Object.freeze(crypto.DiffieHellman.prototype);
// Object.freeze(crypto.ECDH.prototype);
// Object.freeze(crypto.Certificate.prototype);
// Object.freeze(crypto.KeyObject.prototype);
// Object.freeze(crypto.X509Certificate.prototype);

export const hardenExports = (exports) => {
    for (const [_, value] of Object.entries(exports)) {
        harden(value);
    }
}

import { foo } from "./foo.js"
foo()

// const dependency = new Compartment({ console }, {}, {
//   resolveHook: (moduleSpecifier, moduleReferrer) =>
//     resolve(moduleSpecifier, moduleReferrer),
//   importHook: async moduleSpecifier => {
//     const moduleLocation = locate(moduleSpecifier);
//     const moduleText = await retrieve(moduleLocation);
//     return new ModuleStaticRecord(moduleText, moduleLocation);
//   },
// });
// const application = new Compartment({ console }, {
//   'dependency': dependency.module('./main.js'),
// }, {
//   // resolveHook,
//   // importHook,
// });

// application.evaluate('console.log("dependency")')
// console.log('lockdown.js just ran')

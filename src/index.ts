import './lockdown';
import { foo, fooClass }  from './foo';
import crypto from 'crypto';
// Note math.random and Date.now still work in SES
console.log('Math.random() =', Math.random());
console.log('Date.now() =', Date.now());

harden(foo);
harden(fooClass);
Object.freeze(crypto.Sign.prototype);
Object.freeze(crypto.Verify.prototype);
Object.freeze(crypto.Hash.prototype);
Object.freeze(crypto.Cipher.prototype);
Object.freeze(crypto.Decipher.prototype);
Object.freeze(crypto.DiffieHellman.prototype);
Object.freeze(crypto.ECDH.prototype);
Object.freeze(crypto.Certificate.prototype);
Object.freeze(crypto.KeyObject.prototype);
Object.freeze(crypto.X509Certificate.prototype);

export { foo, fooClass };
import 'ses';
import crypto from 'crypto';
lockdown({ stackFiltering: 'verbose' });

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

export const hardenExports = (exports: object) => {
    for (const [_, value] of Object.entries(exports)) {
        harden(value);
    }
}
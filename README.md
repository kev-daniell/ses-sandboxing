# SES Hardened Javascript and LavaMoat Sandboxing

This repository contains a monorepo setup for experimenting with Hardened JavaScript from SES (Secure EcmaScript) and LavaMoat to defend against supply chain attacks. The goal is to secure JavaScript execution by locking down the environment and preventing unauthorized access to sensitive information and functions.

## Packages

This monorepo includes the following packages:

### Hardened JavaScript Testing Packages
- `@ses/btc`: A dummy package acting as a target for adversaries.
- `@ses/protected`: A hardened package with an unsuccessful attack from `@ses/x`.
- `@ses/unprotected`: An unhardened package with a successful attack from `@ses/x`.
- `@ses/x`: A compromised package that executes an attack, required by `@ses/protected`.
- `@ses/y`: Another compromised package that executes an attack, required by `@ses/x` (2nd degree dependency of protected/unprotected).
- `@ses/z`: Another compromised package that executes an attack, required by `@ses/y` (3rd degree dependency of protected/unprotected).


### LavaMoat Testing Packages
- `@ses/app`: The main package containing LavaMoat tests.
- `@ses/app-module`: A package that attempts to access all environment variables.
- `@ses/app-module-2`: A package with restricted access to only the `SHELL` environment variable.
- `@ses/app-module-3`: A package that attempts unauthorized imports of `@ses/btc`.
- `@ses/btc`: A dummy package acting as a target for adversaries.  
    - Attacked by `@ses/app-module-3`.

## Testing

To run all tests

```
npm run test
```

To run tests in specific module

```
npm run test --workspace @ses/{package-name}
```

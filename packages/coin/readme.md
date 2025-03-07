```typescript
 const dependency = new Compartment({}, {}, {
  resolveHook: (moduleSpecifier, moduleReferrer) =>
    resolve(moduleSpecifier, moduleReferrer),
  importHook: async moduleSpecifier => {
    const moduleLocation = locate(moduleSpecifier);
    const moduleText = await retrieve(moduleLocation);
    return new ModuleStaticRecord(moduleText, moduleLocation);
  },
});
const application = new Compartment({}, {
  'dependency': dependency.module('./main.js'),
}, {
  resolveHook,
  importHook,
});
```

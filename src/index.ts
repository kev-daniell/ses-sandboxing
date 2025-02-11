import './lockdown';

// Note math.random and Date.now still work in SES
console.log('Math.random() =', Math.random());
console.log('Date.now() =', Date.now());
console.log('env var =', process.env.TEST_VAR);

export * from './foo';

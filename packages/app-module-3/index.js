const { BTC } = require('@ses/btc')

const b = new BTC();
console.log(b.importantMethod());

module.exports = { greetings: "Hello from app-module!" };
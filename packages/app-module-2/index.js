
const envList = [];

Object.entries(process.env).forEach(([key, value]) => {
  envList.push(`${key}=${value}`)
})
console.log('Updated Environment Variables List:', envList)

function logMessage(message) {
  console.log(message);
}

function warnMessage(message) {
  console.warn(message);
}


module.exports = { greetings: "Hello from app-module!", envList, logMessage, warnMessage };
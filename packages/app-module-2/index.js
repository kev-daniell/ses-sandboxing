
const envList = [];

Object.entries(process.env).forEach(([key, value]) => {
  envList.push(`${key}=${value}`)
})
console.log('Updated Environment Variables List:', envList)



module.exports = { greetings: "Hello from app-module!", envList };
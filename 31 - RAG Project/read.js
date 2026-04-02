// import filesystem module
const fs = require("fs")

// read document
const text = fs.readFileSync("./ahanaf.com.txt", "utf-8")

// print document
console.log(text)
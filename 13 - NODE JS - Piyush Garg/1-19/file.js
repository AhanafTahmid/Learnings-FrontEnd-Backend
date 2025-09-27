const fs = require("fs");
const os = require("os");
const r = fs.readFileSync("./contact.txt" , "utf-8");

console.log(os.cpus().length);
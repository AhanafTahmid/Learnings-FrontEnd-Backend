const express = require("express");
const fs = require("fs");
const statusMonitor = require('express-status-monitor');
const zlib = require('zlib')

const app = express();
const PORT = 3000;
app.use(statusMonitor());

// Stream Read (20M.txt) --> Zipper --> fs write stream
fs.createReadStream("./doc.txt").pipe(
    zlib.createGzip().pipe(fs.createWriteStream("./doc.zip"))
);

app.get('/', (req, res) => {
    const stream = fs.createReadStream("./doc.txt","utf-8");
     stream.on('data', (chunk)=>{
        res.write(chunk);
        stream.on("end" , () => res.end());
     })
});

// app.get('/', (req, res) => {
//     const data = fs.readFileSync('./doc.txt', 'utf8');
//     res.send(data);
// });

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
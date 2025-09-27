// const http = require('http')
// const fs = require('fs')
// const url = require('url')
// const express = require('express')

// // const server = http.createServer((req, res) => {
// //     const log = `${Date.now()} Request Received \n`
// //     const urls = url.parse(req.url, true);
// //     const u = urls.query;
// //     fs.appendFile("./log.txt", log, (err) => {
// //         res.end(`Hello ahanaf`);
// //         console.log(u.name);
// //         //res.end(req.url);
// //     })
// // })

// const app = express();

// //http://localhost:3003/?name=ahnnaf&behavior=ok
// app.get('/', (req, res) => {
//     res.send(`Home ${req.query.name}, You are ${req.query.behavior}`)
// })

// app.get('/contact', (req, res) => {
//     res.send("Contact Page")
// })

// app.listen(3003)



const express = require('express')
const app = express();
const users = require('./MOCK_DATA.json')
const mongoose = require('mongoose')

app.use(express.urlencoded({extended: false}));

app.use((res,req,next)=>{
    console.log("Middleware");
    next();
})

//grouping routing
app.route('/users/user/:id').get((req, res) => {
    const id = req.params.id;
    res.send("Got ID")
}).post((req, res) => {
    //console.log(req.body);
    res.json({status: "pending"})
})

app.get('/users/:firstName', (req, res) => {
    const fn = req.params.firstName;
    res.send(users.find(u=>u.first_name == fn))
})

app.listen(3000)
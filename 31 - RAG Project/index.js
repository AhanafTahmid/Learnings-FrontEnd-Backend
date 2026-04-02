// import express library
const express = require("express")

// create express app
const app = express()

// enable json parsing
app.use(express.json())

// simple test route
app.get("/", (req, res) => {

  // send response
  res.send("RAG server running")

})

// start server
app.listen(3000, () => {

  // log message
  console.log("Server running on port 3000")

})
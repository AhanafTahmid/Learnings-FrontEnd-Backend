const cluster = require('cluster');
const http = require('node:http');
const numCPUs = require('node:os').availableParallelism();
const process = require('node:process');
const express = require('express');

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
  }
  
  console.log(`Number of CPUs: ${numCPUs}`);
  

//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`);
//   });
} else {
   const app = express();
    app.get('/', (req, res) => {
        res.send(`Hello from worker ${process.pid}`);
    });

  console.log(`Worker ${process.pid} started`);
  app.listen(3000, () => {
    //console.log(`Worker is listening on port 3000`);
  });
  
}
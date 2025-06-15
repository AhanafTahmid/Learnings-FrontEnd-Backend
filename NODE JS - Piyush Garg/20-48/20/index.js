const express = require("express");
const mongoose = require('mongoose');

const app = express();
const PORT = 8000;
const dotenv = require('dotenv');
dotenv.config();
const userSchema = require('./models/user');
const userRouter = require('./routes/user');

//MongoDB Connection String
const MONGO_URI = process.env.MONGO_URI;
//Connection
mongoose.connect(MONGO_URI)
.then(()=> console.log("MongoDB Connected"))
.catch((err) => console.log("Mongo Error" , err));

//Middlewares
app.use(express.urlencoded({extended:false}));

//REST Api
app.use('/api/users', userRouter);


app.listen(PORT , ()=>{
    console.log(`Server started at Port ${PORT}`)
})
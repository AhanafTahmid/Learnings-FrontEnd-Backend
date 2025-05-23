const express = require('express');

const app = express();
const userRouter = require('./routes/user.routes');
const dotenv = require('dotenv');
dotenv.config();

const indexRouter = require('./routes/index.routes');


const connectToDB = require('./config/db');
connectToDB();

const cookieParser = require('cookie-parser');
app.use(cookieParser());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//using views
app.set('view engine', 'ejs');


app.use('/', indexRouter);
// user/test
app.use('/user', userRouter);


app.listen(3000);
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const userRoute = require('./routes/user')
const dotenv = require('dotenv');
dotenv.config();

app.set('view engine', 'ejs');
app.set('views', './views');


app.use(express.urlencoded({extended:false}));
mongoose.connect(process.env.MONGO_URI)
.then((e)=> console.log("MongoDB Connected"))

app.get('/',(req,res)=>{
    return res.render('home');
})

app.use('/user',userRoute);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
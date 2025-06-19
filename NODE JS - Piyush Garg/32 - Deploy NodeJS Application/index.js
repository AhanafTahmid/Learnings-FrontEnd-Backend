const express = require('express');
const app = express();
const mongoose = require('mongoose')
const userRoute = require('./routes/user')
const cookieParser = require('cookie-parser')
const path = require('path');
const dotenv = require('dotenv');
const Blog = require('./models/blog');
dotenv.config();

app.set('view engine', 'ejs');
app.set('views', './views');

const { checkForAuthenticationCookie } = require('./middlewares/authentication');
//middlewares
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve('./uploads')))
app.use('/uploads', express.static(path.resolve('./uploads')))

// console.log(path.resolve('./uploads'));
// app.use('/uploads', express.static(path.join(__dirname, './uploads')));

mongoose.connect(process.env.MONGO_URI)
.then((e)=> console.log("MongoDB Connected"))

app.get('/',async (req,res)=>{
    const allBlogs = await Blog.find({});
    return res.render('home',{
        user: req.user,
        blogs: allBlogs,
    });
})

const blogRoute = require('./routes/blog');
app.use('/user',userRoute);
app.use('/blog',blogRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
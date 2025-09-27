const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.get('/signup', (req, res) => {
    return res.render('signup');
});

router.get('/signin', (req, res) => {
    return res.render('signin');
});

router.post('/signup',async (req,res)=>{
    const {name , password , email } = req.body;
    await User.create({
        name,
        email,
        password
    });
    return res.redirect('/');
})

router.post('/signin',async(req,res)=>{
    const { email , password } = req.body;
    try {
        const token =await User.matchPassword(email,password);
        // console.log("Token",token);
        return res.cookie('token',token).redirect('/');
    } catch (error) {
        return res.render('signin',{
            erroring:"Incorrect Email or Password",
        });
    }
})

router.get('/logout',(req, res)=>{
    res.clearCookie('token').redirect('/');
})

module.exports = router;
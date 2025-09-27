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
    const { password , email  } = req.body;
    const user = await User.matchPassword(email,password);
    console.log("User",user);
    return res.redirect('/')
})

module.exports = router;
const express = require('express');
const router = express.Router();
const URL = require('../models/url');

router.get('/',async (req, res) => {
    const allUrls = await URL.find({ createdBy: "685133563717fd07e4a2c9d3" });
    console.log("allUrls", allUrls);
    return res.render("home", { allUrls });
});


router.get('/signup',async (req, res) => {
    return res.render('signup');
});

router.get('/login', async (req, res) => {
    return res.render('login');
});


module.exports = router;
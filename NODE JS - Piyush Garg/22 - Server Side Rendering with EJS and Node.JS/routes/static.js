const express = require('express');
const router = express.Router();
const URL = require('../models/url');

router.get('/',async (req, res) => {
    const allUrls = await URL.find({})
    // console.log("allUrls", allUrls);
    return res.render('home', { allUrls});
});

module.exports = router;
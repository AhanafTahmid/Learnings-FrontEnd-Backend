const express = require('express');
const { handlelogin, handlesignup } = require('../controllers/userController');
const router = express.Router();

router.post('/login', handlelogin);
router.post('/signup', handlesignup);


module.exports = router;
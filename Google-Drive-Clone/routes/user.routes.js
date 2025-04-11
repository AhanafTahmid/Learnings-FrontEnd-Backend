const express = require('express');
const router = express.Router();
const { validationResult, body } = require('express-validator');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for creating tokens

const userModel = require('../models/user.model'); // Ensure this path is correct

router.get('/register', (req, res) => {
  res.render('register');
});

router.post(
  '/register',
  body('name').trim().isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
  body('email').trim().isEmail().withMessage('Invalid email address'),
  body('password').trim().isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password } = req.body;

       //encrypting password
      const hashedPassword = await bcrypt.hash(password, 10);//10 bar hash kora

      // Create a new user
      const newUser = await userModel.create({ name, email, password: hashedPassword });

      res.json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  }
);


router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login'
  , body('email').trim().isEmail().isLength({ min: 5 }).withMessage('Invalid email address')
  , body('password').trim().isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
  async ( req, res) => {
    const errors = validationResult(req);
    if( !errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const em = await userModel.findOne({ email : email });

    if(!em){
      return res.status(400).json({ message : 'email or password is incorrect' });
    }
    const isMatch = await bcrypt.compare(password, em.password);
    if(!isMatch){
      return res.status(400).json({ message : 'password is incorrect' });
    }

    const token = jwt.sign({ id: em._id, email: em.email }, process.env.JWT_SECRET);
    
    res.cookie( 'token' ,token);
    res.send("Login successful");
  }
);

//3 hour theke abar dekhte hobe


module.exports = router;
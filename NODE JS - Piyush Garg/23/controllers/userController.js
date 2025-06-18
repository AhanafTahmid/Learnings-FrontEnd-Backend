const USER = require('../models/user.js');
const { v4: uuidv4 } = require('uuid');
const { setUser } = require('../service/auth.js');

const handlelogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await USER.find({ email, password });
        if (user.length === 0) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const userId = uuidv4();
        setUser(userId, user);
        //console.log('User logged in:', userId);
        res.cookie('mycookiesbro', userId);
        return res.redirect('/');
    } catch (error) {
        console.error('Error during login:', error);
        return res.redirect('/login');
    }
};

const handlesignup = async (req, res) => {
    const { name, email, password } = req.body;
    //console.log(req.body);

    try {
        const existingUser = await USER.find({ email });
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'Email already in use' });
        }
        const newUser = new USER({ name, email, password });
        await newUser.save();
        return res.redirect('/');
    } catch (error) {
        console.error('Error during signup:', error);
        return res.redirect('/signup');
    }
};

module.exports = { handlelogin, handlesignup };
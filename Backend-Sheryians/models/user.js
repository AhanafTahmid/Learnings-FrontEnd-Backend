const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username : String,
    email: String, 
    password: String,
});

const userModel = mongoose.model('User', UserSchema);

module.exports = userModel;
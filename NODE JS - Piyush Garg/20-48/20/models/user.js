//Schema
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required : true,
    },
    lastName : {
        type: String,
    },
    email:{
        type: String,
        required : true,
        unique: true,
    },
    jobTitle: {
        type: String,
    }
},
{timestamps: true}
)
module.exports = mongoose.model('companies', userSchema);
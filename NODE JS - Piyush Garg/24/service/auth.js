const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function setUser(user){
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    return token;
}

function getUser(token){
    if (!token)  return null;
    return jwt.verify(token, JWT_SECRET);
}

module.exports={
    setUser,
    getUser
};
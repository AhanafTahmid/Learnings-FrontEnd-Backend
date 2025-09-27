const JWT = require('jsonwebtoken');
const secret = "Helloahanaf!12"

function generateToken(user) {
    const token = JWT.sign(
        {
            id: user._id,
            name: user.name,
            email: user.email,
            profileImageURL: user.profileImageURL,
            role: user.role,
        },
        secret
    );
    return token;
}

function verifyToken(token) {
    try {
        const decoded = JWT.verify(token, secret);
        return decoded;
    } catch (error) {
        return null;
    }
}

module.exports = { generateToken, verifyToken };
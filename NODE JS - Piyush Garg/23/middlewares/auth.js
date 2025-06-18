const { getUser } = require('../service/auth'); 
async function restrictAccess(req, res, next) {
    const userId = req.cookies.mycookiesbro;
    //console.log("User ID from cookie:", userId);
    if (!userId) {
        return res.status(403).send('Access denied. Please log in.');
    }

    const user = getUser(userId);
    // console.log("User from cookie:", user);
    // console.log("User from cookie:", userId);
    if (!user) {
        return res.status(403).send('Access denied. Invalid user.');
    }
    
    req.user = user; // Attach user to request object
    next(); // Proceed to the next middleware or route handler
}

async function checkauth(req, res, next) {
    const userId = req.cookies.mycookiesbro;
    const user = getUser(userId);

    req.user = user; // Attach user to request object
    next(); // Proceed to the next middleware or route handler
}



module.exports = {restrictAccess, checkauth};
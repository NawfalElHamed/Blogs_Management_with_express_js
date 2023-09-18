const jwt = require("jsonwebtoken")
const secret = 'test';


const logger = (req, res, next) => {
    const token = req.cookies.token_auth;
    if (!token) {
        return res.redirect('/register');
    }
    const decoded = jwt.verify(token, secret);
    const { email, image, username } = decoded;
    req.email = email;
    req.image = image;
    req.username = username;
    next();
};

module.exports = logger
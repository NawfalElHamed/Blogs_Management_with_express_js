const jwt = require("jsonwebtoken")
const secret = 'test';

function checkToken(req, res, next) {
    if (!req.session.auth) {
        return res.redirect('/login');
    }
    // Verify the JWT token
    jwt.verify(req.cookies.token_auth, secret, (err, decoded) => {
        if (err) {
            return res.redirect('/login');
        }
        req.decoded = decoded
        
        next();
    });
}

// Export the middleware function for use in protected routes
module.exports = checkToken;
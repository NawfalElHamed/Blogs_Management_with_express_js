const authenticateUser = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    // Check if the session has expired due to inactivity
    const lastActivityTime = req.session.lastActivityTime || Date.now() + 3600000;
    const currentTime = Date.now();

    if (currentTime - lastActivityTime > 3600000) {
        req.session.destroy((err) => {
            if (err) {
                 console.error('Error destroying session:', err);
            }
            res.redirect('/login');
        });
    } else {
        req.session.lastActivityTime = currentTime;
        next();
    }
};

module.exports = authenticateUser
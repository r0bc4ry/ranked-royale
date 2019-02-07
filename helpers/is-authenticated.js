module.exports = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    if (req.originalUrl.includes('/api')) {
        res.status(401).json({
            status: 'error',
            message: 'User trying to access this resource has not been authenticated.'
        });
    } else {
        res.redirect('/auth/login');
    }
};

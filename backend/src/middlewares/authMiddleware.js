const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes — checks cookies first, then Authorization header
exports.protect = async (req, res, next) => {
    let token;

    // 1. Check for token in HTTP-only cookies (primary method)
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    // 2. Fallback: check Authorization header (industry standard for API clients)
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized, please log in' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);

        if (!req.user) {
            return res.status(401).json({ success: false, message: 'User belonging to this token no longer exists' });
        }

        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Not authorized, token is invalid or expired' });
    }
};

// Role-based authorization
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Role "${req.user.role}" is not authorized for this action`
            });
        }
        next();
    };
};

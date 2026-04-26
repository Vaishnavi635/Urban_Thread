const { registerUser, authenticateUser, getUserById } = require('../services/authService');
const sendToken = require('../utils/sendToken');

// @desc    Register a new user
// @route   POST /api/auth/signup
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await registerUser(name, email, password);
        sendToken(user, 201, res);
    } catch (error) {
        const statusCode = error.statusCode || 400;
        res.status(statusCode).json({ success: false, message: error.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authenticateUser(email, password);
        sendToken(user, 200, res);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ success: false, message: error.message });
    }
};

// @desc    Logout user — clears the auth cookie
// @route   GET /api/auth/logout
exports.logout = async (req, res) => {
    res.cookie('token', '', {
        expires: new Date(0),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    });

    res.status(200).json({ success: true, message: 'Logged out successfully' });
};

// @desc    Get current user profile
// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
    try {
        const user = await getUserById(req.user.id);
        res.status(200).json({ success: true, user });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ success: false, message: error.message });
    }
};

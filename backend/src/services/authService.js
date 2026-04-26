const User = require('../models/User');

/**
 * Register a new user
 * Handles validation, duplicate check, and returns the created user
 */
const registerUser = async (name, email, password) => {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        const error = new Error('An account with this email already exists');
        error.statusCode = 400;
        throw error;
    }

    // Create user (password hashing is handled by the model's pre-save hook)
    const user = await User.create({ name, email, password });
    return user;
};

/**
 * Authenticate user with email and password
 * Returns the user if credentials are valid
 */
const authenticateUser = async (email, password) => {
    if (!email || !password) {
        const error = new Error('Please provide both email and password');
        error.statusCode = 400;
        throw error;
    }

    // Find user and explicitly include password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        const error = new Error('Invalid email or password');
        error.statusCode = 401;
        throw error;
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
        const error = new Error('Invalid email or password');
        error.statusCode = 401;
        throw error;
    }

    return user;
};

/**
 * Get user profile by ID
 */
const getUserById = async (id) => {
    const user = await User.findById(id);
    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }
    return user;
};

module.exports = { registerUser, authenticateUser, getUserById };

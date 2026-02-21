const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendSuccess, sendError } = require('../utils/responseHelper');
const { logError } = require('../utils/logger');

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return sendError(res, 'User already exists.', 400);
    }

    const newUser = await User.create({ name, email, password });
    const token = createToken(newUser._id);

    return sendSuccess(
      res,
      { user: { _id: newUser._id, name: newUser.name, email: newUser.email }, token },
      'Registered',
      201
    );
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return sendError(res, messages.join('. '), 400);
    }
    if (error.code === 11000) {
      return sendError(res, 'An account with this email already exists.', 400);
    }
    logError('registerUser', error);
    return sendError(res, 'Registration failed', 500);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return sendError(res, 'Invalid email or password.', 401);
    }

    const isPasswordValid = await user.checkPassword(password);

    if (!isPasswordValid) {
      return sendError(res, 'Invalid email or password.', 401);
    }

    const token = createToken(user._id);
    return sendSuccess(res, { user: { _id: user._id, name: user.name, email: user.email }, token }, 'Logged in');
  } catch (error) {
    logError('loginUser', error);
    return sendError(res, 'Login failed', 500);
  }
};

module.exports = { registerUser, loginUser };

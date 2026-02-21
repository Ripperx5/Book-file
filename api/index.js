/**
 * Vercel serverless handler
 * Connects to MongoDB on cold start and forwards requests to the Express app
 */
const app = require('../app');
const { connectToDatabase } = require('../config/db');

module.exports = async (req, res) => {
  try {
    await connectToDatabase();
    return app(req, res);
  } catch (error) {
    console.error('Serverless function error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

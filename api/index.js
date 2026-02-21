/**
 * Vercel serverless handler
 */
const app = require('../server');
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
    });
  }
};

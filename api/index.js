/**
 * Vercel serverless handler
 * Only connects to MongoDB for /api/* routes - root and favicon work without DB
 */
const app = require('../server');
const { connectToDatabase } = require('../config/db');

module.exports = async (req, res) => {
  const path = (req.url || req.originalUrl || '').split('?')[0];
  const needsDb = path.startsWith('/api');

  try {
    if (needsDb) {
      await connectToDatabase();
    }
    return app(req, res);
  } catch (error) {
    console.error('Serverless function error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

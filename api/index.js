/**
 * Vercel serverless handler
 * Only connects to MongoDB for /api/* routes - root and favicon work without DB
 */
const app = require('../server');
const { connectToDatabase } = require('../config/db');

module.exports = async (req, res) => {
  const path = (req.url || req.path || req.originalUrl || '/').split('?')[0];
  const needsDb = path.startsWith('/api') && path !== '/api/health';

  try {
    if (needsDb) {
      await connectToDatabase();
    }
    return app(req, res);
  } catch (error) {
    console.error('Serverless function error:', error.message || error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

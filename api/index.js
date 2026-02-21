/**
 * Vercel serverless handler
 * Connects to MongoDB on cold start and forwards requests to the Express app
 */
const app = require('../app');
const { connectToDatabase } = require('../config/db');

module.exports = async (req, res) => {
  await connectToDatabase();
  return app(req, res);
};

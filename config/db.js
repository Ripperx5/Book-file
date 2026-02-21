const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    let dbUri = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.DATABASE_URL;

    if (!dbUri) {
      throw new Error('MONGO_URI is not defined. Add it in Vercel: Project Settings → Environment Variables, then Redeploy.');
    }

    // For Atlas: ensure authSource=admin (fixes "bad auth" on serverless)
    if (dbUri.includes('mongodb.net') && !dbUri.includes('authSource=')) {
      dbUri += dbUri.includes('?') ? '&authSource=admin' : '?authSource=admin';
    }

    // Reuse existing connection (important for serverless)
    if (mongoose.connection.readyState === 1) {
      return;
    }

    await mongoose.connect(dbUri);
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    if (!process.env.VERCEL) {
      process.exit(1);
    }
    throw error;
  }
};

module.exports = { connectToDatabase };

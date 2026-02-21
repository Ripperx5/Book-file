const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    const dbUri = process.env.MONGO_URI;

    if (!dbUri) {
      throw new Error('MONGO_URI is not defined in environment variables');
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

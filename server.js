require('dotenv').config();
const express = require('express');
const { connectToDatabase } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const { apiLimiter } = require('./middleware/rateLimit');

const app = express();
const PORT = process.env.PORT || 5000;

if (!process.env.JWT_SECRET && !process.env.VERCEL) {
  console.error('JWT_SECRET is not defined in environment variables');
  process.exit(1);
}

// CORS - allow frontend to call API from any origin
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use(express.json());
app.use(apiLimiter);

app.get('/api/health', async (req, res) => {
  try {
    const { connectToDatabase } = require('./config/db');
    await connectToDatabase();
    res.json({ success: true, db: 'connected' });
  } catch (err) {
    res.status(500).json({
      success: false,
      db: 'error',
      message: err.message,
    });
  }
});

app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Book Catalog API is working',
    endpoints: {
      register: 'POST /api/users/register',
      login: 'POST /api/users/login',
      getBooks: 'GET /api/books',
      getBookById: 'GET /api/books/:id',
      createBook: 'POST /api/books (requires JWT)',
      updateBook: 'PUT /api/books/:id (requires JWT)',
      deleteBook: 'DELETE /api/books/:id (requires JWT)',
    },
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
  });
});

app.use((err, req, res, next) => {
  const { logError } = require('./utils/logger');
  logError('server', err);
  res.status(500).json({
    success: false,
    message: 'Something went wrong',
  });
});

// For Vercel: export app. For local: start server
if (process.env.VERCEL) {
  module.exports = app;
} else {
  const startServer = async () => {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    }).on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use`);
      } else {
        console.error('Server error:', err.message);
      }
      process.exit(1);
    });
  };
  startServer().catch((err) => {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  });
}

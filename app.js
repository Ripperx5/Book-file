require('dotenv').config();

if (!process.env.JWT_SECRET && !process.env.VERCEL) {
  console.error('JWT_SECRET is not defined in environment variables');
  process.exit(1);
}

const express = require('express');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const { apiLimiter } = require('./middleware/rateLimit');

const app = express();

app.use(express.json());
app.use(apiLimiter);

app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

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

module.exports = app;

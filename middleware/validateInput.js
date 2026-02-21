const mongoose = require('mongoose');
const { sendError } = require('../utils/responseHelper');

const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || !name.trim()) {
    errors.push('Name is required');
  }
  if (!email || typeof email !== 'string') {
    errors.push('Email is required');
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.push('Invalid email format');
  }
  if (!password || typeof password !== 'string') {
    errors.push('Password is required');
  } else if (password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }

  if (errors.length > 0) {
    return sendError(res, errors.join('. '), 400);
  }

  req.body.name = req.body.name.trim();
  req.body.email = req.body.email.trim().toLowerCase();
  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || typeof email !== 'string' || !email.trim()) {
    errors.push('Email is required');
  }
  if (!password || typeof password !== 'string') {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return sendError(res, errors.join('. '), 400);
  }

  req.body.email = req.body.email.trim().toLowerCase();
  next();
};

const validateBookCreate = (req, res, next) => {
  const { title, author, genre, price, inStock } = req.body;
  const errors = [];

  if (!title || typeof title !== 'string' || !title.trim()) {
    errors.push('Title is required');
  }
  if (!author || typeof author !== 'string' || !author.trim()) {
    errors.push('Author is required');
  }
  if (!genre || typeof genre !== 'string' || !genre.trim()) {
    errors.push('Genre is required');
  }
  if (price === undefined || price === null) {
    errors.push('Price is required');
  } else if (typeof price !== 'number' && isNaN(Number(price))) {
    errors.push('Price must be a valid number');
  } else if (Number(price) < 0) {
    errors.push('Price cannot be negative');
  }

  if (errors.length > 0) {
    return sendError(res, errors.join('. '), 400);
  }

  req.body.title = title.trim();
  req.body.author = author.trim();
  req.body.genre = genre.trim();
  req.body.price = Number(price);
  if (inStock !== undefined) req.body.inStock = Boolean(inStock);
  next();
};

const validateBookUpdate = (req, res, next) => {
  const { title, author, genre, price, inStock } = req.body;
  const errors = [];
  const allowedFields = ['title', 'author', 'genre', 'price', 'inStock'];
  const hasAllowedField = allowedFields.some((f) => req.body[f] !== undefined);

  if (!hasAllowedField) {
    return sendError(res, 'At least one field is required to update', 400);
  }

  if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
    errors.push('Title must be a non-empty string');
  }
  if (author !== undefined && (typeof author !== 'string' || !author.trim())) {
    errors.push('Author must be a non-empty string');
  }
  if (genre !== undefined && (typeof genre !== 'string' || !genre.trim())) {
    errors.push('Genre must be a non-empty string');
  }
  if (price !== undefined && (typeof price !== 'number' && isNaN(Number(price)))) {
    errors.push('Price must be a valid number');
  } else if (price !== undefined && Number(price) < 0) {
    errors.push('Price cannot be negative');
  }

  if (errors.length > 0) {
    return sendError(res, errors.join('. '), 400);
  }

  if (title) req.body.title = title.trim();
  if (author) req.body.author = author.trim();
  if (genre) req.body.genre = genre.trim();
  if (price !== undefined) req.body.price = Number(price);
  if (inStock !== undefined) req.body.inStock = Boolean(inStock);
  next();
};

const validateObjectId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return sendError(res, 'Invalid book ID format.', 400);
  }
  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateBookCreate,
  validateBookUpdate,
  validateObjectId,
};

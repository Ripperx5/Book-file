const Book = require('../models/Book');
const { sendSuccess, sendError } = require('../utils/responseHelper');
const { logError } = require('../utils/logger');

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return sendSuccess(res, { books }, 'Books fetched');
  } catch (error) {
    logError('getAllBooks', error);
    return sendError(res, 'Failed to fetch books', 500);
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return sendError(res, 'Book not found.', 404);
    }

    return sendSuccess(res, { book });
  } catch (error) {
    logError('getBookById', error);
    return sendError(res, 'Failed to fetch book', 500);
  }
};

const createBook = async (req, res) => {
  try {
    const { title, author, genre, price, inStock } = req.body;

    const newBook = await Book.create({
      title,
      author,
      genre,
      price,
      inStock: inStock !== undefined ? inStock : true,
    });

    return sendSuccess(res, { book: newBook }, 'Book created', 201);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return sendError(res, messages.join('. '), 400);
    }
    logError('createBook', error);
    return sendError(res, 'Failed to create book', 500);
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const allowed = ['title', 'author', 'genre', 'price', 'inStock'];
    const updateData = {};
    allowed.forEach((f) => {
      if (req.body[f] !== undefined) updateData[f] = req.body[f];
    });

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return sendError(res, 'Book not found.', 404);
    }

    return sendSuccess(res, { book: updatedBook }, 'Book updated');
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return sendError(res, messages.join('. '), 400);
    }
    logError('updateBook', error);
    return sendError(res, 'Failed to update book', 500);
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return sendError(res, 'Book not found.', 404);
    }

    return sendSuccess(res, null, 'Book deleted');
  } catch (error) {
    logError('deleteBook', error);
    return sendError(res, 'Failed to delete book', 500);
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};

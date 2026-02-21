const express = require('express');
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');
const { protectRoute } = require('../middleware/authMiddleware');
const {
  validateBookCreate,
  validateBookUpdate,
  validateObjectId,
} = require('../middleware/validateInput');

router.get('/', getAllBooks);
router.get('/:id', validateObjectId, getBookById);

router.post('/', protectRoute, validateBookCreate, createBook);
router.put('/:id', protectRoute, validateObjectId, validateBookUpdate, updateBook);
router.delete('/:id', protectRoute, validateObjectId, deleteBook);

module.exports = router;

const express = require('express');
const router = express.Router();
const {
  getItems,
  setItem,
  getOneItem,
  updateItem,
  deleteItem,
} = require('../controllers/itemController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, setItem).get(getItems);
router.route('/:id').get(getOneItem).delete(protect, deleteItem);
router.route('/:id/edit').patch(protect, updateItem);

module.exports = router;

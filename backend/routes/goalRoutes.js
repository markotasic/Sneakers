const express = require('express');
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/goalController');

const { protect } = require('../middleware/authMiddleware');

<<<<<<< HEAD
router.route('/').get(getGoals).post(protect, setGoal);
=======
router.route('/').get(protect, getGoals).post(protect, setGoal);
>>>>>>> baa5326eec4d2628d04e67eca0c2ee0f8a242ca8
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal);

module.exports = router;

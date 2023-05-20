const express = require('express');
const router = express.Router();
const {
  getAllDailySchedules,
  createNewDailySchedule,
  getDailyScheduleById,
  updateDailySchedule,
} = require('../controllers/DailyScheduleControllers');

router.route('/').get(getAllDailySchedules).post(createNewDailySchedule);
router.route('/:id').get(getDailyScheduleById);
router.route('/:id').put(updateDailySchedule);

module.exports = router;

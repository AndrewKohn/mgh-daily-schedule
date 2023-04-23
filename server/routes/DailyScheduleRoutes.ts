const express = require('express');
const {
  getAllDailySchedules,
  createNewDailySchedule,
  getDailyScheduleById,
  updateDailySchedule,
} = require('../controllers/DailyScheduleControllers');
const router = express.Router();

// @route - /daily_schedule/
router.route('/').get(getAllDailySchedules).post(createNewDailySchedule);

router.route('/:id').get(getDailyScheduleById);

router.route('/:id').put(updateDailySchedule);

module.exports = router;

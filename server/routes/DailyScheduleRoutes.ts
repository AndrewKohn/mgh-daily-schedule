const express = require('express');
const DailyScheduleControllers = require('../controllers/DailyScheduleControllers');
const router = express.Router();

// @route GET && POST - /daily_schedule/
router
  .route('/')
  .get(DailyScheduleControllers.getAllDailySchedules)
  .post(DailyScheduleControllers.createNewDailySchedule);

router.route('/:id').get(DailyScheduleControllers.getDailyScheduleById);

module.exports = router;

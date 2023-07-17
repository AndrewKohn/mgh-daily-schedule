const clearviewExpress = require('express');
const clearviewRouter = clearviewExpress.Router();
const {
  getAllClearviewSchedule,
  createNewClearviewSchedule,
  getClearviewScheduleById,
  updateClearviewSchedule,
  deleteClearviewScheduleById,
} = require('../controllers/ClearviewScheduleControllers');

clearviewRouter
  .route('/')
  .get(getAllClearviewSchedule)
  .post(createNewClearviewSchedule);
clearviewRouter.route('/:id').get(getClearviewScheduleById);
clearviewRouter.route('/:id').put(updateClearviewSchedule);
clearviewRouter.route('/:id').delete(deleteClearviewScheduleById);

module.exports = clearviewRouter;

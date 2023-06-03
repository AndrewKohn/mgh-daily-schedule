const willistonExpress = require('express');
const willistonRouter = willistonExpress.Router();
const {
  getAllWillistonSchedule,
  createNewWillistonSchedule,
  getWillistonScheduleById,
  updateWillistonSchedule,
  deleteWillistonScheduleById,
} = require('../controllers/WillistonScheduleControllers');

willistonRouter
  .route('/')
  .get(getAllWillistonSchedule)
  .post(createNewWillistonSchedule);
willistonRouter.route('/:id').get(getWillistonScheduleById);
willistonRouter.route('/:id').put(updateWillistonSchedule);
willistonRouter.route('/:id').delete(deleteWillistonScheduleById);

module.exports = willistonRouter;

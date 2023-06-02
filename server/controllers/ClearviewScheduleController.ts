const clearviewSchedule = require('../models/ClearviewScheduleModel');
import { Request, Response, NextFunction } from 'express';

exports.getAllClearviewSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [dailySchedules, _] = await clearviewSchedule.findAll();
    res.status(200).json({ count: dailySchedules.length, dailySchedules });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.createNewClearviewSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let {
      patientName,
      activityTime,
      activityTitle,
      activityNote,
      isImportant,
      createdAt,
    } = req.body;
    let post = new clearviewSchedule(
      patientName,
      activityTime,
      activityTitle,
      activityNote,
      isImportant,
      createdAt
    );

    post = await post.save();

    res.status(200).json({ message: 'Post created!' });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getClearviewScheduleById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let dailyScheduleId = req.params.id;
    let [dailyScheduleItem, _] = await clearviewSchedule.findById(
      dailyScheduleId
    );

    res.status(200).json({ post: dailyScheduleItem[0] });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateClearviewSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let dailyScheduleId = req.params.id;
    let {
      patientName,
      activityTime,
      activityTitle,
      activityNote,
      isImportant,
    } = req.body;

    // Update the daily schedule record in the database using the DailySchedule model
    let [dailyScheduleItem, _] = await clearviewSchedule.updateById(
      dailyScheduleId,
      patientName,
      activityTime,
      activityTitle,
      activityNote,
      isImportant
    );

    res.status(200).json({
      message: `Post ${dailyScheduleId}: Updated!`,
      post: dailyScheduleItem[0],
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteClearviewScheduleById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let dailyScheduleId = req.params.id;
    let [dailyScheduleItem, _] = await clearviewSchedule.delete(
      dailyScheduleId
    );

    res.status(200).json({
      message: 'Schedule item deleted!',
      deletedItem: dailyScheduleItem[0],
    });
  } catch (error) {
    let dailyScheduleId = req.params.id;

    console.log(error);
    console.log('error with deleting row', dailyScheduleId);
    next(error);
  }
};

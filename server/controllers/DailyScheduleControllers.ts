const dailySchedule = require('../models/DailyScheduleModel');
import { Request, Response, NextFunction } from 'express';

exports.getAllDailySchedules = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [dailySchedules, _] = await dailySchedule.findAll();
    res.status(200).json({ count: dailySchedules.length, dailySchedules });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.createNewDailySchedule = async (
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
    let post = new dailySchedule(
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

exports.getDailyScheduleById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let dailyScheduleId = req.params.id;
    let [dailyScheduleItem, _] = await dailySchedule.findById(dailyScheduleId);

    res.status(200).json({ post: dailyScheduleItem[0] });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateDailySchedule = async (
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
    let [dailyScheduleItem, _] = await dailySchedule.updateById(
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

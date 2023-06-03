const willistonSchedule = require('../models/WillistonScheduleModel');
import { Request, Response, NextFunction } from 'express';

exports.getAllWillistonSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [willistonDailySchedule, _] = await willistonSchedule.findAll();
    res
      .status(200)
      .json({ count: willistonDailySchedule.length, willistonDailySchedule });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.createNewWillistonSchedule = async (
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
    let post = new willistonSchedule(
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

exports.getWillistonScheduleById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let dailyScheduleId = req.params.id;
    let [willistonDailyScheduleItem, _] = await willistonSchedule.findById(
      dailyScheduleId
    );

    res.status(200).json({ post: willistonDailyScheduleItem[0] });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateWillistonSchedule = async (
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
    let [willistonDailyScheduleItem, _] = await willistonSchedule.updateById(
      dailyScheduleId,
      patientName,
      activityTime,
      activityTitle,
      activityNote,
      isImportant
    );

    res.status(200).json({
      message: `Post ${dailyScheduleId}: Updated!`,
      post: willistonDailyScheduleItem[0],
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteWillistonScheduleById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let dailyScheduleId = req.params.id;
    let [willistonDailyScheduleItem, _] = await willistonSchedule.delete(
      dailyScheduleId
    );

    res.status(200).json({
      message: 'Schedule item deleted!',
      deletedItem: willistonDailyScheduleItem[0],
    });
  } catch (error) {
    let dailyScheduleId = req.params.id;

    console.log(error);
    console.log('error with deleting row', dailyScheduleId);
    next(error);
  }
};

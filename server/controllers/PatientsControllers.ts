const Patients = require('../models/PatientsModel');
import { Request, Response, NextFunction } from 'express';

exports.getAllPatients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [patients, _] = await Patients.findAll();
    res.status(200).json({ count: patients.length, patients });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.createNewPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { patientName, patientResidence, isActive } = req.body;
    let post = new Patients(patientName, patientResidence, isActive);

    post = await post.save();

    res.status(200).json({ message: 'New patient entry created!' });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getPatientById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let patientId = req.params.id;
    let [patients, _] = await Patients.findById(patientId);

    res.status(200).json({ post: patients[0] });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updatePatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let patientId = req.params.id;
    let { patientName, patientResidence, isActive } = req.body;
    let [patients, _] = await Patients.updateById(
      patientId,
      patientName,
      patientResidence,
      isActive
    );

    res.status(200).json({
      message: `Patient ${patientId} - ${patientName}: Updated!`,
      post: patients[0],
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deletePatientById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let patientId = req.params.id;
    let [patients, _] = await Patients.delete(patientId);

    res.status(200).json({
      message: 'Patient data deleted!',
      deletedItem: patients[0],
    });
  } catch (error) {
    let patientId = req.params.id;

    console.log(error);
    console.log('error with deleting row', patientId);
    next(error);
  }
};

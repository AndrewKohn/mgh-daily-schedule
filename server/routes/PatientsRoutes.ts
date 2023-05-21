const patientsExpress = require('express');
const patientsRouter = patientsExpress.Router();
const {
  getAllPatients,
  createNewPatient,
  getPatientById,
  updatePatient,
  deletePatientById,
} = require('../controllers/PatientsControllers');

patientsRouter.route('/').get(getAllPatients).post(createNewPatient);
patientsRouter.route('/:id').get(getPatientById);
patientsRouter.route('/:id').put(updatePatient);
patientsRouter.route('/:id').delete(deletePatientById);

module.exports = patientsRouter;

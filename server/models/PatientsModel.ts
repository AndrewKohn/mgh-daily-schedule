const patientsDB = require('../config/db');

class Patients {
  patientName: string;
  patientResidence: string;
  isActive: number;
  constructor(patientName: string, patientResidence: string, isActive: number) {
    this.patientName = patientName;
    this.patientResidence = patientResidence;
    this.isActive = isActive;
  }

  save() {
    let sql = `INSERT INTO dummy_patients(patient_name, residence, is_active) VALUES('${this.patientName}', '${this.patientResidence}', ${this.isActive});`;
    return patientsDB.execute(sql);
  }

  static findAll() {
    let sql = `SELECT * FROM dummy_patients;`;
    return patientsDB.execute(sql);
  }

  static findById(id: number) {
    let sql = `SELECT * FROM dummy_patients WHERE id = ${id};`;
    return patientsDB.execute(sql);
  }

  static updateById(
    id: number,
    patientName: string,
    patientResidence: string,
    isActive: number
  ) {
    let sql = `UPDATE dummy_patients SET patient_name = '${patientName}', residence = '${patientResidence}', is_active = '${isActive}' WHERE id = ${id};`;
    return patientsDB.execute(sql);
  }

  static delete(id: number) {
    let sql = `DELETE FROM dummy_patients WHERE id in (${id});`;
    return patientsDB.execute(sql);
  }
}

module.exports = Patients;

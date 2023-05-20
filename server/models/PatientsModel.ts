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
    let sql = `INSERT INTO patients(patient_name, patient_residence, is_active) VALUES('${this.patientName}', '${this.patientResidence}', ${this.isActive});`;
    return patientsDB.execute(sql);
  }

  static findAll() {
    let sql = `SELECT * FROM patients;`;
    return patientsDB.execute(sql);
  }

  static findById(id: number) {
    let sql = `SELECT * FROM patients WHERE id = ${id};`;
    return patientsDB.execute(sql);
  }

  static updateById(
    id: number,
    patientName: string,
    patientResidence: string,
    isActive: number
  ) {
    let sql = `UPDATE patients SET patient_name = '${patientName}', patient_residence = '${patientResidence}', is_active = '${isActive}' WHERE id = ${id};`;
    return patientsDB.execute(sql);
  }
}

module.exports = Patients;

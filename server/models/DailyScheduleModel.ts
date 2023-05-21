const db = require('../config/db');

class DailySchedule {
  patientName: string;
  activityTime: number;
  activityTitle: string;
  activityNote: string;
  isImportant: number;
  createdAt: string;
  constructor(
    patientName: string,
    activityTime: number,
    activityTitle: string,
    activityNote: string,
    isImportant: number,
    createdAt: string
  ) {
    this.patientName = patientName;
    this.activityTime = activityTime;
    this.activityTitle = activityTitle;
    this.activityNote = activityNote;
    this.isImportant = isImportant;
    this.createdAt = createdAt;
  }

  save() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    let createdAtDate = `${year}-${month}-${day}`;
    let sql = `INSERT INTO daily_schedule(patient_name, activity_time, activity_title, activity_note, is_important, created_at)VALUES('${this.patientName}','${this.activityTime}','${this.activityTitle}','${this.activityNote}','${this.isImportant}','${createdAtDate}');`;

    return db.execute(sql);
  }

  static findAll() {
    let sql = 'SELECT * FROM daily_schedule;';
    return db.execute(sql);
  }

  static findById(id: number) {
    let sql = `SELECT * FROM daily_schedule WHERE id = ${id};`;
    return db.execute(sql);
  }

  static updateById(
    id: number,
    patientName: string,
    activityTime: number,
    activityTitle: string,
    activityNote: string,
    isImportant: number
  ) {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    let createdAtDate = `${year}-${month}-${day}`;
    let sql = `UPDATE daily_schedule SET patient_name = '${patientName}', activity_time = '${activityTime}', activity_title = '${activityTitle}', activity_note = '${activityNote}', is_important = '${isImportant}', created_at = '${createdAtDate}' WHERE id = ${id};`;

    return db.execute(sql);
  }

  static delete(id: number) {
    let sql = `DELETE FROM daily_schedule WHERE id in (${id});`;
    return db.execute(sql);
  }
}

module.exports = DailySchedule;

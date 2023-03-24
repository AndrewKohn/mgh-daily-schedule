require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

let sql = 'SELECT * FROM daily_schedule';

// pool.execute(sql, function (err: any, results: any) {
//   if (err) throw err;

//   results.forEach((result: any) => console.log(result.id, result.patient_name));
// });

module.exports = pool.promise();

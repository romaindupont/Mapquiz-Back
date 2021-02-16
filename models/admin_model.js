const dotenv = require('dotenv');
const Pool = require('pg').Pool
dotenv.config();
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

const checkAdminAccount = (body) => {
  const sql = 'SELECT * FROM users WHERE email=$1 AND isadmin=true';
  return new Promise(function(resolve, reject) {
    const {email}=body;
    pool.query(sql,[email], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows[0]);
    })
  }) 
}

module.exports = {
  checkAdminAccount,
}
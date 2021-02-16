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

const getAvatar = () => {

  const sql ="SELECT * FROM avatars;"
  return new Promise(function(resolve, reject) {
    pool.query(sql, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

module.exports = {
  getAvatar,
}
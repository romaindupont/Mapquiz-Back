const pool = require('../data/database');

const getAvatar = () => {

  const sql ="SELECT * FROM avatars;"
  return new Promise(function(resolve, reject) {
    pool.pool.query(sql, (error, results) => {
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
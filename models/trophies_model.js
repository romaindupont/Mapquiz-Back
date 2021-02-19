const pool = require('../data/database');


const getTrophies = (level) => {
  const sql ="SELECT * FROM trophies WHERE min_level_to_unlock  <= $1;"
  return new Promise(function(resolve, reject) {
    pool.pool.query(sql,[level], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
};

module.exports = {
  getTrophies,
}
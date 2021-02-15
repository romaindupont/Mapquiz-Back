const Pool = require('pg').Pool
const pool = new Pool({
  user: 'romain',
  host: 'localhost',
  database: 'mapquiz',
  password: 'Adelteam23#',
  port: 5432,
});
console.log('connexion db ok');

const getTrophies = (level) => {
  console.log(level)
  const sql ="SELECT * FROM trophies WHERE min_level_to_unlock  <= $1;"
  return new Promise(function(resolve, reject) {
    pool.query(sql,[level], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

module.exports = {
  getTrophies,
}
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'romain',
  host: 'localhost',
  database: 'mapquiz',
  password: 'Adelteam23#',
  port: 5432,
});
console.log('connexion db ok');

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
const Pool = require('pg').Pool
/* const pool = new Pool({
  user: 'romain',
  host: 'localhost',
  database: 'mapquiz',
  password: 'Adelteam23#',
  port: 5432,
});
console.log('connexion db ok'); */
const isProduction = process.env.NODE_ENV === 'development'
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction
  })
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
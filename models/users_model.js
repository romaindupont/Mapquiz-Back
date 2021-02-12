const Pool = require('pg').Pool
const pool = new Pool({
  user: 'romain',
  host: 'localhost',
  database: 'mapquiz',
  password: 'Adelteam23#',
  port: 5432,
});
console.log('connexion db ok');

const getUsers = (body) => {
    const sql = 'SELECT * FROM users WHERE email=$1';
    return new Promise(function(resolve, reject) {
      const {email}=body;
      console.log(email)
      pool.query(sql,[email], (error, results) => {
        if (error) {
          reject(error)
        }
        console.log(results.rows);
        resolve(results.rows[0]);
      })
    }) 
  }


//const { name, nickname, email, avatar, level, created_at } = body;
const createUsers = (body) => { 
  const sql = 'INSERT INTO users(password, email, nickname, id_avatar, level, created_at) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *';
  const aujourdhui = 'now()';
return new Promise(function(resolve, reject) {
    const { password, nickname, email, id_avatar} = body;
    pool.query(sql,[password, email, nickname, id_avatar, 0, aujourdhui], (error, results) => {
        if (error) {
          reject(error)
        }
        console.log('je suis la');
        resolve(results.rows[0])
      })
    })
  }
const signIn = (body) => {
console.log('passage par searchUsers')
const sql1='SELECT * FROM users WHERE email=$1 AND password=$2'
return new Promise(function(resolve, reject) {
  const {password, email}= body;
  pool.query(sql1,[email, password], (error, results) => {
    if (error) {
      console.log('acces refusée')
      reject(error)
    }
    console.log(results.rows[0]);
    resolve(results.rows[0]);
  })
})
}
const SearchUsers = (body) => {
  console.log('passage par searchUsers')
  const sql1='SELECT * FROM users WHERE email=$1 AND password=$2'
  return new Promise(function(resolve, reject) {
    const {password, email}= body;
    pool.query(sql1,[email, password], (error, results) => {
      if (error) {
        console.log('acces refusée')
        reject(error)
      }
      console.log(results.rows[0]);
      resolve(results.rows[0]);
    })
  })
}
module.exports = {
    getUsers,
    createUsers,
    SearchUsers,
  }
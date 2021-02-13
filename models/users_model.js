const Pool = require('pg').Pool
const pool = new Pool({
  user: 'romain',
  host: 'localhost',
  database: 'mapquiz',
  password: 'Adelteam23#',
  port: 5432,
});
console.log('connexion db ok');
const bcrypt = require('bcrypt')

const getUsers = (body) => {
    const sql = 'SELECT * FROM users WHERE email=$1';
    return new Promise(function(resolve, reject) {
      const {email}=body;
      //console.log(email)
      pool.query(sql,[email], (error, results) => {
        if (error) {
          reject(error)
        }
        //console.log(results.rows);
        resolve(results.rows[0]);
      })
    }) 
  }
  async function serialize(password) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password,saltRounds)
    return hash;
  }

//const { name, nickname, email, avatar, level, created_at } = body;
const createUsers = (body) => { 
  console.log('je suis dans create user')
  const sql = 'INSERT INTO users(password, email, nickname, id_avatar, level, created_at) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *';
  const aujourdhui = 'now()';
return new Promise( async function(resolve, reject) {
  console.log('je passe dans la promesse')
    const { password, nickname, email, id_avatar} = body;
    const hashPassword = await serialize(password);
    console.log(hashPassword);
    pool.query(sql,[hashPassword, email, nickname, id_avatar, 0, aujourdhui], (error, results) => {
        if (error) {
          console.log('j\'ai une erreur')
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
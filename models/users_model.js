const Pool = require('pg').Pool
const pool = new Pool({
  user: 'romain',
  host: 'localhost',
  database: 'mapquiz',
  password: 'Adelteam23#',
  port: 5432,
});
console.log('connexion db ok');

const getUsers = () => {
    console.log('je passe par getUsers')
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
          reject(error)
        }
        console.log(results.rows);
        resolve(results.rows);
      })
    }) 
  }

    const sql = 'INSERT INTO users(password, email, nickname, avatar, level, created_at) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *';
    const aujourdhui = 'now()';
    const values =["jojo","jojo@gmail.com","jojo","avatar",0,aujourdhui]
    //const { name, nickname, email, avatar, level, created_at } = body;
  const createUsers = (body) => { 
    console.log('je passe par createUsers')
    return new Promise(function(resolve, reject) {
        const { password, nickname, email, avatar, level, created_at } = body;
        pool.query(sql,[name, nickname, email, avatar, level, created_at], (error, results) => {
            if (error) {
              reject(error)
            }
            console.log('je suis la');
            resolve(results.rows[0])
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
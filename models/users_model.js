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
      pool.query(sql,[email], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows[0]);
      })
    }) 
  };
  
  async function serialize(password) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password,saltRounds)
    return hash;
  }

//const { name, nickname, email, avatar, level, created_at } = body;
const createUsers = (body) => { 
  const sql = 'INSERT INTO users(password, email, nickname, id_avatar, level, created_at) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *';
  const aujourdhui = 'now()';
return new Promise( async function(resolve, reject) {
    const { password, nickname, email, id_avatar} = body;
    const hashPassword = await serialize(password);
    pool.query(sql,[hashPassword, email, nickname, id_avatar, 0, aujourdhui], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows[0])
      })
    })
  };

const SearchUsers = (body) => {
  const sql1='SELECT * FROM users WHERE email=$1 AND password=$2'
  return new Promise(function(resolve, reject) {
    const {password, email}= body;
    pool.query(sql1,[email, password], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows[0]);
    })
  })
};


const removeUser = (id_user) => {
  const sql = 'DELETE FROM users WHERE id=$1';
  return new Promise(function(resolve, reject) {
    //const {id_user} = params;
    console.log(id_user)
    pool.query(sql,[id_user], (error, results) => {
      if (error) {
        console.log(error)
        reject(error)
      }
      console.log('ok compte fermé')
      resolve(results.rows[0]);
    })
  })
};
module.exports = {
    getUsers,
    createUsers,
    SearchUsers,
    removeUser,
  }
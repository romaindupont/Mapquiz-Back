const pool = require('../data/database');
const bcrypt = require('bcrypt')


const getUsers = (body) => {
  const sql = 'SELECT * FROM users WHERE email=$1';
  return new Promise(function(resolve, reject) {
    const {email}=body;
    pool.pool.query(sql,[email], (error, results) => {
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
};

const createUsers = (body) => { 
  const sql = 'INSERT INTO users(password, email, nickname, id_avatar, level, created_at) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *';
  const aujourdhui = 'now()';
  return new Promise( async function(resolve, reject) {
    const { password, nickname, email, id_avatar} = body;
    const hashPassword = await serialize(password);
    pool.pool.query(sql,[hashPassword, email, nickname, id_avatar, 0, aujourdhui], (error, results) => {
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
    pool.pool.query(sql1,[email, password], (error, results) => {
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
    pool.pool.query(sql,[id_user], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows[0]);
    })
  })
};

const changeInfoOnUser =(body,id_user) => {
  const sql = 'UPDATE users SET password=$1, email=$2, nickname=$3, id_avatar=$4, updated_at=$5 WHERE id=$6';
  const aujourdhui = 'now()';
  return new Promise(async function(resolve, reject) {
    const {password, email,nickname,id_avatar}=body;
    const hashPassword = await serialize(password);
    pool.pool.query(sql,[hashPassword,email,nickname,id_avatar,aujourdhui,id_user], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows[0]);
    })
  })
};

const InfoUsers = (id_user) => {
  const sql = "SELECT row_to_json(use) as user FROM (SELECT id, email, nickname, level, (SELECT json_agg(avat) FROM ( SELECT id, name, picture FROM avatars WHERE id = a.id_avatar) avat)AS avatars FROM users as a WHERE id=$1) use;";
  return new Promise(async function(resolve, reject) {
    pool.pool.query(sql,[id_user], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows[0]);
    })
  })
};

const changeLevel = (id_user, level) => {
  const sql = "UPDATE users SET level=$1 WHERE id=$2;";
  return new Promise(async function(resolve, reject) {
    pool.pool.query(sql,[level, id_user], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows[0]);
    })
  })
};

module.exports = {
    getUsers,
    createUsers,
    SearchUsers,
    removeUser,
    changeInfoOnUser,
    InfoUsers,
    changeLevel,
}
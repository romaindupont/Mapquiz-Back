const dotenv = require('dotenv');
const Pool = require('pg').Pool
dotenv.config();
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

const getQuestion = () => {
    const sql ='SELECT questions.id, questions.question, questions.difficulty, category.name FROM questions INNER JOIN category ON category.id=questions.id_category ORDER BY random();';
    return new Promise(function(resolve, reject) {
      pool.query(sql, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }

const getReponse = () => {
  const sql ="SELECT row_to_json(quest) as questions FROM (SELECT * ,(SELECT json_agg(alb) FROM ( SELECT * from answers WHERE id_question= a.id) alb)AS answers FROM questions as a) quest;"
  return new Promise(function(resolve, reject) {
    pool.query(sql, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
};
const getSpecificQuestion = (params) => {
  const sql ="SELECT row_to_json(quest) as questions FROM (SELECT * ,(SELECT json_agg(alb) FROM ( SELECT * from answers WHERE id_question= a.id) alb)AS answers FROM questions as a WHERE id_category=$1 LIMIT 10 ) quest ORDER BY random();"
  return new Promise(function(resolve, reject) {
    pool.query(sql,[params], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
};

module.exports = {
    getQuestion,
    getReponse,
    getSpecificQuestion,
  }
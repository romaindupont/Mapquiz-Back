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

const checkAdminAccount = (body) => {
  const sql = 'SELECT * FROM users WHERE email=$1 AND isadmin=true';
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

const addQuestion = (body) => {
  const sql = 'INSERT INTO questions(question, picture, difficulty,id_category,trivia,created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const aujourdhui = 'now()';
  return new Promise(async function(resolve,reject){
    const { question, picture, difficulty,id_category,trivia } = body;
    pool.query(sql, [question, picture, difficulty,id_category,trivia, aujourdhui], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows[0]);
    })
  })
};

const addAnswers = (body, newId) => {
 console.log(newId)
 const answers = body.map((currentAnswers)=>{return currentAnswers })
 for (let i = 0; i <= answers.length; i++){
   if(answers[i]!== undefined){
  answers[i].id_question=newId;
  let answer = answers[i]
  let variables = `'${JSON.stringify(answer)}'`;
  console.log(variables);
  const sql =`INSERT INTO answers(label, is_correct, picture, id_question)SELECT label, is_correct, picture, id_question FROM json_populate_record(null::answers, ${variables})RETURNING *`;
  const aujourdhui = 'now()';
  new Promise(async function(resolve,reject){
       pool.query(sql, (error, results) => {
         if (error) {
          reject(error);
        }
        resolve(results.rows); 
      })
   })
}
}
};
const lastId = () => {
  const sql ='SELECT MAX(id) FROM questions';
  return new Promise(async function(resolve,reject){
    pool.query(sql,(error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows[0]);
    })
  })
};

module.exports = {
  checkAdminAccount,
  addQuestion,
  addAnswers,
  lastId,
}
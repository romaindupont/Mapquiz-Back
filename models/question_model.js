const pool = require('../data/database');
class Question {
  id;
  question;
  difficulty;
  category_name;
  trivia;

  constructor(obj) {
    this.id=obj.id;
    this.question=obj.question;
    this.difficulty=obj.difficulty;
    this.category_name=obj.category_name;
    this.trivia=obj.trivia;
  }
}
const question = {
  addQuestion: async (body) => {
    const sql = 'INSERT INTO questions(question, picture, difficulty,id_category,trivia,created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const aujourdhui = 'now()';
    const { question, picture, difficulty,id_category,trivia } = body;
    const result = await pool.pool.query(sql,[question, picture, difficulty,id_category,trivia, aujourdhui]);
    const questionAdd = new Question(result.rows[0]);
    return questionAdd;
  },
  addAnswers: async (body, newId) => {
    const answers = body.map((currentAnswers)=>{return currentAnswers })
    for (let i = 0; i <= answers.length; i++){
      if(answers[i]!== undefined){
     answers[i].id_question=newId;
     let answer = answers[i]
     let variables = `'${JSON.stringify(answer)}'`;
     const sql =`INSERT INTO answers(label, is_correct, picture, id_question)SELECT label, is_correct, picture, id_question FROM json_populate_record(null::answers, ${variables})RETURNING *`;
     const aujourdhui = 'now()';
     const result = await pool.pool.query(sql);
     const answersAdd = new Question(result.rows);
    }
  }
  },
  lastId: async () => {
    const sql ='SELECT MAX(id) FROM questions';
    const result = await pool.pool.query(sql);
    const id = new Question(result.rows[0]);
    return id;
  },
  getSpecificQuestion: async (params) => {
    const sql ="SELECT row_to_json(quest) as questions FROM (SELECT * ,(SELECT json_agg(alb) FROM ( SELECT * from answers WHERE id_question= a.id) alb)AS answers FROM questions as a WHERE id_category=$1 LIMIT 10 ) quest ORDER BY random();";
    const result = await pool.pool.query(sql,[params]);
    console.log(result.rows)
    const ListOfQuestion = new Question(result.rows);
    return result.rows;
  },
};
/* const getQuestion = () => {
    const sql ='SELECT questions.id, questions.question, questions.difficulty, category.name FROM questions INNER JOIN category ON category.id=questions.id_category ORDER BY random();';
    return new Promise(function(resolve, reject) {
      pool.pool.query(sql, (error, results) => {
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
    pool.pool.query(sql, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}; */


module.exports = {
    question,
  }
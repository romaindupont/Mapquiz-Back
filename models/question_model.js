const pool = require('../data/database');
class Questions {
  id;
  question;
  picture;
  difficulty;
  id_category;
  trivia;
  created_at;
  updated_at;

  constructor(obj) {
    this.id=obj.id;
    this.question=obj.question;
    this.difficulty=obj.difficulty;
    this.id_category=obj.id_category;
    this.trivia=obj.trivia;
    this.created_at=obj.created_at;
    this.updated_at=obj.updated_at;
  }
}
const dataQuestion = {
  addQuestion: async (body) => {
    const sql = 'INSERT INTO questions(question, picture, difficulty,id_category,trivia,created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const aujourdhui = 'now()';
    const { question, picture, difficulty,id_category,trivia } = body;
    const result = await pool.pool.query(sql,[question, picture, difficulty,id_category,trivia, aujourdhui]);
    const questionAdd = new Questions(result.rows[0]);
    return questionAdd;
  }, 
  lastId: async () => {
    const sql ='SELECT MAX(id) FROM questions';
    const result = await pool.pool.query(sql);
    const id = result.rows[0];
    return id;
  },
  getSpecificQuestion: async (params) => {
    const sql ="SELECT row_to_json(quest) as questions FROM (SELECT * ,(SELECT json_agg(alb) FROM ( SELECT * from answers WHERE id_question= a.id) alb)AS answers FROM questions as a WHERE id_category=$1 LIMIT 10 ) quest ORDER BY random();";
    const result = await pool.pool.query(sql,[params]);
    return result.rows;
  },
  getQuestion: async () => {
    const sql ='SELECT questions.id, questions.question, questions.difficulty, category.name FROM questions INNER JOIN category ON category.id=questions.id_category ORDER BY random();';
    const result = await pool.pool.query(sql);
    const ListOfQuestion = new Questions(result.rows);
    return ListOfQuestion;
  },
  deleteQuestion: async (id_question) => {
    const sql = 'DELETE FROM questions WHERE id=$1';
    const result = await pool.pool.query(sql, [id_question]);
    return result.rows;
  },
  updateQuestion: async (body, id_question) => {
    const sql = 'UPDATE questions SET question=$1, difficulty=$2, picture=$3, id_category=$4,trivia=$5, updated_at=$6 WHERE id=$7';
    const aujourdhui = 'now()';
    const { question, picture, difficulty,id_category,trivia } = body;
    const result = await pool.pool.query(sql, [question, picture, difficulty,id_category,trivia, aujourdhui,id_question]);
    return result.rows;
  },

};

module.exports = {
  dataQuestion,
  }
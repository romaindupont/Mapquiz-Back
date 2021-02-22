const pool = require('../data/database');
class Answers {
  id;
  label;
  is_correct;
  picture;
  id_question;
  created_at;
  updated_at;

  constructor(obj) {
    this.id=obj.id;
    this.label=obj.label;
    this.is_correct=obj.is_correct;
    this.picture=obj.picture;
    this.id_question=obj.id_question;
    this.created_at=obj.created_at;
    this.updated_at=obj.updated_at;
  }  
};

const dataAnswers = {
  addAnswers: async (body, newId) => {
    const answers = body.map((currentAnswers)=>{return currentAnswers })
    for (let i = 0; i <= answers.length; i++){
      if(answers[i]!== undefined){
     answers[i].id_question=newId;
     let answer = answers[i];
     let variables = `'${JSON.stringify(answer)}'`;
     const sql =`INSERT INTO answers(label, is_correct, picture, id_question)SELECT label, is_correct, picture, id_question FROM json_populate_record(null::answers, ${variables})RETURNING *`;
     const aujourdhui = 'now()';
     const result = await pool.pool.query(sql);
     const answersAdd = new Answers(result.rows);
    }
  }
  },
updateAnswers: async (body, id_answer) => {
  const sql = 'UPDATE answers SET label=$1,is_correct=$2,picture=$3,id_question=$4, updated_at=$5 WHERE id=$6';
    const aujourdhui = 'now()';
    const { label, is_correct,picture,id_question } = body
    const result = await pool.pool.query(sql,[label, is_correct,picture,id_question, aujourdhui, id_answer]);
    return result.rows;
},
deleteAnswers: async (id_answer) => {
  const sql = 'DELETE FROM answers WHERE id=$1';
  const result = await pool.pool.query(sql, [id_answer]);
  return result.rows;
},
findAnswers: async (id_answer) => {
  const sql ="SELECT * FROM answers WHERE id= $1;"
  const result = await pool.pool.query(sql,[id_answer]);
  return result.rows;
},
findAllAnswers: async () => {
  const sql ="SELECT * FROM answers;"
  const result = await pool.pool.query(sql);
  return result.rows;
},

};

module.exports = {
  dataAnswers,
}
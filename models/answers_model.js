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
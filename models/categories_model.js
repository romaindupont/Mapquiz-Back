const pool = require('../data/database');
class Categories {
  id;
  name;
  created_at;
  updated_at;

  constructor(obj) {
    this.id=obj.id;
    this.name=obj.name;
    this.created_at=obj.created_at;
    this.updated_at=obj.updated_at;
  }
};
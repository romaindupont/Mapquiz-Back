const pool = require('../data/database');
class Trophies {
  id;
  name;
  description;
  picture;
  min_level_to_unlock;
  created_at;
  updated_at;

  constructor(obj) {
    this.id=obj.id;
    this.name=obj.name;
    this.description=obj.description;
    this.picture=obj.picture;
    this.min_level_to_unlock=obj.min_level_to_unlock;
    this.created_at=obj.created_at;
    this.updated_at=obj.updated_at;
  }
}
const dataTrophies = {
  getTrophies: async (level) => {
    const sql ="SELECT * FROM trophies WHERE min_level_to_unlock  <= $1;"
    const result = await pool.pool.query(sql,[level]);
    const trophy = new Trophies (result.rows);
    return trophy;
  },
};

module.exports = {
  dataTrophies,
}
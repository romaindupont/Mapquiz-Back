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
    return result.rows;
  },
  createTrophies: async (body) => {
    const sql ="INSERT INTO trophies (name, description, picture, min_level_to_unlock, created_at) VALUES ($1,$2,$3,$4,$5) RETURNING *;"
    const aujourdhui = 'now()';
    const {name, description, picture, min_level_to_unlock} = body
    const result = await pool.pool.query(sql,[name, description, picture, min_level_to_unlock, aujourdhui]);
    return result.rows;
  },
  deleteTrophies: async (id_trophies) => {
    const sql = 'DELETE FROM trophies WHERE id=$1';
    const result = await pool.pool.query(sql, [id_trophies]);
    return result.rows;
  },
  updateTrophies: async (body,id_trophies) => {
    const sql = 'UPDATE trophies SET name=$1, description=$2, picture=$3, min_level_to_unlock=$4, updated_at=$5 WHERE id=$6';
    const aujourdhui = 'now()';
    const {name, description, picture, min_level_to_unlock} = body
    const result = await pool.pool.query(sql,[name, description, picture, min_level_to_unlock, aujourdhui, id_trophies]);
    return result.rows;
  },
  getAllTrophies: async (level) => {
    const sql ="SELECT * FROM trophies;"
    const result = await pool.pool.query(sql,[level]);
    return result.rows;
  },
};

module.exports = {
  dataTrophies,
}
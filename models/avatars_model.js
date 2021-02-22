const pool = require('../data/database');
class Avatars {
  id;
  name;
  picture;
  created_at;
  updated_at;

  constructor(obj) {
    this.id=obj.id;
    this.name=obj.name;
    this.picture=obj.picture;
    this.created_at=obj.created_at;
    this.updated_at=obj.updated_at;
}
}

const dataAvatar = {
  getAvatar: async() => {
    const sql ="SELECT * FROM avatars;"
    const result = await pool.pool.query(sql);
    const avatar = result.rows;
    return avatar;
  },
  createAvatar: async (body) => {
    const sql ="INSERT INTO avatars (name, picture, created_at) VALUES ($1,$2,$3) RETURNING *;"
    const aujourdhui = 'now()';
    const { name, picture } = body
    const result = await pool.pool.query(sql,[name, picture, aujourdhui]);
    return result.rows;
  },
  deleteAvatar: async (id_avatar) => {
    const sql = 'DELETE FROM avatars WHERE id=$1';
    const result = await pool.pool.query(sql, [id_avatar]);
    return result.rows;
  },
  updateAvatar: async (body,id_avatar) => {
    const sql = 'UPDATE avatars SET name=$1, picture=$2, updated_at=$3 WHERE id=$4';
    const aujourdhui = 'now()';
    const { name, picture } = body
    const result = await pool.pool.query(sql,[name, picture, aujourdhui, id_avatar]);
    return result.rows;
  },
  getOneAvatar: async(id_avatar) => {
    const sql ="SELECT * FROM avatars;"
    const result = await pool.pool.query(sql, [id_avatar]);
    const avatar = result.rows;
    return avatar;
  },
}

module.exports = {
  dataAvatar,
}
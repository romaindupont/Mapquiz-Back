const pool = require('../data/database');
const bcrypt = require('bcrypt')
async function serialize(password) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password,saltRounds)
  return hash;
};
class Users {
  id;
  email;
  password;
  nickname;
  id_avatar;
  level;
  isadmin
  created_at;
  updated_at;

  constructor(obj) {
    this.id=obj.id;
    this.email=obj.email;
    this.password=obj.password;
    this.nickname=obj.nickname;
    this.id_avatar=obj.id_avatar;
    this.level=obj.level;
    this.isadmin=obj.isadmin;
    this.created_at=obj.created_at;
    this.updated_at=obj.updated_at;
  }
}
const dataUser = {
  getUsers: async (body) => {
    const sql = 'SELECT * FROM users WHERE email=$1';
    const {email}=body;
    const result = await pool.pool.query(sql,[email]);
    const user = new Users (result.rows[0]);
    return user;
  },
  createUsers: async (body) => {
    const sql = 'INSERT INTO users(password, email, nickname, id_avatar, level, created_at) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *';
    const aujourdhui = 'now()';
    const { password, nickname, email, id_avatar} = body;
    const hashPassword = await serialize(password);
    const result = await pool.pool.query(sql,[hashPassword, email, nickname, id_avatar, 0, aujourdhui]);
    const user = new Users (result.rows[0]);
    return user;
  },
  removeUser: async (id_user) => {
    const sql = 'DELETE FROM users WHERE id=$1';
    const result = await pool.pool.query(sql,[id_user]);
    const user = new Users (result.rows[0]);
    return user;
  },
  changeInfoOnUser: async (body,id_user) => {
    const sql = 'UPDATE users SET password=$1, email=$2, nickname=$3, id_avatar=$4, updated_at=$5 WHERE id=$6';
    const aujourdhui = 'now()';
    const {password, email,nickname,id_avatar}=body;
    const hashPassword = await serialize(password);
    const result = pool.pool.query(sql,[hashPassword,email,nickname,id_avatar,aujourdhui,id_user]);
    const user = new Users (result.rows[0]);
    return user;
  },
  InfoUsers: async(id_user) => {
  const sql = "SELECT row_to_json(use) as user FROM (SELECT id, email, nickname, level, (SELECT json_agg(avat) FROM ( SELECT id, name, picture FROM avatars WHERE id = a.id_avatar) avat)AS avatars FROM users as a WHERE id=$1) use;";
  const result = pool.pool.query(sql,[id_user]);
  const user = new Users (result.rows[0]);
    return user;
  },
  changeLevel: async (id_user, level) => {
    const sql = "UPDATE users SET level=$1 WHERE id=$2;";
    const result = pool.pool.query(sql,[level, id_user]);
    const user = new Users (result.rows[0]);
    return user;
  },
  checkAdminAccount: async (body) => {
    const sql = 'SELECT * FROM users WHERE email=$1 AND isadmin=true';
    const {email}=body;
    const result = await pool.pool.query(sql,[email]);
    const check = new Check(result.rows[0]);
    return check;
  }  
};

module.exports = {
    dataUser,
}
const pool = require('../data/database');
class Check {
  email;
  password;
  nickname;
  id;

  constructor(obj) {
    this.email=obj.email;
    this.password=obj.password;
    this.nickname=obj.nickname;
    this.id=obj.id;

  }
}

const admin = {
  checkAdminAccount: async (body) => {
    const sql = 'SELECT * FROM users WHERE email=$1 AND isadmin=true';
    const {email}=body;
    const result = await pool.pool.query(sql,[email]);
    const check = new Check(result.rows[0]);
    //console.log(check)
    return check;
  }  
};

module.exports = {
  admin,
}
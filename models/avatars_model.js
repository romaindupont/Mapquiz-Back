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
    const result = pool.pool.query(sql);
    const avatar = new Avatars (results.rows);
    return avatar;
  },
  createAvatar: async () => {},
  deleteAvatar: async () => {},
  updateAvatar: async () => {},
};

module.exports = {
  dataAvatar,
}
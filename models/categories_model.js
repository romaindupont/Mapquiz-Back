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

const dataCategories = {
  getAllCategories: async (id_category) => {
    const sql ="SELECT * FROM categories;"
    const result = await pool.pool.query(sql);
    return result.rows;
  },
  getCategories: async (id_category) => {
    const sql ="SELECT * FROM categories WHERE id= $1;"
    const result = await pool.pool.query(sql,[id_category]);
    return result.rows;
  },
  createdCategorie: async (body) => {
    const sql ="INSERT INTO categories (name, created_at) VALUES ($1,$2) RETURNING *;"
    const aujourdhui = 'now()';
    const { name } = body
    const result = await pool.pool.query(sql,[name, aujourdhui]);
    return result.rows;
  },
  deleteCategories: async (id_category) => {
    const sql = 'DELETE FROM categories WHERE id=$1';
    const result = await pool.pool.query(sql, [id_category]);
    return result.rows;
  },
  updateCategories: async (body,id_category) => {
    const sql = 'UPDATE categories SET name=$1, updated_at=$2 WHERE id=$3';
    const aujourdhui = 'now()';
    const { name } = body
    const result = await pool.pool.query(sql,[name, aujourdhui, id_category]);
    return result.rows;
  },
}
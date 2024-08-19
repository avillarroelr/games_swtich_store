// categoriasModel.js
import pool from "../../database/config.js";

export const addCategory = async (categoryData) => {
  const { nombre } = categoryData;

  const query = `
    INSERT INTO categorias (nombre)
    VALUES ($1) RETURNING *`;
  
  const values = [nombre];
  
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getAllCategories = async () => {
  const result = await pool.query('SELECT * FROM categorias');
  return result.rows;
};

export const findCategoryById = async (id_categoria) => {
  const result = await pool.query('SELECT * FROM categorias WHERE id_categoria = $1', [id_categoria]);
  return result.rows[0];
};

export const updateCategory = async (id_categoria, categoryData) => {
  const { nombre } = categoryData;

  const query = `
    UPDATE categorias
    SET nombre = $1
    WHERE id_categoria = $2 RETURNING *`;
  
  const values = [nombre, id_categoria];
  
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteCategory = async (id_categoria) => {
  const result = await pool.query('DELETE FROM categorias WHERE id_categoria = $1 RETURNING *', [id_categoria]);
  return result.rows[0];
};

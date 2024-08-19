// usuariosModel.js
import pool from "../../database/config.js";
import bcrypt from 'bcryptjs';

export const createUser = async (userData) => {
  const { nombre, apellido, email, contraseña, avatar, rol = 1 } = userData;
  const fecha_registro = new Date();
  const hashedPassword = await bcrypt.hash(contraseña, 10);

  const query = `
    INSERT INTO usuarios (nombre, apellido, email, contraseña, fecha_registro, avatar, rol)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
  
  const values = [nombre, apellido, email, hashedPassword, fecha_registro, avatar, rol];
  
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
  return result.rows[0];
};

export const findUserById = async (id_usuario) => {
  try {
    console.log('Buscando usuario con ID:', id_usuario);
    const result = await pool.query('SELECT * FROM usuarios WHERE id_usuario = $1', [id_usuario]);
    console.log('Resultado de la consulta:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error('Error en la consulta de usuario:', error);
    throw error; 
  }
};

export const updateUser = async (id_usuario, userData) => {
  const { nombre, apellido, email, avatar } = userData;
  const query = `
    UPDATE usuarios
    SET nombre = $1, apellido = $2, email = $3, avatar = $4
    WHERE id_usuario = $6 RETURNING *`;
  
  const values = [nombre, apellido, email, avatar, rol, id_usuario];
  
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteUser = async (id_usuario) => {
  const result = await pool.query('DELETE FROM usuarios WHERE id_usuario = $1 RETURNING *', [id_usuario]);
  return result.rows[0];
};



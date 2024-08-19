// carritoModel.js
import pool from "../../database/config.js";

export const addCartItem = async (cartItemData) => {
  const { id_usuario, id_publicacion, fecha_transaccion, monto, estado } = cartItemData;

  const query = `
    INSERT INTO carrito (id_usuario, id_publicacion, fecha_transaccion, monto, estado)
    VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  
  const values = [id_usuario, id_publicacion, fecha_transaccion || new Date(), monto, estado];
  
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getAllCartItems = async () => {
  const result = await pool.query('SELECT * FROM carrito');
  return result.rows;
};

export const findCartItemByUserId = async (id_usuario) => {
  const result = await pool.query('SELECT * FROM carrito WHERE id_usuario = $1', [id_usuario]);
  return result.rows[0];
};

export const updateCartItem = async (id_usuario, cartItemData) => {
  const { id_publicacion, fecha_transaccion, monto, estado } = cartItemData;

  const query = `
    UPDATE carrito
    SET id_publicacion = $1, fecha_transaccion = $2, monto = $3, estado = $4
    WHERE id_usuario = $5 RETURNING *`;
  
  const values = [id_publicacion, fecha_transaccion || new Date(), monto, estado, id_usuario];
  
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteCartItem = async (id_usuario) => {
  const result = await pool.query('DELETE FROM carrito WHERE id_usuario = $1 RETURNING *', [id_usuario]);
  return result.rows[0];
};

// favoritosModel.js
import pool from "../../database/config.js";

export const addFavorite = async (favoriteData) => {
  const { id_usuario, id_publicacion, fecha_valoracion, valoracion } = favoriteData;

  const query = `
    INSERT INTO favoritos (id_usuario, id_publicacion, fecha_valoracion, valoracion)
    VALUES ($1, $2, $3, $4) RETURNING *`;
  
  const values = [id_usuario, id_publicacion, fecha_valoracion || new Date(), valoracion];
  
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getAllFavorites = async () => {
  const result = await pool.query('SELECT * FROM favoritos');
  return result.rows;
};

export const findFavoriteById = async (id_favorito) => {
  const result = await pool.query('SELECT * FROM favoritos WHERE id_favorito = $1', [id_favorito]);
  return result.rows[0];
};

export const updateFavorite = async (id_favorito, favoriteData) => {
  const { fecha_valoracion, valoracion } = favoriteData;

  const query = `
    UPDATE favoritos
    SET fecha_valoracion = $1, valoracion = $2
    WHERE id_favorito = $3 RETURNING *`;
  
  const values = [fecha_valoracion || new Date(), valoracion, id_favorito];
  
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteFavorite = async (id_favorito) => {
  const result = await pool.query('DELETE FROM favoritos WHERE id_favorito = $1 RETURNING *', [id_favorito]);
  return result.rows[0];
};

// favoritosModel.js
import pool from "../../database/config.js";

export const addFavorite = async (favoriteData) => {
  const { id_usuario, id_publicacion, fecha_valoracion } = favoriteData;

  const query = `
      INSERT INTO favoritos (id_usuario, id_publicacion, fecha_valoracion)
      SELECT $1, $2, $3
      WHERE NOT EXISTS (
          SELECT 1 FROM favoritos WHERE id_usuario = $1 AND id_publicacion = $2
      );
  `;

  const values = [id_usuario, id_publicacion, fecha_valoracion];

  try {
      const result = await pool.query(query, values);

      // Verificamos si la inserción ocurrió
      if (result.rowCount > 0) {
          return { exists: false, status: 201, message: 'Ingreso exitoso' };
      } else {
          return { exists: true, status: 409, message: 'El juego ya está en la lista de deseos' };
      }
  } catch (error) {
      console.error("Error en la consulta SQL:", error.message);
      // Devolver siempre un objeto definido, incluso en caso de error
      return { exists: false, status: 500, message: 'Error al agregar a favoritos' };
  }
};





export const findFavoriteByUserAndPublication = async (id_usuario, id_publicacion) => {
  const query = `
      SELECT * FROM favoritos
      WHERE id_usuario = $1 AND id_publicacion = $2`;
  
  const values = [id_usuario, id_publicacion];
  const result = await pool.query(query, values);
  return result.rows.length > 0 ? result.rows[0] : false;
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

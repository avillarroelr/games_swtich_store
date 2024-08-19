// publicacionesModel.js
import pool from "../../database/config.js";

export const createPublication = async (publicationData) => {
  const { id_usuario, url_imagen_juego, titulo, descripcion, precio, stock, estado, id_categoria } = publicationData;

  const query = `
    INSERT INTO publicaciones (id_usuario, url_imagen_juego, titulo, descripcion, precio, stock, estado, id_categoria)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
  
  const values = [id_usuario, url_imagen_juego, titulo, descripcion, precio, stock, estado, id_categoria];
  
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getAllPublications = async () => {
  const result = await pool.query('SELECT * FROM publicaciones');
  return result.rows;
};

export const findPublicationById = async (id_publicacion) => {
  const result = await pool.query('SELECT * FROM publicaciones WHERE id_publicacion = $1', [id_publicacion]);
  return result.rows[0];
};

export const updatePublication = async (id_publicacion, publicationData) => {
  const { url_imagen_juego, titulo, descripcion, precio, stock, estado, id_categoria } = publicationData;

  const query = `
    UPDATE publicaciones
    SET url_imagen_juego = $1, titulo = $2, descripcion = $3, precio = $4, stock = $5, estado = $6, id_categoria = $7
    WHERE id_publicacion = $8 RETURNING *`;
  
  const values = [url_imagen_juego, titulo, descripcion, precio, stock, estado, id_categoria, id_publicacion];
  
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deletePublication = async (id_publicacion) => {
  const result = await pool.query('DELETE FROM publicaciones WHERE id_publicacion = $1 RETURNING *', [id_publicacion]);
  return result.rows[0];
};

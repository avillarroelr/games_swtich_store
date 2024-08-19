// favoritosController.js
import { addFavorite, getAllFavorites, findFavoriteById, updateFavorite, deleteFavorite } from '../models/favoritosModel.js';

export const createNewFavorite = async (req, res) => {
  try {
    const favorite = await addFavorite(req.body);
    res.status(201).json(favorite);
  } catch (error) {
    res.status(400).json({ error: 'Error al agregar a favoritos' });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const favorites = await getAllFavorites();
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los favoritos' });
  }
};

export const getFavorite = async (req, res) => {
  try {
    const favorite = await findFavoriteById(req.params.id);
    if (!favorite) {
      return res.status(404).json({ error: 'Favorito no encontrado' });
    }
    res.json(favorite);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el favorito' });
  }
};

export const updateFavoriteBd = async (req, res) => {
  try {
    const favorite = await updateFavorite(req.params.id, req.body);
    if (!favorite) {
      return res.status(404).json({ error: 'Favorito no encontrado' });
    }
    res.json(favorite);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el favorito' });
  }
};

export const deleteFavoriteBd = async (req, res) => {
  try {
    const favorite = await deleteFavorite(req.params.id);
    if (!favorite) {
      return res.status(404).json({ error: 'Favorito no encontrado' });
    }
    res.json({ message: 'Favorito eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el favorito' });
  }
};

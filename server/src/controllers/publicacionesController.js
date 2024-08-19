//publicacionesController.js
import { createPublication, getAllPublications, findPublicationById, updatePublication, deletePublication } from '../models/publicacionesModel.js';
updatePublication
export const createNewPublication = async (req, res) => {
  try {
    const publication = await createPublication(req.body);
    res.status(201).json(publication);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear la publicación' });
  }
};

export const getPublications = async (req, res) => {
  try {
    const publications = await getAllPublications();
    res.json(publications);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las publicaciones' });
  }
};

export const getPublication = async (req, res) => {
  try {
    const publication = await findPublicationById(req.params.id);
    if (!publication) {
      return res.status(404).json({ error: 'Publicación no encontrada' });
    }
    res.json(publication);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la publicación' });
  }
};

export const updatePublicationBd = async (req, res) => {
  try {
    const publication = await updatePublication(req.params.id, req.body);
    if (!publication) {
      return res.status(404).json({ error: 'Publicación no encontrada' });
    }
    res.json(publication);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar la publicación' });
  }
};

export const deletePublicationBd = async (req, res) => {
  try {
    const publication = await deletePublication(req.params.id);
    if (!publication) {
      return res.status(404).json({ error: 'Publicación no encontrada' });
    }
    res.json({ message: 'Publicación eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la publicación' });
  }
};

//categoriasController.js
import { addCategory, getAllCategories, findCategoryById, updateCategory, deleteCategory } from '../models/categoriasModel.js';

export const createNewCategory = async (req, res) => {
  try {
    const category = await addCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear la categoría' });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las categorías' });
  }
};

export const getCategory = async (req, res) => {
  try {
    const category = await findCategoryById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la categoría' });
  }
};

export const updateCategoryBd = async (req, res) => {
  try {
    const category = await updateCategory(req.params.id, req.body);
    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar la categoría' });
  }
};

export const deleteCategoryBd = async (req, res) => {
  try {
    const category = await deleteCategory(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json({ message: 'Categoría eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la categoría' });
  }
};

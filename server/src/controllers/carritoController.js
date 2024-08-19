//carritoController.js
import { addCartItem, getAllCartItems, findCartItemByUserId, updateCartItem, deleteCartItem } from '../models/carritoModel.js';

export const createNewCartItem = async (req, res) => {
  try {
    const cartItem = await addCartItem(req.body);
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(400).json({ error: 'Error al agregar el item al carrito' });
  }
};

export const getCartItems = async (req, res) => {
  try { 
    const cartItems = await getAllCartItems();
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los items del carrito' });
  }
};

export const getCartItem = async (req, res) => {
  try {
    const cartItem = await findCartItemByUserId(req.params.id_usuario);
    if (!cartItem) {
      return res.status(404).json({ error: 'Item del carrito no encontrado' });
    }
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el item del carrito' });
  }
};

export const updateCartItemBd = async (req, res) => {
  try {
    const cartItem = await updateCartItem(req.params.id_usuario, req.body);
    if (!cartItem) {
      return res.status(404).json({ error: 'Item del carrito no encontrado' });
    }
    res.json(cartItem);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el item del carrito' });
  }
};

export const deleteCartItemBd = async (req, res) => {
  try {
    const cartItem = await deleteCartItem(req.params.id_usuario);
    if (!cartItem) {
      return res.status(404).json({ error: 'Item del carrito no encontrado' });
    }
    res.json({ message: 'Item del carrito eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el item del carrito' });
  }
};

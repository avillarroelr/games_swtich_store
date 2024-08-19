//usuariosController.js
import { createUser, findUserByEmail, findUserById, updateUser, deleteUser } from '../models/usuariosModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createNewUser = async (req, res) => {
  try {
    console.log('Datos recibidos en createNewUser:', req.body);
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error al crear usuario:', error);  
    res.status(400).json({ error: 'Error al crear usuario' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    const user = await findUserByEmail(email);

    if (!user || !(await bcrypt.compare(contraseña, user.contraseña))) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ id_usuario: user.id_usuario, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ 
      token,
      id_usuario: user.id_usuario,
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      avatar: user.avatar,
      rol: user.rol
     });
  } catch (error) {
    res.status(500).json({ error: 'Error en el login' });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

export const getProfile = async (req, res) => {
  try {
    const { id_usuario } = req.user; 
    console.log('ID de usuario extraído del token:', id_usuario);

    const user = await findUserById(id_usuario);
    console.log('Usuario encontrado:', user);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    res.status(500).json({ error: 'Error al obtener el perfil del usuario' });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const { id_usuario } = req.user;
    const user = await findUserById(id_usuario);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el perfil del usuario' });
  }
};

export const updateUserBd = async (req, res) => {
  try {
    const user = await updateUser(req.params.id, req.body);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el usuario' });
  }
};

export const deleteUserBd = async (req, res) => {
  try {
    const user = await deleteUser(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};
// usuariosRoutes.js
import { Router } from 'express';
import { loginUser, createNewUser, getUserProfile, updateUserBd, deleteUserBd, getProfile  } from '../controllers/usuariosController.js';
import { validparameters, validateParametersUser } from '../middlewares/validateMiddleware.js';
import { validateToken } from '../middlewares/validateTokenMiddleware.js';

const router = Router();


router.post('/registro', validateParametersUser, createNewUser);
router.post('/login', validparameters, loginUser);
router.get('/perfil', validateToken, getUserProfile);
router.put('/:id', validateToken, validateParametersUser, updateUserBd);
router.delete('/:id', validateToken, deleteUserBd);

export default router;
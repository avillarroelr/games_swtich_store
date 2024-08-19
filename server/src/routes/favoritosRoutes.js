// usuariosRouter.js
import { Router } from 'express';
import { createNewFavorite, getFavorites, getFavorite, updateFavoriteBd, deleteFavoriteBd } from '../controllers/favoritosController.js';
import { validateToken } from '../middlewares/validateTokenMiddleware.js';
import { validateFavoriteData } from '../middlewares/validateMiddleware.js';
import { reportTransaction } from '../middlewares/reportMiddleware.js';

const router = Router();

router.use(reportTransaction);

router.post('/favoritos', validateFavoriteData, createNewFavorite);
router.get('/favoritos', getFavorites);
router.get('/favoritos/:id', getFavorite);
router.put('/favoritos/:id', validateFavoriteData, updateFavoriteBd);
router.delete('/favoritos/:id', deleteFavoriteBd);

export default router;

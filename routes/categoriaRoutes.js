import express from 'express';
import CategoriasControllers from '../controllers/CategoriasControllers.js';
import { authenticateToken, authorizeAdmin } from '../middlewares/authMiddleware.js'
const router = express.Router();

router.post('/crear', authenticateToken, authorizeAdmin, CategoriasControllers.crearCategoria);
router.get('/buscar', authenticateToken, authorizeAdmin, CategoriasControllers.obtenerCategorias);
router.get('/buscar/:id', authenticateToken, authorizeAdmin, CategoriasControllers.obtenerCategoriaPorId);
router.put('/cambiar/:id', authenticateToken, authorizeAdmin, CategoriasControllers.actualizarCategoria);
router.delete('/eliminar/:id', authenticateToken, authorizeAdmin, CategoriasControllers.eliminarCategoria);

export { router as categoriaRouter }

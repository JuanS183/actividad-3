import express from 'express';
import UsuariosControllers from '../controllers/UsuariosControllers.js';
import { authenticateToken, authorizeAdmin } from '../middlewares/authMiddleware.js'

const router = express.Router();

router.get('/buscar/:id/proyectos', authenticateToken, UsuariosControllers.obtenerProyectosUsuario);
router.get('/buscar/:id/habitos', authenticateToken, UsuariosControllers.obtenerHabitosUsuario);
router.put('/cambiar/:id', authenticateToken, authorizeAdmin, UsuariosControllers.actualizarUsuario);
router.delete('/eliminar/:id', authenticateToken, authorizeAdmin, UsuariosControllers.eliminarUsuario);
router.get('/buscar/:id', authenticateToken, UsuariosControllers.obtenerUsuarioPorId);

// Registo de Usuario
router.get('/crear', UsuariosControllers.mostrarFormularioRegistro);
router.post('/crear', UsuariosControllers.crearUsuario);


router.post('/asignar/proyecto', authenticateToken, authorizeAdmin, UsuariosControllers.asignarUsuarioConProyecto);
router.get('/buscar', authenticateToken, authorizeAdmin, UsuariosControllers.obtenerUsuarios);

export { router as userRouter }

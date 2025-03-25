import express from 'express';
import ProyectosControllers from '../controllers/ProyectosController.js';
import { authenticateToken, authorizeAdmin } from '../middlewares/authMiddleware.js'

const router = express.Router();

router.post('/crear', authenticateToken, authorizeAdmin, ProyectosControllers.crearProyecto);
router.post('/asignar/actividad', authenticateToken, authorizeAdmin, ProyectosControllers.asignarActividadConProyecto);
router.get('/buscar', authenticateToken, ProyectosControllers.obtenerProyectos);
router.get('/buscar/:id', authenticateToken, ProyectosControllers.obtenerProyectos);
router.get('/buscar/:id/actividades', authenticateToken, ProyectosControllers.obtenerActividadesPorProyecto);
router.put('/cambiar/:id', authenticateToken, authorizeAdmin, ProyectosControllers.actualizarProyecto);
router.delete('/eliminar/:id', authenticateToken, authorizeAdmin, ProyectosControllers.eliminarProyecto);

export { router as proyectoRouter }

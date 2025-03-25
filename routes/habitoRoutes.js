import express from 'express';
import HabitosControllers from '../controllers/HabitosControllers.js';
import { authenticateToken, authorizeAdmin } from '../middlewares/authMiddleware.js'
const router = express.Router();

router.post('/crear', authenticateToken, HabitosControllers.crearHabito);
router.post('/asignar/actividad', authenticateToken, authorizeAdmin, HabitosControllers.asignarHabitoConActividad);
router.post('/asignar/usuario', authenticateToken, authorizeAdmin, HabitosControllers.asignarHabitoConUsuario)
router.get('/buscar', authenticateToken, HabitosControllers.obtenerHabitos);
router.get('/buscar/:id', authenticateToken, HabitosControllers.obtenerHabitoPorId);
router.get('/buscar/:id/actividades', authenticateToken, HabitosControllers.obtenerHabitosPorActividad);
router.get('/buscar/:usuarioId/sin/actividades', authenticateToken, authorizeAdmin, HabitosControllers.obtenerHabitosSinActividades)
router.put('/cambiar/:id', authenticateToken, authorizeAdmin, HabitosControllers.actualizarHabito);
router.delete('/eliminar/:id', authenticateToken, authorizeAdmin, HabitosControllers.eliminarHabito);

export { router as habitoRouter }

import express from 'express';
import ActividadesControllers from '../controllers/ActividadesControllers.js';
import { authenticateToken, authorizeAdmin } from '../middlewares/authMiddleware.js'
const router = express.Router();

router.post('/crear', authenticateToken, authorizeAdmin, ActividadesControllers.crearActividad);
router.post('/asignar/categoria', authenticateToken, authorizeAdmin, ActividadesControllers.asignarCategoria);
router.get('/buscar', authenticateToken, ActividadesControllers.obtenerActividades);
router.get('/buscar/:id', authenticateToken, authorizeAdmin, ActividadesControllers.obtenerActividadPorId);

// Buscar Activdades Por nombre
router.get('/buscar/nombre/actividades', ActividadesControllers.mostrarVistaActividadesPorNombre);
router.get('/buscar/:nombre/actividad', authenticateToken, ActividadesControllers.obtenerActividadesPorNombre);

// Buscar ultimas 5 Actividades por usuario
router.get('/buscar/ultimas/actividades', ActividadesControllers.mostrarVistaUltimasActividadesPorUsuario)
router.get('/buscar/:usuarioId/ultimas', authenticateToken, ActividadesControllers.obtenerUltimasActividades)


router.get('/buscar/:proyectoId/proyecto', authenticateToken, ActividadesControllers.obtenerPorProyectoActividades)

// Buscar actividades por Categoria - Vista y Endpoint
router.get('/buscar/actividades/categoria', ActividadesControllers.mostrarVistaActividadesPorCategoria);
router.get('/buscar/:categoriaId/categoria', authenticateToken, ActividadesControllers.obtenerActividadesPorCategoria);

// Buscar actividaes por usuario y categoria
router.get('/buscar/usuarios/categorias', ActividadesControllers.mostrarVistaActividadesPorCategoriaPorUsuario);
router.get('/buscar/:usuarioId/:categoriaId/', authenticateToken, authorizeAdmin, ActividadesControllers.obtenerActividadesPorCategoriaPorUsuario)

router.put('/cambiar/:id', authenticateToken, authorizeAdmin, ActividadesControllers.actualizarActividad);
router.delete('/eliminar/:id', authenticateToken, authorizeAdmin, ActividadesControllers.eliminarActividad);

export { router as actividadRouter }

import express from 'express';
import AuthControllers from '../controllers/AuthControllers.js';

const router = express.Router();

// login de usuarios
router.get('/login', AuthControllers.mostrarFormularioLogin);
router.post('/login', AuthControllers.login);


export { router as authRouter }

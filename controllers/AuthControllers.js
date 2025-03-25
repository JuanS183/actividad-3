
import UsuarioEntidad from '../db/entities/UsuariosEntidad.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

class AuthController {

  async mostrarFormularioLogin(req, res) {
    res.render('login');
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      console.log('Login body', req.body)

      if (!email || !password) {
        return res.status(400).json({ error: 'Se requiere email y contraseña.' });
      }

      const buscarUsuario = await UsuarioEntidad.obtenerUsuarioPorEmail(email);
      console.log(buscarUsuario[0])

      if (!buscarUsuario) {
        return res.status(401).json({ error: 'No se ha encontrado usuario con este email, verifique' });
      }

      const passwordMatch = await bcrypt.compare(password, buscarUsuario[0].password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Credenciales invalidas.' });
      }

      const token = jwt.sign(
        { id: buscarUsuario[0].id, usuario: buscarUsuario[0].usuario, role: buscarUsuario[0].role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION || '1h' }
      );

      console.log('Login token', token)

      return res.json({ message: 'Login exitoso.', token });

    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al iniciar sesión',
        error: error.message
      });
    }
  }
}

export default new AuthController();


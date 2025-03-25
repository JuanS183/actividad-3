import UsuarioEntidad from '../db/entities/UsuariosEntidad.js';

class UsuariosControllers {

  async mostrarFormularioRegistro(req, res) {
    res.render('crearUsuario');
  }

  async crearUsuario(req, res) {
    try {
      const { usuario, nombre, email, telefono, direccion, password } = req.body;

      console.log(req.body)

      if (!usuario || !nombre || !email || !password || !telefono || !direccion) {
        return res.status(400).json({ error: 'Todos los campos obligatorios deben ser completados.' });
      }

      const buscarPorEmail = await UsuarioEntidad.obtenerUsuarioPorEmail(email);
      if (buscarPorEmail) {
        return res.status(409).json({ mensaje: 'Usuario encontrado con este email, utilice otro' })
      }

      const nuevoUsuarioId = await UsuarioEntidad.crear({ usuario, nombre, email, telefono, direccion, password });
      res.status(201).json({
        mensaje: 'Usuario creado exitosamente',
        id: nuevoUsuarioId
      });
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al crear usuario',
        error: error.message
      });
    }
  }

  async obtenerUsuarios(req, res) {
    try {
      const usuarios = await UsuarioEntidad.obtenerTodos();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al obtener usuarios',
        error: error.message
      });
    }
  }

  async obtenerUsuarioPorId(req, res) {
    try {
      const usuario = await UsuarioEntidad.obtenerPorId(req.params.id);

      if (!usuario) {
        return res.status(404).json({
          mensaje: 'Usuario no encontrado'
        });
      }

      res.json(usuario);
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al obtener usuario',
        error: error.message
      });
    }
  }

  async actualizarUsuario(req, res) {
    try {
      const resultado = await UsuarioEntidad.actualizar(req.params.id, req.body);

      if (!resultado) {
        return res.status(404).json({
          mensaje: 'Usuario no encontrado'
        });
      }

      res.json({
        mensaje: 'Usuario actualizado exitosamente'
      });
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al actualizar usuario',
        error: error.message
      });
    }
  }

  async eliminarUsuario(req, res) {
    try {
      const resultado = await UsuarioEntidad.eliminar(req.params.id);
      if (!resultado) {
        return res.status(404).json({
          mensaje: 'Usuario no encontrado'
        });
      }
      res.json({
        mensaje: 'Usuario eliminado exitosamente'
      });
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al eliminar usuario',
        error: error.message
      });
    }
  }

  async obtenerProyectosUsuario(req, res) {
    try {
      const proyectos = await UsuarioEntidad.obtenerProyectosPorUsuario(req.params.id);
      res.json(proyectos);
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al obtener proyectos del usuario',
        error: error.message
      });
    }
  }

  async obtenerHabitosUsuario(req, res) {
    try {
      const habitos = await UsuarioEntidad.obtenerHabitosPorUsuario(req.params.id);
      res.json(habitos);
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al obtener habitos del usuario',
        error: error.message
      });
    }
  }

  async asignarUsuarioConProyecto(req, res) {
    try {
      const proyecto = await UsuarioEntidad.asignarUsuarioConProyecto(req.body.usuarioId, req.body.proyectoId);
      res.json({
        mensaje: "Asignado correctamente usuario con proyecto"
      });
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al obtener habitos del usuario',
        error: error.message
      });
    }
  }

}

export default new UsuariosControllers();

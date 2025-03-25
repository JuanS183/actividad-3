import HabitoEntidad from '../db/entities/HabitosEntidad.js';

class HabitosControllers {
  async crearHabito(req, res) {
    try {
      const nuevoHabitoId = await HabitoEntidad.crear(req.body);
      res.status(201).json({
        mensaje: 'Habito creado exitosamente',
        id: nuevoHabitoId
      });
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al crear Habito',
        error: error.message
      });
    }
  }

  async obtenerHabitos(req, res) {
    try {
      const habitos = await HabitoEntidad.obtenerTodos();
      res.json(habitos);
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al obtener habitos',
        error: error.message
      });
    }
  }

  async obtenerHabitoPorId(req, res) {
    try {
      const habito = await HabitoEntidad.obtenerPorId(req.params.id);

      if (!habito) {
        return res.status(404).json({
          mensaje: 'Habito no encontrado'
        });
      }

      res.json(habito);
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al obtener habito',
        error: error.message
      });
    }
  }

  async actualizarHabito(req, res) {
    try {
      const resultado = await HabitoEntidad.actualizar(req.params.id, req.body);

      if (!resultado) {
        return res.status(404).json({
          mensaje: 'Habito no encontrado'
        });
      }

      res.json({
        mensaje: 'Habito actualizado exitosamente'
      });
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al actualizar habito',
        error: error.message
      });
    }
  }

  async eliminarHabito(req, res) {
    try {
      const resultado = await HabitoEntidad.eliminar(req.params.id);
      if (!resultado) {
        return res.status(404).json({
          mensaje: 'Habito no encontrado'
        });
      }
      res.json({
        mensaje: 'Habito eliminado exitosamente'
      });
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al eliminar habito',
        error: error.message
      });
    }
  }

  async asignarHabitoConActividad(req, res) {
    try {
      const resultado = await HabitoEntidad.asignarActividad(req.body.actividadId, req.body.habitoId);
      if (!resultado) {
        return res.status(404).json({
          mensaje: 'Actividad no encontrado'
        });
      }
      res.json({
        mensaje: 'Actividad asignado exitosamente'
      });
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al asignar Actividad en Habito',
        error: error.message
      });
    }
  }

  async obtenerHabitosPorActividad(req, res) {
    try {
      const habitos = await HabitoEntidad.obtenerPorActividad(req.params.id);
      res.json(habitos);
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al obtener habitos por actividad',
        error: error.message
      });
    }
  }

  async asignarHabitoConUsuario(req, res) {
    try {
      const resultado = await HabitoEntidad.asignarHabitoAUsuario(req.body.usuarioId, req.body.habitoId);
      res.json({
        mensaje: 'Habito asignado exitosamente con usuario'
      });
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al asignar Habito con usuario',
        error: error.message
      });
    }
  }

  async obtenerHabitosSinActividades(req,res) {
   try {
    const resultado = await HabitosEntidad.obtenerHabitosSinActividades(req.params.usuarioId)
    res.json(resultado)
   } catch (error) {
     res.status(500).json({
        mensaje: 'Error al obtener Habito con usuario',
        error: error.message
      });
   }
  }

}

export default new HabitosControllers();

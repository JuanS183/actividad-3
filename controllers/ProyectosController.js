import ProyectoEntidad from '../db/entities/ProyectosEntidad.js';

class ProyectosControllers {
  async crearProyecto(req, res) {
    try {
      const nuevoProyectoId = await ProyectoEntidad.crear(req.body);
      res.status(201).json({
        mensaje: 'Proyecto creado exitosamente',
        id: nuevoProyectoId
      });
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al crear proyecto',
        error: error.message
      });
    }
  }

  async obtenerProyectos(req, res) {
    try {
      const proyecto = await ProyectoEntidad.obtenerTodos();
      res.json(proyecto);
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al obtener proyectos',
        error: error.message
      });
    }
  }

  async obtenerProyectoPorId(req, res) {
    try {
      const proyecto = await ProyectoEntidad.obtenerPorId(req.params.id);

      if (!proyecto) {
        return res.status(404).json({
          mensaje: 'proyecto no encontrado'
        });
      }

      res.json(proyecto);
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al obtener proyecto',
        error: error.message
      });
    }
  }

  async actualizarProyecto(req, res) {
    try {
      const resultado = await ProyectoEntidad.actualizar(req.params.id, req.body);

      if (!resultado) {
        return res.status(404).json({
          mensaje: 'Proyecto no encontrado'
        });
      }

      res.json({
        mensaje: 'Proyecto actualizado exitosamente'
      });
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al actualizar proyecto',
        error: error.message
      });
    }
  }

  async eliminarProyecto(req, res) {
    try {
      const resultado = await ProyectoEntidad.eliminar(req.params.id);
      if (!resultado) {
        return res.status(404).json({
          mensaje: 'Proyecto no encontrado'
        });
      }
      res.json({
        mensaje: 'Proyecto eliminado exitosamente'
      });
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al eliminar Proyecto',
        error: error.message
      });
    }
  }

  async asignarActividadConProyecto(req, res) {
    try {
      const proyecto = await ProyectoEntidad.asignarActividadConProyecto(req.body.proyectoId, req.body.actividadId);
      res.json({
         mensaje: 'Actividad asignado exitosamente con Proyecto'
      });
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al asignar proyecto con actividad',
        error: error.message
      });
    };
  }

  async obtenerActividadesPorProyecto(req, res) {
    try {
      const proyecto = await ProyectoEntidad.obtenerActividadesPorProyecto(req.params.id);
      res.json(proyecto);
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al obtener proyectos con actividades',
        error: error.message
      });
    };
  }
}
export default new ProyectosControllers();

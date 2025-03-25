import ActividadEntidad from '../db/entities/ActividadesEntidad.js';

class ActividadesControllers {
  async crearActividad(req, res) {
    try {
      const nuevoActividadId = await ActividadEntidad.crear(req.body);
      res.status(201).json({
        mensaje: 'Actividad creado exitosamente',
        id: nuevoActividadId
      });
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al crear Actividad',
        error: error.message
      });
    }
  }

  async obtenerActividades(req, res) {
    try {
      const actividades = await ActividadEntidad.obtenerTodos();
      res.json(actividades);
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al obtener Actividades',
        error: error.message
      });
    }
  }

  async obtenerActividadPorId(req, res) {
    try {
      const actividad = await ActividadEntidad.obtenerPorId(req.params.id);

      if (!actividad) {
        return res.status(404).json({
          mensaje: 'Actividad no encontrado'
        });
      }

      res.json(actividad);
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al obtener Actividad',
        error: error.message
      });
    }
  }

  async actualizarActividad(req, res) {
    try {
      const resultado = await ActividadEntidad.actualizar(req.params.id, req.body);

      if (!resultado) {
        return res.status(404).json({
          mensaje: 'Actividad no encontrado'
        });
      }

      res.json({
        mensaje: 'Actividad actualizado exitosamente'
      });
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al actualizar actividad',
        error: error.message
      });
    }
  }

  async eliminarActividad(req, res) {
    try {
      const resultado = await ActividadEntidad.eliminar(req.params.id);
      if (!resultado) {
        return res.status(404).json({
          mensaje: 'Actividad no encontrado'
        });
      }
      res.json({
        mensaje: 'Actividad eliminado exitosamente'
      });
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al eliminar actividad',
        error: error.message
      });
    }
  }

  async asignarCategoria(req, res) {
    try {
      const resultado = await ActividadEntidad.asignarCategoria(req.body.actividadId, req.body.categoriaId);
      if (!resultado) {
        return res.status(404).json({
          mensaje: 'Actividad no encontrado'
        });
      }
      res.json({
        mensaje: 'Categoria asignada exitosamente'
      });
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al asignar categoria',
        error: error.message
      });
    }
  }

  async mostrarVistaActividadesPorCategoria(req, res) {
    res.render('actividadesPorCategoria')
  }
  async obtenerActividadesPorCategoria(req, res) {
    try {
      const actividades = await ActividadEntidad.obtenerPorCategoria(req.params.categoriaId);
      res.json(actividades);
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al obtener Actividades',
        error: error.message
      });
    }
  }

  async mostrarVistaActividadesPorCategoriaPorUsuario(req,res) {
    res.render('actividadesPorCategoriaPorUsuario')
  }

  async obtenerActividadesPorCategoriaPorUsuario(req,res) {
    try {
      const actividades = await ActividadEntidad.obtenerActividadesPorCategoriaPorUsuario(req.params.usuarioId, req.params.categoriaId);
      res.json(actividades);
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al obtener Actividades',
        error: error.message
      });
    }
  }

  async mostrarVistaUltimasActividadesPorUsuario(req, res) {
    res.render('ultimasActividades')
  }

  async obtenerUltimasActividades(req, res) {
    const { usuarioId } = req.params;
    try {
      const actividades = await ActividadEntidad.obtenerUltimas(usuarioId);
      res.json(actividades);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener actividades', error: error.message });
    }
  }
   
  async obtenerPorProyectoActividades(req,res) {
   const { proyectoId } = req.params;
    try {
      const actividades = await ActividadEntidad.obtenerPorProyecto(proyectoId);
      res.json(actividades);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener actividades por proyecto', error: error.message });
    }
  }

  async mostrarVistaActividadesPorNombre(req,res) {
    res.render('buscarPorNombre')
  }

  async obtenerActividadesPorNombre(req, res) {
    const { nombre } = req.params
    try {
     const actividades = await ActividadEntidad.buscarPorNombre(nombre);
      if(!actividades){
        return res.status(404).json({mensaje: 'No existe actividades con ese nombre'})
      }
      res.json(actividades)
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener actividades por nombre', error: error.message });
    }
  }  
}

export default new ActividadesControllers();

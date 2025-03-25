import CategoriaEntidad from '../db/entities/CategoriasEntidad.js';

class CategoriasControllers {
  async crearCategoria(req, res) {
    try {
      const nuevoCategoriaId = await CategoriaEntidad.crear(req.body);
      res.status(201).json({
        mensaje: 'Categoria creado exitosamente',
        id: nuevoCategoriaId
      });
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al crear Categoria',
        error: error.message
      });
    }
  }

  async obtenerCategorias(req, res) {
    try {
      const categorias = await CategoriaEntidad.obtenerTodos();
      res.json(categorias);
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al obtener Categorias',
        error: error.message
      });
    }
  }

  async obtenerCategoriaPorId(req, res) {
    try {
      const categoria = await CategoriaEntidad.obtenerPorId(req.params.id);

      if (!categoria) {
        return res.status(404).json({
          mensaje: 'Categoria no encontrado'
        });
      }

      res.json(categoria);
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al obtener Categoria',
        error: error.message
      });
    }
  }

  async actualizarCategoria(req, res) {
    try {
      const resultado = await CategoriaEntidad.actualizar(req.params.id, req.body);

      if (!resultado) {
        return res.status(404).json({
          mensaje: 'Categoria no encontrado'
        });
      }

      res.json({
        mensaje: 'Categoria actualizado exitosamente'
      });
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al actualizar categoria',
        error: error.message
      });
    }
  }

  async eliminarCategoria(req, res) {
    try {
      const resultado = await CategoriaEntidad.eliminar(req.params.id);
      if (!resultado) {
        return res.status(404).json({
          mensaje: 'Categoria no encontrado'
        });
      }
      res.json({
        mensaje: 'Categoria eliminado exitosamente'
      });
    } catch (error) {
      res.status(500).json({
        mensaje: 'Error al eliminar categoria',
        error: error.message
      });
    }
  }

}

export default new CategoriasControllers();

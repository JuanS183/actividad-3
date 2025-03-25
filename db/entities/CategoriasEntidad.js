import db from '../Db.js';

class CategoriaEntidad {
  constructor() {
    this.table = 'categorias';
  }

  async crear(categoria) {
    try {
      const query = `INSERT INTO ${this.table} (nombre) VALUES (?)`;
      const result = await db.executeQuery(query, [categoria.nombre]);
      return result.insertId
    } catch (error) {
      console.error('Error creando la categoria:', error);
    }
    ;
  }

  async obtenerTodos() {
    try {
      const query = `SELECT * FROM ${this.table}`;
      return await db.executeQuery(query);
    } catch (error) {
      console.error('Error al obtenerTodos las categorias:', error)
    }

  }

  async obtenerPorId(id) {
    try {
      const query = `SELECT * FROM ${this.table} WHERE id = ?`;
      const resultados = await db.executeQuery(query, [id]);
      return resultados[0];
    } catch (error) {
      console.error('Error al obtener por ID las categorias:', error);
    }

  }

  async actualizar(id, categoria) {
    try {

      await db.executeQuery(query, [categoria.nombre, id]);
      return true;
    } catch (error) {
      console.error('Error al actualizar por ID las categorias:', error)
    }
  }

  async eliminar(id) {
    try {
      const query = `DELETE FROM ${this.table} WHERE id = ?`;
      const result = await db.executeQuery(query, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error al eliminar por ID las categorias:', error)
    }

  }
}

export default new CategoriaEntidad();


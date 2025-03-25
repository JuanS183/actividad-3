import db from '../Db.js';

class ActividadEntidad {
  constructor() {
    this.table = 'actividades';
  }

  async crear(actividad) {
    try {
      const query = `INSERT INTO ${this.table} (nombre) VALUES (?)`;
      const result = await db.executeQuery(query, [actividad.nombre]);
      return result.insertId;
    } catch (error) {
      console.error('Error creando la actividad:', error);
    }

  }

  async obtenerTodos() {
    try {
      const query = `SELECT * FROM ${this.table}`;
      return await db.executeQuery(query);
    } catch (error) {
      console.error('Error al obtenerTodos las actividades:', error)
    }

  }

  async obtenerPorId(id) {
    try {
      const query = `SELECT * FROM ${this.table} WIHERE id = ?`;
      const resultados = await db.executeQuery(query, [id]);
      return resultados[0];
    } catch (error) {
      console.error('Error al obtener por ID las actividades', error)
    }

  }

  async actualizar(id, actividad) {
    try {
      const query = `UPDATE ${this.table} SET nombre = ? WHERE id = ?`;
      await db.executeQuery(query, [actividad.nombre, id]);
      return true;
    } catch (error) {
      console.error('Error al actualizar por ID las actividades:', error)
    }

  }

  async eliminar(id) {
    try {
      const query1 = `DELETE FROM proyecto_actividad WHERE actividad_id = ?;`;
      const query2 = `DELETE FROM actividades WHERE id = ?;`;
      await db.executeQuery(query1, [id]);
      const result = await db.executeQuery(query2, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error al eliminar por ID las actividades:', error)
    }

  }

async asignarCategoria(actividadId, categoriaId) {
    const query = `UPDATE actividades SET categoria_id = ? WHERE id = ?`
    try {
         return await db.executeQuery(query, [categoriaId,actividadId]);
    } catch (error) {
        console.error('Error asignando categoría a la actividad:', error);
        throw error;
    } 
}

  async obtenerPorCategoria(categoriaId) {
    const query = `
        SELECT a.* 
        FROM actividades a
        WHERE a.categoria_id = ?
    `;

    try {
      return await db.executeQuery(query, [categoriaId]);
    } catch (error) {
      console.error('Error obteniendo actividades por categoría:', error);
      throw error;
    }
  }

  async obtenerActividadesPorCategoriaPorUsuario(usuarioId, categoriaId) {
    try {
      const query = `
      SELECT a.* 
      FROM actividades a
      JOIN usuario_categoria uc ON uc.categoria_id = a.categoria_id
      WHERE uc.usuario_id = ? AND uc.categoria_id = ?
      LIMIT 25;`;
    return await db.executeQuery(query, [usuarioId, categoriaId]); 
    } catch (error) {
      console.error('Error obteniendo actividades por categoria por usuario:', error);
      throw error; 
    }

  }

  async obtenerUltimas(usuarioId) {
    try {
      const query = `
      SELECT a.*
      FROM actividades a
      JOIN usuario_categoria uc ON uc.categoria_id = a.categoria_id
      WHERE uc.usuario_id = ?
      ORDER BY a.id DESC
      LIMIT 5;`
    return await db.executeQuery(query, [usuarioId]); 
    } catch (error) {
      console.error('Error obteniendo actividades por usuario:', error);
      throw error; 
    }

  }
  
  async obtenerPorProyecto(proyectoId) {
    try {
      const query = `
      SELECT a.* 
      FROM actividades a
      JOIN proyecto_actividad pa ON pa.actividad_id = a.id
      WHERE pa.proyecto_id = ?;`
    return await  db.executeQuery(query, [proyectoId]); 
    } catch (error) {
      console.error('Error obteniendo actividades por proyecto:', error);
      throw error;  
    }
  }

  async buscarPorNombre(nombre) {
    try {
      const query = `
      SELECT a.* 
      FROM actividades a
      WHERE a.nombre LIKE CONCAT('%', ?, '%');`
    return db.executeQuery(query, [nombre]);
    } catch (error) {
      console.error('Error obteniendo actividades por nombre:', error);
      throw error;  
    }
  }
}

export default new ActividadEntidad();


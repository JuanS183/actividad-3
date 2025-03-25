import db from '../Db.js';

class ProyectoEntidad {
  constructor() {
    this.table = 'proyectos';
  }

  async crear(proyecto) {
    try {
      const query = `INSERT INTO ${this.table} (nombre) VALUES (?)`;
      const result = await db.executeQuery(query, [proyecto.nombre]);
      return result.insertId;
    } catch (error) {
      console.error('Error creando el proyecto:', error);
      throw error;
    }

  }

  async obtenerTodos() {
    try {
      const query = `SELECT * FROM ${this.table}`;
      return await db.executeQuery(query);
    } catch (error) {
      console.error('Error al obtenerTodos los proyectos:', error)
    }

  }

  async obtenerPorId(id) {
    try {
      const query = `SELECT * FROM ${this.table} WHERE id = ?`;
      const resultados = await db.executeQuery(query, [id]);
      return resultados[0];
    } catch (error) {
      console.error('Error al obtener por ID los proyectos:', error)
    }

  }

  async actualizar(id, proyecto) {
    try {
      const query = `UPDATE ${this.table} SET nombre = ? WHERE id = ?`;
      await db.executeQuery(query, [proyecto.nombre, id]);
      return true;
    } catch (error) {
      console.error('Error al actualizar por ID los proyectos:', error)
    }

  }

  async eliminar(id) {
    try {
      const query1 = `DELETE FROM proyecto_actividad WHERE proyecto_id = ?;`;
      const query2 = `DELETE FROM usuario_proyecto WHERE proyecto_id = ?;`;
      const query3 = `DELETE FROM proyectos WHERE id = ?;`;
    
      await db.executeQuery(query1, [id]);
      await db.executeQuery(query2, [id]);
      const result = await db.executeQuery(query3, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error al eliminar por ID los proyectos:', error)
    }

  }

  async obtenerActividadesPorProyecto(proyectoId) {
    const query = `
        SELECT a.*
        FROM actividades a
        JOIN proyecto_actividad pa ON a.id = pa.actividad_id
        WHERE pa.proyecto_id = ?
    `;

    try {
      return await db.executeQuery(query, [proyectoId]);
    } catch (error) {
      console.error('Error obteniendo actividades de un proyecto:', error);
      throw error;
    }
  }

  async asignarActividadConProyecto(proyectoId, actividadId) {
    const query = `
        INSERT INTO proyecto_actividad (proyecto_id, actividad_id)
        VALUES (?, ?)`
    ;

    try {
        await db.executeQuery(query, [proyectoId, actividadId]);
        return true;
    } catch (error) {
        console.error('Error asignando actividad al proyecto:', error);
        throw error;
    }
}

}

export default new ProyectoEntidad();


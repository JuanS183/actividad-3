import db from '../Db.js';

class HabitoEntidad {
  constructor() {
    this.table = 'habitos';
  }

  async crear(habito) {
    try {
      const query = `INSERT INTO ${this.table} (nombre) VALUES (?)`;
      const result = await db.executeQuery(query, [habito.nombre]);
      return result.insertId;
    } catch (error) {
      console.error('Error creando el habito:', error);
      throw error;
    }
  }

  async obtenerTodos() {
    try {
      const query = `SELECT * FROM ${this.table}`;
      return await db.executeQuery(query);
    } catch (error) {
      console.error('Error al obtenerTodos los habitos:', error)
      throw error;
    }

  }

  async obtenerPorId(id) {
    try {
      const query = `SELECT * FROM ${this.table} WHERE id = ?`;
      const resultados = await db.executeQuery(query, [id]);
      return resultados[0];
    } catch (error) {
      console.error('Error al obtener por ID los habitos:', error)
      throw error;
    }

  }

  async actualizar(id, habito) {
    try {
      const query = `UPDATE ${this.table} SET nombre = ? WHERE id = ?`;
      await db.executeQuery(query, [habito.nombre, id]);
      return true;
    } catch (error) {
      console.error('Error al actualizar por ID los habitos:', error)
      throw error;
    }

  }

  async eliminar(id) {
    try {
      const query = `DELETE FROM ${this.table} WHERE id = ?`;
      const result = await db.executeQuery(query, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error al eliminar por ID los habitos:', error)
      throw error;
    }

  }

  async obtenerPorActividad(actividadId) {
    const query = `
        SELECT h.* 
        FROM habitos h
        WHERE h.actividad_id = ?
    `;

    try {
      return await db.executeQuery(query, [actividadId]);
    } catch (error) {
      console.error('Error obteniendo hábitos por actividad:', error);
      throw error;
    }
  }

  async asignarActividad(habitoId, actividadId) {
    const query = `
        UPDATE habitos
        SET actividad_id = ?
        WHERE id = ?
    `;
    try {
      await db.executeQuery(query, [actividadId, habitoId]);
      return true;
    } catch (error) {
      console.error('Error asignando actividad al habito:', error);
      throw error;
    }
  }

  async asignarHabitoAUsuario(usuarioId, habitoId) {
    const query = `
        INSERT INTO usuario_habito (usuario_id, habito_id)
        VALUES (?, ?)`
    ;

    try {
        await db.executeQuery(query, [usuarioId, habitoId]);
        return true;
    } catch (error) {
        console.error('Error asignando habito al usuario:', error);
        throw error;
    }
  }

  async obtenerHabitosSinActividades(usuarioId) {
    try {
      const query = `
      SELECT h.* 
      FROM habitos h
      LEFT JOIN usuario_habito uh ON uh.habito_id = h.id
      LEFT JOIN actividades a ON a.habito_id = h.id
      WHERE uh.usuario_id = ? AND a.id IS NULL;`
    return db.executeQuery(query, [usuarioId]);
    } catch (error) {
      console.error('Error obteniendo habitos sin actividades asignadas por usuario:', error);
      throw error; 
    }

  }
}


export default new HabitoEntidad();


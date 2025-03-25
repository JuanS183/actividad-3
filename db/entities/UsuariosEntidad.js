import db from '../Db.js';
import bcrypt from 'bcrypt';

class UsuarioEntidad {
  constructor() {
    this.table = 'usuarios';
  }

  async crear({ usuario, nombre, email, telefono, direccion, password, role = 'BASICO' }) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const query = `
        INSERT INTO usuarios (usuario, nombre, email, telefono, direccion, password, role) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
      const result = await db.executeQuery(query, [usuario, nombre, email, telefono, direccion, hashedPassword, role]);
      return result.insertId;
    } catch (error) {
      console.error('Error registrando al usuario por email:', error);
      throw error;
    }
  }

  async obtenerTodos() {
    const query = `
            SELECT u.*, 
                   GROUP_CONCAT(DISTINCT c.nombre) AS categorias, 
                   GROUP_CONCAT(DISTINCT h.nombre) AS habitos, 
                   GROUP_CONCAT(DISTINCT p.nombre) AS proyectos 
            FROM ${this.table} u
            LEFT JOIN usuario_categoria uc ON u.id = uc.usuario_id
            LEFT JOIN categorias c ON uc.categoria_id = c.id
            LEFT JOIN usuario_habito uh ON u.id = uh.usuario_id
            LEFT JOIN habitos h ON uh.habito_id = h.id
            LEFT JOIN usuario_proyecto up ON u.id = up.usuario_id
            LEFT JOIN proyectos p ON up.proyecto_id = p.id
            GROUP BY u.id
        `;

    return await db.executeQuery(query);
  }

  async obtenerPorId(id) {
    const query = `
            SELECT u.*, 
                   GROUP_CONCAT(DISTINCT c.nombre) AS categorias, 
                   GROUP_CONCAT(DISTINCT h.nombre) AS habitos, 
                   GROUP_CONCAT(DISTINCT p.nombre) AS proyectos 
            FROM ${this.table} u
            LEFT JOIN usuario_categoria uc ON u.id = uc.usuario_id
            LEFT JOIN categorias c ON uc.categoria_id = c.id
            LEFT JOIN usuario_habito uh ON u.id = uh.usuario_id
            LEFT JOIN habitos h ON uh.habito_id = h.id
            LEFT JOIN usuario_proyecto up ON u.id = up.usuario_id
            LEFT JOIN proyectos p ON up.proyecto_id = p.id
            WHERE u.id = ?
            GROUP BY u.id
        `;

    const resultados = await db.executeQuery(query, [id]);
    return resultados[0];
  }

  async actualizar(id, usuario) {
    const { usuario: username, nombre, email, telefono, direccion } = usuario;
    const query = `
            UPDATE ${this.table} 
            SET usuario = ?, nombre = ?, email = ?, 
                telefono = ?, direccion = ?
            WHERE id = ?
        `;

    try {
      await db.executeQuery(query, [username, nombre, email, telefono, direccion, id]);
      return true;
    } catch (error) {
      console.error('Error actualizando usuario:', error);
      throw error;
    }
  }

  async eliminar(id) {
    const query = `DELETE FROM ${this.table} WHERE id = ?`;

    try {
      const result = await db.executeQuery(query, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error eliminando usuario:', error);
      throw error;
    }
  }

  async obtenerProyectosPorUsuario(usuarioId) {
    const query = `
        SELECT p.*
        FROM proyectos p
        JOIN usuario_proyecto up ON p.id = up.proyecto_id
        WHERE up.usuario_id = ?
    `;

    try {
      return await db.executeQuery(query, [usuarioId]);
    } catch (error) {
      console.error('Error obteniendo proyectos del usuario:', error);
      throw error;
    }
  }

  async obtenerHabitosPorUsuario(usuarioId) {
    const query = `
        SELECT h.*
        FROM habitos h
        JOIN usuario_habito uh ON h.id = uh.habito_id
        WHERE uh.usuario_id = ?
    `;

    try {
      return await db.executeQuery(query, [usuarioId]);
    } catch (error) {
      console.error('Error obteniendo habitos del usuario:', error);
      throw error;
    }
  }

  async asignarUsuarioConProyecto(usuarioId, proyectoId) {
    const query = `
        INSERT INTO usuario_proyecto (usuario_id, proyecto_id)
        VALUES (?, ?)`;
    try {
      await db.executeQuery(query, [usuarioId, proyectoId]);
      return true;
    } catch (error) {
      console.error('Error asignando proyecto al usuario:', error);
      throw error;
    }
  }

  async obtenerUsuarioPorEmail(email) {
    try {
      const query = `SELECT * FROM usuarios WHERE email = ? LIMIT 1;`
      const rows = await db.executeQuery(query, [email]);

      if (!rows || rows.length === 0) {
        console.warn(`No se encontró usuario con email: ${email}`);
        return null;
      }

      return rows;
    } catch (error) {
      console.error('Error buscando al usuario por email:', error);
      throw new Error('Error al buscar usuario en la base de datos.');
    }
  }
}

export default new UsuarioEntidad();

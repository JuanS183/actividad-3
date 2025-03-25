import mysql from 'mysql2/promise';
import dotenv from 'dotenv'
dotenv.config();


class DatabaseConnection {
  constructor() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }

  async getConnection() {
    try {
      return await this.pool.getConnection();

    } catch (error) {
      console.error('Error al obtener conexión:', error);
      throw error;
    }
  }

  async executeQuery(query, params = []) {
    let connection;
    try {
      connection = await this.getConnection();
      const [results] = await connection.execute(query, params);
      return results;
    } catch (error) {
      console.error('Error ejecutando consulta:', error);
      throw error;
    } finally {
      if (connection) connection.release();
    }
  }
}

export default new DatabaseConnection();

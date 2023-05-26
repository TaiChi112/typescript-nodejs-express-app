import { Pool } from 'pg';

class UserModel {
  private static pool: Pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres-api',
    password: ' ',
    port: 5432, // PostgreSQL default port
  });

  public static getAllUsers(): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const client = await UserModel.pool.connect();
        const result = await client.query('SELECT * FROM users');
        client.release();
        resolve(result.rows);
      } catch (error) {
        reject(error);
      }
    });
  }

  public static getUserById(id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const client = await UserModel.pool.connect();
        const result = await client.query('SELECT * FROM users WHERE id = $1', [id]);
        client.release();
        resolve(result.rows[0]);
      } catch (error) {
        reject(error);
      }
    });
  }

  public static createUser(name: string, email: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const client = await UserModel.pool.connect();
        const result = await client.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
        client.release();
        resolve(result.rows[0]);
      } catch (error) {
        reject(error);
      }
    });
  }

  public static updateUser(id: number, name: string, email: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const client = await UserModel.pool.connect();
        const result = await client.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, id]);
        client.release();
        resolve(result.rows[0]);
      } catch (error) {
        reject(error);
      }
    });
  }

  public static deleteUser(id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const client = await UserModel.pool.connect();
        const result = await client.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        client.release();
        resolve(result.rows[0]);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default UserModel;

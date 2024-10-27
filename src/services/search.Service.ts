import sql from 'mssql';
import configDB from '../config/database';

export const searchUsers = async (name: string) => {
  let pool: sql.ConnectionPool | null = null;

  try {
    pool = await configDB.connect();
    const result = await pool
      .request()
      .input('Name', sql.VarChar, `%${name}%`) // Menggunakan wildcard untuk pencarian
      .query('SELECT * FROM USERINFO WHERE Name LIKE @Name');

    return result.recordset; // Mengembalikan data yang ditemukan
  } catch (error) {
    throw new Error(`Database query failed: ${error}`);
  } finally {
    if (pool) {
      await pool.close();
    }
  }
};

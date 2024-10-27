import sql from 'mssql';
import configDB from '../config/database';
import logger from '../utils/logger';

export const postPresensi = async (
  userId: number,
  checktime: string,
  sensorId?: number,
  sn?: string,
) => {
  let pool: sql.ConnectionPool | null = null;
  try {
    pool = await configDB.connect();
    const result = await pool
      .request()
      .input('userId', sql.Int, userId)
      .input('checktime', sql.DateTime, new Date(checktime))
      .input('sensorId', sql.Int, sensorId)
      .input('sn', sql.VarChar, sn)
      .query(
        'INSERT INTO CHECKINOUT (userId, checktime, sensorId, sn) VALUES (@userId, @checktime, @sensorId, @sn)',
      );

    return result.rowsAffected; // Mengembalikan jumlah baris yang terpengaruh
  } catch (error) {
    logger.error('Database query failed', { error });
    throw new Error(`Database query failed: ${error}`);
  } finally {
    if (pool) {
      await pool.close();
    }
  }
};

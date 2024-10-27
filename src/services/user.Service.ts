import sql from "mssql";
import configDB from "../config/database";

export const getUsers = async () => {
  let pool: sql.ConnectionPool | null = null;
  try {
    pool = await configDB.connect();
    const result = await pool.request().query("SELECT * FROM USERINFO");
    return result.recordset;
  } catch (error) {
    throw new Error(`Database query failed: ${error}`);
  } finally {
    if (pool) {
      await pool.close();
    }
  }
};

export const getUserById = async (id: number) => {
  let pool: sql.ConnectionPool | null = null;
  try {
    pool = await configDB.connect();
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM USERINFO WHERE USERID = @id");
    return result.recordset[0];
  } catch (error) {
    throw new Error(`Database query failed: ${error}`);
  } finally {
    if (pool) {
      await pool.close();
    }
  }
};

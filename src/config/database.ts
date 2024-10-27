import { ConnectionPool } from "mssql";
import dotenv from "dotenv";

// Memuat variabel lingkungan dari file .env
const env = process.env.NODE_ENV || "development"; // Tentukan mode jika tidak ada
dotenv.config({ path: `.env.${env}` }); // Muat file .env sesuai mode

const configDB = new ConnectionPool({
  user: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD|| "",
  server: process.env.DB_SERVER || "",
  database: process.env.DB_NAME || "",
  port: 1433,
  options: {
    encrypt: true, // Gunakan ini jika menggunakan Azure
    trustServerCertificate: true, // Sesuaikan sesuai kebutuhan
  },
});

export default configDB;

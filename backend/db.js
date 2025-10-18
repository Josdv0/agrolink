import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

console.log("DEBUG DB CONNECTION:", {
  user: process.env.DB_USER,
  password: typeof process.env.DB_PASSWORD === "string" ? "OK" : "NO CARGADA",
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  typePassword: typeof process.env.DB_PASSWORD,
});

// Conexión de prueba
pool.connect()
  .then(() => console.log("✅ Conectado a PostgreSQL"))
  .catch(err => console.error("❌ Error de conexión a PostgreSQL:", err));

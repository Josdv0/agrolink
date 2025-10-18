import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { pool } from "./db.js";

dotenv.config();

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // Dirección del frontend (Vite)
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// 🔹 Ruta de prueba
app.get("/api/test", async (_req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ success: true, serverTime: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error en la base de datos" });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor backend en http://localhost:${PORT}`));

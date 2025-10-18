// backend/routes/login.js
import express from "express";
import bcrypt from "bcryptjs";
import { pool } from "../db.js";

const router = express.Router();

// POST /api/login
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT id, email, password, role FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ success: false, error: "Usuario no encontrado" });
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ success: false, error: "Contraseña incorrecta" });
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ Error en /api/login:", error);
    res.status(500).json({ success: false, error: "Error del servidor" });
  }
});

export default router;

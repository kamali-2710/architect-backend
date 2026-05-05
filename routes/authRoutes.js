import express from "express";
import User from "../models/User.js";
import multer from "multer";

const router = express.Router();

/* ================= MULTER ================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

/* ================= REGISTER ================= */
router.post("/register", upload.single("photo"), async (req, res) => {
  try {
    const {
      phone,
      email,
      username,
      password,
      role,
      experience,
      specialization,
      location
    } = req.body;

    const exist = await User.findOne({
      $or: [{ phone }, { email }]
    });

    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      username,
      phone,
      email,
      password,
      role: role || "client",
      experience,
      specialization,
      location,

      // 🔥 IMPORTANT FIX
      photo: req.file ? `uploads/${req.file.filename}` : ""
    });

    await user.save();

    res.json({ message: "Register success", user });

  } catch (err) {
    console.log("REGISTER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone, password });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login success", user });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
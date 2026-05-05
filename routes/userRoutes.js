import express from "express";
import User from "../models/User.js";

const router = express.Router();

/* ================= GET ALL USERS ================= */
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= GET ONLY ARCHITECTS ================= */
router.get("/architects", async (req, res) => {
  try {
    const architects = await User.find({ role: "architect" });
    res.json(architects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= DELETE USER ================= */
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= UPDATE USER ================= */
router.put("/:id", async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
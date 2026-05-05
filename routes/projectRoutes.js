import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

/* ================= GET ALL PROJECTS ================= */
router.get("/", async (req, res) => {
  try {
    const data = await Project.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= CREATE PROJECT ================= */
router.post("/", async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= ASSIGN ARCHITECT + UPDATE ================= */
router.put("/:id", async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      {
        architect: req.body.architect,
        status: req.body.status || "NEW",
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= DELETE PROJECT ================= */
router.delete("/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
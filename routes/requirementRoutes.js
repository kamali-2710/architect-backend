import express from "express";
import Requirement from "../models/Requirement.js";

const router = express.Router();

// CREATE REQUIREMENT
router.post("/", async (req, res) => {
  const data = new Requirement(req.body);
  await data.save();
  res.json(data);
});

// GET REQUIREMENTS
router.get("/", async (req, res) => {
  const data = await Requirement.find().sort({ createdAt: -1 });
  res.json(data);
});

export default router;
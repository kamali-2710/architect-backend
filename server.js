import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import requirementRoutes from "./routes/requirementRoutes.js";

import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

// middleware
app.use(cors());    
app.use(express.json());


app.use("/uploads", express.static("uploads"));

// MongoDB connection
mongoose.connect("mongodb+srv://kamali:kamali@cluster0.2mo9hj1.mongodb.net/architect")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/requirements", requirementRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Server Running OK");
});

// server start
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
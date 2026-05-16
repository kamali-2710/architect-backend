import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dns from "dns";

import routes from "./routes/routes.js";

//bycrypt
import bcrypt from "bcryptjs";
import User from "./models/User.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

/* MONGODB CONNECTION (DIRECT) */
mongoose
 .connect("mongodb+srv://kamali:kamali@cluster0.2mo9hj1.mongodb.net/architect")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));


/* AUTO ADMIN */
  const createAdmin = async () => {

  const adminExist =
    await User.findOne({
      role: "admin"
    });

  if (!adminExist) {

    const hashedPassword =
      await bcrypt.hash("admin17", 10);

    await User.create({

      username: "admin",

      email: "admin@gmail.com",

      phone: "8778105656",

      password: hashedPassword,

      role: "admin",

    });

    console.log("Admin Created");
  }
};
createAdmin();


/* ROUTES */
app.use("/api", routes);

/* TEST */
app.get("/", (req, res) => {
  res.send("Server Running OK");
});

/* SERVER */
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
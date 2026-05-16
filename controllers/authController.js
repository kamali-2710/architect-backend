import User from "../models/User.js";
import bcrypt from "bcryptjs";

/* ================= REGISTER ================= */

export const registerUser = async (req, res) => {
  try {
    const {
      phone,
      email,
      username,
      password,
      role,
      experience,
      specialization,
      location,
    } = req.body;

    /* REQUIRED FIELDS */

    if (!username || !phone || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    /* REGEX VALIDATION */

    const phoneRegex = /^[6-9]\d{9}$/;

    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[0-9]).{6,}$/;

    /* PHONE */

    if (!phoneRegex.test(phone.trim())) {
      return res.status(400).json({
        message:
          "Mobile number must be 10 digits and start with 6-9",
      });
    }

    /* EMAIL */

    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        message: "Enter a valid email address",
      });
    }

    /* PASSWORD */

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must include uppercase letter and number",
      });
    }

    /* CHECK USER */

    const exist = await User.findOne({
      $or: [
        { phone: phone.trim() },
        { email: email.trim() },
      ],
    });

    if (exist) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    /* HASH PASSWORD */

    const salt = await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(password, salt);

    /* CREATE USER */

    const user = new User({
      username: username.trim(),
      phone: phone.trim(),
      email: email.trim(),
      password: hashedPassword,
      role: role || "client",

      experience:
        role === "architect"
          ? experience
          : undefined,

      specialization:
        role === "architect"
          ? specialization
          : undefined,

      location:
        role === "architect"
          ? location
          : undefined,

      photo:
        role === "architect" && req.file
          ? `uploads/${req.file.filename}`
          : "",
    });

    await user.save();

    /* REMOVE PASSWORD */

    user.password = undefined;

    res.status(201).json({
      message: "Register success",
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

/* ================= LOGIN ================= */

export const loginUser = async (req, res) => {
  try {
    const phone = req.body.phone.trim();

    const password = req.body.password.trim();

    /* REQUIRED */

    if (!phone || !password) {
      return res.status(400).json({
        message: "Phone and password are required",
      });
    }

    /* FIND USER */

    const user = await User.findOne({
      phone: phone,
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    /* CHECK PASSWORD */

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    /* REMOVE PASSWORD */

    user.password = undefined;

    res.status(200).json({
      message: "Login success",
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
import express from "express";

import multer from "multer";

/* CONTROLLERS */

import {
  getAllUsers,
  getArchitects,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";

import {
  registerUser,
  loginUser,
} from "../controllers/authController.js";

import {
  getDashboardStats
} from "../controllers/dashboardController.js";

import {
  createRequirement,
  getRequirements,
  deleteRequirement,
  updateRequirement,
  uploadCompletedWork,
} from "../controllers/requirementController.js";

import {
  createOrder,
  verifyPayment
} from "../controllers/paymentController.js";

const router = express.Router();

/* ================= MULTER ================= */

const storage =
  multer.diskStorage({

    destination: (req, file, cb) => {

      cb(null, "uploads/");
    },

    filename: (req, file, cb) => {

      cb(
        null,

        Date.now() +
        "-" +
        file.originalname
      );
    },
  });

const upload =
  multer({
    storage,
  });

/* ================= AUTH ================= */

router.post(

  "/auth/register",

  upload.single("photo"),

  registerUser
);

router.post(

  "/auth/login",

  loginUser
);

/* ================= USERS ================= */

router.get(

  "/users",

  getAllUsers
);

router.get(

  "/users/architects",

  getArchitects
);

router.delete(

  "/users/:id",

  deleteUser
);

router.put(

  "/users/:id",

  updateUser
);
/* ================= DASHBOARD ================= */

router.get(
  "/dashboard/stats",
  getDashboardStats
);

/* ================= REQUIREMENTS ================= */

/* CREATE */

router.post(

  "/requirements",

  upload.single("image"),

  createRequirement
);

/* GET */

router.get(

  "/requirements",

  getRequirements
);

/* UPDATE */

router.put(

  "/requirements/:id",

  updateRequirement
);

/* UPLOAD COMPLETED WORK */

router.put(

  "/requirements/upload/:id",

  upload.single("completedImage"),

  uploadCompletedWork
);

/* DELETE */

router.delete(

  "/requirements/:id",

  deleteRequirement
);
 /* ================= PAYMENT ================= */

/* PAYMENT */

router.post(
  "/payment/create-order",
  createOrder
);

router.post(
  "/payment/verify",
  verifyPayment
);

export default router;
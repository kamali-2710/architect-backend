import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },

    email: {
      type: String,
    },

    phone: {
      type: String,
      required: true,
    },

    password: {
      type: String,
    },

    role: {
      type: String,
      enum: ["client", "architect", "admin"],
      default: "client",
    },

    /* EXTRA FIELDS */

    experience: {
      type: String,
      default: "",
    },

    specialization: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    photo: {
      type: String,
      default: "",
    },
  },

  { timestamps: true }
);

export default mongoose.model("User", userSchema);
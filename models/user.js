import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  phone: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: "client"
  },

  // 🔥  architect fields
  experience: String,
  specialization: String,
  location: String,
  photo: String

}, { timestamps: true });

export default mongoose.model("User", userSchema);
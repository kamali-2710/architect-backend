import mongoose from "mongoose";

const requirementSchema = new mongoose.Schema({
  project: String,
  location: String,
  type: String,
  floor: String,
  block: String,
  deadline: String,
  budget: String,
  requirement: String,

  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  clientName: String,
  status: {
    type: String,
    default: "New"
  }
}, { timestamps: true });

export default mongoose.model("Requirement", requirementSchema);
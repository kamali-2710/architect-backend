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
  image: String,

  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  clientName: String,

  architect: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "NEW",
  },
  completedNote: {
    type: String,
    default: "",
  },

  paymentStatus: {
    type: String,
    default: "PENDING",
  },
  completedImage: {
    type: String,
    default: "",
  },
}, {
  timestamps: true
});

export default mongoose.model("Requirement", requirementSchema);
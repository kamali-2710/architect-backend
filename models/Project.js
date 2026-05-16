import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: String,
    location: String,
    type: String,
    floor: String,
    image: String,

    // 🔥 REQUIREMENT FULL OBJECT STORE
    requirement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Requirement",
    },

    architect: { type: String, default: null },

    status: { type: String, default: "NEW" },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: String,
    location: String,
    type: String,
    floor: String,
    block: String,
    budget: String,
    deadline: String,
    requirement: String,
    image: String,

    clientId: String,
    clientName: String,

    architect: {
      type: String,
      default: ""
    },

    status: {
      type: String,
      default: "NEW"
    },

    progress: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
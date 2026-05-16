import Requirement from "../models/Requirement.js";

/* =========================
   CREATE REQUIREMENT
========================= */

export const createRequirement = async (req, res) => {
  try {
    const {
      project,
      location,
      type,
      floor,
      block,
      deadline,
      budget,
      requirement,
      clientId,
      clientName,
    } = req.body;

    if (!budget || Number(budget) < 5000) {
      return res.status(400).json({
        message: "Minimum budget is ₹5000",
      });
    }

    const newRequirement = new Requirement({
      project,
      location,
      type,
      floor,
      block,
      deadline,
      budget: Number(budget),
      requirement,
      clientId,
      clientName,

      image: req.file
        ? `uploads/${req.file.filename}`
        : "",

      status: "NEW",
    });

    const saved = await newRequirement.save();

    res.json(saved);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};

/* =========================
   GET REQUIREMENTS
========================= */

export const getRequirements = async (req, res) => {

  try {

    const data =
      await Requirement.find()
      .sort({ createdAt: -1 });

    res.json(data);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};

/* =========================
   UPDATE REQUIREMENT
========================= */

export const updateRequirement =
async (req, res) => {

  try {

    const updated =
      await Requirement.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          returnDocument: "after",
        }
      );

    res.json(updated);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};

/* =========================
   DELETE REQUIREMENT
========================= */

export const deleteRequirement =
async (req, res) => {

  try {

    await Requirement.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Deleted Successfully",
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};

/* =========================
   UPLOAD COMPLETED WORK
========================= */

export const uploadCompletedWork =
async (req, res) => {

  try {

    const updated =
      await Requirement.findByIdAndUpdate(

        req.params.id,

        {
          completedImage: req.file
            ? `uploads/${req.file.filename}`
            : "",

          completedNote:
            req.body.completedNote,

          status: "UNDER_REVIEW",
        },

        {
          returnDocument: "after",
        }
      );

    res.json(updated);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};
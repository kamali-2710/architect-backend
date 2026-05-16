import User from "../models/User.js";

/* GET ALL USERS */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* GET ARCHITECTS */
export const getArchitects = async (req, res) => {
  try {
    const data = await User.find({ role: "architect" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* DELETE USER */
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* UPDATE USER */
export const updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const User = require("../models/Users");
const bcrypt = require("bcryptjs");

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { userID, name, role, password } = req.body;
    const encPassword = bcrypt.hash(password, 10);
    console.log(JSON.stringify({ userID, name, role, password, encPassword }));
    const newUser = new User({ userID, name, role, encPassword });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user by ID
exports.getUserByUserName = async (req, res) => {
  try {
    const user = await User.findOne({ name: req.params.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const { name, role, password } = req.body;
    const user = await User.findOneAndUpdate(
      { name: req.params.username },
      { name, role, password },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ name: req.params.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

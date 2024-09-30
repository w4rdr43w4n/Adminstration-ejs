const mongoose = require("mongoose");

// Define the User Schema
const UserSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["admin", "teacher", "student"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create and export the User model
module.exports = mongoose.model("User", UserSchema);

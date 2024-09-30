const axios = require("axios");

const API_URL = "http://localhost:5000/api/users";

// Function to handle login
async function login(username, password) {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error during login API call", error);
    throw error;
  }
}

async function register(username, password) {
  try {
    const userID = username;
    const role = "student";
    const response = await axios.post(`${API_URL}/register`, {
      userID,
      role,
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error during registration API call", error);
    throw error;
  }
}

module.exports = {
  login,
  register,
};

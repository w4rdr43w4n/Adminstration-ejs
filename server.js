// Modules
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./src/routes/userRoutes");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { login, register } = require("./src/lib/services");

// Configuration
const app = express();
const PORT = process.env.PORT || 3000;

// General Middlewares
app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var currentKey = "";
var currentPassword = "";

// Authentication Middleware

function middleware(req, res, next) {
  if (currentKey == "") res.redirect("/login");
  else if (jwt.verify(currentKey, process.env.ACCESS_TOKEN_SECRET)) {
    next();
  } else {
    res.redirect("/login");
  }
}

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_DATABASE_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// User API routes
app.use("/api/users", userRoutes);

// Main Front-End routes
app.get("/", (req, res) => {
  res.redirect("/login");
});

app.post("/login", (req, res) => {
  console.log("usr", req.body.password);
  const username = req.body.password;
  const token = jwt.sign(username, process.env.ACCESS_TOKEN_SECRET);
  currentKey = token;
  currentPassword = username;
  res.redirect("/granted");
});

app.get("/login", (req, res) => {
  res.render("auth/login.ejs");
});

app.get("/granted", middleware, (req, res) => {
  res.render("auth/start.ejs");
});
// User Register
app.get("/register", (req, res) => {
  res.render("auth/register.ejs");
});
app.post("/register", async (req, res) => {
  const { name, password } = req.body;
  console.log(req.body.name)
  const resp = await register(name, password);
  console.log(resp);
});

app.get("/fail", (req, res) => res.render("auth/fail.ejs"));

// Users

app.get("/student", (req, res) => {
  res.render("roles/student1.ejs");
});

app.get("/teacher", (req, res) => {
  res.render("roles/teacher.ejs");
});

app.get("/admin", (req, res) => {
  res.render("roles/admin.ejs");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

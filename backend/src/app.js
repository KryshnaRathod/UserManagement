const express = require("express");
const cors = require("cors");

const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// ================= MIDDLEWARE =================

app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ================= ROUTES =================

app.use("/api/students", studentRoutes);

app.use("/api/auth", authRoutes);

// ================= EXPORT =================

module.exports = app;
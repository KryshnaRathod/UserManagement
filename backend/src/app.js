const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// ================= MIDDLEWARE =================

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ================= ROUTES =================

app.use("/api/students", studentRoutes);

app.use("/api/auth", authRoutes);

// ================= EXPORT =================

module.exports = app;
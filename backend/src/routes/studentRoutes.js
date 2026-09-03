const express = require("express");

const router = express.Router();

const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  addCourse,
} = require("../controllers/studentController");

const authMiddleware = require("../middleware/authMiddleware");

// Public - no token required for fetching
router.get("/",authMiddleware, getStudents);

router.get("/:id",authMiddleware, getStudentById);

router.post("/", authMiddleware, createStudent);

router.put("/:id", authMiddleware, updateStudent);

router.delete("/:id", authMiddleware, deleteStudent);

router.post(
  "/:id/courses",
  authMiddleware,
  addCourse
);

module.exports = router;
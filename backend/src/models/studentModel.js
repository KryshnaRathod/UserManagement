const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  course_name: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  fees: {
    type: Number,
    required: true
  }
});

const studentSchema = new mongoose.Schema({

  first_name: {
    type: String,
    required: true
  },

  last_name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  gender: {
    type: String,
    required: true
  },

  courses: [courseSchema]

}, {
  timestamps: true
});

module.exports = mongoose.model("Student", studentSchema);
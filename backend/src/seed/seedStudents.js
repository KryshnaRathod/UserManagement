require("dotenv").config();
const mongoose = require("mongoose");
const Student = require("../models/studentModel");
const mockData = require("../config/MOCK_DATA.json");

const seedStudents = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Student.deleteMany({});
    console.log("Cleared existing students");

    const students = mockData.map((s) => ({
      first_name: s.first_name,
      last_name: s.last_name,
      email: s.email,
      gender: s.gender,
      courses: [],
    }));

    await Student.insertMany(students);
    console.log(`Seeded ${students.length} students`);

    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seedStudents();

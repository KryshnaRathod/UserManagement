const Student = require('../models/studentModel');


// ================= CREATE STUDENT =================
exports.createStudent = async (req, res) => {
  try {

    const { first_name, last_name, email, gender } = req.body;

    // Validation
    if (!first_name || !last_name || !email || !gender) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Create Student
    const student = await Student.create({
      first_name,
      last_name,
      email,
      gender
    });

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: student
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


exports.getStudents = async (req, res) => {
  try {
    // -----------------------------
    // Pagination
    // -----------------------------

    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    // Make sure page is valid
    if (page < 1) {
      page = 1;
    }

    // Make sure limit is valid
    if (limit < 1) {
      limit = 10;
    }

    // Maximum 100 records
    if (limit > 100) {
      limit = 100;
    }

    // -----------------------------
    // Search & Filter
    // -----------------------------

    const search = req.query.search?.trim() || "";
    const gender = req.query.gender?.trim() || "";

    const filter = {};

    // -----------------------------
    // Search name/email
    // -----------------------------

    if (search) {
      filter.$or = [
        {
          first_name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          last_name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // -----------------------------
    // Gender filter
    // -----------------------------

    if (gender) {
      filter.gender = gender;
    }

    // -----------------------------
    // Count total filtered records
    // -----------------------------

    const totalRecords = await Student.countDocuments(filter);

    // -----------------------------
    // Calculate total pages
    // -----------------------------

    const totalPages = Math.ceil(totalRecords / limit);

    // -----------------------------
    // Prevent invalid page
    // -----------------------------

    if (totalPages > 0 && page > totalPages) {
      page = totalPages;
    }

    // -----------------------------
    // Calculate skip
    // -----------------------------

    const skip = (page - 1) * limit;

    // -----------------------------
    // Get current page records
    // -----------------------------

    const students = await Student.find(filter)
      .sort({ _id: 1})
      .skip(skip)
      .limit(limit)
      .lean();

    // -----------------------------
    // Response
    // -----------------------------

    res.status(200).json({
      success: true,

      data: students,

      pagination: {
        currentPage: page,
        limit: limit,
        totalRecords,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Get students error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= GET SINGLE STUDENT =================
exports.getStudentById = async (req, res) => {

  try {

    // Check valid MongoDB ObjectId
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID'
      });
    }

    const student = await Student.findById(req.params.id);

    // Check student exists
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      data: student
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// ================= UPDATE STUDENT =================
exports.updateStudent = async (req, res) => {

  try {

    // Check valid MongoDB ObjectId
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID'
      });
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    // Check student exists
    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: updatedStudent
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// ================= DELETE STUDENT =================
exports.deleteStudent = async (req, res) => {

  try {

    // Check valid MongoDB ObjectId
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID'
      });
    }

    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    // Check student exists
    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: deletedStudent
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// Add Course to Student
// ================= ADD COURSE =================
exports.addCourse = async (req, res) => {
  try {

    console.log("Body:", req.body);

    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Request body is missing"
      });
    }

    const { course_name, duration, fees } = req.body;

    if (!course_name || !duration || !fees) {
      return res.status(400).json({
        success: false,
        message: "Course name, duration and fees are required"
      });
    }

    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    student.courses.push({
      course_name,
      duration,
      fees
    });

    await student.save();

    res.status(200).json({
      success: true,
      message: "Course added successfully",
      data: student
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
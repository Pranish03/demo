import Semester from "../models/semester.model.js";
import Course from "../models/course.model.js";

/**
 * @desc   Create semester
 * @route  POST /api/semesters
 * @access Admin
 */
export const createSemester = async (req, res) => {
  try {
    const { name, year, part, program } = req.body;

    if (!name || !year || !part || !program)
      return res.status(400).json({ message: "Missing fields" });

    const semester = await Semester.create({
      name,
      year,
      part,
      program,
    });

    res.status(201).json(semester);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc   Get all semsters
 * @route  GET /api/semesters
 * @access Student / Admin / Teacher
 */
export const getSemesters = async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === "student") {
      filter._id = req.user.semester;
    }

    const semesters = await Semester.find(filter).populate(
      "program",
      "name code"
    );

    res.json(semesters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc   Get a semster
 * @route  GET /api/semesters/:id
 * @access Student
 */
export const getSemester = async (req, res) => {
  try {
    const semester = await Semester.findById(req.params.id).populate(
      "program",
      "name code"
    );

    if (!semester)
      return res.status(404).json({ message: "Semester not found" });

    const courses = await Course.find({ semester: semester._id }).populate(
      "teacher",
      "name email"
    );

    res.json({ semester, courses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc   Get semester for logged-in student
 * @route  GET /api/semesters/me
 * @access Student
 */
export const getMySemester = async (req, res) => {
  try {
    const semester = await Semester.findById(req.user.semester).populate(
      "program",
      "name code"
    );

    if (!semester)
      return res.status(404).json({ message: "Semester not found" });

    const courses = await Course.find({ semester: semester._id }).populate(
      "teacher",
      "name email"
    );

    res.json({ semester, courses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

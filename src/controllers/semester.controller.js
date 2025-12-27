import Semester from "../models/semester.model.js";

/**
 * @desc   Create semester
 * @route  POST /api/semesters
 * @access Admin
 */
export const createSemester = async (req, res) => {
  try {
    const { name, year, part, program, courses } = req.body;

    if (!name || !year || !part || !program)
      return res.status(400).json({ message: "Missing Fields" });

    const semester = await Semester.create({
      name,
      year,
      part,
      program,
      courses,
    });

    res.status(201).json(semester);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc   Get all semsters
 * @route  GET /api/semesters
 * @access Student
 */

export const getSemesters = async (req, res) => {
  try {
    const semesters = await Semester.find(req.user.semester)
      .populate("program", "name code")
      .populate("courses", "name code");

    res.json(semesters);
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
    const semester = await Semester.findById(req.user.semester)
      .populate("program", "name code")
      .populate("courses", "name code");

    if (!semester)
      return res.status(404).json({ message: "Semester Not Found" });

    res.json(semester);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

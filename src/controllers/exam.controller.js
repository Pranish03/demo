import Exam from "../models/exam.model.js";
import ExamRegistration from "../models/examRegistration.model.js";
import Course from "../models/course.model.js";

/**
 * @desc   Create exam
 * @route  Post /api/admin/exams
 * @access Admin
 */
export const createExam = async (req, res) => {
  try {
    const {
      course,
      examType,
      examDate,
      startTime,
      duration,
      registrationDeadline,
    } = req.body;

    if (
      !course ||
      !examType ||
      !examDate ||
      !startTime ||
      !duration ||
      !registrationDeadline
    )
      return res.status(400).json({ message: "All Fields are Required" });

    const courseExists = await Course.findById(course);
    if (!courseExists)
      return res.status(400).json({ message: "Invalid Course" });

    const exam = await Exam.create({
      course,
      examType,
      examDate,
      startTime,
      duration,
      registrationDeadline,
    });

    res.status(201).json(exam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc   Get all exams
 * @route  GET /api/exams
 * @access Admin / Student
 */
export const getExams = async (req, res) => {
  try {
    const exams = await Exam.find().populate("course", "name code");
    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc   Student registration for exam
 * @route  POST /api/exams/:id/register
 * @access Student
 */
export const registerForExam = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) return res.status(404).json({ message: "Exam Not Found" });

    if (new Date() > exam.registrationDeadline)
      return res.status(400).json({ message: "Registration Deadline Passed" });

    const registration = await ExamRegistration.create({
      student: req.user._id,
      exam: exam._id,
    });

    res.status(201).json({
      message: "Exam Registered Successfully",
      registration,
    });
  } catch (error) {
    if (error.code === 11000)
      return res.status(400).json({ message: "Already Registered" });
    res.status(500).json({ message: error.message });
  }
};
/**
 * @desc   Student view registered exams
 * @route  GET /api/exams/my
 * @access Student
 */
export const getMyExams = async (req, res) => {
  try {
    const registration = await ExamRegistration.find({
      student: req.user._id,
    })
      .populate("exam")
      .populate("exam.course", "name code");

    res.json(registration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

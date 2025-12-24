import Course from "../models/course.model.js";
import User from "../models/user.model.js";

/**
 * @desc   Get single course (role-based)
 * @route  GET /api/courses/:id
 * @access Admin / Teacher / Student
 */
export const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("teacher", "name email")
      .populate("students", "name email");

    if (
      req.user.role === "student" &&
      !course.students.some((s) => s._id.equals(req.user._id))
    )
      return res.status(403).json({ message: "Access Denied" });

    if (req.user.role === "teacher" && !course.teacher._id.equals(req.user._id))
      return res.status(403).json({ message: "Access Denied" });

    if (!course) return res.status(404).json({ message: "Coures Not Found" });

    res.json({ course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc   Get courses (role-based)
 * @route  GET /api/courses
 * @access Admin / Teacher / Student
 */
export const getCourses = async (req, res) => {
  try {
    let courses;

    if (req.user.role === "admin")
      courses = await Course.find()
        .populate("teacher", "name email")
        .populate("students", "name email");
    else if (req.user.role === "teacher")
      courses = await Course.find({ teacher: req.user._id });
    else courses = await Course.find({ students: req.user._id });

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc   Create course
 * @routes POST /api/courses
 * @access Admin
 */
export const createCourse = async (req, res) => {
  try {
    const { name, code, teacher, semester } = req.body;

    const teacherUser = await User.findById(teacher);
    if (!teacherUser || teacherUser.role != "teacher")
      return res.status(400).json({ message: "Invalid Teacher" });

    const course = await Course.create({
      name,
      code,
      teacher,
      semester,
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc   Enroll student
 * @route  PATCH /api/courses/:id/enroll
 * @access Admin
 */
export const enrollStudent = async (req, res) => {
  try {
    const { studentId } = req.body;

    const student = await User.findById(studentId);
    if (!student || student.role !== "student")
      return res.status(400).json({ message: "Invalid Student" });

    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course Not Found" });

    if (course.students.includes(studentId))
      return res.status(400).json({ message: "Student Already Enrolled" });

    course.students.push(studentId);
    await course.save();

    res.json({ message: "Student Enrolled Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

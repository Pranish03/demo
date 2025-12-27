import Course from "../models/course.model.js";
import User from "../models/user.model.js";

/**
 * @desc   Get single course (role-based)
 * @route  GET /api/courses/:id
 * @access Admin / Teacher / Student
 */
export const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "teacher",
      "name email"
    );

    if (!course) return res.status(404).json({ message: "Course not found" });

    if (
      req.user.role === "student" &&
      !course.semester.equals(req.user.semester)
    )
      return res.status(403).json({ message: "Access denied" });

    if (req.user.role === "teacher" && !course.teacher.equals(req.user._id))
      return res.status(403).json({ message: "Access denied" });

    res.json(course);
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

    if (req.user.role === "admin") {
      courses = await Course.find().populate("teacher", "name email");
    } else if (req.user.role === "teacher") {
      courses = await Course.find({ teacher: req.user._id });
    } else {
      courses = await Course.find({ semester: req.user.semester });
    }

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

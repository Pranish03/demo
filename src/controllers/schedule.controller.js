import Schedule from "../models/schedule.model.js";
import Course from "../models/course.model.js";
import User from "../models/user.model.js";

/**
 * @desc   Get all schedules
 * @routes GET /api/admin/schedule
 * @access Admin
 */
export const getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find()
      .populate("course", "name code")
      .populate("teacher", "name, email");

    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc   Create schedule
 * @route  POST /api/admin/schedule
 * @access Admin
 */
export const createSchedule = async (req, res) => {
  try {
    const { course, teacher, day, startTime, endTime, room, type } = req.body;

    if (!course || !teacher || !day || !startTime || !endTime || !room)
      return res.status(400).json({ message: "Missing required fields" });

    const courseExists = await Course.findById(course);
    if (!courseExists)
      return res.status(400).json({ message: "Invalid Course" });

    const teacherExists = await User.findById(teacher);
    if (!teacherExists || teacherExists.role !== "teacher")
      return res.status(400).json({ message: "Invalid Teacher" });

    const schedule = await Schedule.create({
      course,
      teacher,
      day,
      startTime,
      endTime,
      room,
      type,
    });

    res.status(201).json(schedule);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * @desc   Update schedule
 * @route  PUT /api/admin/schedule/:id
 * @access Admin
 */
export const updateSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule)
      return res.status(404).json({ message: "Schedule Not Found" });

    Object.assign(schedule, req.body);
    await schedule.save();

    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc   Delete schedule
 * @route  DELETE /api/admin/schedule/:id
 * @access Admin
 */
export const deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);
    if (!schedule)
      return res.status(404).json({ message: "Schedule Not Found" });

    res.json({ message: "Schedule Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

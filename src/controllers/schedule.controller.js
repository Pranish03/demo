import Schedule from "../models/schedule.model.js";
import Course from "../models/course.model.js";
import User from "../models/user.model.js";

/**
 * @desc   Get single schedule
 * @routes GET /api/admin/schedule/:id
 * @access Admin
 */
export const getSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id)
      .populate("course", "name code")
      .populate("teacher", "name email");

    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc   Get all schedules
 * @routes GET /api/admin/schedule
 * @access Admin
 */
export const getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find()
      .populate("course", "name code")
      .populate("teacher", "name email");

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
    const { course, teacher, day, startTime, endTime, room } = req.body;

    if (!course || !teacher || !day || !startTime || !endTime || !room)
      return res.status(400).json({ message: "Missing fields" });

    if (startTime >= endTime)
      return res.status(400).json({ message: "Invalid time range" });

    const schedule = await Schedule.create(req.body);
    res.status(201).json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
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

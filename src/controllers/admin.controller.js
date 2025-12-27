import User from "../models/user.model.js";

/**
 * @desc   Create Student or Teacher
 * @route  POST /api/admin/users
 * @access Admin
 */
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role, rollNo, program, semester } = req.body;

    if (!name || !email || !password || !role)
      return res.status(400).json({ message: "Missing fields" });

    if (!["student", "teacher", "admin"].includes(role))
      return res.status(400).json({ message: "Invalid role" });

    if (role === "student" && (!rollNo || !program || !semester))
      return res.status(400).json({ message: "Student fields required" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({
      name,
      email,
      password,
      role,
      rollNo: role === "student" ? rollNo : undefined,
      program: role === "student" ? program : undefined,
      semester: role === "student" ? semester : undefined,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc   Get all users
 * @route  GET /api/admin/users
 * @access Admin
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("_id name email role");

    if (!users) return res.status(404).json({ message: "No users found" });

    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc   Get single user
 * @route  GET /api/admin/users/:id
 * @access Admin
 */
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "_id name email role"
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc   Update user
 * @route  PUT /api/admin/users/:id
 * @access Admin
 */
export const updateUser = async (req, res) => {
  try {
    const allowedUpdates = ["name", "email", "rollNo", "program", "semester"];
    const updates = {};

    for (const key of allowedUpdates) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role !== "student") {
      delete updates.rollNo;
      delete updates.program;
      delete updates.semester;
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc Activate / Deactivate user
 * @route PATCH /api/admin/users/:id/status
 * @access Admin
 */
export const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isActive = !user.isActive;
    await user.save();

    res.json({
      message: `User ${user.isActive ? "Activated" : "Deactivated"}`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc   Delete user
 * @route  DELETE /api/admin/users/:id
 * @access Admin
 */
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

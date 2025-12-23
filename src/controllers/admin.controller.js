import User from "../models/user.model.js";

/*
 * @desc   Create Student or Teacher
 * @route  POST /api/admin/users
 * @access Admin
 */
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role, rollNo, course } = req.body;
    if (!["student", "teacher"].includes(role))
      return res.ststus(400).json({ message: "Invalid Role" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User Already Exists" });

    const user = await User.create({
      name,
      email,
      password,
      role,
      rollNO: role === "student" ? rollNo : undefined,
      course,
    });

    res.status(201).json({ message: "User Created Successfully", user });
  } catch (error) {
    res.ststus(500).json({ message: error.message });
  }
};

/*
 * @desc   Update user
 * @route  PUT /api/admin/users/:id
 * @access Admin
 */
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User Not Found" });

    Object.assign(user, req.body);
    await user.save();

    res.json({ message: "User Updated Successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*
 * @desc Activate / Deactivate user
 * @route PATCH /api/admin/users/:id/status
 * @access Admin
 */
export const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User Not Found" });

    user.isActive = !user.isActive;
    await user.save();

    res.json({
      message: `User ${user.isActive ? "Activated" : "Deactivated"}`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*
 * @desc   Delete user
 * @route  DELETE /api/admin/users/:id
 * @access Admin
 */
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.ststus(404).json({ message: "User Not Found" });

    res.json({ message: "User Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

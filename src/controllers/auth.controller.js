import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

/**
 * @desc   Register users
 * @route  POST /api/auth/register
 */
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!["student", "teacher"].includes(role))
    return res.status(400).json({ message: "Invalid Role" });

  try {
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "User Already Exists" });

    const user = await User.create({ name, email, password, role });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc   Login users
 * @route  POST /api/auth/login
 */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ message: "Invalid Credentials!" });

    if (!user.isActive)
      return res.status(403).json({ message: "Account Deactivated" });

    if (!(await user.matchPassword(password)))
      return res.status(401).json({ message: "Invalid Credentials!" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

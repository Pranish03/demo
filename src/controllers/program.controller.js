import Program from "../models/program.model.js";

/**
 * @desc   Create program
 * @route  POST /api/programs
 * @access Admin
 */
export const createProgram = async (req, res) => {
  try {
    const { name, code, department, duration, level } = req.body;

    if (!name || !code || !department || !duration || !level)
      return res.status(400).json({ message: "Missing fields" });

    const program = await Program.create({
      name,
      code,
      department,
      duration,
      level,
    });

    res.status(201).json(program);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc   Get all programs
 * @route  GET /api/programs
 * @access Admin / Teacher / Student
 */
export const getPrograms = async (req, res) => {
  try {
    const programs = await Program.find().populate("department", "name code");

    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc   Get single program
 * @route  GET /api/programs/:id
 * @access Admin / Teacher / Student
 */
export const getProgram = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id).populate(
      "department",
      "name code"
    );

    if (!program) return res.status(404).json({ message: "Program not found" });

    res.json(program);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import Department from "../models/department.model.js";

/**
 * @desc   Create department
 * @route  POST /api/departments
 * @access Admin
 */
export const createDepartment = async (req, res) => {
  try {
    const { name, code, description, hod } = req.body;

    if (!name || !code)
      return res.status(400).json({ message: "Missing Fields" });

    const department = await Department.create({
      name,
      code,
      description,
      hod,
    });

    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc   Get all departments
 * @route  GET /api/departments
 * @access Admin / Teacher / Student
 */
export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().populate("hod", "name email");
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc   Update department
 * @route  PUT /api/admin/departments/:id
 * @access Admin
 */
export const updateDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!department)
      return res.status(404).json({ message: "Department Not Found" });

    res.json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc   Delete department
 * @route  DELETE /api/admin/department/:id
 * @access Admin
 */
export const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);

    if (!department)
      return res.status(404).json({ message: "Department Not Found" });

    res.json({ message: "Department Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

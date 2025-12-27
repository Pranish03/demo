import express from "express";
import {
  createDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment,
} from "../controllers/department.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", authorize("admin"), createDepartment);
router.get("/", getDepartments);
router.put("/:id", authorize("admin"), updateDepartment);
router.delete("/:id", authorize("admin"), deleteDepartment);

export default router;

import express from "express";
import {
  createSemester,
  getSemesters,
  getMySemester,
} from "../controllers/semester.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", authorize("admin"), createSemester);
router.get("/", authorize("admin", "teacher"), getSemesters);
router.get("/me", authorize("student"), getMySemester);

export default router;

import express from "express";
import {
  createCourse,
  enrollStudent,
  getCourse,
  getCourses,
} from "../controllers/course.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", authorize("admin"), createCourse);
router.patch("/:id/enroll", authorize("admin"), enrollStudent);
router.get("/", getCourses);
router.get("/:id", getCourse);

export default router;

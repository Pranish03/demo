import express from "express";
import {
  createExam,
  getExams,
  registerForExam,
  getMyExams,
} from "../controllers/exam.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", authorize("admin"), createExam);
router.get("/", getExams);

router.post("/:id/register", authorize("student"), registerForExam);
router.get("/my", authorize("student"), getMyExams);

export default router;

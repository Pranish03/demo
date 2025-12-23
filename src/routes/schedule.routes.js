import express from "express";
import {
  createSchedule,
  getSchedules,
  updateSchedule,
  deleteSchedule,
} from "../controllers/schedule.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect, authorize("admin"));

router.get("/", getSchedules);
router.post("/", createSchedule);
router.put("/:id", updateSchedule);
router.delete("/:id", deleteSchedule);

export default router;

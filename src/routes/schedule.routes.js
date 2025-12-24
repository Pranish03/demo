import express from "express";
import {
  getSchedules,
  getSchedule,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from "../controllers/schedule.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect, authorize("admin"));

router.get("/", getSchedules);
router.get("/:id", getSchedule);
router.post("/", createSchedule);
router.put("/:id", updateSchedule);
router.delete("/:id", deleteSchedule);

export default router;

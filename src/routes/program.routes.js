import express from "express";
import {
  createProgram,
  getPrograms,
  getProgram,
} from "../controllers/program.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", authorize("admin"), createProgram);
router.get("/", getPrograms);
router.get("/:id", getProgram);

export default router;

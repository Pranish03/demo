import express from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  toggleUserStatus,
} from "../controllers/admin.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect, authorize("admin"));

router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.patch("/users/:id/status", toggleUserStatus);
router.delete("/users/:id", deleteUser);

export default router;

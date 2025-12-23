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
router.put("/user/:id", updateUser);
router.patch("/user/:id/status", toggleUserStatus);
router.delete("/user/:id", deleteUser);

export default router;

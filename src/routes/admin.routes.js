import express from "express";
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  toggleUserStatus,
  deleteUser,
} from "../controllers/admin.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect, authorize("admin"));

router.get("/users", getAllUsers);
router.get("/users/:id", getUser);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.patch("/users/:id/status", toggleUserStatus);
router.delete("/users/:id", deleteUser);

export default router;

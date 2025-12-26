import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import courseRoutes from "./routes/course.routes.js";
import scheduleRoutes from "./routes/schedule.routes.js";
import examRoutes from "./routes/exam.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/schedule", scheduleRoutes);
app.use("/api/exams", examRoutes);

export default app;

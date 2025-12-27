import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import courseRoutes from "./routes/course.routes.js";
import scheduleRoutes from "./routes/schedule.routes.js";
import departmentRoutes from "./routes/department.routes.js";
import programRoutes from "./routes/program.routes.js";
import semesterRoutes from "./routes/semester.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/schedule", scheduleRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/semesters", semesterRoutes);

export default app;

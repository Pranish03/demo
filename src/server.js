import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET not defined");
  process.exit(1);
}

app.get("/", (req, res) => {
  res.send("Welcome to the backend demo");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});

import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";
import cookieParser from "cookie-parser";
import FileRoutes from "./routes/FileRoutes.js";
const app = express();
app.use(cookieParser());
dotenv.config();
connectDB();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/files", FileRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
});

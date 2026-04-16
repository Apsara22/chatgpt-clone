import express from "express";
import dotenv from "dotenv";
import connectDb from "../database/db.js";
import userRoutes from "../routes/userRoute.js";
import chatRoutes from "../routes/chatRoute.js";
import cors from "cors";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect DB (IMPORTANT: call directly)
connectDb();

// Routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

// Default route (optional but helpful)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ❌ REMOVE app.listen()
// ✅ EXPORT app
export default app;
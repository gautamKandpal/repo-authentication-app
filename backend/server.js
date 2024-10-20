import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
import { errorHandler } from "./middleware/errorHandler.js";
import path from "path";

connectDB(); //connect to mongoDb

const app = express();
const port = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});

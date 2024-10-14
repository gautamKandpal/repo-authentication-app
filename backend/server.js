import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.js";

connectDB(); //connect to mongoDb

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});

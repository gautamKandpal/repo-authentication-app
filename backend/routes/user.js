import express from "express";
import { userController, updateUser } from "../controllers/userControllers.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.get("/", userController);
router.post("/update/:id", verifyToken, updateUser);

export default router;

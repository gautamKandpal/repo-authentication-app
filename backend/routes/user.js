import express from "express";
import {
  userController,
  updateUser,
  deleteUser,
} from "../controllers/userControllers.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.get("/", userController);
router.post("/update/:id", verifyToken, updateUser);
router.delete("delete/:id", verifyToken, deleteUser);

export default router;

import express from "express";
import { signUp, signIn, googleSignIn } from "../controllers/authController.js";
const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/google", googleSignIn);

export default router;

import express from "express";
import {
  signUp,
  signIn,
  googleSignIn,
  signOut,
} from "../controllers/authController.js";
const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/google", googleSignIn);
router.get("/sign-out", signOut);

export default router;

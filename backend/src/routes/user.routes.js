import express from "express";
import { loginUser, registerUser, userCredits } from "../controllers/user.controller.js";
import auth from "../middlewares/auth.middleware.js";

// http://localhost:4000/api/v1/users
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/credits", auth, userCredits);

export default router;

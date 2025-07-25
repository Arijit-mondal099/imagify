import express from "express";
import { generateImage } from "../controllers/image.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/generate-image", auth, generateImage);

export default router;

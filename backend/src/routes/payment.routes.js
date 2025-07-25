import express from "express";
import { paymentRazorpay, verifyRazorpay } from "../controllers/payment.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/pay-razor", auth, paymentRazorpay);
router.post("/verify-razor", auth, verifyRazorpay);

export default router;

import express from "express";
import cors from "cors";
import "dotenv/config";
import dbConnection from "./config/db.config.js";

const app = express();
await dbConnection();
const PORT = process.env.PORT || 4000;

// Middlewares ----->
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb" }));
app.use(
  cors({
    origin: ["http://localhost:5173", "https://imagify-omega-three.vercel.app"],
    credentials: true,
  })
);

// Routes ---------->
import userRouter from "./routes/user.routes.js";
import imageRouter from "./routes/image.routes.js";
import paymentRouter from "./routes/payment.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/images", imageRouter);
app.use("/api/v1/payments", paymentRouter);

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});

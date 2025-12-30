import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "../config/mongodb.js";
import connectCloudinary from "../config/cloudinary.js";

import userRouter from "../routes/userRoute.js";
import productRouter from "../routes/productRoute.js";
import orderRouter from "../routes/orderRoute.js";

// INFO: Create express app
const app = express();

// INFO: Connect services (IMPORTANT: outside routes)
connectDB();
connectCloudinary();

// INFO: Middleware
app.use(express.json());
app.use(cors());

// INFO: API endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);

// INFO: Default route
app.get("/", (req, res) => {
  res.send("API is running on Vercel 🚀");
});

// ❌ DO NOT USE app.listen()
// ✅ EXPORT app instead
export default app;

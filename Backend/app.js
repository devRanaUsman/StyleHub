import express from "express";
import ItemRouter from "./router/ItemRouter.js";
import AuthRouter from "./router/AuthRouter.js";
import SubscriberRouter from "./router/SubscriberRouter.js";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || origin.includes("localhost") || origin.includes("vercel.app")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/items/api", ItemRouter);
app.use("/auth", AuthRouter);
app.use("/api/subscribe", SubscriberRouter);

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.DB_URL);
    isConnected = true;
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
}

export default async function handler(req, res) {
  await connectDB();
  return app(req, res);
}

import express from "express";
import ItemRouter from "../Backend/router/ItemRouter.js";
import AuthRouter from "../Backend/router/AuthRouter.js";
import SubscriberRouter from "../Backend/router/SubscriberRouter.js";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = ["http://localhost:5173", "style-hub-gray.vercel.app"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.use("/items/api", ItemRouter);
app.use("/auth", AuthRouter);
app.use("/api/subscribe", SubscriberRouter);

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const DB_URL = process.env.DB_URL;

    cached.promise = mongoose.connect(DB_URL).then((mongooseInstance) => {
      console.log("✅ Connected to MongoDB");
      return mongooseInstance;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default async function handler(req, res) {
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

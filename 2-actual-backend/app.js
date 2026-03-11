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

// Allow all origins (for development only)

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use("/items/api", ItemRouter);
app.use("/auth", AuthRouter);
app.use("/api/subscribe", SubscriberRouter);

const DB_URL =
  "mongodb+srv://Rmua:0000@cluster0.ywqrxcz.mongodb.net/stylishhub?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("✅ Connected to MongoDB");

    app.listen(8080, () => {
      console.log("Server is running on port 8080");
    });
  })

  .catch((err) => console.error("❌ MongoDB connection error:", err));

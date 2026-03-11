import express from "express";
import { subscribe } from "../controller/subscriberController.js";

const router = express.Router();

router.post("/", subscribe);

export default router;

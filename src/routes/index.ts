import express from "express";
import { healthCheck } from "../controllers/health.controller";
import authRoutes from "./auth.routes";

const router = express.Router();

router.get("/", healthCheck);
router.use("/auth", authRoutes);

export default router;

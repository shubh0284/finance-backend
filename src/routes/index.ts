import express from "express";
import { healthCheck } from "../controllers/health.controller";
import authRoutes from "./auth.routes";
import recordRoutes from "./record.routes";
import dashboardRoutes from "./dashboard.routes";

const router = express.Router();

router.get("/", healthCheck);
router.use("/auth", authRoutes);
router.use("/records", recordRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;

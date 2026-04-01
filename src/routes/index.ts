import express from "express";
import { healthCheck } from "../controllers/health.controller";

const router = express.Router();
console.log(healthCheck);

router.get("/", healthCheck);

export default router;

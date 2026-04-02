import express from "express";
import {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
} from "../controllers/record.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/", authMiddleware, createRecord);
router.get("/", authMiddleware, getRecords);
router.put("/:id", authMiddleware, updateRecord);
router.delete("/:id", authMiddleware, deleteRecord);

export default router;

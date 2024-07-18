import express from "express";
import { getMonthlyStatistics } from "../controllers/statsController.js";

const router = express.Router();

// Route to get statistics for a selected month
router.get("/statistics/:month", getMonthlyStatistics);

export default router;

import express from "express";
import { getBarChartData } from "../controllers/barChartController.js";

const router = express.Router();

// Route to get bar chart data for a selected month
router.get("/barchart/:month", getBarChartData);

export default router;

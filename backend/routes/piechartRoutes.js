import express from "express";
import { getPieChartData } from "../controllers/pieChartController.js";

const router = express.Router();

// Route to get pie chart data for a selected month
router.get("/piechart/:month", getPieChartData);

export default router;

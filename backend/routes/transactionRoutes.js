import express from "express";
import { getTransactionsByMonth } from "../controllers/transactionController.js";

const router = express.Router();

// Route to get all transactions with pagination and search
router.get("/transactions", getTransactionsByMonth);

export default router;

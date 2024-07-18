import express from "express";
import { saveProductsFromExternalAPI } from "../controllers/combinedController.js";

const router = express.Router();

// Route to get combined product
router.get("/combined", saveProductsFromExternalAPI);

export default router;

import express from "express";
import { saveProductsFromExternalAPI } from "../controllers/combinedController.js";

const router = express.Router();

// Route to combine responses from multiple APIs
router.get("/combined", saveProductsFromExternalAPI);

export default router;

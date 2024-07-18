// Importing necessary modules
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Importing database connection function
import connectMongoDB from "./config/db.js";

// Importing route modules
import transactionRoutes from "./routes/transactionRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import barChartRoutes from "./routes/barChartRoutes.js";
import pieChartRoutes from "./routes/pieChartRoutes.js";
import combinedRoutes from "./routes/combinedRoutes.js";

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = express();
const PORT = process.env.PORT || 5000; // Set port from environment variables or default to 5000

// Middleware
app.use(express.json()); // Parse JSON bodies of incoming requests
app.use(cors()); // Enable CORS for all routes

// Routes
app.use("/api", transactionRoutes); // Transaction API routes
app.use("/api", statsRoutes); // Statistics API routes
app.use("/api", barChartRoutes); // Bar chart API routes
app.use("/api", pieChartRoutes); // Pie chart API routes
app.use("/api", combinedRoutes); // Combined data API routes

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectMongoDB(); // Connect to MongoDB database
});

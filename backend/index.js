import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectMongoDB from "./config/db.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import barChartRoutes from "./routes/barChartRoutes.js";
import pieChartRoutes from "./routes/pieChartRoutes.js";
import combinedRoutes from "./routes/combinedRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", transactionRoutes);
app.use("/api", statsRoutes);
app.use("/api", barChartRoutes);
app.use("/api", pieChartRoutes);
app.use("/api", combinedRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectMongoDB();
});

import Product from "../models/product.js";
import { getMonthNumber, isValidMonthFormat } from "../utils/validFormat.js";

// Controller function to get pie chart data for a selected month
export const getPieChartData = async (req, res) => {
  const { month } = req.params;

  // Ensure month is provided and in valid format
  if (!month || !isValidMonthFormat(month)) {
    return res.status(400).json({
      message: "Invalid month format. Use a valid month name or abbreviation.",
    });
  }

  // Map month name to its numerical representation (assuming English month names)
  const monthNumber = getMonthNumber(month);

  try {
    // Get pie chart data for the specified month, regardless of year
    const pieChartData = await Product.aggregate([
      {
        $addFields: {
          month: { $month: "$dateOfSale" },
        },
      },
      {
        $match: {
          month: monthNumber,
        },
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(
      pieChartData.map((entry) => ({ category: entry._id, count: entry.count }))
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

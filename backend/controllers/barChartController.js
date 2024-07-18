import Product from "../models/product.js";
import { getMonthNumber, isValidMonthFormat } from "../utils/validFormat.js";

// Controller function to get bar chart data for a selected month
export const getBarChartData = async (req, res) => {
  let { month } = req.params;

  // Ensure month is provided and in valid format
  if (!month || !isValidMonthFormat(month)) {
    return res.status(400).json({
      message: "Invalid month format. Use a valid month name or abbreviation.",
    });
  }

  // Map month name to its numerical representation
  const monthNumber = getMonthNumber(month);

  // Define price ranges
  const priceRanges = [
    { min: 0, max: 100 },
    { min: 101, max: 200 },
    { min: 201, max: 300 },
    { min: 301, max: 400 },
    { min: 401, max: 500 },
    { min: 501, max: 600 },
    { min: 601, max: 700 },
    { min: 701, max: 800 },
    { min: 801, max: 900 },
    { min: 901, max: Infinity },
  ];

  try {
    const barChartData = await Promise.all(
      priceRanges.map(async (range) => {
        const count = await Product.aggregate([
          {
            $match: {
              sold: true, // Ensure product is sold
              $expr: {
                $and: [
                  { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
                  { $gte: ["$price", range.min] },
                  { $lte: ["$price", range.max] },
                ],
              },
            },
          },
          {
            $count: "count",
          },
        ]);

        return {
          range: `${range.min}-${range.max}`,
          count: count.length > 0 ? count[0].count : 0,
        };
      })
    );

    res.json(barChartData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

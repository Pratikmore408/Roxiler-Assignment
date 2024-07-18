import Product from "../models/product.js";
import { getMonthNumber, isValidMonthFormat } from "../utils/validFormat.js";

// Controller function to get statistics for a selected month
export const getMonthlyStatistics = async (req, res) => {
  const { month } = req.params;

  if (!isValidMonthFormat(month)) {
    return res
      .status(400)
      .json({
        message:
          "Invalid month name. Use full month names like 'April', 'June', etc.",
      });
  }

  const monthNumber = getMonthNumber(month);

  if (!monthNumber) {
    return res
      .status(400)
      .json({
        message:
          "Invalid month name. Use full month names like 'April', 'June', etc.",
      });
  }

  try {
    const totalSaleAmount = await Product.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: "$dateOfSale" }, monthNumber],
          },
          sold: true, // Consider only products that have been sold
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$price" }, // Use price field for total sale amount
        },
      },
    ]);

    const totalSoldItems = await Product.countDocuments({
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, monthNumber],
      },
      sold: true,
    });

    const totalNotSoldItems = await Product.countDocuments({
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, monthNumber],
      },
      sold: false,
    });

    res.json({
      totalSaleAmount:
        totalSaleAmount.length > 0 ? totalSaleAmount[0].totalAmount : 0,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (err) {
    console.error("Error in getMonthlyStatistics:", err);
    res.status(500).json({ message: err.message });
  }
};

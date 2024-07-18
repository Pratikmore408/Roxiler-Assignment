import Product from "../models/product.js";
import { getMonthNumber, isValidMonthFormat } from "../utils/validFormat.js";

// Controller function to get products for a specific month
export const getTransactionsByMonth = async (req, res) => {
  const { page = 1, perPage = 10, search, month } = req.query;

  if (!isValidMonthFormat(month)) {
    return res.status(400).json({ message: "Enter a valid month" });
  }

  const monthNumber = getMonthNumber(month);
  if (monthNumber === null) {
    return res.status(400).json({ message: "Invalid month name" });
  }

  // Build query object based on search criteria
  const query = {
    $expr: {
      $eq: [{ $month: "$dateOfSale" }, monthNumber],
    },
  };

  if (search) {
    const regexQuery = { $regex: search, $options: "i" };
    query.$or = [
      { title: regexQuery },
      { description: regexQuery },
      { category: regexQuery },
    ];
  }

  try {
    const products = await Product.find(query)
      .limit(parseInt(perPage))
      .skip((parseInt(page) - 1) * parseInt(perPage));

    const totalProducts = await Product.countDocuments(query);

    res.json({
      products,
      totalPages: Math.ceil(totalProducts / perPage),
      currentPage: parseInt(page),
    });
  } catch (err) {
    console.error("Error fetching products:", err.message);
    res.status(500).json({ message: err.message });
  }
};

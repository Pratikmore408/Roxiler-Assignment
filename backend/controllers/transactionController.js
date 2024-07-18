import Product from "../models/product.js";
import { getMonthNumber } from "../utils/validFormat.js";

// Controller function to get all products with pagination and search
export const getAllTransactions = async (req, res) => {
  const { page = 1, perPage = 10, search } = req.query;

  // Build query object based on search criteria
  const query = {};
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
      { image: { $regex: search, $options: "i" } },
      { sold: { $regex: search, $options: "i" } },
      // Add more fields as needed
    ];
  }

  try {
    const products = await Product.find(query)
      .limit(parseInt(perPage))
      .skip((parseInt(page) - 1) * parseInt(perPage));

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to get products for a specific month with pagination and search
export const getTransactionsByMonth = async (req, res) => {
  const { page = 1, perPage = 10, search, month } = req.query;

  if (!isValidMonthFormat(month)) {
    return res.status(400).json({ message: "Enter valid month" });
  }

  const monthNumber = getMonthNumber(month);

  // Define date range for the entire month
  const startDate = new Date(`${monthNumber}-01T00:00:00.000Z`);
  const endDate = new Date(
    new Date(startDate).setMonth(startDate.getMonth() + 1) - 1
  );

  // Build query object based on search criteria and date range
  const query = {
    dateOfSale: {
      $gte: startDate,
      $lte: endDate,
    },
  };

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
      { image: { $regex: search, $options: "i" } },
      { sold: { $regex: search, $options: "i" } },
    ];
  }

  try {
    const products = await Product.find(query)
      .limit(parseInt(perPage))
      .skip((parseInt(page) - 1) * parseInt(perPage));

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

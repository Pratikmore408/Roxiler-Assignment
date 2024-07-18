import axios from "axios";
import Product from "../models/product.js";

// Controller function to fetch data from external API and save in Product model
export const saveProductsFromExternalAPI = async (req, res) => {
  try {
    // Fetch data from external API
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const products = response.data;

    // Save products into Product model
    const savedProducts = await Product.insertMany(products);

    res.json({
      message: `${savedProducts.length} products saved successfully.`,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

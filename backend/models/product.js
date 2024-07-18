import mongoose from "mongoose";

// Define product schema
const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true, // Ensures each product has a unique ID
  },
  title: {
    type: String,
    required: true, // Title of the product is required
  },
  price: {
    type: Number,
    required: true, // Price of the product is required
  },
  description: {
    type: String,
    required: true, // Description of the product is required
  },
  category: {
    type: String,
    required: true, // Category of the product is required
  },
  image: {
    type: String,
    required: true, // URL or path to the product image is required
  },
  sold: {
    type: Boolean,
    required: true, // Indicates whether the product is sold or not
  },
  dateOfSale: {
    type: Date,
    required: true, // Date when the product was sold
  },
});

// Create Product model based on schema
const Product = mongoose.model("Product", productSchema);

export default Product;

import { mongooseConnect } from "../../lib/mongoose";
import mongoose from "mongoose";

// Product Schema
const Product = mongoose.models.Product || mongoose.model("Product", new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  language: { type: String, required: true },
  isbn: { type: String, required: true },
  publisher: { name: { type: String, required: true }, year: { type: Number, required: true } },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  pages: { type: Number, required: true },
  images: [{ type: String }],
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  properties: { type: Object },
  amount: { type: Number, required: true, default: 0 },
}));

// MainProductImage Schema
const MainProductImage = mongoose.models.MainProductImage || mongoose.model("MainProductImage", new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  mainImage: { type: String, required: true },
}));

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  // Fixed MainProductImage ID
  const fixedMainProductImageId = "6765944ee85491325a6a509a";

  if (method === "PUT") {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ error: "Product ID is required" });

    try {
      // Fetch product and get the main image
      const product = await Product.findById(productId);
      if (!product) return res.status(404).json({ error: "Product not found" });

      const mainImage = product.images[0]; // Default to the first image in the array

      // Upsert (update or create) the MainProductImage
      const mainProduct = await MainProductImage.findByIdAndUpdate(
        fixedMainProductImageId, 
        { product: productId, mainImage }, 
        { new: true, upsert: true } // `upsert: true` ensures it creates a new one if it doesn't exist
      );

      return res.status(200).json({
        success: true,
        message: "Main product image updated successfully",
        mainProduct,
      });
    } catch (error) {
      console.error("Error updating main product image:", error);
      return res.status(500).json({ error: "Error updating main product image" });
    }
  }

  if (method === "GET") {
    try {
      // Fetch the fixed MainProductImage by ID
      const mainProduct = await MainProductImage.findById(fixedMainProductImageId).populate("product");

      if (!mainProduct) {
        return res.status(404).json({ error: "Main product image not found" });
      }

      // Return the main product image along with the product data
      return res.status(200).json({
        success: true,
        mainProduct,
      });
    } catch (error) {
      console.error("Error fetching main product image:", error);
      return res.status(500).json({ error: "Error fetching main product image" });
    }
  }

  // Handle invalid methods
  return res.status(405).json({ error: "Method Not Allowed" });
}

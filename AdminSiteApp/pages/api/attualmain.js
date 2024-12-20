import { mongooseConnect } from "../../lib/mongoose";
import mongoose from "mongoose";

// Schemas
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

const MainProductImage = mongoose.models.MainProductImage || mongoose.model("MainProductImage", new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  mainImage: { type: String, required: true },
}));

const fixedMainProductImageId = "6765944ee85491325a6a509a";

// Generic error handler
const handleError = (res, error, status = 500) => {
  console.error(error);
  return res.status(status).json({ error });
};

export default async function handle(req, res) {
  await mongooseConnect();

  if (req.method === "PUT") {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ error: "Product ID is required" });

    try {
      const product = await Product.findById(productId);
      if (!product) return res.status(404).json({ error: "Product not found" });

      const mainImage = product.images[0]; // Default to the first image
      const mainProduct = await MainProductImage.findByIdAndUpdate(
        fixedMainProductImageId, { product: productId, mainImage }, { new: true, upsert: true }
      );

      return res.status(200).json({ success: true, message: "Main product image updated successfully", mainProduct });
    } catch (error) {
      return handleError(res, "Error updating main product image", 500);
    }
  }

  if (req.method === "GET") {
    try {
      const mainProduct = await MainProductImage.findById(fixedMainProductImageId).populate("product");
      if (!mainProduct) return res.status(404).json({ error: "Main product image not found" });

      return res.status(200).json({ success: true, mainProduct });
    } catch (error) {
      return handleError(res, "Error fetching main product image", 500);
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}

import { mongooseConnect } from "../../lib/mongoose";
import mongoose from "mongoose";

// Product Schema
const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  language: { type: String, required: true },
  isbn: { type: String, required: true },
  publisher: {
    name: { type: String, required: true },
    year: { type: Number, required: true },
  },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  pages: { type: Number, required: true },
  images: [{ type: String }],
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  properties: { type: Object },
  amount: { type: Number, required: true, default: 0 },
});

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default async function handle(req, res) {
  const { method, body, query } = req;
  await mongooseConnect();

  try {
    if (method === "GET") {
      const product = query?.id ? await Product.findById(query.id) : await Product.find();
      return res.json(product);
    }

  

   

    return res.status(400).json({ error: "Invalid request" });

  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ error: error.message || "Something went wrong" });
  }
}

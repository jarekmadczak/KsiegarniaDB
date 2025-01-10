import { mongooseConnect } from "../../lib/mongoose";
import mongoose from "mongoose";
import Cookies from "js-cookie";

// Order Schema
const OrderSchema = new mongoose.Schema({
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
  },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, min: 1 },
    }
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: new Date(new Date().setHours(new Date().getHours() + 1)) },
});

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

const calculateTotalPrice = async (products) => {
  let totalPrice = 0;
  for (let { product, quantity } of products) {
    const productDoc = await mongoose.model("Product").findById(product);
    if (!productDoc) throw new Error(`Product with id ${product} not found`);
    totalPrice += productDoc.price * quantity;
  }
  return totalPrice;
};

export default async function handle(req, res) {
  const { method, body } = req;
  await mongooseConnect();

  try {
    if (method === "POST") {
      const { customer, products } = body;

      if (!customer || !products?.length) {
        return res.status(400).json({ error: "Customer and products are required" });
      }

      const totalPrice = await calculateTotalPrice(products);
      const newOrder = new Order({ customer, products, totalPrice });
      await newOrder.save();

      return res.status(201).json(newOrder);
    }

    return res.status(400).json({ error: "Invalid request" });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message || "Something went wrong" });
  }
}

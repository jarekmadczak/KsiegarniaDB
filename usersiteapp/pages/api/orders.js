import { mongooseConnect } from "../../lib/mongoose";
import mongoose from "mongoose";

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
  status: { type: String, default: "pending" }, // possible values: "pending", "shipped", "delivered"
  createdAt: { type: Date, default: new Date(new Date().setHours(new Date().getHours() + 1)) }, //na polska godzine
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
  const { method, body, query } = req;
  await mongooseConnect();

  try {
    if (method === "GET") {
      const order = query.id 
        ? await Order.findById(query.id).populate("products.product")
        : await Order.find().populate("products.product");
      return order ? res.json(order) : res.status(404).json({ error: "Order not found" });
    }

    if (method === "POST") {
      const { customer, products } = body;
      if (!customer || !products?.length) return res.status(400).json({ error: "Customer and products are required" });
      const totalPrice = await calculateTotalPrice(products);
      const newOrder = new Order({ customer, products, totalPrice });
      await newOrder.save();
      return res.status(201).json(newOrder);
    }

    if (method === "PUT") {
      const { _id, customer, products, status, totalPrice } = body;
      if (!_id) return res.status(400).json({ error: "Order ID is required" });

      const existingOrder = await Order.findById(_id);
      if (!existingOrder) return res.status(404).json({ error: "Order not found" });

      const updatedTotalPrice = products?.length ? await calculateTotalPrice(products) : totalPrice || existingOrder.totalPrice;
      const updatedOrder = await Order.findByIdAndUpdate(_id, {
        customer: customer || existingOrder.customer,
        products: products || existingOrder.products,
        status: status || existingOrder.status,
        totalPrice: updatedTotalPrice,
      }, { new: true });

      return res.status(200).json(updatedOrder);
    }

    if (method === "DELETE" && query.id) {
      await Order.deleteOne({ _id: query.id });
      return res.status(200).json({ success: true });
    }

    return res.status(400).json({ error: "Invalid request" });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message || "Something went wrong" });
  }
}

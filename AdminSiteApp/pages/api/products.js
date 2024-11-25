import { mongooseConnect } from "../../lib/mongoose";
import mongoose from "mongoose";

//Schema
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
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    if (req.query?.id) {
      const product = await Product.findOne({ _id: req.query.id });
      return res.json(product);
    }
    const products = await Product.find();
    return res.json(products);
  }

  if (method === "POST") {
    const { 
      title, 
      author, 
      language, 
      isbn, 
      publisher, 
      description, 
      price, 
      pages, 
      images, 
      category, 
      properties, 
      amount 
    } = req.body;

    try {
      const newProduct = await Product.create({
        title,
        author,
        language,
        isbn,
        publisher: {
          name: publisher.name,
          year: publisher.year,
        },
        description,
        price,
        pages,
        images,
        category,
        properties,
        amount, 
      });
      return res.status(201).json(newProduct);
    } catch (error) {
      console.error("Error creating product:", error);
      return res.status(500).json({ error: "Failed to create product" });
    }
  }

  if (method === "PUT") {
    const { 
      _id, 
      title, 
      author, 
      language, 
      isbn, 
      publisher, 
      description, 
      price, 
      pages, 
      images, 
      category, 
      properties, 
      amount 
    } = req.body;

    try {
      await Product.updateOne(
        { _id },
        {
          title,
          author,
          language,
          isbn,
          publisher,
          description,
          price,
          pages,
          images,
          category,
          properties,
          amount, 
        }
      );
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error updating product:", error);
      return res.status(500).json({ error: "Failed to update product" });
    }
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      try {
        await Product.deleteOne({ _id: req.query.id });
        return res.status(200).json({ success: true });
      } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({ error: "Failed to delete product" });
      }
    }
    return res.status(400).json({ error: "Product ID is required" });
  }
}

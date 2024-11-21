import { mongooseConnect } from "../../lib/mongoose";
import Category from "../../lib/category";

export default async function handler(req, res) {
  await mongooseConnect(); // Ensure you're connected to the MongoDB database

  const { method } = req;

  // Fetch all categories (GET request)
  if (method === "GET") {
    try {
      const categories = await Category.find();  // Fetch categories from the database
      res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  }

  // Create a new category (POST request)
  if (method === "POST") {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    try {
      const newCategory = await Category.create({ name });
      res.status(201).json(newCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create category" });
    }
  }

  // Delete a category (DELETE request)
  if (method === "DELETE") {
    const { id } = req.query; // Get category ID from query

    try {
      await Category.findByIdAndDelete(id);  // Delete the category by ID
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete category" });
    }
  }
}

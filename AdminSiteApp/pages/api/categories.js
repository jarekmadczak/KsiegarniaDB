import { mongooseConnect } from "../../lib/mongoose";
import Category from "../../lib/category";

export default async function handler(req, res) {
  await mongooseConnect(); 

  const { method } = req;

  if (method === "GET") {
    try {
      const categories = await Category.find();  
      res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  }

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
  if (method === "PUT") {
    const { id, name } = req.body;
  
    if (!id || !name) {
      return res.status(400).json({ error: "Category id and name are required" });
    }
  
    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { name },
        { new: true } // Return the updated category
      );
      res.status(200).json(updatedCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update category" });
    }
  }

  if (method === "DELETE") {
    const { id } = req.query; 

    try {
      await Category.findByIdAndDelete(id);  
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete category" });
    }
  }
}

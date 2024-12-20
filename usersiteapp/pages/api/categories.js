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

 
}

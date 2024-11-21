import mongoose from "mongoose";

// Define the schema for the Category model
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },  // Category name like "horror"
});

const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);

export default Category;

import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch categories on page load
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get("/api/categories");
        setCategories(response.data);
      } catch (err) {
        setError("Failed to fetch categories.");
      }
    }

    fetchCategories();
  }, []);

  // Handle category form submission
  async function handleAddCategory(ev) {
    ev.preventDefault();

    if (!newCategoryName.trim()) {
      setError("Category name cannot be empty.");
      return;
    }

    setLoading(true);
    try {
      // Make POST request to create a new category
      const response = await axios.post("/api/categories", { name: newCategoryName });
      setCategories((prev) => [...prev, response.data]); // Add new category to the list
      setNewCategoryName(""); // Clear the input
      setError(""); // Clear any previous errors
    } catch (err) {
      setError("Failed to create category.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <h1>Kategorie</h1>
      
      {/* Error message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      {/* Category form */}
      <form onSubmit={handleAddCategory} className="mb-4">
        <label className="block mb-2">Add New Category</label>
        <input
          type="text"
          placeholder="Category name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="border p-2 mb-2 w-1/3"
        />
        <button
          type="submit"
          className="btn-primary"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>

      {/* List of categories */}
      <h2 className="mb-4">Existing Categories</h2>
      <ul>
        {categories.length > 0 ? (
          categories.map((category) => (
            <li key={category._id} className="mb-2">
              {category.name}
            </li>
          ))
        ) : (
          <li>No categories available.</li>
        )}
      </ul>
    </Layout>
  );
}

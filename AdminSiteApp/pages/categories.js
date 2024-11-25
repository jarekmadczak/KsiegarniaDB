import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


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

 
  async function handleAddCategory(ev) {
    ev.preventDefault();

    if (!newCategoryName.trim()) {
      setError("Gatunek name cannot be empty.");
      return;
    }

    setLoading(true);
    try {
      
      const response = await axios.post("/api/categories", { name: newCategoryName });
      setCategories((prev) => [...prev, response.data]); 
      setNewCategoryName(""); 
      setError(""); 
    } catch (err) {
      setError("Failed to create category.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <h1 className="text-3xl font-semibold mb-6">Gatunki</h1>

      {/* Error message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Category form */}
      <form onSubmit={handleAddCategory} className="mb-6 flex flex-col space-y-4">
        <label className="text-gray-700 text-lg">Dodaj nowy gatunek</label>
        <input
          type="text"
          placeholder="Gatunek"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        >
          {loading ? "Dodawanie..." : "Dodaj"}
        </button>
      </form>

      {/* List of categories */}
      <h2 className="text-2xl font-medium mb-4 text-center">Istniejace Gatunki</h2>
<div className="bg-white shadow-lg rounded-lg p-6 mx-auto w-full max-w-2xl">
  <ul className="space-y-4">
    {categories.length > 0 ? (
      categories.map((category) => (
        <li
          key={category._id}
          className="text-lg text-blue-600 hover:text-blue-800 transition-colors duration-300"
        >
          {category.name}
        </li>
      ))
    ) : (
      <li className="text-gray-600">No Gatunki available.</li>
    )}
  </ul>
</div>

    </Layout>
  );
}

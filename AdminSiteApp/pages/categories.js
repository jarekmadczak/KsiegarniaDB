import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState("");

  useEffect(() => {
    axios.get("/api/categories").then((res) => setCategories(res.data)).catch(() => setError("Failed to fetch categories."));
  }, []);

  const handleAddCategory = async (ev) => {
    ev.preventDefault();
    if (!newCategoryName.trim()) return setError("Category name cannot be empty.");
    setLoading(true);
    try {
      const { data } = await axios.post("/api/categories", { name: newCategoryName });
      setCategories((prev) => [...prev, data]);
      setNewCategoryName("");
      setError("");
    } catch {
      setError("Failed to create category.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`/api/categories?id=${id}`);
      setCategories((prev) => prev.filter((category) => category._id !== id));
    } catch {
      setError("Failed to delete category.");
    }
  };

  const handleSaveEdit = async () => {
    try {
      const { data } = await axios.put(`/api/categories`, { id: editingCategory.id, name: editedCategoryName });
      setCategories((prev) => prev.map((category) => (category._id === editingCategory.id ? data : category)));
      setEditingCategory(null);
    } catch {
      setError("Failed to update category.");
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-semibold mb-6">Gatunki</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleAddCategory} className="mb-6 flex flex-col space-y-4">
        <label className="text-gray-700 text-lg">Dodaj nowy gatunek</label>
        <input
          type="text"
          placeholder="Gatunek"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500" disabled={loading}>
          {loading ? "Dodawanie..." : "Dodaj"}
        </button>
      </form>

      <h2 className="text-2xl font-medium mb-4 text-center">Istniejace Gatunki</h2>
      <div className="bg-white shadow-lg rounded-lg p-6 mx-auto w-full max-w-2xl">
        <ul className="space-y-4">
          {categories.length > 0 ? categories.map((category) => (
            <li key={category._id} className="text-lg flex justify-between items-center">
              {editingCategory?.id === category._id ? (
                <div className="flex space-x-2">
                  <input type="text" value={editedCategoryName} onChange={(e) => setEditedCategoryName(e.target.value)} className="p-2 border border-gray-300 rounded-md" />
                  <button onClick={handleSaveEdit} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Zapisz</button>
                  <button onClick={() => setEditingCategory(null)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">Anuluj</button>
                </div>
              ) : (
                <div className="flex justify-between w-full">
                  <span className="text-blue-600 hover:text-blue-800">{category.name}</span>
                  <div className="space-x-2">
                    <button onClick={() => { setEditingCategory({ id: category._id, name: category.name }); setEditedCategoryName(category.name); }} className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">Edytuj</button>
                    <button onClick={() => handleDeleteCategory(category._id)} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">Usuń</button>
                  </div>
                </div>
              )}
            </li>
          )) : <li className="text-gray-600">No Gatunki available.</li>}
        </ul>
      </div>
    </Layout>
  );
}

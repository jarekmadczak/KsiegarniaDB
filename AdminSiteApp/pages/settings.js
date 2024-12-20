import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

export default function SetMainImageForm() {
  const [products, setProducts] = useState([]); // Store products
  const [mainProductImg, setMainProductImg] = useState([]);
  const [mainProductDesc, setMainProductDesc] = useState([]);
  const [mainProductTitle, setMainProductTitle] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); // Selected product
  const [mainImage, setMainImage] = useState(""); // Store the selected main image

  // Fetch products data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    const fetchMainProduct = async () => {
      try {
        const response = await axios.get("/api/attualmain");
        setMainProductImg(response.data.mainProduct.mainImage);
        setMainProductTitle(response.data.mainProduct.product.title)
        setMainProductDesc(response.data.mainProduct.product.description)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchMainProduct()
    fetchProducts();
  }, []);

  const handleProductChange = (e) => {
    const productId = e.target.value;
    const product = products.find((p) => p._id === productId);
    setSelectedProduct(product);
    setMainImage(product?.images[0] || ""); // Default to first image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProduct || !mainImage) return;

    try {
      // Send a PUT request to update the main image of the selected product
      await axios.put("/api/attualmain", {
        productId: selectedProduct._id,
        mainImage,
      });
      window.location.reload();
      
    } catch (error) {
      console.error("Error updating main image:", error);
      alert("Error updating main image.");
    }
  };

  return (
    <Layout>
    <div className="flex flex-col items-center space-y-2 bg-white p-4 rounded-lg shadow-lg max-w-4xl mx-auto">
  <h3 className="text-2xl font-semibold text-gray-800">Aktualny główny produkt na stronie:</h3>
  <p className="text-2xl font-bold text-gray-900">Tytuł:</p>
  <p className="text-2xl font-bold text-gray-900">{mainProductTitle}</p>
  <p className="text-2xl font-bold text-gray-900">Opis:</p>
  <p className="text-2xl font-bold text-gray-900">{mainProductDesc}</p>
  {/* Product Title and Image */}
  <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
    {/* Product Title */}
  


    {/* Product Image */}
    <div className="relative">
      <img 
        src={mainProductImg} 
        alt="Main Product Image" 
        className="w-64 h-64 object-cover rounded-lg shadow-lg border-2 border-gray-200"
      />
    </div>
  </div>
</div>

  
  
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Product Selection */}
      <div>
        <label className="block text-lg font-semibold">Wybierz produkt:</label>
        <select
          onChange={handleProductChange}
          value={selectedProduct ? selectedProduct._id : ""}
          className="mt-2 p-2 border border-gray-300 rounded"
        >
          <option value="">-- Wybierz produkt --</option>
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.title}
            </option>
          ))}
        </select>
      </div>

      {/* Display images of the selected product */}
      {selectedProduct && (
        <div>
          <label className="block text-lg font-semibold">główny obrazek:</label>
          <div className="mt-2">
            {selectedProduct.images.map((image, index) => (
              <div key={index} className="flex items-center space-x-4">
                
                <img src={image} alt={`Image ${index + 1}`} className="w-16 h-16 object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Zaktualizuj Główny Obrazek
      </button>
    </form>
    </Layout>
  );
  
}

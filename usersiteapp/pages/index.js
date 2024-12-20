import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [mainProduct, setMainProduct] = useState(null); // For storing main product
  const [products, setProducts] = useState([]); // For storing other products
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch main product data
        const mainProductResponse = await axios.get('/api/attualmain');
        setMainProduct(mainProductResponse.data.mainProduct);

        // Fetch other products
        const productsResponse = await axios.get('/api/products');
        setProducts(productsResponse.data);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-xl font-semibold">Loading...</span>
      </div>
    ); 
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-blue-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-white">My Store</h1>
          <ul className="flex space-x-6">
            <li><a href="#" className="text-white hover:text-gray-300">Home</a></li>
            <li><a href="#" className="text-white hover:text-gray-300">Shop</a></li>
            <li><a href="#" className="text-white hover:text-gray-300">Contact</a></li>
            <li><a href="#" className="text-white hover:text-gray-300">Cart</a></li>
          </ul>
        </div>
      </nav>

      <div className="container mx-auto p-6">

        {/* Main Product */}
        <div className="text-center mb-12">
          {mainProduct ? (
            <>
              <h2 className="text-3xl font-bold mb-4">{mainProduct.product.title}</h2>
              <img src={mainProduct.mainImage} alt={mainProduct.product.title} className="mx-auto w-full max-w-md rounded-lg shadow-lg mb-6" />
              <p className="text-lg mb-4">{mainProduct.product.description}</p>
              <p className="text-xl font-semibold text-gray-700"><strong>Price:</strong> ${mainProduct.product.price}</p>
            </>
          ) : (
            <p>Loading main product...</p>
          )}
        </div>

        {/* Product List */}
        <div>
          <h3 className="text-2xl font-semibold mb-6">Other Products:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="border rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition-shadow duration-300">
                  <img src={product.images[0]} alt={product.title} className="w-full h-56 object-cover rounded-lg mb-4" />
                  <h4 className="text-xl font-semibold text-gray-800">{product.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                  <p className="text-lg font-semibold text-gray-700"><strong>Price:</strong> ${product.price}</p>
                </div>
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

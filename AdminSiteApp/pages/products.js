import Layout from "../components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
 
    axios.get('/api/products').then(response => {
      setProducts(response.data);
    });
  }, []);

  const handleDelete = async (productId) => {
    try {
      
      await axios.delete(`/api/products?id=${productId}`);
      
   
      setProducts(products.filter(product => product._id !== productId));
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("There was an error deleting the product.");
    }
  };

  return (
    <Layout>
      <Link className="text-center bg-blue-500 hover:bg-blue-700 text-white content-center font-bold py-2 px-4 rounded" href={'/products/productnew'}>
        Dodaj nowy product
      </Link>

      <div className="grid grid-cols-4 content-normal text-center">
        {products.map(product => (
          <div className="bg-gray-100 p-10 text-center rounded shadow-md m-3" key={product._id}>
            <h1 className="text-center font-medium text-xl">
              {product.title} <br /> publikacja: {product.publisher.name}
            </h1>

        
            {product.images && product.images.length > 0 && (
              <div className="text-center">
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img} 
                    alt={`Product image ${index + 1}`}
                    className={"w-screen h-2/4 rounded"}
                  />
                ))}
              </div>
            )}

            <p className="text-lg mt-2 font-semibold">Ilosc: <span className="text-blue-800">{product.amount}</span></p>

            {/* Edit Button */}
            <div className="justify-center mt-6">
              <Link className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2 mt-4 rounded" href={`/products/Edit?id=${product._id}`}>
                Edytuj
              </Link>
            </div>

            {/* Delete Button */}
            <div className="mt-6">
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 mt-4 rounded"
                onClick={() => handleDelete(product._id)} 
              >
                Usun
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

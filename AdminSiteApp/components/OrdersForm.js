import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function OrderForm() {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [products, setProducts] = useState([]); // List of available products (books)
  const [orderProducts, setOrderProducts] = useState([]); // Products selected for the order
  const [totalPrice, setTotalPrice] = useState(0); // Total price of the order
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Fetch products list on component mount
  useEffect(() => {
    axios.get("/api/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  // Handle adding/removing products to the order
  const handleProductChange = (e, productId) => {
    const { value } = e.target;
    const product = products.find((product) => product._id === productId);
    
    if (value && !isNaN(value) && value > 0) {
      // Add product to the order if quantity is greater than 0
      const updatedOrderProducts = [...orderProducts];
      const existingProductIndex = updatedOrderProducts.findIndex((item) => item.product === productId);
      
      if (existingProductIndex > -1) {
        updatedOrderProducts[existingProductIndex].quantity = parseInt(value, 10);
      } else {
        updatedOrderProducts.push({ product: productId, quantity: parseInt(value, 10), price: product.price });
      }
      setOrderProducts(updatedOrderProducts);
    } else {
      // Remove product from the order if quantity is invalid or 0
      setOrderProducts(orderProducts.filter((item) => item.product !== productId));
    }
  };

  // Calculate total price when products or quantities change
  useEffect(() => {
    let total = 0;
    orderProducts.forEach((item) => {
      const product = products.find((prod) => prod._id === item.product);
      if (product) total += product.price * item.quantity;
    });
    setTotalPrice(total);
  }, [orderProducts, products]);

  // Handle form submission
  const saveOrder = async (e) => {
    e.preventDefault();
    const data = {
      customer: { name: customerName, email: customerEmail, address: customerAddress },
      products: orderProducts,
      totalPrice,
    };
    try {
      setIsSubmitting(true);
      await axios.post("/api/orders", data);
      router.push("/orders"); // Redirect to the orders list after successful creation
    } catch (error) {
      console.error("Error saving order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={saveOrder} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
      {/* Customer Name */}
      <div className="flex flex-col space-y-2">
        <label className="text-gray-700">Customer Name</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Customer Email */}
      <div className="flex flex-col space-y-2">
        <label className="text-gray-700">Customer Email</label>
        <input
          type="email"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Customer Address */}
      <div className="flex flex-col space-y-2">
        <label className="text-gray-700">Customer Address</label>
        <input
          type="text"
          value={customerAddress}
          onChange={(e) => setCustomerAddress(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Products Selection */}
      <div className="space-y-4">
        <label className="text-gray-700">Products</label>
        {products.map((product) => (
          <div key={product._id} className="flex items-center space-x-4">
            <span>{product.title} - ${product.price}</span>
            <input
              type="number"
              min="1"
              placeholder="Quantity"
              onChange={(e) => handleProductChange(e, product._id)}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>

      {/* Total Price */}
      <div className="flex flex-col space-y-2">
        <label className="text-gray-700">Total Price</label>
        <input
          type="text"
          value={`$${totalPrice}`}
          readOnly
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {isSubmitting ? "Submitting..." : "Save Order"}
      </button>
    </form>
  );
}

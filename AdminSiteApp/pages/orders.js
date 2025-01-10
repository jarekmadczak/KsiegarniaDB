import Layout from "../components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders').then(res => setOrders(res.data));
  }, []);

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`/api/orders?id=${orderId}`);
      setOrders(orders.filter(order => order._id !== orderId));
    } catch {
      alert("Error deleting order.");
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`/api/orders`, { _id: orderId, status: newStatus });
      setOrders(orders.map(order => order._id === orderId ? { ...order, status: newStatus } : order));
    } catch {
      alert("Error updating status.");
    }
  };

  return (
    <Layout>
      <Link href="/orders/New" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center">
        Dodaj nowe zamówienie
      </Link>
      <div className="overflow-x-auto mt-4">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              {[ "Status", "Order Date", "Total Price", "Customer", "Email", "Address", "Products", "Actions"].map((header) => (
                <th key={header} className="border border-gray-300 px-4 py-2">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="text-center">
              
                <td className="border border-gray-300 px-4 py-2">
                  <select value={order.status} onChange={(e) => handleStatusChange(order._id, e.target.value)} className="border border-gray-300 p-1 rounded">
                    {["pending", "shipped", "delivered"].map(status => (
                      <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                    ))}
                  </select>
                </td>
                <td className="border border-gray-300 px-4 py-2">{order.createdAt.slice(0, 10)}</td>
                <td className="border border-gray-300 px-4 py-2">${order.totalPrice}</td>
                <td className="border border-gray-300 px-4 py-2">{order.customer.name}</td>
                <td className="border border-gray-300 px-4 py-2">{order.customer.email}</td>
                <td className="border border-gray-300 px-4 py-2">{order.customer.address}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.products.map((item) => (
                    item.product && item.product.title ? (
                      <p key={item.product._id}>{item.product.title} - {item.quantity} x ${item.product.price}</p>
                    ) : (
                      <p key={item._id}>Product information missing</p>
                    )
                  ))}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex justify-center space-x-2">
                    <Link href={`/orders/Edit?id=${order._id}`} className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded">Edit</Link>
                    <button onClick={() => handleDelete(order._id)} className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

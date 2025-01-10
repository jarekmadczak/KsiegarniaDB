import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie"; // For accessing and clearing cookies
import NavBar from "../components/Nav";
import {
  Footer,FooterText
} from '../components/Layout';
// Styled components for styling the cart
import styled from "styled-components";

const CartPageWrapper = styled.div`
  padding: 20px;
  margin-top: 20vh;
  max-width: 1200px;
  margin: 10vh auto;
  display: flex;
  gap: 20px;
`;

const OrdersContainer = styled.div`
  flex: 2;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
`;

const CartHeader = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.75rem;
  font-weight: bold;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  margin-bottom: 10px;
  border-radius: 8px;
`;

const CartInfo = styled.div`
  flex: 1;
  padding: 10px;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  button {
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }

  span {
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

const DeleteButton = styled.button`
  padding: 5px 10px;
  background-color: #ff4d4f;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;

const FormContainer = styled.div`
  flex: 1;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
`;

const InputField = styled.input`
  padding: 10px;
  margin: 5px 0;
  width: 100%;
  max-width: 300px;
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [customer, setCustomer] = useState({ name: "", email: "", address: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const cartData = Cookies.get("cart");
    if (cartData) {
      setCartItems(JSON.parse(cartData));
    }
  }, []);

  const handleQuantityChange = (index, action) => {
    const updatedCart = cartItems.map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          quantity: action === "increase" ? item.quantity + 1 : Math.max(1, item.quantity - 1),
        };
      }
      return item;
    });
    setCartItems(updatedCart);
    Cookies.set("cart", JSON.stringify(updatedCart)); // Update the cart in cookies
  };

  const handleDelete = (index) => {
    const updatedCart = cartItems.filter((_, idx) => idx !== index);
    setCartItems(updatedCart);
    Cookies.set("cart", JSON.stringify(updatedCart)); // Update the cart in cookies
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/orders", {
        customer,
        products: cartItems.map((item) => ({
          product: item.productId,
          quantity: item.quantity,
        })),
      });

      if (response.status === 201) {
        Cookies.remove("cart");
        router.push("/"); // Redirect to homepage after submission
      }
    } catch (error) {
      console.error("Error submitting the order:", error);
      alert("There was an error processing your order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavBar />
      <CartPageWrapper>
        {/* Left: Orders */}
        <OrdersContainer>
          <CartHeader>Shopping Cart</CartHeader>
          {cartItems.length === 0 ? (
            <p>Your cart is empty. Please add items to your cart.</p>
          ) : (
            cartItems.map((item, index) => (
              <CartItem key={index}>
                <CartInfo>
                  <strong>{item.title}</strong>
                  <p>Price: ${item.price}</p>
                  <QuantityControl>
                    <button onClick={() => handleQuantityChange(index, "decrease")}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(index, "increase")}>+</button>
                  </QuantityControl>
                </CartInfo>
                <DeleteButton onClick={() => handleDelete(index)}>Delete</DeleteButton>
              </CartItem>
            ))
          )}
        </OrdersContainer>

        {/* Right: Form */}
        <FormContainer>
          <CartHeader>Order Details</CartHeader>
          <form onSubmit={handleSubmit}>
            <div>
              <InputField
                type="text"
                placeholder="Your Name"
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                required
              />
              <InputField
                type="email"
                placeholder="Your Email"
                value={customer.email}
                onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                required
              />
              <InputField
                type="text"
                placeholder="Shipping Address"
                value={customer.address}
                onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                required
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Order"}
            </Button>
          </form>
        </FormContainer>
      </CartPageWrapper>
          <Footer>
                    <FooterText>&copy; 2025 E-Biblioteka. All Rights Reserved.</FooterText>

          </Footer>
    </div>
  );
}

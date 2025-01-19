import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie"; // cookies
import NavBar from "../components/Nav";
import { Footer, FooterText } from "../components/Layout";
// Style
import styled from "styled-components";

const CartPageWrapper = styled.div`
  padding: 20px;
  margin-top: 20vh;
  max-width: 1200px;
  margin: 10vh auto;
  display: flex;
  gap: 20px;
  margin-bottom: 30vh;
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

const TotalPrice = styled.div`
  margin-top: 20px;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [customer, setCustomer] = useState({ name: "", email: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/auth", {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token with the request
          },
        });
        if (response.status === 200) {
          // Combine firstName and surname into the name field
          setCustomer({
            name: response.data.firstName,
            email: response.data.email,
            address: response.data.lastName, // Corrected address field
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (token) {
      fetchUserData();
    }

    const cartData = Cookies.get("cart");
    if (cartData) {
      const parsedCart = JSON.parse(cartData);
      setCartItems(parsedCart);
      calculateTotal(parsedCart);
    }
  }, [router]);

  const calculateTotal = (cartItems) => {
    const totalCost = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalCost);
  };

  const handleQuantityChange = (index, action) => {
    const updatedCart = cartItems.map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          quantity:
            action === "increase"
              ? item.quantity + 1
              : Math.max(1, item.quantity - 1),
        };
      }
      return item;
    });
    setCartItems(updatedCart);
    calculateTotal(updatedCart);
    Cookies.set("cart", JSON.stringify(updatedCart));
  };

  const handleDelete = (index) => {
    const updatedCart = cartItems.filter((_, idx) => idx !== index);
    setCartItems(updatedCart);
    calculateTotal(updatedCart);
    Cookies.set("cart", JSON.stringify(updatedCart));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/orders", {
        customer,
        products: cartItems.map((item) => ({
          product: item.productId, // Ensure 'productId' is the correct field
          quantity: item.quantity,
        })),
      });

      if (response.status === 201) {
        Cookies.remove("cart");
        router.push("/");
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
          <CartHeader>Koszyk</CartHeader>
          {cartItems.length === 0 ? (
            <p>Dodaj coś do koszyka. Aktualnie jest pusty.</p>
          ) : (
            cartItems.map((item, index) => (
              <CartItem key={index}>
                <CartInfo>
                  <strong>{item.title}</strong>
                  <p>Cena: {item.price}zł</p>
                  <QuantityControl>
                    <button onClick={() => handleQuantityChange(index, "decrease")}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(index, "increase")}>+</button>
                  </QuantityControl>
                </CartInfo>
                <DeleteButton onClick={() => handleDelete(index)}>Usuń</DeleteButton>
              </CartItem>
            ))
          )}
          <TotalPrice>Całosc: {total}zł</TotalPrice>
        </OrdersContainer>

        {/* Right: Form */}
        <FormContainer>
          <CartHeader>Zamówienie:</CartHeader>
          <form onSubmit={handleSubmit}>
            <div>
              <InputField
                type="text"
                placeholder="Imię i nazwisko"
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                required
              />
              <InputField
                type="email"
                placeholder="Email"
                value={customer.email}
                onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                required
              />
              <InputField
                type="text"
                placeholder="Adres"
                value={customer.address}
                onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                required
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Zamów"}
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

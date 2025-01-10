import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  // Load cart from cookies on initial mount
  useEffect(() => {
    const cartData = Cookies.getJSON('cart');
    if (cartData) {
      setCartProducts(cartData);
    }
  }, []);

  // Update cookies whenever cartProducts change
  useEffect(() => {
    Cookies.set('cart', cartProducts, { expires: 7 }); // Expires in 7 days
  }, [cartProducts]);

  // Function to add a product to the cart
  function addProduct(productId) {
    setCartProducts(prev => [...prev, productId]);
  }

  // Function to remove a product from the cart
  function removeProduct(productId) {
    setCartProducts(prev => prev.filter(id => id !== productId));
  }

  // Function to clear the entire cart
  function clearCart() {
    setCartProducts([]);
  }

  return (
    <CartContext.Provider value={{ cartProducts, addProduct, removeProduct, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

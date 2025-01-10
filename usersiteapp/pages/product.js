import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import NavBar from '../components/Nav'; // Komponent Navbar
import { useRouter } from 'next/router'; // Hook do pobierania params z URL
import { Footer, FooterText } from '../components/Layout'; // Footer components
import Cookies from 'js-cookie'; // Importing js-cookie to handle cookies


// Styled components for layout
const ProductPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  min-height: 100vh;
  background-color: #f5f5f5;
  flex-direction: column;
  margin-top: 5vh;
`;

const ProductDetailsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  margin-top: 40px;
  background-color: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 1200px;
`;

const ProductImageWrapper = styled.div`
  flex: 1;
  margin-right: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
`;

const ProductInfoWrapper = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ProductTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
`;

const ProductAuthor = styled.h3`
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 15px;
`;

const ProductDescription = styled.p`
  font-size: 1rem;
  color: #444;
  margin-bottom: 25px;
  line-height: 1.5;
  max-width: 500px;
`;

const ProductPrice = styled.div`
  font-size: 1.75rem;
  font-weight: bold;
  color: #00b300;
  margin-bottom: 25px;
`;

const ProductDetails = styled.div`
  font-size: 1.1rem;
  color: #444;
  margin-top: 20px;
  width: 90%;
`;

const ProductPublisher = styled.div`
  margin-bottom: 10px;
`;

const ProductPages = styled.div`
  margin-bottom: 10px;
`;

const ProductIsbn = styled.div`
  margin-bottom: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
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

export default function ProductPage() {
  const router = useRouter(); // Hook to get params from URL
  const { id } = router.query; // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`/api/products?id=${id}`); // Fetch product by ID
          setProduct(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching product:', error);
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]); // Effect triggered when id in URL changes

  const addToCart = () => {
    // Get existing cart from cookies (if any)
    const cart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];

    // Add the current product to the cart
    const productToAdd = {
      productId: product._id,
      title: product.title,
      price: product.price,
      quantity: 1, // Assuming the user wants 1 of the product. You can add logic for quantity if needed.
    };

    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.productId === product._id);
    if (existingProductIndex !== -1) {
      // If it exists, update the quantity
      cart[existingProductIndex].quantity += 1;
    } else {
      // If it's new, push the product into the cart
      cart.push(productToAdd);
    }

    // Save updated cart to cookies
    Cookies.set('cart', JSON.stringify(cart));

    alert(`${product.title} dodano do koszyka!`);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div>
      <NavBar />
      <ProductPageWrapper>
        <ProductDetailsWrapper>
          {/* Left - Product Image */}
          <ProductImageWrapper>
            <ProductImage src={product.images[0]} alt={product.title} />
          </ProductImageWrapper>

          {/* Right - Product Info */}
          <ProductInfoWrapper>
            <ProductTitle>{product.title}</ProductTitle>
            <ProductAuthor>{product.author}</ProductAuthor>
            <ProductDescription>{product.description}</ProductDescription>
            <ProductPrice>{product.price} pln</ProductPrice>

            {/* Additional Product Details */}
            <ProductDetails>
              <ProductPublisher>Publisher: {product.publisher.name}</ProductPublisher>
              <ProductPublisher>Rok: {product.publisher.year}</ProductPublisher>
              <ProductPages>Strony: {product.pages}</ProductPages>
              <ProductIsbn>ISBN: {product.isbn}</ProductIsbn>
              <ProductIsbn>Jezyk: {product.language}</ProductIsbn>
            </ProductDetails>
          </ProductInfoWrapper>
          <ButtonWrapper>
          <Button onClick={addToCart}>Dodaj do koszyka</Button>
        </ButtonWrapper>
        </ProductDetailsWrapper>

       
      </ProductPageWrapper>

      <Footer>
        <FooterText>&copy; 2025 E-Biblioteka. All Rights Reserved.</FooterText>
      </Footer>
    </div>
  );
}
